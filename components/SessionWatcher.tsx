"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { createClient } from "@/supabase/client";
import { SessionExpiredDialog } from "@/components/SessionExpiredDialog";

// Check user session every 30 minutes
const POLL_INTERVAL_MS = 30 * 60 * 1000;

export function SessionWatcher() {
  const pathname = usePathname();
  const [sessionExpired, setSessionExpired] = useState(false);

  useEffect(() => {
    const supabase = createClient();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT") {
        setSessionExpired(true);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (pathname === "/login") return;

    const interval = setInterval(async () => {
      const res = await fetch("/api/v1/session", { cache: "no-store" });
      if (res.status === 401) {
        setSessionExpired(true);
        clearInterval(interval);
      }
    }, POLL_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [pathname]);

  if (pathname === "/login") return null;

  return <SessionExpiredDialog open={sessionExpired} />;
}
