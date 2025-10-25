import { createClient } from "@/utils/supabase/server";

export const signInWithCredentials = async (email, password, captchaToken) => {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
    options: { captchaToken },
  });

  return { error };
};
