import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const { certificateId, certificateHash, transactionHash } =
      await req.json();
    if (!certificateId || !certificateHash || !transactionHash) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    const { error } = await supabase.from("transactions").insert({
      certificate_id: certificateId,
      certificate_hash: certificateHash,
      transaction_hash: transactionHash,
      status: "PENDING",
      type: "ISSUE",
    });

    if (error) throw new Error(error.message);

    return NextResponse.json(
      { message: "Transaction confirmed successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Confirm Transaction API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
