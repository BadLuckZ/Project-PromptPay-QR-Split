"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Users, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Bill } from "@/types";

interface BillList {
  bills: Bill[];
}

type Filter = "all" | "paid" | "pending";

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "ทั้งหมด" },
  { value: "paid", label: "ชำระครบ" },
  { value: "pending", label: "ค้างชำระ" },
];

const ACCENT_BORDERS = [
  "border-l-chart-5",
  "border-l-chart-1",
  "border-l-chart-2",
  "border-l-chart-4",
];

export function BillList({ bills }: BillList) {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = bills.filter((bill) => {
    const isPaid = bill.memberCount > 0 && bill.paidCount >= bill.memberCount;
    if (filter === "paid") return isPaid;
    if (filter === "pending") return !isPaid;
    return true;
  });

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <div className="p-4 pb-2 flex flex-col gap-2.5 shrink-0">
        <Button className="w-full" render={<Link href="/bills/create" />}>
          <Plus size={16} /> สร้าง bill ใหม่
        </Button>

        <div className="flex gap-1.5">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => setFilter(f.value)}
              className={cn(
                "text-xs px-3.5 py-1.5 rounded-full border cursor-pointer",
                filter === f.value
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card text-muted-foreground border-border",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-4 flex flex-col gap-2.5">
        {filtered.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground pt-10">
            ไม่มี bill ในหมวดนี้
          </p>
        ) : (
          filtered.map((bill, i) => {
            const isPaid =
              bill.memberCount > 0 && bill.paidCount >= bill.memberCount;
            const pendingCount = bill.memberCount - bill.paidCount;

            return (
              <Link
                key={bill.id}
                href={`/bills/${bill.id}`}
                className={cn(
                  "flex items-center justify-between gap-3 rounded-lg border border-l-4 border-border bg-card p-3.5",
                  ACCENT_BORDERS[i % ACCENT_BORDERS.length],
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
          })
        )}
      </div>
    </div>
  );
}
