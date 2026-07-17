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
      <div className="p-4 pt-0">
        <Button
          className="w-full"
          disabled={!canSubmit}
          onClick={() => setShowConfirm(true)}
        >
          สร้าง Bill
        </Button>
      </div>

      <AlertDialog open={showConfirm} onOpenChange={setShowConfirm}>
        <AlertDialogContent className="flex flex-col items-center text-center">
          <div className="flex size-14 items-center justify-center rounded-full bg-primary-tint/40 text-primary-dark">
            <Receipt size={26} />
          </div>

          <AlertDialogHeader>
            <AlertDialogTitle>ยืนยันการสร้าง Bill</AlertDialogTitle>
            <AlertDialogDescription>
              &quot;{billName || "Bill ใหม่"}&quot; {totalCount} คน รวม ฿
              {totalNumber.toLocaleString()}
            </AlertDialogDescription>
          </AlertDialogHeader>
          {submitError && (
            <p className="text-sm text-destructive">{submitError}</p>
          )}
          <AlertDialogFooter className="w-full">
            <AlertDialogCancel
              disabled={submitting}
              className="h-11 w-full rounded-xl"
            >
              ยกเลิก
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={onConfirm}
              disabled={submitting}
              className="h-11 w-full rounded-xl"
            >
              {submitting ? "กำลังสร้าง..." : "สร้าง Bill"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
