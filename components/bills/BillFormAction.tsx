"use client";

import { useState } from "react";
import { Receipt } from "lucide-react";
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

interface BillFormActionProps {
  canSubmit: boolean;
  billName: string;
  totalCount: number;
  totalNumber: number;
  submitting: boolean;
  submitError: string | null;
  onConfirm: () => void;
}

export function BillFormAction({
  canSubmit,
  billName,
  totalCount,
  totalNumber,
  submitting,
  submitError,
  onConfirm,
}: BillFormActionProps) {
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <>
      <Button
        size="lg"
        className="w-full"
        disabled={!canSubmit}
        onClick={() => setShowConfirm(true)}
      >
        สร้าง Bill
      </Button>

      <AlertDialog open={showConfirm} onOpenChange={setShowConfirm}>
        <AlertDialogContent className="flex flex-col items-center text-center">
          <div className="flex size-14 items-center justify-center rounded-full bg-primary-soft text-primary">
            <Receipt size={26} />
          </div>

          <AlertDialogHeader>
            <AlertDialogTitle>ยืนยันการสร้าง Bill</AlertDialogTitle>
            <AlertDialogDescription>
              <b>{billName || "Bill ใหม่"}</b> จำนวน {totalCount} คน รวม ฿
              {totalNumber.toLocaleString()}
            </AlertDialogDescription>
          </AlertDialogHeader>
          {submitError && <p className="text-sm text-danger">{submitError}</p>}
          <AlertDialogFooter className="w-full">
            <AlertDialogCancel
              disabled={submitting}
              size="lg"
              className="w-full"
            >
              ยกเลิก
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={onConfirm}
              disabled={submitting}
              size="lg"
              className="w-full"
            >
              {submitting ? "กำลังสร้าง..." : "สร้าง Bill"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
