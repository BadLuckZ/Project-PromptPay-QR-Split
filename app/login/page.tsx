"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Script from "next/script";

import { createClient } from "@/supabase/client";
import { ENV } from "@/lib/env";

const GOOGLE_CLIENT_ID = ENV.GOOGLE_CLIENT_ID;

async function hashNonce(nonce: string) {
  const encoded = new TextEncoder().encode(nonce);
  const hashBuffer = await crypto.subtle.digest("SHA-256", encoded);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();
  const buttonRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Prevent coming back from signing in with google
  useEffect(() => {
    function handlePageShow(event: PageTransitionEvent) {
      if (event.persisted) setIsLoading(false);
    }
    window.addEventListener("pageshow", handlePageShow);
    return () => window.removeEventListener("pageshow", handlePageShow);
  }, []);

  async function handleCredentialResponse(credential: string, nonce: string) {
    setIsLoading(true);
    setError(null);

    const { data, error: signInErr } = await supabase.auth.signInWithIdToken({
      provider: "google",
      token: credential,
      nonce,
    });

    if (signInErr || !data.user) {
      setError("เข้าสู่ระบบไม่สำเร็จ กรุณาลองใหม่อีกครั้ง");
      setIsLoading(false);
      return;
    }

    const { data: profile } = await supabase
      .from("users")
      .select("id")
      .eq("id", data.user.id)
      .single();

    router.push(profile ? "/bills" : "/profile/setup");
  }

  async function initGoogleButton() {
    if (!window.google || !buttonRef.current) return;

    const nonce = crypto.randomUUID();
    const hashedNonce = await hashNonce(nonce);

    window.google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      nonce: hashedNonce,
      use_fedcm_for_prompt: true,
      callback: (response) =>
        handleCredentialResponse(response.credential, nonce),
    });

    window.google.accounts.id.renderButton(buttonRef.current, {
      type: "standard",
      theme: "outline",
      size: "large",
      shape: "pill",
      text: "signin_with",
      locale: "th",
      width: "320",
    });
  }

  return (
    <div className="flex min-h-dvh flex-col bg-primary-dark">
      <div className="relative flex flex-8 flex-col items-center justify-center overflow-hidden bg-linear-to-b from-primary-dark to-primary px-6 pt-16 pb-24 text-primary-foreground">
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

      <div className="relative -mt-32 flex flex-1 flex-col items-center rounded-t-3xl bg-card px-6 pt-10 pb-10">
        <p className="text-sm text-muted-foreground">
          เข้าสู่ระบบเพื่อเริ่มใช้งาน
        </p>

        <div
          ref={buttonRef}
          className="mt-6 flex w-full max-w-sm justify-center"
        />

        {isLoading && (
          <p className="mt-3 text-xs text-muted-foreground">
            กำลังเข้าสู่ระบบ...
          </p>
        )}
        {error && <p className="mt-3 text-xs text-destructive">{error}</p>}

        <p className="mt-4 text-center text-xs text-muted-foreground">
          การเข้าสู่ระบบถือว่าคุณยอมรับ{" "}
          <Link href="/policy" className="text-primary underline">
            นโยบายความเป็นส่วนตัว
          </Link>
        </p>
      </div>

      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
        onLoad={initGoogleButton}
      />
    </div>
  );
}
