import { ethers } from "ethers";
import { UpdateTransaction } from "./updateTransaction";
import { createClient } from "@/utils/supabase/server";

const CERTIFICATE_ISSUED_EVENT_SIGNATURE = ethers.id(
  "CertificateIssued(bytes32,uint256)"
);

const CERTIFICATE_REVOKED_EVENT_SIGNATURE = ethers.id(
  "CertificateRevoked(bytes32,uint256)"
);

export const syncPendingTransactions = async () => {
  try {
    const supabase = await createClient();
    const provider = new ethers.JsonRpcProvider(
      process.env.NEXT_PUBLIC_RPC_URL
    );

    const { data: pendingTxs, error: fetchError } = await supabase
      .from("transactions")
      .select("*")
      .eq("status", "PENDING");

    if (fetchError) throw new Error(fetchError.message);

    if (!pendingTxs || pendingTxs.length === 0) {
      return { message: "Tidak ada transaksi pending." };
    }

    const results = await Promise.all(
      pendingTxs.map(async (tx) => {
        if (!tx.transaction_hash) return null;
        try {
          const receipt = await provider.getTransactionReceipt(
            tx.transaction_hash
          );
          if (!receipt) return null;
          if (receipt.status === 1) {
            const block = await provider.getBlock(receipt.blockNumber);
            const confirmedAt = new Date(block.timestamp * 1000).toISOString();
            const transactionFee = ethers.formatEther(
              receipt.gasUsed * receipt.gasPrice
            );
            const eventLog = receipt.logs.find(
              (log) =>
                log.topics[0] === CERTIFICATE_ISSUED_EVENT_SIGNATURE ||
                log.topics[0] === CERTIFICATE_REVOKED_EVENT_SIGNATURE
            );
            if (eventLog) {
              const logData = {
                transaction: { hash: eventLog.transactionHash },
                topics: [...eventLog.topics],
              };
              let type = "ISSUE";
              if (eventLog.topics[0] === CERTIFICATE_REVOKED_EVENT_SIGNATURE) {
                type = "REVOKE";
              }
              await UpdateTransaction(
                logData,
                receipt.blockNumber,
                confirmedAt,
                transactionFee,
                "CONFIRMED",
                type
              );
              return "updated";
            }
          } else if (receipt.status === 0) {
            await supabase
              .from("transactions")
              .update({ status: "FAILED" })
              .eq("id", tx.id);
            return "failed";
          }
        } catch (error) {
          console.error(
            `Error memproses tx ${tx.transaction_hash}:`,
            err.message
          );
          return "error";
        }
        return null;
      })
    );

    const updatedCount = results.filter(
      (result) => result === "updated"
    ).length;
    const failedCount = results.filter((result) => result === "failed").length;

    return {
      message: "Sinkronisasi selesai.",
      updated: updatedCount,
      failed: failedCount,
      totalChecked: pendingTxs.length,
    };
  } catch (error) {
    console.error("Sync Service Error:", error.message);
    return { error: error.message };
  }
};
