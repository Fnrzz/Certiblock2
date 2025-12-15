import { makeHash } from "@/services/certificate/makeHash";
import { MakeJson } from "@/services/certificate/makeJson";
import { UploadJson } from "@/services/certificate/uploadJson";
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

    return NextResponse.json(
      {
        message: "Certificate data prepared successfully",
        data: {
          studentDetails: certificateJson,
          hash,
          certificateId,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Issue Certificate API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
