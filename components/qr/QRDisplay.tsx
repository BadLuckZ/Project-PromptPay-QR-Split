import { Download, Smartphone, User } from "lucide-react";
import { MemberQRView } from "@/types";

interface QRDisplayProps {
  member: MemberQRView;
  qrCodeDataUrl: string;
}

export function QRDisplay({ member, qrCodeDataUrl }: QRDisplayProps) {
  const timestamp = new Date().toISOString().slice(0, 16).replace(/[-:T]/g, "");

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex flex-col items-center gap-1 rounded-2xl bg-primary px-6 py-8 text-center">
        <p className="text-sm text-primary-foreground/80">
          Member: {member.member_name} - Bill {member.bill_name}
        </p>
        <p className="text-2xl font-semibold text-primary-foreground">
          ฿{member.amount.toLocaleString()}
        </p>
      </div>

      <div className="flex flex-col items-center gap-3 rounded-lg border border-border bg-card p-6">
        <img
          src={qrCodeDataUrl}
          alt={`QR Promptpay สำหรับ ${member.owner_name}`}
          className="h-56 w-56"
        />
        <p className="text-center text-xs text-muted-foreground">
          สแกน QR ด้วยแอปธนาคารหรือ PromptPay <br />
          เพื่อโอนเงินให้ {member.owner_name}
        </p>
      </div>

      <div className="flex flex-col gap-1.5">
        <p className="text-xs text-muted-foreground">โอนให้</p>
        <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-3.5">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
            <User size={16} />
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
        className="flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-medium text-primary-foreground"
      >
        <Download size={16} />
        บันทึก QR
      </a>
    </div>
  );
}
