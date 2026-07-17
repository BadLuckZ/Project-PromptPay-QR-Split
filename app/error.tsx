"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlertTriangle, RotateCw } from "lucide-react";

interface ErrorPageProps {
  reset: () => void;
}

export default function ErrorPage({ reset }: ErrorPageProps) {
  const router = useRouter();

  function handleRetry() {
    reset();
    router.refresh();
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center p-4">
      <div className="flex w-full max-w-sm flex-col items-center gap-3 rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
        <div className="flex size-14 items-center justify-center rounded-full bg-danger text-danger-foreground">
          <AlertTriangle size={28} />
        </div>
        <p className="font-medium">เกิดข้อผิดพลาดบางอย่าง</p>
        <p className="text-sm text-muted-foreground">
          ขออภัย ระบบขัดข้องชั่วคราว ลองใหม่อีกครั้ง
        </p>

        <button
          type="button"
          onClick={handleRetry}
          className="mt-2 flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground"
        >
          <RotateCw size={16} />
          ลองใหม่
        </button>
        <Link
          href="/"
          className="flex h-10 w-full items-center justify-center rounded-xl px-4 text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          กลับหน้าแรก
        </Link>
      </div>
    </div>
  );
}
