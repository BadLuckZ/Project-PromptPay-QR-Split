import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { BillForm } from "@/components/bills";
import { buttonVariants } from "@/components/ui/button";
import { fetch } from "@/lib/fetch";
import { cn } from "@/lib/utils";
import { User } from "@/types";

export default async function CreateBillPage() {
  const res = await fetch("/api/v1/users/me", { cache: "no-store" });
  const profile: User | null = res.ok ? await res.json() : null;

  return (
    <main className="flex flex-1 flex-col gap-3 px-4 py-6">
      <header className="flex items-center gap-1">
        <Link
          href="/bills"
          aria-label="ย้อนกลับ"
          className={cn(
            buttonVariants({ variant: "ghost", size: "icon" }),
            "-ms-3",
          )}
        >
          <ChevronLeft className="size-6" />
        </Link>
        <h1 className="text-xl leading-tight font-semibold">สร้าง Bill ใหม่</h1>
      </header>
      <BillForm ownerName={profile?.display_name ?? "คุณ (เจ้าของ)"} />
    </main>
  );
}
