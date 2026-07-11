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
  closed: boolean;
  onClosedChange: (closed: boolean) => void;
}

export function BillDashboardActions({
  closed,
  onClosedChange,
}: BillActionsProps) {
  const router = useRouter();
  const [showCloseConfirm, setShowCloseConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  function confirmClose() {
    onClosedChange(!closed);
    setShowCloseConfirm(false);
  }

  function confirmDelete() {
    setShowDeleteConfirm(false);
    router.push("/bills");
  }

  return (
    <div className="mt-2 flex flex-col gap-2">
      <Button
        variant="outline"
        className="w-full"
        onClick={() => setShowCloseConfirm(true)}
      >
        {closed ? <Lock size={16} /> : <CheckCircle2 size={16} />}
        {closed ? "เปิดบิลอีกครั้ง" : "ปิดบิล"}
      </Button>

      <button
        type="button"
        onClick={() => setShowDeleteConfirm(true)}
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
          <AlertDialogFooter>
            <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
            <AlertDialogAction onClick={confirmClose}>
              {closed ? "เปิดบิล" : "ปิดบิล"}
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
          <AlertDialogFooter>
            <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
            <AlertDialogAction variant="destructive" onClick={confirmDelete}>
              ลบบิล
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
