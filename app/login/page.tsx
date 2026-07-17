"use client";

import Image from "next/image";

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
    <div className="flex min-h-dvh flex-col bg-primary-dark">
      <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden bg-linear-to-b from-primary-dark to-primary px-6 pt-16 pb-24 text-primary-foreground">
        {/* Decorators */}
        <div className="pointer-events-none absolute -top-10 -left-14 size-40 rounded-full border border-white/5" />
        <div className="pointer-events-none absolute top-24 -right-16 size-48 rounded-full bg-white/5" />
        <div className="pointer-events-none absolute -bottom-16 -left-10 size-40 rounded-full bg-white/5" />

        <h1 className="mt-6 text-3xl font-medium text-center">
          PromptPay QR Split
        </h1>
        <p className="mt-4 text-center text-sm text-primary-foreground/80">
          แบ่งบิลง่ายๆ กับเพื่อน
          <br />
          จ่ายผ่าน QR PromptPay
        </p>
      </div>

      <div className="relative -mt-8 flex flex-col items-center rounded-t-3xl bg-card px-6 pt-10 pb-10">
        <p className="text-sm text-muted-foreground">
          เข้าสู่ระบบเพื่อเริ่มใช้งาน
        </p>

        <button
          type="button"
          onClick={signInWithGoogle}
          className="mt-6 flex w-full px-2 max-w-sm items-center justify-center gap-3 rounded-xl border border-border bg-card py-3.5 text-sm font-medium text-foreground shadow-xs transition-colors hover:bg-muted"
        >
          <Image src="/google-logo.svg" alt="" width={20} height={20} />
          เข้าสู่ระบบด้วย Google
        </button>

        {/* TODO: Consent Message */}
      </div>
    </div>
  );
}
