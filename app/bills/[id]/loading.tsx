import TopbarLoading from "@/components/TopbarLoading";

export default function BillDetailLoading() {
  return (
    <div className="flex flex-col flex-1 animate-pulse">
      {/* Topbar Loading */}
      <TopbarLoading haveBackButton />

      <div className="flex flex-col gap-4 p-4">
        {/* Stats Loading */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg bg-muted p-3.5 flex flex-col gap-2.5">
            <div className="h-2.5 w-10 rounded-full bg-muted-foreground/20" />
            <div className="h-5 w-16 rounded-full bg-muted-foreground/25" />
            <div className="h-1 rounded-full bg-muted-foreground/15" />
          </div>
          <div className="rounded-lg bg-muted p-3.5 flex flex-col gap-2.5">
            <div className="h-2.5 w-10 rounded-full bg-muted-foreground/20" />
            <div className="h-5 w-16 rounded-full bg-muted-foreground/25" />
            <div className="h-1 rounded-full bg-muted-foreground/15" />
          </div>
        </div>

        {/* Copy Button Loading */}
        <div className="h-10 w-full rounded-md bg-muted-foreground/10" />

        {/* Participant Count Loading */}
        <div className="h-2.5 w-24 rounded-full bg-muted-foreground/20" />

        {/* Member List Loading */}
        <div className="flex flex-col divide-y divide-border/50 rounded-lg bg-muted">
          <div className="flex items-center gap-2.5 p-3">
            <div className="size-8 shrink-0 rounded-full bg-muted-foreground/20" />
            <div className="h-2.5 w-28 rounded-full bg-muted-foreground/20" />
          </div>

          {[70, 55, 65].map((w, i) => (
            <div key={i} className="flex items-center gap-2.5 p-3">
              <div className="size-8 shrink-0 rounded-full bg-muted-foreground/20" />
              <div className="flex-1 flex flex-col gap-2">
                <div
                  className="h-2.5 rounded-full bg-muted-foreground/20"
                  style={{ width: `${w}%` }}
                />
                <div className="h-2.5 w-2/5 rounded-full bg-muted-foreground/15" />
              </div>
              <div className="h-6 w-16 shrink-0 rounded-full bg-muted-foreground/10" />
            </div>
          ))}
        </div>

        {/* Actions Loading */}
        <div className="mt-2 flex flex-col items-center gap-3">
          <div className="h-10 w-full rounded-md bg-muted-foreground/10" />
          <div className="h-2.5 w-16 rounded-full bg-muted-foreground/15" />
        </div>
      </div>
    </div>
  );
}
