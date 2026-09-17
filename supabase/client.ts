import { createBrowserClient } from "@supabase/ssr";
import { ENV } from "@/lib/env";

export function createClient() {
  return createBrowserClient(ENV.SUPABASE_URL, ENV.SUPABASE_ANON_KEY, {
    cookieOptions: {
      sameSite: "lax",
      secure: ENV.NODE_ENV !== "development",
    },
  });
}
