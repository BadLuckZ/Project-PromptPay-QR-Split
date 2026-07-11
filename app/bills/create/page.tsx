import { Topbar } from "@/components/Topbar";
import { BillForm } from "@/components/bills";
import { fetch } from "@/lib/fetch";
import { User } from "@/types";

export default async function CreateBillPage() {
  const res = await fetch("/api/v1/users/me", { cache: "no-store" });
  const profile: User | null = res.ok ? await res.json() : null;

  return (
    <div className="flex flex-col flex-1">
      <Topbar title="สร้าง Bill ใหม่" backHref="/bills" />
      <BillForm ownerName={profile?.display_name ?? "คุณ (เจ้าของ)"} />
    </div>
  );
}
