import Link from "next/link";
import { BillList } from "@/components/bills";
import { HeroAmount, ReceiptCard } from "@/components/receipt";
import { fetch } from "@/lib/fetch";
import { getInitials } from "@/lib/utils";
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
    <main className="flex flex-1 flex-col gap-4 px-4 py-6">
      <header className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 flex-col">
          <h1 className="text-xl leading-tight font-semibold">Bill ของฉัน</h1>
          <p className="text-sm text-foreground-muted">
            {bills.length} รายการ
          </p>
        </div>
        {profile?.display_name && (
          <Link
            href="/profile"
            aria-label="โปรไฟล์"
            className="flex size-11 shrink-0 items-center justify-center rounded-full border-2 border-foreground bg-surface font-semibold transition-colors hover:bg-surface-muted"
          >
            {getInitials(profile.display_name)}
          </Link>
        )}
      </header>
      <ReceiptCard>
        <div className="flex flex-col gap-1">
          <p className="text-sm text-foreground-muted">ยอดค้างรับทั้งหมด</p>
          <HeroAmount value={pendingAmount} />
          <p className="text-sm text-foreground-muted">
            {pendingBills.length > 0
              ? `จาก ${pendingBills.length} บิลที่ยังค้างชำระ`
              : "ไม่มีบิลค้างชำระ"}
          </p>
        </div>
      </ReceiptCard>
      <BillList bills={bills} />
    </main>
  );
}
