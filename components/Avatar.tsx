"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export function Avatar({
  src,
  fallback,
  className,
}: {
  src: string | null;
  fallback: React.ReactNode;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <span
      className={cn(
        "flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary-soft font-semibold text-primary",
        className,
      )}
    >
      {src && !failed ? (
        <img
          src={src}
          alt=""
          referrerPolicy="no-referrer"
          onError={() => setFailed(true)}
          className="size-full object-cover"
        />
      ) : (
        fallback
      )}
    </span>
  );
}
