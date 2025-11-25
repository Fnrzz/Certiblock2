import { createClient } from "@/utils/supabase/client";
export const DownloadJson = async (txhash) => {
  try {
    const supabase = createClient();
    const { data: transaction, error: transactionError } = await supabase
      .from("transactions")
      .select(`certificate_id`)
      .eq("transaction_hash", txhash)
      .single();

    if (transactionError) {
      console.error("Error fetching transaction:", transactionError);
      return { error: transactionError };
    }

    const { data: certificate, error: certificateError } = await supabase
      .from("certificates")
      .select(`file_path`)
      .eq("id", transaction.certificate_id)
      .single();

    if (certificateError) {
      console.error("Error fetching certificate:", certificateError);
      return { error: certificateError };
    }

    const { data: signedData, error: signedError } = await supabase.storage
      .from("certificates")
      .createSignedUrl(certificate.file_path, 60);

    if (signedError) throw new Error(signedError.message);

    const response = await fetch(signedData.signedUrl);

    if (!response.ok) throw new Error("Gagal mengunduh file.");

    const fileBlob = await response.blob();

    const url = URL.createObjectURL(fileBlob);
    const link = document.createElement("a");
    link.href = url;

    const downloadName = certificate.nim
      ? `certificate-${certificate.nim}.json`
      : "certificate.json";
    link.download = downloadName;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error fetching certificate:", error);
    return { error };
  }
};
