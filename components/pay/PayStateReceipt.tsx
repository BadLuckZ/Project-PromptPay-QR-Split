import type { LucideIcon } from "lucide-react";
import { ReceiptBrand, ReceiptCard, ReceiptDivider } from "@/components/receipt";
import { cn } from "@/lib/utils";

interface PayStateReceiptProps {
  icon: LucideIcon;
  tone: "danger" | "neutral";
  title: string;
  description: string;
  billName?: string;
  children?: React.ReactNode;
}

export function PayStateReceipt({
  icon: Icon,
  tone,
  title,
  description,
  billName,
  children,
}: PayStateReceiptProps) {
  return (
    <main className="flex flex-1 flex-col justify-center px-4 py-6">
      <ReceiptCard>
        <ReceiptBrand subtitle="ใบเสร็จหารบิล" />
        <ReceiptDivider />
        {billName && (
          <>
            <div className="flex flex-col">
              <p className="text-xs text-foreground-muted">บิล</p>
              <p className="text-xl leading-tight font-semibold wrap-break-word">
                {billName}
              </p>
            </div>
            <ReceiptDivider />
          </>
        )}
        <div className="flex flex-col items-center gap-2 py-4 text-center">
          <span
            className={cn(
              "flex size-12 items-center justify-center rounded-full",
              tone === "danger"
                ? "bg-danger-soft text-danger-soft-foreground"
                : "bg-surface-muted text-foreground-muted",
            )}
          >
            <Icon className="size-6" aria-hidden="true" />
          </span>
          <h1 className="text-lg leading-tight font-semibold">{title}</h1>
          <p className="text-sm text-foreground-muted">{description}</p>
        </div>
        {children}
      </ReceiptCard>
    </main>
  );
}
