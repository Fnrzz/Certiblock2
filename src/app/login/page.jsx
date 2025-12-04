import SignInForm from "@/components/auth/SignInForm";
import { headers } from "next/headers";

const page = async () => {
  const nonce = (await headers()).get("x-nonce");
  return <SignInForm nonce={nonce} />;
};

export default page;
