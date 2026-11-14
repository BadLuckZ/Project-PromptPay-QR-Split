import { BackLink } from "@/components/BackLink";
import { BillForm } from "@/components/bills";
import { fetch } from "@/lib/fetch";
import { User } from "@/types";

export default async function CreateBillPage() {
  const res = await fetch("/api/v1/users/me", { cache: "no-store" });
  const profile: User | null = res.ok ? await res.json() : null;

  return (
    <main className="flex flex-1 flex-col gap-3 px-4 py-6">
      <header className="flex items-center gap-1">
        <BackLink href="/bills" />
        <h1 className="text-xl leading-tight font-semibold">สร้าง Bill ใหม่</h1>
      </header>
      <BillForm ownerName={profile?.display_name ?? "คุณ (เจ้าของ)"} />
    </main>
  );
}
