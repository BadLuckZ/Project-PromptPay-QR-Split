import { BillList } from "@/components/bills";
import { Topbar } from "@/components/Topbar";
import { fetch } from "@/lib/fetch";
import { Bill } from "@/types";

export default async function BillsPage() {
  const res = await fetch("/api/v1/bills", { cache: "no-store" });
  const bills: Bill[] = res.ok ? await res.json() : [];

  return (
    <div className="flex flex-col flex-1">
      <Topbar title="Bill ของฉัน" subtitle={`${bills.length} รายการ`} />
      <BillList bills={bills} />
    </div>
  );
}
