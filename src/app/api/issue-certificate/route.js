import { makeHash } from "@/services/certificate/makeHash";
import { MakeJson } from "@/services/certificate/makeJson";
import { NextResponse } from "next/server";

export const POST = async (req) => {
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

  const { data } = MakeJson(studentData);

  const { hash } = await makeHash(data);

  return NextResponse.json(
    {
      message: "Data processed successfully",
      data: { studentDetails: data, hash: hash },
    },
    { status: 200 }
  );
};
