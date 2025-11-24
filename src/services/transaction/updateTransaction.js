import { createClient } from "@/utils/supabase/server";

export const UpdateTransaction = async (
  log,
  blockNumber,
  confirmedAt,
  transactionFee,
  status
) => {
  const supabase = await createClient();
  const transactionHash = log.transaction.hash;
  const certificateHash = log.topics[1];
  const { error: errorTransaction } = await supabase
    .from("transactions")
    .update({
      status: status,
      transaction_hash: transactionHash,
      block_number: blockNumber,
      confirmed_at: confirmedAt,
      transaction_fee: transactionFee,
    })
    .eq("certificate_hash", certificateHash);
  if (errorTransaction) {
    console.error("Error updating transaction:", errorTransaction);
  }
  return { error: errorTransaction };
};
