import { useId } from "react";
import { cn } from "@/lib/utils";

function ZigzagEdge({ id, points }: { id: string; points: string }) {
  return (
    <svg
      width="100%"
      height="8"
      aria-hidden="true"
      focusable="false"
      className="block shrink-0"
    >
      <defs>
        <pattern id={id} width="10" height="8" patternUnits="userSpaceOnUse">
          <polygon points={points} className="fill-surface" />
        </pattern>
      </defs>
      <rect width="100%" height="8" fill={`url(#${id})`} />
    </svg>
  );
}

export function ReceiptCard({ children }: { children: React.ReactNode }) {
  const id = useId();

  return (
    <div className="flex flex-col">
      <ZigzagEdge id={`${id}top`} points="0,8 5,0 10,8" />
      <div className="flex flex-col gap-4 bg-surface px-6 py-6">{children}</div>
      <ZigzagEdge id={`${id}bottom`} points="0,0 5,8 10,0" />
    </div>
  );
}

export function ReceiptDivider() {
  return (
    <hr className="w-full border-0 border-t-2 border-dashed border-border-strong" />
  );
}

export function ReceiptBrand({ subtitle }: { subtitle?: string }) {
  return (
    <div className="flex flex-col items-center text-foreground-muted">
      <p className="font-mono text-xs tracking-widest">PROMPTPAY QR SPLIT</p>
      {subtitle && <p className="text-sm">{subtitle}</p>}
    </div>
  );
}

const heroAmountFormatter = new Intl.NumberFormat("th-TH", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function HeroAmount({ value }: { value: number }) {
  const [integer, fraction] = heroAmountFormatter.format(value).split(".");

  return (
    <p className="font-medium whitespace-nowrap">
      <span className="me-1 text-lg">฿</span>
      <span className="font-mono text-2xl tracking-tight tabular-nums">
        {integer}
      </span>
      <span className="font-mono text-lg text-foreground-muted tabular-nums">
        .{fraction}
      </span>
    </p>
  );
}

export function LeaderRow({
  label,
  children,
  valueClassName,
}: {
  label: string;
  children: React.ReactNode;
  valueClassName?: string;
}) {
  return (
    <div className="flex items-baseline">
      <dt className="flex flex-1 items-baseline gap-2 text-sm text-foreground-muted after:min-w-4 after:flex-1 after:border-b-2 after:border-dotted after:border-border-strong after:content-['']">
        {label}
      </dt>
      <dd
        className={cn(
          "min-w-0 ps-2 text-right font-medium wrap-break-word",
          valueClassName,
        )}
      >
        {children}
      </dd>
    </div>
  );
}
