import { AlertCircle } from "lucide-react";
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

  const { data } = await SUPABASE.from("members")
    .select(
      "member_name, amount, bill:bills(bill_name, owner_name, promptpay_number, deleted_at)",
    )
    .eq("id", memberId)
    .single();

  const bill = Array.isArray(data?.bill) ? data.bill[0] : data?.bill;

  if (!data || !bill) {
    notFound();
  }

  if (bill.deleted_at) {
    return (
      <div className="flex flex-1 flex-col">
        <Topbar title="ชำระเงิน" />
        <div className="flex flex-1 flex-col items-center justify-center p-4">
          <div className="flex w-full max-w-sm flex-col items-center gap-3 rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
            <div className="flex size-14 items-center justify-center rounded-full bg-danger text-danger-foreground">
              <AlertCircle size={28} />
            </div>
            <p className="font-medium">บิลนี้ถูกลบแล้ว</p>
            <p className="text-sm text-muted-foreground">
              ลิงก์ชำระเงินนี้ไม่สามารถใช้งานได้อีกต่อไป
            </p>
          </div>
        </div>
      </div>
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

  const qrCodeDataUrl = await createPromptPayQRDataUrl(
    member.promptpay_number,
    member.amount,
  );

  return (
    <div className="flex flex-1 flex-col">
      <Topbar title="ชำระเงิน" />
      <div className="flex flex-1 flex-col items-center justify-center">
        <div className="w-full max-w-sm">
          <QRDisplay member={member} qrCodeDataUrl={qrCodeDataUrl} />
        </div>
      </div>
    </div>
  );
}
