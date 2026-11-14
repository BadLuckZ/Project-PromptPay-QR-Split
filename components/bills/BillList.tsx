"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { BillListCard } from "@/components/bills/BillListCard";
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
      <div className="px-4 pt-1 pb-4 flex flex-col gap-3.5 shrink-0">
        <Button
          className="w-full"
          nativeButton={false}
          render={<Link href="/bills/create" />}
        >
          <Plus size={16} /> สร้าง Bill ใหม่
        </Button>

        <div className="flex gap-1 rounded-lg bg-muted p-1">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => setFilter(f.value)}
              aria-pressed={filter === f.value}
              className={cn(
                "flex-1 min-h-9 rounded-md px-3 text-sm cursor-pointer whitespace-nowrap transition-colors",
                filter === f.value
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-4 flex flex-col gap-3">
        {filtered.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground pt-12">
            ไม่มี Bill ในหมวดนี้
          </p>
        ) : (
          filtered.map((bill) => <BillListCard key={bill.id} bill={bill} />)
        )}
      </div>
    </div>
  );
}
