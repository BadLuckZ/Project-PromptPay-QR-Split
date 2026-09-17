import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { ENV } from "@/lib/env";
import { SOFT_SESSION_TIMEOUT_MS } from "@/lib/auth";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(ENV.SUPABASE_URL, ENV.SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          // Set **refreshed** cookies to browser via cookieStore
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, {
              ...options,
              httpOnly: true,
              secure: ENV.NODE_ENV !== "development",
              sameSite: "lax",
              maxAge: SOFT_SESSION_TIMEOUT_MS / 1000,
            }),
          );
        } catch {}
      },
    },
  });
}
