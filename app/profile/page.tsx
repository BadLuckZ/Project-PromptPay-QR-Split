import { ProfileForm } from "@/components/profile";
import { createClient } from "@/supabase/server";
import { fetch } from "@/lib/fetch";
import { User } from "@/types";

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const res = await fetch("/api/v1/users/me", { cache: "no-store" });
  const profile: User | null = res.ok ? await res.json() : null;

  return <ProfileForm profile={profile as User} email={user!.email!} />;
}
