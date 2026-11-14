import { SearchX } from "lucide-react";
import { StateReceipt } from "@/components/receipt";

export default function PayNotFound() {
  return (
    <StateReceipt
      subtitle="ใบเสร็จหารบิล"
      icon={SearchX}
      tone="neutral"
      title="ไม่พบหน้านี้"
      description="ลิงก์นี้อาจไม่ถูกต้องหรือถูกลบไปแล้ว"
    />
  );
}
