import TopbarLoading from "@/components/TopbarLoading";

export default function BillsLoading() {
  return (
    <div className="flex flex-col flex-1 animate-pulse">
      {/* Topbar Loading */}
      <TopbarLoading haveSubtitle haveProfile haveSummary />

      <div className="px-4 pt-1 pb-4 flex flex-col gap-3.5">
        {/* Button Loading */}
        <div className="h-9 w-full rounded-md bg-muted-foreground/20" />

        {/* Tabs Loading */}
        <div className="h-11 w-full rounded-lg bg-muted" />
      </div>

      {/* Bill Card Loading */}
      <div className="flex-1 px-4 pb-4 flex flex-col gap-3">
        {[60, 45, 50, 65].map((w, i) => (
          <div
            key={i}
            className="flex flex-col gap-3 rounded-xl bg-card p-4 shadow-card"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex flex-1 flex-col gap-2">
                <div
                  className="h-3.5 rounded-full bg-muted-foreground/25"
                  style={{ width: `${w}%` }}
                />
                <div className="h-2.5 w-1/4 rounded-full bg-muted-foreground/20" />
              </div>
              <div className="h-5 w-16 shrink-0 rounded-full bg-muted-foreground/20" />
            </div>
            <div className="flex items-center gap-3">
              <div className="h-1.5 flex-1 rounded-full bg-muted" />
              <div className="h-6 w-20 shrink-0 rounded-full bg-muted-foreground/10" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
