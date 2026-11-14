import { ReceiptCard, ReceiptDivider } from "@/components/receipt";

export default function BillDetailLoading() {
  return (
    <main
      aria-busy="true"
      aria-label="กำลังโหลด"
      className="flex flex-1 animate-pulse flex-col gap-3 px-4 py-6"
    >
      <div className="flex h-11 items-center justify-between">
        <div className="size-6 rounded-full bg-surface-muted-hover" />
        <div className="h-7 w-16 rounded-full bg-surface-muted-hover" />
      </div>

      <ReceiptCard>
        <div className="mx-auto h-3 w-40 rounded-full bg-surface-muted" />
        <div className="flex flex-col gap-2">
          <div className="h-6 w-44 rounded-full bg-surface-muted" />
          <div className="h-3 w-32 rounded-full bg-surface-muted" />
        </div>
        <ReceiptDivider />
        <div className="flex justify-between">
          <div className="h-10 w-20 rounded-md bg-surface-muted" />
          <div className="h-10 w-20 rounded-md bg-surface-muted" />
        </div>
        <div className="h-1.5 rounded-full bg-surface-muted" />
        <ReceiptDivider />
        {[70, 55, 65, 50].map((w) => (
          <div key={w} className="flex items-center gap-3">
            <div className="size-9 shrink-0 rounded-full bg-surface-muted" />
            <div className="flex flex-1 flex-col gap-2">
              <div
                className="h-3 rounded-full bg-surface-muted"
                style={{ width: `${w}%` }}
              />
              <div className="h-3 w-12 rounded-full bg-surface-muted" />
            </div>
            <div className="h-9 w-20 shrink-0 rounded-full bg-surface-muted" />
          </div>
        ))}
      </ReceiptCard>

      <div className="h-12 w-full rounded-md bg-surface-muted-hover" />
    </main>
  );
}
