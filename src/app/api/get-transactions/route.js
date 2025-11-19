import { getTransactions } from "@/services/transaction/getTransactions";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || 1);
    const limit = parseInt(searchParams.get("limit") || 10);
    const searchQuery = searchParams.get("search") || "";

    const { data, count, error } = await getTransactions(
      page,
      limit,
      searchQuery
    );

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const totalPages = Math.ceil(count / limit);

    return NextResponse.json(
      {
        message: "Transactions fetched successfully",
        transactions: data,
        count,
        totalPages,
        currentPage: page,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
