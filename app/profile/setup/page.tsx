import { ProfileSetupForm } from "@/components/profile/setup";
import { createClient } from "@/supabase/server";
import { redirect } from "next/navigation";

export default async function ProfileSetupPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("users")
    .select("id")
    .eq("id", user!.id)
    .single();

  // Block users who have profile
  if (profile) {
    redirect("/bills");
  }

  return (
    <div>
      <h1>ตั้งค่าโปรไฟล์</h1>
      <p>{user?.email}</p>
      <ProfileSetupForm />
    </div>
  );
}
