import { BillList } from "@/components/bills";
import { Topbar } from "@/components/Topbar";
import { fetch } from "@/lib/fetch";
import { Bill, User } from "@/types";

export default async function BillsPage() {
  const [billsRes, profileRes] = await Promise.all([
    fetch("/api/v1/bills", { cache: "no-store" }),
    fetch("/api/v1/users/me", { cache: "no-store" }),
  ]);
  const bills: Bill[] = billsRes.ok ? await billsRes.json() : [];
  const profile: User | null = profileRes.ok ? await profileRes.json() : null;

  return (
    <div className="flex flex-col flex-1">
      <Topbar
        title="Bill ของฉัน"
        subtitle={`${bills.length} รายการ`}
        profileName={profile?.display_name}
      />
      <BillList bills={bills} />
    </div>
  );
}
