import TopbarLoading from "@/components/TopbarLoading";

export default function ProfileLoading() {
  return (
    <div className="flex min-h-dvh flex-col bg-background animate-pulse">
      <TopbarLoading haveBackButton />

      <div className="flex flex-col items-center pt-6">
        <div className="size-16 shrink-0 rounded-full bg-muted-foreground/15" />
        <div className="mt-2 h-2.5 w-24 rounded-full bg-muted-foreground/15" />
      </div>

      <div className="flex flex-1 flex-col gap-5 px-4 pt-8">
        <div className="h-14 w-full rounded-2xl bg-muted" />

        <div className="flex flex-col gap-2">
          <div className="h-2.5 w-20 rounded-full bg-muted-foreground/20" />
          <div className="h-9 w-full rounded-lg bg-muted-foreground/10" />
        </div>

        <div className="flex flex-col gap-2">
          <div className="h-2.5 w-32 rounded-full bg-muted-foreground/20" />
          <div className="h-9 w-full rounded-lg bg-muted-foreground/10" />
        </div>

        <div className="mt-auto flex flex-col items-center gap-3 pt-8 pb-6">
          <div className="h-12 w-full rounded-xl bg-muted-foreground/15" />
          <div className="h-2.5 w-20 rounded-full bg-muted-foreground/15" />
        </div>
      </div>
    </div>
  );
}
