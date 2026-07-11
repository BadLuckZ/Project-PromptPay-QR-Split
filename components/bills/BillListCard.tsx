import Link from "next/link";
import { Users, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Bill } from "@/types";

const ACCENT_BORDERS = [
  "border-l-chart-5",
  "border-l-chart-1",
  "border-l-chart-2",
  "border-l-chart-4",
];

interface BillListCardProps {
  bill: Bill;
  accentIndex?: number;
}

export function BillListCard({ bill, accentIndex = 0 }: BillListCardProps) {
  const isPaid = bill.memberCount > 0 && bill.paidCount >= bill.memberCount;
  const pendingCount = bill.memberCount - bill.paidCount;

  return (
    <Link
      href={`/bills/${bill.id}`}
      className={cn(
        "flex items-center justify-between gap-3 rounded-lg border border-l-4 border-border bg-card p-3.5",
        ACCENT_BORDERS[accentIndex % ACCENT_BORDERS.length],
      )}
    >
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium">{bill.bill_name}</p>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Users size={12} />
            {bill.memberCount} คน
          </span>
          <span>฿{bill.totalAmount.toLocaleString()}</span>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <span
          className={cn(
            "text-xs rounded-full px-2.5 py-1",
            isPaid
              ? "bg-success text-success-foreground"
              : "bg-warning text-warning-foreground",
          )}
        >
          {isPaid ? "ชำระครบแล้ว" : `ค้างชำระ ${pendingCount} คน`}
        </span>
        <ChevronRight size={16} className="text-muted-foreground" />
      </div>
    </Link>
  );
}
