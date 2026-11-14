import { ReceiptCard } from "@/components/receipt";

export default function BillsLoading() {
  return (
    <main
      aria-busy="true"
      aria-label="กำลังโหลด"
      className="flex flex-1 animate-pulse flex-col gap-4 px-4 py-6"
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <div className="h-6 w-32 rounded-full bg-surface-muted-hover" />
          <div className="h-3 w-16 rounded-full bg-surface-muted-hover" />
        </div>
        <div className="size-11 rounded-full bg-surface-muted-hover" />
      </div>

      <ReceiptCard>
        <div className="flex flex-col gap-2">
          <div className="h-3 w-28 rounded-full bg-surface-muted" />
          <div className="h-8 w-40 rounded-full bg-surface-muted" />
          <div className="h-3 w-36 rounded-full bg-surface-muted" />
        </div>
      </ReceiptCard>

      <div className="h-12 w-full rounded-md bg-surface-muted-hover" />
      <div className="h-12 w-full rounded-md bg-surface-muted-hover" />

      {[60, 45, 50].map((w) => (
        <div key={w} className="flex flex-col gap-3 rounded-sm bg-surface p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex flex-1 flex-col gap-2">
              <div
                className="h-4 rounded-full bg-surface-muted"
                style={{ width: `${w}%` }}
              />
              <div className="h-3 w-12 rounded-full bg-surface-muted" />
            </div>
            <div className="h-5 w-16 rounded-full bg-surface-muted" />
          </div>
          <div className="border-t-2 border-dashed border-surface-muted-hover" />
          <div className="flex items-center gap-3">
            <div className="h-1.5 flex-1 rounded-full bg-surface-muted" />
            <div className="h-6 w-20 rounded-full bg-surface-muted" />
          </div>
        </div>
      ))}
    </main>
  );
}
