import { makeHash } from "@/services/certificate/makeHash";
import { MakeJson } from "@/services/certificate/makeJson";
import { UploadJson } from "@/services/certificate/uploadJson";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const { studentData } = await req.json();

    const requiredFields = [
      "fullName",
      "nim",
      "nik",
      "birthPlace",
      "birthDate",
      "programStudy",
      "graduationDate",
      "academicYear",
      "issueDate",
      "diplomaNumber",
    ];

    for (const field of requiredFields) {
      if (!studentData[field] || String(studentData[field]).trim() === "") {
        return NextResponse.json(
          { error: "Missing required fields" },
          { status: 400 }
        );
      }
    }

    const { data: certificateJson } = MakeJson(studentData);
    const { hash } = await makeHash(certificateJson);

    const { certificateId, error: errorUpload } = await UploadJson(
      certificateJson
    );

    if (errorUpload) throw new Error(errorUpload.message);

    const supabase = await createClient();
    const { data: transaction, error: transactionError } = await supabase
      .from("transactions")
      .insert({
        certificate_id: certificateId,
        certificate_hash: hash,
        status: "DRAFT",
        type: "ISSUE",
      })
      .select("id")
      .single();
    if (transactionError) throw new Error(transactionError.message);

    return NextResponse.json(
      {
        message: "Draft certificate created successfully",
        data: {
          studentDetails: certificateJson,
          hash,
          transactionId: transaction.id,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Issue Certificate API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
