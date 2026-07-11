"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

interface BillActionsProps {
  billId: string;
  closed: boolean;
  onClosedChange: (closed: boolean) => void;
}

export function BillDashboardActions({
  billId,
  closed,
  onClosedChange,
}: BillActionsProps) {
  const router = useRouter();
  const [showCloseConfirm, setShowCloseConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function confirmClose() {
    setSubmitting(true);
    setError(null);

    const res = await fetch(`/api/v1/bills/${billId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ closed: !closed }),
    });

    setSubmitting(false);

    if (!res.ok) {
      setError("อัปเดตสถานะบิลไม่สำเร็จ กรุณาลองใหม่อีกครั้ง");
      return;
    }

    onClosedChange(!closed);
    setShowCloseConfirm(false);
  }

  async function confirmDelete() {
    setSubmitting(true);
    setError(null);

    const res = await fetch(`/api/v1/bills/${billId}`, { method: "DELETE" });

    setSubmitting(false);

    if (!res.ok) {
      setError("ลบบิลไม่สำเร็จ กรุณาลองใหม่อีกครั้ง");
      return;
    }

    setShowDeleteConfirm(false);
    router.push("/bills");
  }

  return (
    <div className="mt-2 flex flex-col gap-2">
      <Button
        variant="outline"
        className="w-full"
        onClick={() => {
          setError(null);
          setShowCloseConfirm(true);
        }}
      >
        {closed ? <Lock size={16} /> : <CheckCircle2 size={16} />}
        {closed ? "เปิดบิลอีกครั้ง" : "ปิดบิล"}
      </Button>

      <button
        type="button"
        onClick={() => {
          setError(null);
          setShowDeleteConfirm(true);
        }}
        className="cursor-pointer py-1 text-center text-xs text-destructive/70 hover:text-destructive"
      >
        ลบบิลนี้
      </button>

      <AlertDialog open={showCloseConfirm} onOpenChange={setShowCloseConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {closed ? "เปิดบิลนี้อีกครั้ง?" : "ปิดบิลนี้?"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {closed
                ? "สมาชิกจะสามารถดูและจ่ายบิลนี้ต่อได้ตามปกติ"
                : "จะถือว่าบิลนี้ชำระครบแล้ว จะไม่สามารถแก้ไขสถานะการจ่ายของสมาชิกได้จนกว่าจะเปิดอีกครั้ง"}
            </AlertDialogDescription>
          </AlertDialogHeader>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <AlertDialogFooter>
            <AlertDialogCancel disabled={submitting}>ยกเลิก</AlertDialogCancel>
            <AlertDialogAction onClick={confirmClose} disabled={submitting}>
              {submitting ? "กำลังบันทึก..." : closed ? "เปิดบิล" : "ปิดบิล"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>ลบบิลนี้?</AlertDialogTitle>
            <AlertDialogDescription>
              ลิงก์จ่ายเงินของสมาชิกทุกคนจะใช้งานไม่ได้ทันที
              และไม่สามารถกู้คืนได้
            </AlertDialogDescription>
          </AlertDialogHeader>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <AlertDialogFooter>
            <AlertDialogCancel disabled={submitting}>ยกเลิก</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={confirmDelete}
              disabled={submitting}
            >
              {submitting ? "กำลังลบ..." : "ลบบิล"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
