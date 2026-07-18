"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { createClient } from "@/supabase/client";
import { SessionExpiredDialog } from "@/components/SessionExpiredDialog";

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

  if (pathname === "/login") return null;

  return <SessionExpiredDialog open={sessionExpired} />;
}
