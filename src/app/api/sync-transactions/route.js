import { syncPendingTransactions } from "@/services/transaction/syncTransactions";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    if (
      req.headers.get("Authorization") !==
      `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`
    ) {
      return NextResponse.json({ error: "Invalid API key" }, { status: 401 });
    }

    const result = await syncPendingTransactions();

    if (result.error) {
      throw new Error(result.error);
    }

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
