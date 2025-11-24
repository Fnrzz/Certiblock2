import { makeHash } from "@/services/certificate/makeHash";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const formData = await req.formData();
  const file = formData.get("file");

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const jsonString = buffer.toString("utf-8");
  const certificateData = JSON.parse(jsonString);

  const { hash } = await makeHash(certificateData);

  return NextResponse.json(
    {
      message: "File parsed successfully",
      hash: hash,
    },
    { status: 200 }
  );
};
