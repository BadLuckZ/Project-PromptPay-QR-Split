"use client";

import { useState } from "react";
import { TrendingUp, Clock, Copy, Check, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarBadge } from "@/components/ui/avatar";
import { Member } from "@/types";

const AVATAR_COLORS = [
  "bg-success text-success-foreground",
  "bg-warning text-warning-foreground",
];

interface BillDashboardBill {
  id: string;
  bill_name: string;
  owner_name: string;
}

interface BillDashboardProps {
  bill: BillDashboardBill;
  members: Member[];
  origin: string;
}

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/);
  return parts.length > 1 ? parts[0][0] + parts[1][0] : name.slice(0, 2);
}

export function BillDashboard({
  bill,
  members: initialMembers,
  origin,
}: BillDashboardProps) {
  const [members, setMembers] = useState(initialMembers);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const sortedMembers = [...members].sort((a, b) => {
    if (a.is_paid !== b.is_paid) return a.is_paid ? 1 : -1;
    return a.member_name.localeCompare(b.member_name, "th");
  });

  const receivedAmount = members
    .filter((m) => m.is_paid)
    .reduce((sum, m) => sum + Number(m.amount), 0);
  const pendingAmount = members
    .filter((m) => !m.is_paid)
    .reduce((sum, m) => sum + Number(m.amount), 0);
  const totalAmount = receivedAmount + pendingAmount;
  const receivedPct =
    totalAmount > 0 ? (receivedAmount / totalAmount) * 100 : 0;

  function payLink(memberId: string) {
    return `${origin}/pay/${memberId}`;
  }

  async function copy(text: string, key: string) {
    await navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey((k) => (k === key ? null : k)), 1500);
  }

  function copyAllLinks() {
    const links = members
      .map((m) => `${m.member_name}: ${payLink(m.id)}`)
      .join("\n");
    copy(links, "all");
  }

  function togglePaid(memberId: string) {
    setMembers((prev) =>
      prev.map((m) => (m.id === memberId ? { ...m, is_paid: !m.is_paid } : m)),
    );
  }

  return (
    <div className="flex flex-col flex-1 gap-4 p-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg bg-success p-3.5">
          <div className="flex items-center justify-between text-success-foreground">
            <p className="text-xs">รับแล้ว</p>
            <TrendingUp size={14} />
          </div>
          <p className="text-xl font-semibold text-success-foreground">
            ฿{receivedAmount.toLocaleString()}
          </p>
          <div className="mt-2 h-1 rounded-full bg-success-foreground/15">
            <div
              className="h-1 rounded-full bg-success-foreground/60"
              style={{ width: `${receivedPct}%` }}
            />
          </div>
        </div>

        <div className="rounded-lg bg-warning p-3.5">
          <div className="flex items-center justify-between text-warning-foreground">
            <p className="text-xs">ค้างอยู่</p>
            <Clock size={14} />
          </div>
          <p className="text-xl font-semibold text-warning-foreground">
            ฿{pendingAmount.toLocaleString()}
          </p>
          <div className="mt-2 h-1 rounded-full bg-warning-foreground/15">
            <div
              className="h-1 rounded-full bg-warning-foreground/60"
              style={{ width: `${100 - receivedPct}%` }}
            />
          </div>
        </div>
      </div>

      <Button variant="outline" className="w-full" onClick={copyAllLinks}>
        {copiedKey === "all" ? <Check size={16} /> : <Copy size={16} />}
        copy ทุก link
      </Button>

      <p className="text-sm text-muted-foreground">
        ผู้เข้าร่วม {members.length} คน
      </p>

      <div className="flex flex-col divide-y divide-border rounded-lg border border-border bg-card">
        <div className="flex items-center gap-2.5 p-3">
          <Avatar>
            <AvatarFallback className="bg-primary-tint text-primary-dark">
              {getInitials(bill.owner_name)}
            </AvatarFallback>
            <AvatarBadge>
              <Info size={10} />
            </AvatarBadge>
          </Avatar>
          <p className="flex-1 text-sm font-medium">{bill.owner_name} (คุณ)</p>
        </div>

        {sortedMembers.map((member, i) => (
          <div
            key={member.id}
            className={cn(
              "flex items-center gap-2.5 p-3",
              member.is_paid && "opacity-50 blur-[0.3px]",
            )}
          >
            <Avatar>
              <AvatarFallback
                className={AVATAR_COLORS[i % AVATAR_COLORS.length]}
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
                onClick={() => copy(payLink(member.id), member.id)}
                className="p-1.5 text-muted-foreground cursor-pointer"
                aria-label={`คัดลอกลิงก์ ${member.member_name}`}
              >
                {copiedKey === member.id ? (
                  <Check size={14} />
                ) : (
                  <Copy size={14} />
                )}
              </button>
            )}
            <button
              type="button"
              onClick={() => togglePaid(member.id)}
              className={cn(
                "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs cursor-pointer shrink-0",
                member.is_paid
                  ? "bg-success text-success-foreground"
                  : "border border-border text-muted-foreground",
              )}
            >
              {member.is_paid && <Check size={12} />}
              {member.is_paid ? "จ่ายแล้ว" : "ยังไม่จ่าย"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
