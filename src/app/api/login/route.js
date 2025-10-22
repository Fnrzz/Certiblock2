import { signInWithCredentials } from "@/services/auth/loginService";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const { email, password, captchaToken } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    if (!captchaToken) {
      return NextResponse.json(
        { error: "Captcha is required." },
        { status: 400 }
      );
    }

    const { error } = await signInWithCredentials(
      email,
      password,
      captchaToken
    );

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ message: "Login successful" }, { status: 200 });
  } catch (error) {
    console.error("Login API Error:", error);
    return NextResponse.json(
      { error: "An internal error occurred." },
      { status: 500 }
    );
  }
};
