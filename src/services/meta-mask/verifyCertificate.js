import { ethers } from "ethers";
import contractABI from "@/contracts/certificateRegistryABI.json";
export const VerifyCertificate = async (certificateHash) => {
  try {
    const provider = new ethers.JsonRpcProvider(
      process.env.NEXT_PUBLIC_RPC_URL
    );
    const contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
      contractABI,
      provider
    );
    const result = await contract.verifyCertificate(certificateHash);
    return result;
  } catch (error) {
    throw new Error(
      error.reason || "An error occurred during the blockchain transaction."
    );
  }
};
