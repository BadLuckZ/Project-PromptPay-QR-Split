import { SearchX } from "lucide-react";
import { PayStateReceipt } from "@/components/pay";

export default function PayNotFound() {
  return (
    <PayStateReceipt
      icon={SearchX}
      tone="neutral"
      title="ไม่พบหน้านี้"
      description="ลิงก์นี้อาจไม่ถูกต้องหรือถูกลบไปแล้ว"
    />
  );
}
