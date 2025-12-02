import { UpdateTransaction } from "@/services/transaction/updateTransaction";
import crypto from "crypto";
import { ethers } from "ethers";
import { NextResponse } from "next/server";
function isValidSignature(body, signature, signinKey) {
  const hmac = crypto.createHmac("sha256", signinKey);
  hmac.update(body, "utf8");
  const digest = hmac.digest("hex");
  return signature === digest;
}

const CERTIFICATE_ISSUED_EVENT_SIGNATURE = ethers.id(
  "CertificateIssued(bytes32,uint256)"
);

const CERTIFICATE_REVOKED_EVENT_SIGNATURE = ethers.id(
  "CertificateRevoked(bytes32,uint256)"
);

export const POST = async (req) => {
  try {
    const body = await req.text();
    const signature = req.headers.get("x-alchemy-signature");
    const signinKey = process.env.NEXT_PUBLIC_ALCHEMY_SIGNIN_KEY;

    if (!isValidSignature(body, signature, signinKey)) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const data = JSON.parse(body);
    const dataEvent = data.event?.data;
    const log = dataEvent?.block.logs[0];
    const blockNumber = dataEvent?.block.number;

    const confirmedAt = new Date(
      dataEvent?.block.timestamp * 1000
    ).toISOString();

    const transactionFee = ethers.formatEther(
      BigInt(log.transaction.gasUsed) *
        BigInt(log.transaction.effectiveGasPrice)
    );

    if (
      log.topics[0] !== CERTIFICATE_ISSUED_EVENT_SIGNATURE &&
      log.topics[0] !== CERTIFICATE_REVOKED_EVENT_SIGNATURE
    ) {
      return NextResponse.json({ message: "Event ignored." });
    }

    if (log.topics[0] == CERTIFICATE_ISSUED_EVENT_SIGNATURE) {
      const status = "CONFIRMED";
      const type = "ISSUE";
      const updateTransaction = await UpdateTransaction(
        log,
        blockNumber,
        confirmedAt,
        transactionFee,
        status,
        type
      );
      if (updateTransaction?.error) {
        throw new Error(updateTransaction.error);
      }
    } else if (log.topics[0] == CERTIFICATE_REVOKED_EVENT_SIGNATURE) {
      const status = "CONFIRMED";
      const type = "REVOKE";
      const updateTransaction = await UpdateTransaction(
        log,
        blockNumber,
        confirmedAt,
        transactionFee,
        status,
        type
      );
      if (updateTransaction?.error) {
        throw new Error(updateTransaction.error);
      }
    }

    return NextResponse.json(
      { message: "Transaction updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
