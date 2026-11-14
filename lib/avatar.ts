import type { User } from "@supabase/supabase-js";

export function getAvatarUrl(user: User | null): string | null {
  const metadata = user?.user_metadata ?? {};
  const raw = metadata.avatar_url ?? metadata.picture;
  if (typeof raw !== "string") return null;

  try {
    const url = new URL(raw);
    const isGoogle =
      url.protocol === "https:" &&
      url.hostname.endsWith(".googleusercontent.com");
    return isGoogle ? url.href : null;
  } catch {
    return null;
  }
}
