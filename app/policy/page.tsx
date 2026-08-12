import { Topbar } from "@/components/Topbar";

export default function PolicyPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <Topbar title="นโยบายความเป็นส่วนตัว" backHref="/login" />

      <div className="flex flex-col gap-6 px-4 pt-6 pb-10 text-sm text-foreground">
        <p className="text-xs text-muted-foreground">
          ปรับปรุงล่าสุด: 12 สิงหาคม 2569
        </p>

        <p>
          PromptPay QR Split เคารพความเป็นส่วนตัวของผู้ใช้งาน
          นโยบายนี้อธิบายว่าเราเก็บ ใช้ และดูแลข้อมูลของคุณอย่างไรเมื่อใช้งานแอป
        </p>

        <section className="flex flex-col gap-2">
          <h2 className="text-base font-medium">ข้อมูลที่เราเก็บ</h2>
          <ul className="list-disc pl-5 flex flex-col gap-1 text-muted-foreground">
            <li>ชื่อและอีเมลจากบัญชี Google ที่ใช้เข้าสู่ระบบ</li>
            <li>ชื่อที่แสดงและเบอร์พร้อมเพย์ที่คุณตั้งค่าในโปรไฟล์</li>
            <li>
              ข้อมูลบิลที่คุณสร้าง เช่น ชื่อบิล จำนวนเงิน
              และชื่อผู้ร่วมบิลแต่ละคน
            </li>
            <li>สถานะการชำระเงินของผู้ร่วมบิล</li>
          </ul>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-base font-medium">เราใช้ข้อมูลอย่างไร</h2>
          <p className="text-muted-foreground">
            ใช้เพื่อสร้างบัญชีผู้ใช้ แสดงและคำนวณบิล สร้าง QR PromptPay
            สำหรับให้ผู้ร่วมบิลจ่ายเงิน และแสดงสถานะการชำระเงิน
            ไม่นำข้อมูลไปใช้เพื่อการโฆษณา และไม่ขายข้อมูลให้บุคคลที่สาม
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-base font-medium">การแบ่งปันข้อมูล</h2>
          <p className="text-muted-foreground">
            ผู้ร่วมบิลที่ได้รับลิงก์จ่ายเงินจะเห็นเฉพาะชื่อบิล ชื่อเจ้าของบิล
            จำนวนเงินของตัวเอง และเบอร์พร้อมเพย์สำหรับสร้าง QR เท่านั้น
            ไม่เห็นข้อมูลผู้ร่วมบิลคนอื่น เราใช้ Google
            เป็นผู้ให้บริการยืนยันตัวตน (OAuth) และ Supabase
            เป็นผู้ให้บริการฐานข้อมูล
            ซึ่งทั้งสองมีนโยบายความเป็นส่วนตัวของตัวเอง
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-base font-medium">การเก็บและลบข้อมูล</h2>
          <p className="text-muted-foreground">
            ข้อมูลถูกเก็บไว้ตราบเท่าที่บัญชีของคุณยังใช้งานอยู่
            หากต้องการให้ลบบัญชีและข้อมูลที่เกี่ยวข้องทั้งหมด
            ติดต่อเราตามช่องทางด้านล่าง
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-base font-medium">ติดต่อเรา</h2>
          <p className="text-muted-foreground">
            มีคำถามเกี่ยวกับนโยบายนี้ ติดต่อได้ที่{" "}
            <a
              href="mailto:thanagorn8802@gmail.com"
              className="text-primary underline"
            >
              thanagorn8802@gmail.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
