"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { QrCode } from "lucide-react";

import { ReceiptCard, ReceiptDivider } from "@/components/receipt";
import { ENV } from "@/lib/env";

const GOOGLE_CLIENT_ID = ENV.GOOGLE_CLIENT_ID;
const GSI_SCRIPT_SRC = "https://accounts.google.com/gsi/client";

async function hashNonce(nonce: string) {
  const encoded = new TextEncoder().encode(nonce);
  const hashBuffer = await crypto.subtle.digest("SHA-256", encoded);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export default function LoginPage() {
  const router = useRouter();
  const buttonRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCredentialResponse(credential: string, nonce: string) {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/v1/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credential, nonce }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "เข้าสู่ระบบไม่สำเร็จ กรุณาลองใหม่อีกครั้ง");
        setIsLoading(false);
        return;
      }

      router.push(data.redirectTo);
    } catch {
      setError("เข้าสู่ระบบไม่สำเร็จ กรุณาลองใหม่อีกครั้ง");
      setIsLoading(false);
    }
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
      width: String(Math.min(320, buttonRef.current.clientWidth)),
    });
  }

  // Prevent coming back from signing in with google
  useEffect(() => {
    function handlePageShow(event: PageTransitionEvent) {
      if (event.persisted) setIsLoading(false);
    }
    window.addEventListener("pageshow", handlePageShow);
    return () => window.removeEventListener("pageshow", handlePageShow);
  }, []);

  useEffect(() => {
    if (window.google) {
      initGoogleButton();
      return;
    }

    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${GSI_SCRIPT_SRC}"]`,
    );

    if (existing) {
      existing.addEventListener("load", initGoogleButton);
      return () => existing.removeEventListener("load", initGoogleButton);
    }

    const script = document.createElement("script");
    script.src = GSI_SCRIPT_SRC;
    script.async = true;
    script.addEventListener("load", initGoogleButton);
    document.body.appendChild(script);

    return () => script.removeEventListener("load", initGoogleButton);
  }, []);

  return (
    <main className="flex min-h-dvh flex-col px-4 py-8">
      <div className="flex flex-1 flex-col items-center justify-center gap-8">
        <div aria-hidden="true" className="w-56 -rotate-3">
          <ReceiptCard>
            <p className="text-center font-mono text-xs tracking-widest text-foreground-muted">
              PROMPTPAY QR SPLIT
            </p>
            <p className="font-semibold">หมูกระทะ</p>
            <ReceiptDivider />
            <div className="flex items-baseline justify-between">
              <span className="text-xs text-foreground-muted">
                ยอดที่ต้องจ่าย
              </span>
              <span className="font-mono text-xl font-medium">฿245</span>
            </div>
            <ReceiptDivider />
            <QrCode className="size-14 self-center" />
          </ReceiptCard>
        </div>

        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-xl leading-tight font-semibold">
            PromptPay QR Split
          </h1>
          <p className="text-foreground-muted">
            แบ่งบิลง่ายๆ
            <br />
            จ่ายผ่าน QR PromptPay
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4">
        <p className="text-sm text-foreground-muted">
          เข้าสู่ระบบเพื่อเริ่มใช้งาน
        </p>

        <div
          ref={buttonRef}
          className="flex min-h-11 w-full max-w-sm justify-center"
        />

        {isLoading && (
          <p className="text-sm text-foreground-muted">กำลังเข้าสู่ระบบ...</p>
        )}
        {error && (
          <p role="alert" className="text-sm text-danger">
            {error}
          </p>
        )}

        <p className="text-center text-xs text-foreground-muted">
          การเข้าสู่ระบบถือว่าคุณยอมรับ{" "}
          <Link
            href="/policy"
            className="text-primary underline hover:text-primary-hover"
          >
            นโยบายความเป็นส่วนตัว
          </Link>
        </p>
      </div>
    </main>
  );
}
