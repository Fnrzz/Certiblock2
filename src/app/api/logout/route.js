import { signOut } from "@/services/auth/signOutService";
import { NextResponse } from "next/server";

export const POST = async () => {
  try {
    await signOut();
    return NextResponse.json({ message: "Logout successful" });
  } catch (error) {
    console.error("Error sign out:", error);
    return NextResponse.json(
      { error: "An internal error occurred." },
      { status: 500 }
    );
  }
};
