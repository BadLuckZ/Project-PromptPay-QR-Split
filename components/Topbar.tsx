import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { getInitials } from "@/lib/utils";

interface TopbarProps {
  title: string;
  subtitle?: string;
  backHref?: string;
  profileName?: string;
  children?: React.ReactNode;
}

export function Topbar({
  title,
  subtitle,
  backHref,
  profileName,
  children,
}: TopbarProps) {
  return (
    <header className="bg-linear-to-b from-primary-dark to-primary text-primary-foreground">
      <div className="flex items-center gap-2 px-4 pt-4">
        {backHref && (
          <Link
            href={backHref}
            aria-label="ย้อนกลับ"
            className="-ml-2.5 flex size-10 shrink-0 items-center justify-center rounded-full"
          >
            <ChevronLeft size={22} />
          </Link>
        )}
        <div className="flex-1 min-w-0">
          <p className="m-0 text-lg font-semibold">{title}</p>
          {subtitle && (
            <p className="m-0 text-xs text-primary-foreground/90">{subtitle}</p>
          )}
        </div>
        {profileName && (
          <Link
            href="/profile"
            className="flex size-10! shrink-0 items-center justify-center rounded-full bg-white/20 text-sm font-medium"
          >
            {getInitials(profileName)}
          </Link>
        )}
      </div>

      {children && <div className="px-4 pt-5">{children}</div>}

      <div className="mt-5 h-5 rounded-t-3xl bg-background" />
    </header>
  );
}
