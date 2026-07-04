import Link from "next/link";
import { ChevronLeft } from "lucide-react";

interface TopbarProps {
  title: string;
  backHref?: string;
}

export function Topbar({ title, backHref }: TopbarProps) {
  return (
    <div className="bg-primary px-4 py-4 flex items-center gap-2">
      {backHref && (
        <Link
          href={backHref}
          className="text-primary-foreground -ml-1 flex items-center"
        >
          <ChevronLeft size={20} />
        </Link>
      )}
      <p className="text-primary-foreground text-[15px] font-medium m-0">
        {title}
      </p>
    </div>
  );
}
