import TopbarLoading from "@/components/TopbarLoading";

export default function CreateBillLoading() {
  return (
    <div className="flex flex-col flex-1 animate-pulse">
      <TopbarLoading haveBackButton haveProfile />

      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="flex flex-col gap-1.5">
          <div className="h-2.5 w-16 rounded-full bg-muted-foreground/20" />
          <div className="h-9 w-full rounded-md bg-muted-foreground/10" />
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="h-2.5 w-28 rounded-full bg-muted-foreground/20" />
          <div className="h-9 w-full rounded-md bg-muted-foreground/10" />
        </div>

        <div className="flex items-center gap-2">
          <div className="h-9 flex-1 rounded-md bg-muted-foreground/10" />
          <div className="size-9 shrink-0 rounded-md bg-muted-foreground/10" />
        </div>

        <div className="flex border-b border-border/50 gap-4">
          <div className="h-2.5 w-20 rounded-full bg-muted-foreground/20 mb-2.5" />
          <div className="h-2.5 w-20 rounded-full bg-muted-foreground/15 mb-2.5" />
        </div>

        <div className="h-16 w-full rounded-lg bg-muted" />

        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="flex items-center gap-2.5 border-b border-border/50 py-2.5"
          >
            <div className="size-8 shrink-0 rounded-full bg-muted-foreground/15" />
            <div className="flex-1 flex flex-col gap-2">
              <div className="h-2.5 w-2/5 rounded-full bg-muted-foreground/20" />
              <div className="h-2.5 w-1/5 rounded-full bg-muted-foreground/15" />
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 pt-0">
        <div className="h-10 w-full rounded-md bg-muted-foreground/15" />
      </div>
    </div>
  );
}
