import { createClient } from "@/utils/supabase/server";

export const signOut = async () => {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error);
      throw new Error("Failed to sign out.");
    }
  }
};
