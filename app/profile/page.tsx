import { ProfileForm } from "@/components/profile";
import { createClient } from "@/supabase/server";
import { User } from "@/types";

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("users")
    .select("*")
    .eq("id", user!.id)
    .single();

  return (
    <div>
      <h1>โปรไฟล์</h1>
      <p>{user?.email}</p>
      <ProfileForm profile={profile as User} />
    </div>
  );
}
