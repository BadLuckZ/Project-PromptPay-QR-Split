"use client";

import { Copy, Check } from "lucide-react";
import { cn, getInitials } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
    <div
      className={cn(
        "flex justify-between items-center gap-2 p-3",
        member.is_paid && "opacity-50",
      )}
    >
      <div className="flex gap-2 items-center min-w-0">
        <Avatar className="shrink-0">
          <AvatarFallback
            className={
              member.is_paid
                ? "bg-success text-success-foreground"
                : "bg-warning text-warning-foreground"
            }
          >
            {getInitials(member.member_name)}
          </AvatarFallback>
        </Avatar>

        {/* Name */}
        <div className="flex-1 min-w-0">
          <p
            className={cn(
              "text-sm line-clamp-2",
              member.is_paid && "line-through",
            )}
            title={member.member_name}
          >
            {member.member_name}
          </p>
          <p className="text-xs text-muted-foreground">
            ฿{Number(member.amount).toLocaleString()}
          </p>
        </div>
      </div>

      <div className="flex gap-1 items-center shrink-0">
        {!member.is_paid && (
          <button
            type="button"
            onClick={onCopyLink}
            className="p-1.5 text-muted-foreground cursor-pointer"
            aria-label={`คัดลอกลิงก์ ${member.member_name}`}
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
          </button>
        )}

        <button
          type="button"
          onClick={onTogglePaid}
          disabled={disabled}
          className={cn(
            "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium cursor-pointer shrink-0 shadow-sm active:scale-95 transition-transform disabled:pointer-events-none disabled:opacity-60",
            member.is_paid
              ? "bg-success text-success-foreground"
              : "bg-warning border border-warning-border text-warning-foreground",
          )}
        >
          {member.is_paid && <Check size={12} />}
          {member.is_paid ? "จ่ายแล้ว" : "ยังไม่จ่าย"}
        </button>
      </div>
    </div>
  );
}
