import { createClient } from "@/supabase/server";

export default async function BillsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div>
      <p>This is Bills Page</p>
      <p>{user?.email}</p>
    </div>
  );
}
