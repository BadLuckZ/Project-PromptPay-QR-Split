"use client";

import { Copy, Check } from "lucide-react";
import { cn, getInitials } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Member } from "@/types";

interface BillDashboardCardProps {
  member: Member;
  accentIndex?: number;
  copied: boolean;
  disabled: boolean;
  onCopyLink: () => void;
  onTogglePaid: () => void;
}

export function BillDashboardCard({
  member,
  copied,
  disabled,
  onCopyLink,
  onTogglePaid,
}: BillDashboardCardProps) {
  return (
    <li className="flex min-h-12 items-center gap-3 border-b border-dotted border-border-strong py-2 last:border-b-0">
      <span
        className={cn(
          "flex size-9 shrink-0 items-center justify-center rounded-full text-sm font-medium",
          member.is_paid
            ? "bg-primary-soft text-primary"
            : "bg-warning-soft text-warning-soft-foreground",
        )}
      >
        {getInitials(member.member_name)}
      </span>

      <div className="min-w-0 flex-1">
        <p
          className={cn(
            "line-clamp-2 wrap-break-word",
            member.is_paid && "text-foreground-muted line-through",
          )}
          title={member.member_name}
        >
          {member.member_name}
        </p>
        <p className="font-mono text-sm text-foreground-muted tabular-nums">
          ฿{Number(member.amount).toLocaleString("th-TH")}
        </p>
      </div>

      {!member.is_paid && (
        <Button
          variant="ghost"
          size="icon"
          onClick={onCopyLink}
          aria-label={`คัดลอกลิงก์ ${member.member_name}`}
          className="text-foreground-muted"
        >
          {copied ? <Check /> : <Copy />}
        </Button>
      )}

      <button
        type="button"
        onClick={onTogglePaid}
        disabled={disabled}
        className={cn(
          "inline-flex min-h-(--target-min) shrink-0 cursor-pointer items-center gap-1 rounded-full border px-3 text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50",
          member.is_paid
            ? "border-transparent bg-primary-soft text-primary hover:border-primary"
            : "border-warning bg-warning-soft text-warning-soft-foreground hover:bg-surface-muted",
        )}
      >
        {member.is_paid && <Check className="size-3.5" aria-hidden="true" />}
        {member.is_paid ? "จ่ายแล้ว" : "ยังไม่จ่าย"}
      </button>
    </li>
  );
}
