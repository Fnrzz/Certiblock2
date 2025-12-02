"use client";

import { issueCertificate } from "@/services/meta-mask/issueCertificate";
import { useState } from "react";

export const useIssueCertificate = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setError] = useState(null);
  const [isSuccess, setSuccess] = useState(false);
  const [isResult, setResult] = useState(null);

  const issue = async (studentData) => {
    setIsLoading(true);
    setError(null);
    setResult(null);
    try {
      // Make Draft
      const makeDraft = await fetch("/api/issue-certificate", {
        method: "POST",
        body: JSON.stringify({ studentData }),
      });
      const draftData = await makeDraft.json();
      if (!makeDraft.ok) throw new Error(draftData.error);
      const { hash, transactionId, studentDetails } = draftData.data;

      // Issue Certificate to Blockchain
      if (typeof window.ethereum === "undefined") {
        throw new Error(
          "MetaMask is not installed. Please install it to continue."
        );
      }
      const txHash = await issueCertificate(hash);

      // Confirm Transaction
      const confirmTransaction = await fetch("/api/confirm-transaction", {
        method: "POST",
        body: JSON.stringify({ transactionId, transactionHash: txHash }),
      });
      if (!confirmTransaction.ok) throw new Error(confirmTransaction.error);

      setResult({
        studentDetails,
        transactionHash: txHash,
        certificateHash: hash,
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

  return { issue, isLoading, isError, isResult, isSuccess, reset };
};
