import { createClient } from "@/utils/supabase/server";

export const getTransactions = async (page = 1, limit = 10, searchQuery) => {
  const supabase = await createClient();

  const from = (page - 1) * limit;
  const to = page * limit - 1;

  let query = supabase
    .from("transactions")
    .select(
      "transaction_hash, certificate_hash, confirmed_at, transaction_fee, status,block_number,type",
      { count: "exact" }
    )
    .range(from, to)
    .order("confirmed_at", { ascending: false });

  if (searchQuery) {
    query = query.ilike("certificate_hash", `%${searchQuery}%`);
  }

  const { data, count, error } = await query;

  return { data, count, error };
};
