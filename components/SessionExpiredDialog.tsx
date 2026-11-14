"use client";

import Link from "next/link";
import { LogIn, ShieldAlert } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

interface SessionExpiredDialogProps {
  open: boolean;
}

export function SessionExpiredDialog({ open }: SessionExpiredDialogProps) {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent className="flex flex-col items-center text-center">
        <div className="flex size-14 items-center justify-center rounded-full bg-primary-soft text-primary">
          <ShieldAlert size={26} />
        </div>

        <AlertDialogHeader>
          <AlertDialogTitle>Session หมดอายุ</AlertDialogTitle>
          <AlertDialogDescription>
            การเข้าสู่ระบบของคุณหมดอายุแล้ว
            กรุณาเข้าสู่ระบบใหม่อีกครั้งเพื่อใช้งานต่อ
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="w-full">
          <AlertDialogAction
            nativeButton={false}
            render={<Link href="/login" />}
            size="lg"
            className="w-full"
          >
            <LogIn />
            ไปหน้า Login
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
