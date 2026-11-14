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
    <div className="flex flex-col gap-4">
      <Button
        size="lg"
        className="w-full"
        nativeButton={false}
        render={<Link href="/bills/create" />}
      >
        <Plus className="size-5" /> สร้าง Bill ใหม่
      </Button>

      <div
        role="group"
        aria-label="กรองบิล"
        className="flex gap-1 rounded-md bg-surface-muted-hover p-1"
      >
        {FILTERS.map((f) => (
          <button
            key={f.value}
            type="button"
            onClick={() => setFilter(f.value)}
            aria-pressed={filter === f.value}
            className={cn(
              "min-h-(--target-min) flex-1 cursor-pointer rounded-md px-3 text-sm whitespace-nowrap transition-colors",
              filter === f.value
                ? "bg-surface font-medium text-foreground"
                : "text-foreground-muted hover:text-foreground",
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        {filtered.length === 0 ? (
          <p className="pt-12 text-center text-sm text-foreground-muted">
            ไม่มี Bill ในหมวดนี้
          </p>
        ) : (
          filtered.map((bill) => <BillListCard key={bill.id} bill={bill} />)
        )}
      </div>
    </div>
  );
}
