"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Copy, Check, Lock } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { BillDashboardCard } from "@/components/bills/BillDashboardCard";
import { BillDashboardActions } from "@/components/bills/BillDashboardActions";
import { SessionExpiredDialog } from "@/components/SessionExpiredDialog";
import {
  ReceiptBrand,
  ReceiptCard,
  ReceiptDivider,
} from "@/components/receipt";
import { cn, getInitials } from "@/lib/utils";
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
    <main className="flex flex-1 flex-col gap-3 px-4 py-6">
      <header className="flex items-center justify-between gap-4">
        <Link
          href="/bills"
          aria-label="ย้อนกลับ"
          className={cn(
            buttonVariants({ variant: "ghost", size: "icon" }),
            "-ms-3",
          )}
        >
          <ChevronLeft className="size-6" />
        </Link>
        <span
          className={cn(
            "inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-medium",
            closed
              ? "bg-surface-muted-hover text-foreground-muted"
              : "bg-primary-soft text-primary",
          )}
        >
          {closed && <Lock className="size-3.5" aria-hidden="true" />}
          {closed ? "ปิดแล้ว" : "เปิดอยู่"}
        </span>
      </header>

      <ReceiptCard>
        <ReceiptBrand />
        <div className="flex flex-col">
          <h1 className="text-xl leading-tight font-semibold wrap-break-word">
            {bill.bill_name}
          </h1>
          <p className="text-sm text-foreground-muted">
            เจ้าของบิล {bill.owner_name} (คุณ)
          </p>
        </div>
        <ReceiptDivider />

        <div className="flex flex-col gap-3">
          <div className="flex justify-between gap-3">
            <div className="flex flex-col text-primary">
              <p className="text-sm">รับแล้ว</p>
              <p className="font-mono text-xl font-medium tabular-nums">
                ฿{receivedAmount.toLocaleString("th-TH")}
              </p>
            </div>
            <div className="flex flex-col items-end text-warning-soft-foreground">
              <p className="text-sm">ค้างอยู่</p>
              <p className="font-mono text-xl font-medium tabular-nums">
                ฿{pendingAmount.toLocaleString("th-TH")}
              </p>
            </div>
          </div>
          <div
            role="progressbar"
            aria-label="สัดส่วนยอดที่รับแล้ว"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(receivedPct)}
            className="h-1.5 overflow-hidden rounded-full bg-warning-soft"
          >
            <div
              className="h-full rounded-full bg-primary"
              style={{ width: `${receivedPct}%` }}
            />
          </div>
        </div>
        <ReceiptDivider />

        <div className="flex flex-col">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-medium">
              ผู้เข้าร่วม {members.length} คน
            </p>
            <Button
              variant="soft"
              size="sm"
              onClick={copyAllLinks}
              disabled={closed}
            >
              {copiedKey === "all" ? <Check /> : <Copy />}
              Copy ทุก Link
            </Button>
          </div>

          {toggleError && (
            <p role="alert" className="pt-2 text-sm text-danger">
              {toggleError}
            </p>
          )}

          <ul className="flex flex-col">
            <li className="flex min-h-12 items-center gap-3 border-b-2 border-dotted border-border-strong py-2">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary-soft text-sm font-medium text-primary">
                {getInitials(bill.owner_name)}
              </span>
              <p className="min-w-0 flex-1 line-clamp-2 font-medium wrap-break-word">
                {bill.owner_name} (คุณ)
              </p>
            </li>

            {sortedMembers.map((member) => (
              <BillDashboardCard
                key={member.id}
                member={member}
                copied={copiedKey === member.id}
                disabled={closed || updatingId === member.id}
                onCopyLink={() => copy(payLink(member.id), member.id)}
                onTogglePaid={() => togglePaid(member.id)}
              />
            ))}
          </ul>
        </div>
      </ReceiptCard>

      <BillDashboardActions
        billId={bill.id}
        closed={closed}
        onClosedChange={setClosed}
      />

      <SessionExpiredDialog open={sessionExpired} />
    </main>
  );
}
