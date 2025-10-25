import { createClient } from "@/utils/supabase/client";
export const DownloadJson = async (txhash) => {
  try {
    const supabase = createClient();
    console.log(txhash);
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

    const { data: file, error: fileError } = await supabase.storage
      .from("certificates")
      .download(certificate.file_path);

    if (fileError) {
      console.error("Error downloading file:", fileError);
      return { error: fileError };
    }

    const url = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = url;
    link.download = `certificate.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error fetching certificate:", error);
    return { error };
  }
};
