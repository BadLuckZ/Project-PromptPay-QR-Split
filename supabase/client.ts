import { createBrowserClient } from "@supabase/ssr";
import { ENV } from "@/lib/env";
import { SOFT_SESSION_TIMEOUT_MS } from "@/lib/auth";

export function createClient() {
  return createBrowserClient(ENV.SUPABASE_URL, ENV.SUPABASE_ANON_KEY, {
    cookieOptions: {
      maxAge: SOFT_SESSION_TIMEOUT_MS / 1000,
      sameSite: "lax",
      secure: ENV.NODE_ENV !== "development",
    },
  });
}
