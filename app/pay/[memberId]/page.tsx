import { AlertCircle, Lock } from "lucide-react";
import { notFound } from "next/navigation";
import { PayReceipt } from "@/components/pay";
import { StateReceipt } from "@/components/receipt";
import { SUPABASE } from "@/lib/supabase";
import { createPromptPayQRDataUrl } from "@/lib/promptpay";
import { MemberQRView } from "@/types";

interface PayPageProps {
  params: Promise<{ memberId: string }>;
}

interface MemberPaymentInfo {
  member_name: string;
  amount: number;
  bill_name: string;
  owner_name: string;
  promptpay_number: string;
  deleted_at: string | null;
  closed_at: string | null;
  is_paid: boolean;
}

export default async function PayPage({ params }: PayPageProps) {
  const { memberId } = await params;

  const { data } = await SUPABASE.rpc("get_member_payment_info", {
    p_member_id: memberId,
  }).maybeSingle<MemberPaymentInfo>();

  if (!data) {
    notFound();
  }

  const bill = data;

  if (bill.deleted_at) {
    return (
      <StateReceipt
        subtitle="ใบเสร็จหารบิล"
        icon={AlertCircle}
        tone="danger"
        billName={bill.bill_name}
        title="บิลนี้ถูกลบแล้ว"
        description="การชำระเงินในบิลนี้ไม่สามารถใช้งานได้อีกต่อไป"
      />
    );
  }

  if (bill.closed_at) {
    return (
      <StateReceipt
        subtitle="ใบเสร็จหารบิล"
        icon={Lock}
        tone="neutral"
        billName={bill.bill_name}
        title="บิลนี้ปิดรับชำระแล้ว"
        description="เจ้าของบิลปิดการรับชำระเงินในบิลนี้แล้ว"
      />
    );
  }

  const member: MemberQRView = {
    member_name: data.member_name,
    amount: Number(data.amount),
    bill_name: bill.bill_name,
    owner_name: bill.owner_name,
    promptpay_number: bill.promptpay_number,
    deleted_at: bill.deleted_at,
  };

  if (bill.is_paid) {
    return <PayReceipt member={member} />;
  }

  const qrCodeDataUrl = await createPromptPayQRDataUrl(
    member.promptpay_number,
    member.amount,
  );

  return <PayReceipt member={member} qrCodeDataUrl={qrCodeDataUrl} />;
}
