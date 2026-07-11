"use client";

import { ReactNode } from "react";
import { Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const AVATAR_COLORS = [
  "bg-warning text-warning-foreground",
  "bg-success text-success-foreground",
];

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/);
  return parts.length > 1 ? parts[0][0] + parts[1][0] : name.slice(0, 2);
}

interface BillFormCardProps {
  name: string;
  isOwner?: boolean;
  accentIndex?: number;
  meta?: string;
  trailing?: ReactNode;
  onRemove?: () => void;
  className?: string;
}

export function BillFormCard({
  name,
  isOwner = false,
  accentIndex = 0,
  meta,
  trailing,
  onRemove,
  className,
}: BillFormCardProps) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <Avatar>
        <AvatarFallback
          className={
            isOwner
              ? "bg-success text-success-foreground"
              : AVATAR_COLORS[accentIndex % AVATAR_COLORS.length]
          }
        >
          {getInitials(name)}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <p className={cn("text-sm", isOwner && "font-medium")}>
          {name}
          {isOwner && " (ตัวเอง)"}
        </p>
        {meta && <p className="text-xs text-muted-foreground">{meta}</p>}
      </div>
      {trailing}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="text-destructive p-1 cursor-pointer"
          aria-label="ลบผู้เข้าร่วม"
        >
          <Trash2 size={14} />
        </button>
      )}
    </div>
  );
}
