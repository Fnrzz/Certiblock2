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
    if (error.code === "ACTION_REJECTED") {
      throw new Error("Transaction was rejected by the user in MetaMask.");
    }
    throw new Error(
      error.message || "An error occurred during the blockchain transaction."
    );
  }
};
