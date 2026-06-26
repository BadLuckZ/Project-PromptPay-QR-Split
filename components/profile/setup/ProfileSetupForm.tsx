"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function ProfileSetupForm({ email }: { email: string }) {
  const [displayName, setDisplayName] = useState("");
  const [promptpayNumber, setPromptpayNumber] = useState("");
  const router = useRouter();

  async function handleSubmit() {
    if (!displayName || !promptpayNumber) return;

    const res = await fetch("/api/users/me", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        display_name: displayName,
        promptpay_number: promptpayNumber,
      }),
    });

    if (res.ok) {
      router.push("/bills");
    }
  }

  return (
    <div>
      <h1>ตั้งค่าโปรไฟล์</h1>
      <p>{email}</p>
      <input
        placeholder="ชื่อที่แสดง"
        type="text"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
      />
      <input
        placeholder="เบอร์ PromptPay"
        type="tel"
        value={promptpayNumber}
        onChange={(e) => setPromptpayNumber(e.target.value)}
      />
      <button onClick={handleSubmit}>บันทึก</button>
    </div>
  );
}
