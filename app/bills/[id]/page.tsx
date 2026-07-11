import { Topbar } from "@/components/Topbar";
import { createClient } from "@/supabase/server";

interface BillDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function BillDetailPage({ params }: BillDetailPageProps) {
  const { id } = await params;

  const supabase = await createClient();
  const { data: bill } = await supabase
    .from("bills")
    .select("bill_name")
    .eq("id", id)
    .single();

  return (
    <div className="flex flex-col flex-1">
      <Topbar title={bill?.bill_name ?? "รายละเอียด Bill"} backHref="/bills" />
      <p>Bill Name: {bill?.bill_name}</p>
    </div>
  );
}
