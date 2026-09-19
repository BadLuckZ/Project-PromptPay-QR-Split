import Link from "next/link";
import { Users, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Bill } from "@/types";

const ACCENT_BORDERS = [
  "border-l-chart-1",
  "border-l-chart-2",
  "border-l-chart-3",
  "border-l-chart-4",
  "border-l-chart-5",
];

interface BillListCardProps {
  bill: Bill;
  accentIndex?: number;
}

const STATUS_STYLES: Record<"closed" | "paid" | "pending", string> = {
  closed: "bg-muted text-muted-foreground",
  paid: "bg-success text-success-foreground",
  pending: "bg-warning text-warning-foreground",
};

export function BillListCard({ bill, accentIndex = 0 }: BillListCardProps) {
  const isClosed = bill.closed_at !== null;
  const isPaid = bill.memberCount > 0 && bill.paidCount >= bill.memberCount;
  const pendingCount = bill.memberCount - bill.paidCount;

  const status = isClosed ? "closed" : isPaid ? "paid" : "pending";
  const statusLabel = isClosed
    ? "ปิดแล้ว"
    : isPaid
      ? "ชำระครบแล้ว"
      : `ค้างชำระ ${pendingCount} คน`;

  return (
    <Link
      href={`/bills/${bill.id}`}
      className={cn(
        "flex flex-wrap items-center justify-between gap-x-4 gap-y-2 rounded-lg border border-l-4 border-border bg-card p-4",
        ACCENT_BORDERS[accentIndex % ACCENT_BORDERS.length],
      )}
    >
      <div className="flex flex-col gap-1.5 min-w-32 flex-1">
        <p className="text-sm font-medium line-clamp-2 wrap-break-word">
          {bill.bill_name}
        </p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground whitespace-nowrap">
          <span className="inline-flex items-center gap-1">
            <Users size={12} />
            {bill.memberCount} คน
          </span>
          <span>฿{bill.totalAmount.toLocaleString()}</span>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0 ml-auto">
        <span
          className={cn(
            "text-xs rounded-full px-2.5 py-1 whitespace-nowrap",
            STATUS_STYLES[status],
          )}
        >
          {statusLabel}
        </span>
        <ChevronRight size={16} className="text-muted-foreground" />
      </div>
    </Link>
  );
}
