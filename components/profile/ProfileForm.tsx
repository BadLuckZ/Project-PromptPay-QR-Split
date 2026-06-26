"use client";

import { useState } from "react";
import { createClient } from "@/supabase/client";
import { useRouter } from "next/navigation";
import { User } from "@/types";

export function ProfileForm({ profile }: { profile: User }) {
  const [displayName, setDisplayName] = useState(profile.display_name);
  const [promptpayNumber, setPromptpayNumber] = useState(
    profile.promptpay_number,
  );
  const router = useRouter();

  async function handleSave() {
    const res = await fetch("/api/users/me", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        display_name: displayName,
        promptpay_number: promptpayNumber,
      }),
    });

    if (res.ok) {
      router.refresh();
    }
  }

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
  }

  return (
    <div>
      <input
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
      />
      <input
        value={promptpayNumber}
        onChange={(e) => setPromptpayNumber(e.target.value)}
      />
      <button onClick={handleSave}>บันทึก</button>
      <button onClick={handleLogout}>ออกจากระบบ</button>
    </div>
  );
}
