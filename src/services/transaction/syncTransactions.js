import { ethers } from "ethers";
import { UpdateTransaction } from "./updateTransaction";
import { createClient } from "@/utils/supabase/server";

const CERTIFICATE_ISSUED_EVENT_SIGNATURE = ethers.id(
  "CertificateIssued(bytes32,uint256)"
);

export const syncPendingTransactions = async () => {
  try {
    const supabase = await createClient();
    const provider = new ethers.JsonRpcProvider(
      process.env.NEXT_PUBLIC_RPC_URL
    );

    let updatedCount = 0;
    let failedCount = 0;

    const { data: pendingTxs, error: fetchError } = await supabase
      .from("transactions")
      .select("*")
      .eq("status", "PENDING");

    if (fetchError) throw new Error(fetchError.message);
    if (!pendingTxs || pendingTxs.length === 0) {
      return { message: "Tidak ada transaksi pending." };
    }

    for (const tx of pendingTxs) {
      if (!tx.transaction_hash) continue;

      try {
        const receipt = await provider.getTransactionReceipt(
          tx.transaction_hash
        );

        if (receipt && receipt.status === 1) {
          const block = await provider.getBlock(receipt.blockNumber);
          const confirmedAt = new Date(block.timestamp * 1000).toISOString();
          const transactionFee = ethers.formatEther(
            receipt.gasUsed * receipt.gasPrice
          );

          const eventLog = receipt.logs.find(
            (log) => log.topics[0] === CERTIFICATE_ISSUED_EVENT_SIGNATURE
          );

          const log = {
            transaction: {
              hash: eventLog.transactionHash,
            },
            topics: [eventLog.topics[0], eventLog.topics[1]],
          };

          if (log) {
            const type = "ISSUE";
            const status = "CONFIRMED";
            await UpdateTransaction(
              log,
              receipt.blockNumber,
              confirmedAt,
              transactionFee,
              status,
              type
            );
            updatedCount++;
          }
        } else if (receipt && receipt.status === 0) {
          await supabase
            .from("transactions")
            .update({ status: "FAILED" })
            .eq("id", tx.id);
          failedCount++;
        }
      } catch (err) {
        console.error(
          `Error memproses tx ${tx.transaction_hash}:`,
          err.message
        );
      }
    }

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
