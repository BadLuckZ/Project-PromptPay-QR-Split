import { Topbar } from "@/components/Topbar";
import { CreateBillForm } from "@/components/bills";
import { createClient } from "@/supabase/server";

export default async function CreateBillPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("users")
    .select("display_name")
    .eq("id", user!.id)
    .single();

  return (
    <div className="flex flex-col flex-1">
      <Topbar title="สร้าง Bill ใหม่" backHref="/bills" />
      <CreateBillForm ownerName={profile?.display_name ?? "คุณ (เจ้าของ)"} />
    </div>
  );
}
