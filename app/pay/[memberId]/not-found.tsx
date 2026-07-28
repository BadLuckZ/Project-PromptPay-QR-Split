import { SearchX } from "lucide-react";

export default function PayNotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center p-4">
      <div className="flex w-full max-w-sm flex-col items-center gap-3 rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
        <div className="flex size-14 items-center justify-center rounded-full bg-muted text-muted-foreground">
          <SearchX size={28} />
        </div>
        <p className="font-medium">ไม่พบหน้านี้</p>
        <p className="text-sm text-muted-foreground">
          ลิงก์นี้อาจไม่ถูกต้องหรือถูกลบไปแล้ว
        </p>
      </div>
    </div>
  );
}
