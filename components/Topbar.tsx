import Link from "next/link";
import { ChevronLeft } from "lucide-react";

interface TopbarProps {
  title: string;
  subtitle?: string;
  backHref?: string;
}

export function Topbar({ title, subtitle, backHref }: TopbarProps) {
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
      <div>
        <p className="text-primary-foreground text-[15px] font-medium m-0">
          {title}
        </p>
        {subtitle && (
          <p className="text-primary-foreground/80 text-xs m-0">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
