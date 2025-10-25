import { createClient } from "@/utils/supabase/server";

export const UploadJson = async (dataJson) => {
  const supabase = await createClient();
  const filename = `${dataJson.studentDetails.studentNumber}.json`;
  const textJson = JSON.stringify(dataJson, null, 2);
  const file = new Blob([textJson], { type: "application/json" });

  const { data: uploadData, error: uploadError } = await supabase.storage
    .from("certificates")
    .upload(filename, file, { upsert: true });

  if (uploadError) {
    console.error("Error uploading file:", uploadError);
    return { error: uploadError };
  }

  const { data: certificate, error: certificateError } = await supabase
    .from("certificates")
    .insert({
      file_path: uploadData.path,
    })
    .select("id")
    .single();

  if (certificateError) {
    console.error("Error inserting certificate:", certificateError);
    return { error: certificateError };
  }

  return {
    certificateId: certificate.id,
  };
};
