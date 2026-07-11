import { notFound } from "next/navigation";
import { Topbar } from "@/components/Topbar";
import { QRDisplay } from "@/components/qr";
import { SUPABASE } from "@/lib/supabase";
import { createPromptPayQRDataUrl } from "@/lib/promptpay";
import { MemberQRView } from "@/types";

interface PayPageProps {
  params: Promise<{ memberId: string }>;
}

export default async function PayPage({ params }: PayPageProps) {
  const { memberId } = await params;

  const { data } = await SUPABASE
    .from("members")
    .select(
      "member_name, amount, bill:bills(bill_name, owner_name, promptpay_number, deleted_at)",
    )
    .eq("id", memberId)
    .single();

  const bill = Array.isArray(data?.bill) ? data.bill[0] : data?.bill;

  if (!data || !bill || bill.deleted_at) {
    notFound();
  }

  const member: MemberQRView = {
    member_name: data.member_name,
    amount: Number(data.amount),
    bill_name: bill.bill_name,
    owner_name: bill.owner_name,
    promptpay_number: bill.promptpay_number,
    deleted_at: bill.deleted_at,
  };

  const qrCodeDataUrl = await createPromptPayQRDataUrl(
    member.promptpay_number,
    member.amount,
  );

  return (
    <div className="flex flex-col flex-1">
      <Topbar title="ชำระเงิน" />

      <QRDisplay member={member} qrCodeDataUrl={qrCodeDataUrl} />
    </div>
  );
}
