"use client";

import { revokeCertificate } from "@/services/meta-mask/revokeCertificate";
import { useState } from "react";

export const useRevokeCertificate = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setError] = useState(null);
  const [isSuccess, setSuccess] = useState(false);
  const [isResult, setResult] = useState(null);
  const revoke = async (file) => {
    setIsLoading(true);
    setError(null);
    setResult(null);
    try {
      // Handler FIle Upload
      const formData = new FormData();
      formData.append("file", file);
      const fileResponse = await fetch("/api/revoke-certificate", {
        method: "POST",
        body: formData,
      });
      const fileData = await fileResponse.json();
      if (!fileResponse.ok) throw new Error(fileData.error);
      const { hash: certificateHash } = fileData;

      // Revoke Certificate
      if (typeof window.ethereum === "undefined") {
        throw new Error(
          "MetaMask is not installed. Please install it to continue."
        );
      }
      const txHash = await revokeCertificate(certificateHash);

      // Confirm Transaction
      const confirmTransaction = await fetch("/api/confirm-revoke", {
        method: "POST",
        body: JSON.stringify({ transactionHash: txHash, certificateHash }),
      });
      if (!confirmTransaction.ok) throw new Error(confirmTransaction.error);
      setResult({
        revokeTransactionHash: txHash,
      });
      setSuccess(true);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setIsLoading(false);
    setError(null);
    setResult(null);
  };

  return {
    isLoading,
    isError,
    isSuccess,
    isResult,
    revoke,
    reset,
  };
};
