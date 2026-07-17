export default function PayLoading() {
  return (
    <div className="flex flex-1 flex-col animate-pulse">
      <div className="relative overflow-hidden bg-linear-to-b from-primary-dark to-primary px-4 pt-6 pb-16">
        <div className="pointer-events-none absolute -top-8 -right-10 size-32 rounded-full border border-white/15" />

        <div className="h-2.5 w-32 rounded-full bg-white/25" />
        <div className="mt-2 h-4 w-24 rounded-full bg-white/30" />

        <div className="mt-5 h-2.5 w-20 rounded-full bg-white/20" />
        <div className="mt-2 h-8 w-28 rounded-full bg-white/30" />
      </div>

      <div className="relative -mt-8 flex flex-1 flex-col gap-4 rounded-t-3xl bg-background px-4 pt-8 pb-6">
        <div className="flex flex-col items-center gap-3 rounded-lg border border-border/50 bg-card p-6">
          <div className="size-56 rounded-lg bg-muted-foreground/10" />
          <div className="flex flex-col items-center gap-1.5">
            <div className="h-2.5 w-48 rounded-full bg-muted-foreground/15" />
            <div className="h-2.5 w-32 rounded-full bg-muted-foreground/15" />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="h-2.5 w-14 rounded-full bg-muted-foreground/20" />
          <div className="flex items-center gap-3 rounded-lg border border-border/50 bg-card p-3.5">
            <div className="size-10 shrink-0 rounded-full bg-muted-foreground/15" />
            <div className="flex flex-col gap-1.5">
              <div className="h-2.5 w-24 rounded-full bg-muted-foreground/20" />
              <div className="h-2.5 w-20 rounded-full bg-muted-foreground/15" />
            </div>
          </div>
        </div>

        <div className="mt-auto h-11 w-full rounded-xl bg-muted-foreground/15" />
      </div>
    </div>
  );
}
