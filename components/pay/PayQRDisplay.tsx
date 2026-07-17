import { Download, Smartphone } from "lucide-react";
import { getInitials } from "@/lib/utils";
import { MemberQRView } from "@/types";

interface QRDisplayProps {
  member: MemberQRView;
  qrCodeDataUrl: string;
}

export function PayQRDisplay({ member, qrCodeDataUrl }: QRDisplayProps) {
  const timestamp = new Date().toISOString().slice(0, 16).replace(/[-:T]/g, "");

  return (
    <div className="flex flex-1 flex-col">
      <div className="relative overflow-hidden bg-linear-to-b from-primary-dark to-primary px-4 pt-6 pb-16 text-primary-foreground">
        <div className="pointer-events-none absolute -top-8 -right-10 size-32 rounded-full border border-white/15" />

        <p className="flex items-center gap-1.5 text-xs text-primary-foreground/80">
          {member.bill_name}
        </p>
        <p className="mt-1 text-2xl font-semibold">{member.member_name}</p>

        <p className="mt-4 text-xs text-primary-foreground/70">
          ยอดที่ต้องชำระ
        </p>
        <p className="text-4xl font-bold">฿{member.amount.toLocaleString()}</p>
      </div>

      <div className="relative -mt-8 flex flex-1 flex-col gap-4 rounded-t-3xl bg-background px-4 pt-8 pb-6">
        <div className="flex flex-col items-center gap-3 rounded-lg border border-border bg-card p-6">
          <img
            src={qrCodeDataUrl}
            alt={`QR Promptpay สำหรับ ${member.owner_name}`}
            className="h-48 w-48"
          />

          <p className="text-center text-xs text-muted-foreground">
            สแกน QR ด้วยแอปธนาคารหรือ PromptPay <br />
            เพื่อโอนเงินให้ {member.owner_name}
          </p>
        </div>

        <div className="flex flex-col gap-1.5">
          <p className="text-xs text-muted-foreground">โอนให้</p>
          <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-3.5">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary-tint/40 text-sm font-medium text-primary-dark">
              {getInitials(member.owner_name)}
            </div>
            <div className="flex flex-col gap-0.5">
              <p className="text-sm font-medium">{member.owner_name}</p>
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                <Smartphone size={12} />
                {member.promptpay_number}
              </span>
            </div>
          </div>
        </div>

        <a
          href={qrCodeDataUrl}
          download={`${member.bill_name}_${member.member_name}_${timestamp}.png`}
          className="mt-auto flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3.5 text-sm font-medium text-primary-foreground"
        >
          <Download size={16} />
          บันทึก QR
        </a>
      </div>
    </div>
  );
}
