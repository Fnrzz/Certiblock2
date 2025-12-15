import { ethers } from "ethers";
import contractABI from "@/contracts/certificateRegistryABI.json";
export const revokeCertificate = async (hash) => {
  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
      contractABI,
      signer
    );
    const tx = await contract.revokeCertificate(hash);
    return tx.hash;
  } catch (error) {
    if (error.message.includes("CertificateNotFound")) {
      throw new Error("Certificate not found");
    } else if (error.message.includes("NotOwner")) {
      throw new Error("You are not the owner");
    } else if (error.code === "ACTION_REJECTED") {
      throw new Error("Transaction was rejected by the user in MetaMask.");
    }
    throw new Error(
      error.reason || "An error occurred during the blockchain transaction."
    );
  }
};
