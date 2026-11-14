"use client";

import { useRouter } from "next/navigation";
import { AlertTriangle, RotateCw } from "lucide-react";
import { StateReceipt } from "@/components/receipt";
import { Button } from "@/components/ui/button";

interface ErrorPageProps {
  reset: () => void;
}

export default function PayErrorPage({ reset }: ErrorPageProps) {
  const router = useRouter();

  function handleRetry() {
    reset();
    router.refresh();
  }

  return (
    <StateReceipt
      subtitle="ใบเสร็จหารบิล"
      icon={AlertTriangle}
      tone="danger"
      title="เกิดข้อผิดพลาดบางอย่าง"
      description="ขออภัย ระบบขัดข้องชั่วคราว ลองใหม่อีกครั้ง"
    >
      <Button type="button" size="lg" className="w-full" onClick={handleRetry}>
        <RotateCw />
        ลองใหม่
      </Button>
    </StateReceipt>
  );
}
