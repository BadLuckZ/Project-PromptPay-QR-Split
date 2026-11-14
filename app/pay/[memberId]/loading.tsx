import { ReceiptCard, ReceiptDivider } from "@/components/receipt";

function Bar({ className }: { className: string }) {
  return <div className={`rounded-full bg-surface-muted ${className}`} />;
}

export default function PayLoading() {
  return (
    <main
      aria-busy="true"
      aria-label="กำลังโหลด"
      className="flex flex-1 animate-pulse flex-col gap-4 px-4 py-6"
    >
      <ReceiptCard>
        <div className="flex flex-col items-center gap-2">
          <Bar className="h-3 w-40" />
          <Bar className="h-3 w-24" />
        </div>
        <ReceiptDivider />
        <div className="flex flex-col gap-2">
          <Bar className="h-3 w-8" />
          <Bar className="h-6 w-40" />
          <Bar className="h-3 w-24" />
        </div>
        <ReceiptDivider />
        <div className="flex items-center justify-between">
          <Bar className="h-3 w-24" />
          <Bar className="h-8 w-32" />
        </div>
        <ReceiptDivider />
        <div className="flex flex-col items-center gap-2">
          <Bar className="h-3 w-40" />
          <div className="size-52 rounded-sm bg-surface-muted" />
        </div>
        <ReceiptDivider />
        <div className="flex flex-col gap-2">
          <Bar className="h-3 w-full" />
          <Bar className="h-3 w-full" />
        </div>
      </ReceiptCard>
      <div className="h-12 w-full rounded-md bg-surface" />
    </main>
  );
}
