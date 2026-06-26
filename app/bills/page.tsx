import { BillCard } from "@/components/bills";
import { createClient } from "@/supabase/server";
import { Bill } from "@/types";

export default async function BillsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data } = await supabase
    .from("bills")
    .select("*")
    .eq("user_id", user!.id)
    .is("deleted_at", null)
    .order("created_at", { ascending: false });

  const bills = data as Bill[] | null;

  return (
    <div>
      <h1>Bill ของฉัน</h1>
      <p>{user?.email}</p>
      <p>จำนวน bill: {bills?.length ?? 0}</p>

      <hr />

      {bills?.map((bill) => (
        <BillCard key={bill.id} bill={bill} />
      ))}
    </div>
  );
}
