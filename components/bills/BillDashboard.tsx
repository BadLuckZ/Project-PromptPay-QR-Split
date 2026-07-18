"use client";

import { useState } from "react";
import { TrendingUp, Clock, Copy, Check, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { BillDashboardCard } from "@/components/bills/BillDashboardCard";
import { BillDashboardActions } from "@/components/bills/BillDashboardActions";
import { SessionExpiredDialog } from "@/components/SessionExpiredDialog";
import { getInitials } from "@/lib/utils";
import { Member } from "@/types";

interface BillDashboardBill {
  id: string;
  bill_name: string;
  owner_name: string;
  closed_at: string | null;
}

interface BillDashboardProps {
  bill: BillDashboardBill;
  members: Member[];
  origin: string;
}

export function BillDashboard({
  bill,
  members: initialMembers,
  origin,
}: BillDashboardProps) {
  const [members, setMembers] = useState(initialMembers);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [closed, setClosed] = useState(bill.closed_at !== null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [toggleError, setToggleError] = useState<string | null>(null);
  const [sessionExpired, setSessionExpired] = useState(false);

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

  async function togglePaid(memberId: string) {
    const target = members.find((m) => m.id === memberId);
    if (!target) return;

    const nextIsPaid = !target.is_paid;
    setToggleError(null);
    setUpdatingId(memberId);
    setMembers((prev) =>
      prev.map((m) => (m.id === memberId ? { ...m, is_paid: nextIsPaid } : m)),
    );

    const res = await fetch(`/api/v1/members/${memberId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_paid: nextIsPaid }),
    });

    setUpdatingId(null);

    if (res.status === 401) {
      setMembers((prev) =>
        prev.map((m) =>
          m.id === memberId ? { ...m, is_paid: !nextIsPaid } : m,
        ),
      );
      setSessionExpired(true);
      return;
    }

    if (!res.ok) {
      const data = await res.json();
      setMembers((prev) =>
        prev.map((m) =>
          m.id === memberId ? { ...m, is_paid: !nextIsPaid } : m,
        ),
      );
      setToggleError(data.error ?? "อัปเดตสถานะไม่สำเร็จ กรุณาลองใหม่อีกครั้ง");
    }
  }

  return (
    <div className="flex flex-col flex-1 gap-4 p-4">
      {closed && (
        <div className="flex items-center gap-1.5 rounded-lg bg-muted px-3 py-2 text-xs text-muted-foreground">
          <Lock size={12} />
          บิลนี้ถูกปิดไปแล้ว
        </div>
      )}

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

      <Button
        variant="outline"
        className="w-full"
        onClick={copyAllLinks}
        disabled={closed}
      >
        {copiedKey === "all" ? <Check size={16} /> : <Copy size={16} />}
        Copy ทุก Link
      </Button>

      <p className="text-sm text-muted-foreground">
        ผู้เข้าร่วม {members.length} คน
      </p>

      {toggleError && <p className="text-xs text-destructive">{toggleError}</p>}

      <div className="flex flex-col divide-y divide-border rounded-lg border border-border bg-card">
        <div className="flex items-center gap-2.5 p-3">
          <Avatar>
            <AvatarFallback className="bg-success text-success-foreground">
              {getInitials(bill.owner_name)}
            </AvatarFallback>
          </Avatar>
          <p className="flex-1 text-sm font-medium">{bill.owner_name} (คุณ)</p>
        </div>

        {sortedMembers.map((member, i) => (
          <BillDashboardCard
            key={member.id}
            member={member}
            copied={copiedKey === member.id}
            disabled={closed || updatingId === member.id}
            onCopyLink={() => copy(payLink(member.id), member.id)}
            onTogglePaid={() => togglePaid(member.id)}
          />
        ))}
      </div>

      <BillDashboardActions
        billId={bill.id}
        closed={closed}
        onClosedChange={setClosed}
      />

      <SessionExpiredDialog open={sessionExpired} />
    </div>
  );
}
