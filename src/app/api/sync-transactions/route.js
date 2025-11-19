import { syncPendingTransactions } from "@/services/transaction/syncTransactions";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const result = await syncPendingTransactions();

    if (result.error) {
      throw new Error(result.error);
    }

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
