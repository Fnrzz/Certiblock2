import { UploadJson } from "@/services/certificate/uploadJson";
import { MakeTransaction } from "@/services/transaction/makeTransaction";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const { studentDetails, transactionHash, certificateHash } =
      await req.json();

    const { certificateId, error: errorUpload } = await UploadJson(
      studentDetails
    );

    if (errorUpload) {
      return NextResponse.json({ error: errorUpload.error }, { status: 500 });
    }

    const { errorTransaction } = await MakeTransaction(
      certificateId,
      transactionHash,
      certificateHash
    );

    if (errorTransaction) {
      return NextResponse.json({ error: errorTransaction }, { status: 500 });
    }

    return NextResponse.json(
      { message: "Transaction created successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Create Transaction API Error:", error);
    return NextResponse.json(
      { error: "An internal error occurred." },
      { status: 500 }
    );
  }
};
