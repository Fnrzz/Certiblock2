import { makeHash } from "@/services/certificate/makeHash";
import { VerifyCertificate } from "@/services/meta-mask/verifyCertificate";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const formData = await req.formData();
    const file = formData.get("file");
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const jsonString = buffer.toString("utf-8");
    const certificateData = JSON.parse(jsonString);
    const { hash } = await makeHash(certificateData);
    const result = await VerifyCertificate(hash);
    if (!result) {
      return NextResponse.json(
        { error: "Certificate not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { hash: hash, certificateData: certificateData },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
