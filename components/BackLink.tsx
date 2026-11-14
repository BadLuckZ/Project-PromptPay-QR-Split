import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function BackLink({ href }: { href: string }) {
  return (
    <Link
      href={href}
      aria-label="ย้อนกลับ"
      className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "-ms-3")}
    >
      <ChevronLeft className="size-6" />
    </Link>
  );
}
