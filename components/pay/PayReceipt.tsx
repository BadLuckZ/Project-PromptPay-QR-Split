import {
  LeaderRow,
  ReceiptBrand,
  ReceiptCard,
  ReceiptDivider,
} from "@/components/receipt";
import { formatPromptPayNumber } from "@/lib/promptpay";
import { MemberQRView } from "@/types";
import { SaveQRButton } from "./SaveQRButton";

const amountFormatter = new Intl.NumberFormat("th-TH", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

interface PayReceiptProps {
  member: MemberQRView;
  qrCodeDataUrl?: string;
}

export function PayReceipt({ member, qrCodeDataUrl }: PayReceiptProps) {
  const [integer, fraction] = amountFormatter.format(member.amount).split(".");

  return (
    <main className="flex flex-1 flex-col justify-center gap-4 px-4 py-6">
      <ReceiptCard>
        <ReceiptBrand subtitle="ใบเสร็จหารบิล" />
        <ReceiptDivider />
        <div className="flex flex-col">
          <p className="text-xs text-foreground-muted">บิล</p>
          <h1 className="text-xl leading-tight font-semibold wrap-break-word">
            {member.bill_name}
          </h1>
          <p className="text-sm text-foreground-muted">
            ส่วนของ {member.member_name}
          </p>
        </div>
        <ReceiptDivider />
        <div className="flex items-baseline justify-between gap-4">
          <span className="text-sm">
            {qrCodeDataUrl ? "ยอดที่ต้องจ่าย" : "ยอดที่จ่ายแล้ว"}
          </span>
          <p className="font-medium whitespace-nowrap">
            <span className="me-1 text-lg">฿</span>
            <span className="font-mono text-2xl tracking-tight tabular-nums">
              {integer}
            </span>
            <span className="font-mono text-lg text-foreground-muted tabular-nums">
              .{fraction}
            </span>
          </p>
        </div>
        <ReceiptDivider />
        {qrCodeDataUrl ? (
          <div className="flex flex-col items-center gap-2">
            <p className="text-xs text-foreground-muted">
              สแกนด้วยแอปธนาคารเพื่อโอน
            </p>
            <div className="rounded-sm border-2 border-border-strong bg-surface p-2">
              <img
                src={qrCodeDataUrl}
                alt={`QR Promptpay สำหรับ ${member.owner_name}`}
                className="block size-48"
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 py-4">
            <p className="-rotate-6 rounded-md border-4 border-double border-primary px-6 py-2 text-2xl font-semibold tracking-wide text-primary">
              จ่ายแล้ว
            </p>
          </div>
        )}
        <ReceiptDivider />
        <dl className="flex flex-col gap-2">
          {qrCodeDataUrl ? (
            <>
              <LeaderRow label="โอนให้">{member.owner_name}</LeaderRow>
              <LeaderRow label="PromptPay" valueClassName="font-mono tabular-nums">
                {formatPromptPayNumber(member.promptpay_number)}
              </LeaderRow>
            </>
          ) : (
            <LeaderRow label="ผู้รับเงิน">{member.owner_name}</LeaderRow>
          )}
        </dl>
      </ReceiptCard>
      {qrCodeDataUrl && (
        <SaveQRButton
          qrCodeDataUrl={qrCodeDataUrl}
          fileName={`${member.bill_name}_${member.member_name}_${new Date()
            .toISOString()
            .slice(0, 16)
            .replace(/[-:T]/g, "")}.png`}
        />
      )}
    </main>
  );
}
