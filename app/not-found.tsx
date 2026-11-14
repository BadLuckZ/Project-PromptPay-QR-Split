import Link from "next/link";
import { SearchX } from "lucide-react";
import { StateReceipt } from "@/components/receipt";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <StateReceipt
      icon={SearchX}
      tone="neutral"
      title="ไม่พบหน้านี้"
      description="ลิงก์นี้อาจไม่ถูกต้องหรือถูกลบไปแล้ว"
    >
      <Button
        size="lg"
        className="w-full"
        nativeButton={false}
        render={<Link href="/" />}
      >
        กลับหน้าแรก
      </Button>
    </StateReceipt>
  );
}
