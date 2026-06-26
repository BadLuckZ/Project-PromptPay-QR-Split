"use client";

import { Button } from "@/components/ui";
import { createClient } from "@/supabase/client";

export default function LoginPage() {
  const supabase = createClient();

  async function signInWithGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  }

  return (
    <div>
      <p>Login Page</p>
      <Button onClick={signInWithGoogle}>เข้าสู่ระบบด้วย Google</Button>
    </div>
  );
}
