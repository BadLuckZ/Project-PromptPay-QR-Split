import Link from "next/link";
import { Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { Bill } from "@/types";

interface BillListCardProps {
  bill: Bill;
}

const STATUS_STYLES: Record<"closed" | "paid" | "pending", string> = {
  closed: "bg-muted text-muted-foreground",
  paid: "bg-success text-success-foreground",
  pending: "bg-warning text-warning-foreground",
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
      className="flex flex-col gap-3 rounded-xl bg-card p-4 shadow-card"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1 min-w-0 flex-1">
          <p className="text-base font-medium line-clamp-2 wrap-break-word">
            {bill.bill_name}
          </p>
          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
            <Users size={12} />
            {bill.memberCount} คน
          </span>
        </div>
        <p className="shrink-0 text-lg font-semibold tabular-nums">
          ฿{bill.totalAmount.toLocaleString()}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div
          role="progressbar"
          aria-label={`จ่ายแล้ว ${bill.paidCount} จาก ${bill.memberCount} คน`}
          aria-valuemin={0}
          aria-valuemax={bill.memberCount}
          aria-valuenow={bill.paidCount}
          className="h-1.5 flex-1 rounded-full bg-muted"
        >
          <div
            className={cn(
              "h-full rounded-full",
              isClosed ? "bg-muted-foreground/40" : "bg-primary",
            )}
            style={{ width: `${paidPct}%` }}
          />
        </div>
        <span
          className={cn(
            "text-xs rounded-full px-2.5 py-1 whitespace-nowrap",
            STATUS_STYLES[status],
          )}
        >
          {statusLabel}
        </span>
      </div>
    </Link>
  );
}
