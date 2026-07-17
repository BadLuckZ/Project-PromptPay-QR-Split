import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { getInitials } from "@/lib/utils";

interface TopbarProps {
  title: string;
  subtitle?: string;
  backHref?: string;
  profileName?: string;
}

export function Topbar({
  title,
  subtitle,
  backHref,
  profileName,
}: TopbarProps) {
  return (
    <div className="bg-primary px-4 py-4 flex items-center gap-2 pb-6">
      {backHref && (
        <Link
          href={backHref}
          className="text-primary-foreground -ml-1 flex items-center"
        >
          <ChevronLeft size={20} />
        </Link>
      )}
      <div className="flex-1">
        <p className="text-primary-foreground text-base font-medium m-0">
          {title}
        </p>
        {subtitle && (
          <p className="text-primary-foreground/80 text-xs m-0">{subtitle}</p>
        )}
      </div>
      {profileName && (
        <Link
          href="/profile"
          className="flex size-10! shrink-0 items-center justify-center rounded-full bg-primary-tint/40 text-primary-foreground text-sm font-medium"
        >
          {getInitials(profileName)}
        </Link>
      )}
    </div>
  );
}
