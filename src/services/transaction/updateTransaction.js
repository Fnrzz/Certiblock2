import { createClient } from "@/utils/supabase/server";

export const UpdateTransaction = async (
  log,
  blockNumber,
  confirmedAt,
  transactionFee,
  status,
  type
) => {
  try {
    const supabase = await createClient();
    const transactionHash = log.transaction.hash;
    const certificateHash = log.topics[1];
    if (type === "ISSUE") {
      const { error: errorTransaction } = await supabase
        .from("transactions")
        .update({
          status: status,
          transaction_hash: transactionHash,
          block_number: blockNumber,
          confirmed_at: confirmedAt,
          transaction_fee: transactionFee,
        })
        .eq("certificate_hash", certificateHash)
        .eq("type", type)
        .eq("status", "PENDING");

      if (errorTransaction) throw new Error(errorTransaction.message);
    } else if (type === "REVOKE") {
      const { error: errorUpdateTX } = await supabase
        .from("transactions")
        .update({
          status: status,
          block_number: blockNumber,
          confirmed_at: confirmedAt,
          transaction_fee: transactionFee,
        })
        .eq("certificate_hash", certificateHash)
        .eq("type", type)
        .eq("status", "PENDING");
      if (errorUpdateTX) throw new Error(errorUpdateTX.message);

      const { data: existingTx, error: findError } = await supabase
        .from("transactions")
        .select("id", "certificate_id")
        .eq("certificate_hash", certificateHash)
        .eq("type", "ISSUE")
        .single();

      if (findError) throw new Error(findError.message);

      const certId = existingTx?.certificate_id;

      if (certId) {
        console.log(certId);
        const { error: errorDelete } = await supabase
          .from("certificates")
          .delete()
          .eq("id", certId);

        if (errorDelete) throw new Error(errorDelete.message);
      }

      const { error: errorTransaction } = await supabase
        .from("transactions")
        .update({
          status: "REVOKED",
          certificate_id: null,
        })
        .eq("id", existingTx.id)
        .eq("type", "ISSUE")
        .eq("status", "CONFIRMED");

      if (errorTransaction) throw new Error(errorTransaction.message);
    }

    return { error: null };
  } catch (error) {
    console.error("UpdateTransaction Service Error:", error.message);
    return { error: error.message };
  }
};
