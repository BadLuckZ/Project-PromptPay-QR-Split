"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlertTriangle, RotateCw } from "lucide-react";
import { StateReceipt } from "@/components/receipt";
import { Button } from "@/components/ui/button";

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
    <StateReceipt
      icon={AlertTriangle}
      tone="danger"
      title="เกิดข้อผิดพลาดบางอย่าง"
      description="ขออภัย ระบบขัดข้องชั่วคราว ลองใหม่อีกครั้ง"
    >
      <div className="flex flex-col gap-1">
        <Button type="button" size="lg" className="w-full" onClick={handleRetry}>
          <RotateCw />
          ลองใหม่
        </Button>
        <Button
          variant="ghost"
          className="w-full text-foreground-muted"
          nativeButton={false}
          render={<Link href="/" />}
        >
          กลับหน้าแรก
        </Button>
      </div>
    </StateReceipt>
  );
}
