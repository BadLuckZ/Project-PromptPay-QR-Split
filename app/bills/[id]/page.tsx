import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { Topbar } from "@/components/Topbar";
import { BillDashboard } from "@/components/bills";
import { createClient } from "@/supabase/server";
import { Member } from "@/types";

interface BillDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function BillDetailPage({ params }: BillDetailPageProps) {
  const { id } = await params;

  const supabase = await createClient();
  const [{ data: bill }, { data: membersData }] = await Promise.all([
    supabase
      .from("bills")
      .select("id, bill_name, owner_name")
      .eq("id", id)
      .single(),
    supabase
      .from("members")
      .select("id, bill_id, member_name, amount, is_paid, created_at")
      .eq("bill_id", id)
      .order("created_at", { ascending: true }),
  ]);

  if (!bill) {
    notFound();
  }

  const members = (membersData as Member[]) ?? [];

  const headersList = await headers();
  const host = headersList.get("host");
  const protocol =
    headersList.get("x-forwarded-proto") ??
    (process.env.NODE_ENV === "development" ? "http" : "https");
  const origin = `${protocol}://${host}`;

  return (
    <div className="flex flex-col flex-1">
      <Topbar title={bill.bill_name} backHref="/bills" />
      <BillDashboard bill={bill} members={members} origin={origin} />
    </div>
  );
}
