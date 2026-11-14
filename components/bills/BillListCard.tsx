import Link from "next/link";
import { cn } from "@/lib/utils";
import { Bill } from "@/types";

interface BillListCardProps {
  bill: Bill;
}

const STATUS_STYLES: Record<"closed" | "paid" | "pending", string> = {
  closed: "bg-surface-muted text-foreground-muted",
  paid: "bg-primary-soft text-primary",
  pending: "bg-warning-soft text-warning-soft-foreground",
};

export function BillListCard({ bill }: BillListCardProps) {
  const isClosed = bill.closed_at !== null;
  const isPaid = bill.memberCount > 0 && bill.paidCount >= bill.memberCount;
  const pendingCount = bill.memberCount - bill.paidCount;
  const paidPct =
    bill.memberCount > 0 ? (bill.paidCount / bill.memberCount) * 100 : 0;

  const status = isClosed ? "closed" : isPaid ? "paid" : "pending";
  const statusLabel = isClosed
    ? "ปิดแล้ว"
    : isPaid
      ? "ชำระครบแล้ว"
      : `ค้างชำระ ${pendingCount} คน`;

  return (
    <Link
      href={`/bills/${bill.id}`}
      className="flex flex-col rounded-sm border-2 border-transparent bg-surface p-4 transition-colors hover:border-border-strong"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 flex-1 flex-col">
          <p className="line-clamp-2 text-base font-medium wrap-break-word">
            {bill.bill_name}
          </p>
          <p className="text-sm text-foreground-muted">
            {bill.memberCount} คน
          </p>
        </div>
        <p className="shrink-0 font-mono text-lg font-medium tabular-nums">
          ฿{bill.totalAmount.toLocaleString("th-TH")}
        </p>
      </div>

      <div aria-hidden="true" className="relative -mx-4 my-3">
        <span className="absolute -top-2 -left-2 size-4 rounded-full bg-surface-muted" />
        <span className="absolute -top-2 -right-2 size-4 rounded-full bg-surface-muted" />
        <div className="mx-3 border-t-2 border-dashed border-border-strong" />
      </div>

      <div className="flex items-center gap-3">
        <div
          role="progressbar"
          aria-label={`จ่ายแล้ว ${bill.paidCount} จาก ${bill.memberCount} คน`}
          aria-valuemin={0}
          aria-valuemax={bill.memberCount}
          aria-valuenow={bill.paidCount}
          className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface-muted-hover"
        >
          <div
            className={cn(
              "h-full rounded-full",
              isClosed ? "bg-border-strong" : "bg-primary",
            )}
            style={{ width: `${paidPct}%` }}
          />
        </div>
        <span
          className={cn(
            "rounded-full px-3 py-1 text-xs font-medium whitespace-nowrap",
            STATUS_STYLES[status],
          )}
        >
          {statusLabel}
        </span>
      </div>
    </Link>
  );
}
