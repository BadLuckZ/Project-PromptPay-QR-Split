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
  const pendingBills = bills.filter(
    (bill) => bill.closed_at === null && bill.pendingAmount > 0,
  );
  const pendingAmount = pendingBills.reduce(
    (sum, bill) => sum + bill.pendingAmount,
    0,
  );

  return (
    <div className="flex flex-col flex-1">
      <Topbar
        title="Bill ของฉัน"
        subtitle={`${bills.length} รายการ`}
        profileName={profile?.display_name}
      >
        <p className="text-xs text-primary-foreground/90">ยอดค้างรับทั้งหมด</p>
        <p className="text-4xl font-bold tabular-nums">
          ฿{pendingAmount.toLocaleString()}
        </p>
        <p className="mt-1 text-xs text-primary-foreground/90">
          {pendingBills.length > 0
            ? `จาก ${pendingBills.length} บิลที่ยังค้างชำระ`
            : "ไม่มีบิลค้างชำระ"}
        </p>
      </Topbar>
      <BillList bills={bills} />
    </div>
  );
}
