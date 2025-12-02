import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const { transactionHash, certificateHash } = await req.json();

    if (!transactionHash || !certificateHash) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    const { error } = await supabase.from("transactions").insert({
      transaction_hash: transactionHash,
      certificate_hash: certificateHash,
      status: "PENDING",
      type: "REVOKE",
    });

    if (error) throw new Error(error.message);

    return NextResponse.json(
      { message: "Transaction confirmed successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
