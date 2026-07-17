import TopbarLoading from "@/components/TopbarLoading";

export default function BillsLoading() {
  return (
    <div className="flex flex-col flex-1 animate-pulse">
      {/* Topbar Loading */}
      <TopbarLoading haveSubtitle haveProfile />

      <div className="p-4 pt-5 pb-3 flex flex-col gap-3">
        {/* Button Loading */}
        <div className="h-10 w-full rounded-md bg-muted-foreground/20" />

        {/* Tabs Loading */}
        <div className="flex gap-2">
          <div className="h-7 w-20 rounded-full bg-muted-foreground/20" />
          <div className="h-7 w-20 rounded-full bg-muted-foreground/20" />
          <div className="h-7 w-20 rounded-full bg-muted-foreground/20" />
        </div>
      </div>

      {/* Bill Card Loading */}
      <div className="flex-1 px-4 pb-4 flex flex-col gap-3">
        {[60, 45, 50, 65].map((w, i) => (
          <div
            key={i}
            className="flex items-center justify-between gap-3 rounded-lg border border-l-4 border-border/50 border-l-muted-foreground/20 bg-muted p-3.5"
          >
            <div className="flex flex-col gap-2">
              <div
                className="h-3 rounded-full bg-muted-foreground/25"
                style={{ width: `${w}%` }}
              />
              <div className="h-2.5 w-2/5 rounded-full bg-muted-foreground/20" />
            </div>
            <div className="h-6 w-16 shrink-0 rounded-full bg-muted-foreground/10" />
          </div>
        ))}
      </div>
    </div>
  );
}
