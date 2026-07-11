"use client";

import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarBadge } from "@/components/ui/avatar";
import { Member } from "@/types";

const AVATAR_COLORS = [
  "bg-success text-success-foreground",
  "bg-warning text-warning-foreground",
];

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/);
  return parts.length > 1 ? parts[0][0] + parts[1][0] : name.slice(0, 2);
}

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
  accentIndex = 0,
  copied,
  disabled,
  onCopyLink,
  onTogglePaid,
}: BillDashboardCardProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2.5 p-3",
        member.is_paid && "opacity-50 blur-[0.3px]",
      )}
    >
      <Avatar>
        <AvatarFallback
          className={AVATAR_COLORS[accentIndex % AVATAR_COLORS.length]}
        >
          {getInitials(member.member_name)}
        </AvatarFallback>
        {member.is_paid && (
          <AvatarBadge>
            <Check size={10} />
          </AvatarBadge>
        )}
      </Avatar>
      <div className="flex-1">
        <p className={cn("text-sm", member.is_paid && "line-through")}>
          {member.member_name}
        </p>
        <p className="text-xs text-muted-foreground">
          ฿{Number(member.amount).toLocaleString()}
        </p>
      </div>
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
          "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs cursor-pointer shrink-0 disabled:pointer-events-none disabled:opacity-60",
          member.is_paid
            ? "bg-success text-success-foreground"
            : "border border-border text-muted-foreground",
        )}
      >
        {member.is_paid && <Check size={12} />}
        {member.is_paid ? "จ่ายแล้ว" : "ยังไม่จ่าย"}
      </button>
    </div>
  );
}
