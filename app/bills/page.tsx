import { BillList } from "@/components/bills";
import { Topbar } from "@/components/Topbar";

import { createClient } from "@/supabase/server";
import { Bill } from "@/types";

export default async function BillsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: billsData } = await supabase
    .from("bills")
    .select("*")
    .eq("user_id", user!.id)
    .is("deleted_at", null)
    .order("created_at", { ascending: false });

  const bills = (billsData as Bill[]) ?? [];
  const billIds = bills.map((bill) => bill.id);

  const { data: membersData } = billIds.length
    ? await supabase
        .from("members")
        .select("bill_id, amount, is_paid")
        .in("bill_id", billIds)
    : { data: [] };

  const members =
    (membersData as { bill_id: string; amount: number; is_paid: boolean }[]) ??
    [];

  const filteredBills: Bill[] = bills.map((bill) => {
    const billMembers = members.filter((m) => m.bill_id === bill.id);
    return {
      ...bill,
      memberCount: billMembers.length,
      paidCount: billMembers.filter((m) => m.is_paid).length,
      totalAmount: billMembers.reduce((sum, m) => sum + Number(m.amount), 0),
    };
  });

  return (
    <div className="flex flex-col flex-1">
      <Topbar title="Bill ของฉัน" subtitle={`${bills.length} รายการ`} />
      <BillList bills={filteredBills} />
    </div>
  );
}
