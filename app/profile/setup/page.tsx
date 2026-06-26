"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/supabase/client";
import { useRouter } from "next/navigation";

export default function ProfileSetupPage() {
  const [displayName, setDisplayName] = useState("");
  const [promptpayNumber, setPromptpayNumber] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      setEmail(user?.email ?? "");
    });
  }, []);

  async function handleSubmit() {
    if (!displayName) return;
    if (!promptpayNumber) return;

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

      <div>
        <input
          placeholder="ชื่อที่แสดง"
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          required
        />
        <input
          placeholder="เบอร์ PromptPay"
          type="tel"
          value={promptpayNumber}
          onChange={(e) => setPromptpayNumber(e.target.value)}
          required
        />
        <button onClick={handleSubmit}>บันทึก</button>
      </div>
    </div>
  );
}
