"use client";

import { ReactNode } from "react";
import { Trash2 } from "lucide-react";
import { cn, getInitials } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface BillFormCardProps {
  name: string;
  isOwner?: boolean;
  meta?: string;
  trailing?: ReactNode;
  onRemove?: () => void;
  disabled?: boolean;
  className?: string;
}

export function BillFormCard({
  name,
  isOwner = false,
  meta,
  trailing,
  onRemove,
  disabled = false,
  className,
}: BillFormCardProps) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <Avatar>
        <AvatarFallback
          className={
            isOwner
              ? "bg-success text-success-foreground"
              : "bg-warning text-warning-foreground"
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
          disabled={disabled}
          className="text-destructive p-1 cursor-pointer disabled:pointer-events-none disabled:opacity-50"
          aria-label="ลบผู้เข้าร่วม"
        >
          <Trash2 size={14} />
        </button>
      )}
    </div>
  );
}
