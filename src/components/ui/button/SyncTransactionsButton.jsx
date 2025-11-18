"use client";
import { useState } from "react";
import Button from "@/components/ui/button/Button";

export default function SyncTransactionsButton({ onComplete }) {
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSync = async () => {
    setIsSyncing(true);
    try {
      const res = await fetch("/api/sync-transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
        },
      });
      const data = await res.json();

      if (data.error) {
        console.log(`Error: ${data.error}`);
      }
    } catch (err) {
      console.log(`Error: ${err.message}`);
    } finally {
      setIsSyncing(false);
      onComplete();
    }
  };

  return (
    <div>
      <Button size="sm" onClick={handleSync} disabled={isSyncing}>
        {isSyncing ? "Syncing..." : "Refresh Transactions"}
      </Button>
    </div>
  );
}
