import { createClient } from "@/utils/supabase/server";

export const MakeTransaction = async (
  certificate_id,
  transaction_hash,
  certificate_hash
) => {
  const supabase = await createClient();
  const { error: errorTransaction } = await supabase
    .from("transactions")
    .insert({
      certificate_id: certificate_id,
      transaction_hash: transaction_hash,
      status: "PENDING",
      certificate_hash: certificate_hash,
      type: "ISSUE",
    });

  return { error: errorTransaction };
};
