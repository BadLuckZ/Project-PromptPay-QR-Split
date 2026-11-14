"use client";

import { ReactNode } from "react";
import { X } from "lucide-react";
import { cn, getInitials } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface BillFormCardProps {
  name: string;
  isOwner?: boolean;
  trailing?: ReactNode;
  onRemove?: () => void;
  disabled?: boolean;
}

export function BillFormCard({
  name,
  isOwner = false,
  trailing,
  onRemove,
  disabled = false,
}: BillFormCardProps) {
  return (
    <li className="flex min-h-12 items-center gap-3 py-1">
      <span
        className={cn(
          "flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-medium",
          isOwner
            ? "bg-primary-soft text-primary"
            : "bg-surface-muted text-foreground-muted",
        )}
      >
        {getInitials(name)}
      </span>
      <p className="min-w-0 flex-1 wrap-break-word">
        {name}
        {isOwner && <span className="text-foreground-muted"> (ตัวเอง)</span>}
      </p>
      {onRemove && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onRemove}
          disabled={disabled}
          aria-label={`ลบผู้เข้าร่วม ${name}`}
          className="text-foreground-muted"
        >
          <X />
        </Button>
      )}
      {trailing}
    </li>
  );
}
