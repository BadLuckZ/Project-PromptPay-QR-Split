export default function ProfileLoading() {
  return (
    <main
      aria-busy="true"
      aria-label="กำลังโหลด"
      className="flex flex-1 animate-pulse flex-col gap-3 px-4 py-6"
    >
      <div className="flex h-11 items-center gap-3">
        <div className="size-6 rounded-full bg-surface-muted-hover" />
        <div className="h-6 w-24 rounded-full bg-surface-muted-hover" />
      </div>

      <div className="flex flex-col gap-6 rounded-sm bg-surface px-6 py-6">
        <div className="size-18 self-center rounded-full bg-surface-muted" />
        <div className="flex items-center gap-3">
          <div className="size-9 shrink-0 rounded-full bg-surface-muted" />
          <div className="h-3 flex-1 rounded-full bg-surface-muted" />
        </div>
        <div className="flex flex-col gap-4">
          {["w-20", "w-32"].map((w) => (
            <div key={w} className="flex flex-col gap-2">
              <div className={`h-3 ${w} rounded-full bg-surface-muted`} />
              <div className="h-8 w-full rounded-sm bg-surface-muted" />
            </div>
          ))}
        </div>
      </div>

      <div className="h-12 w-full rounded-md bg-surface-muted-hover" />
      <div className="h-11 w-full rounded-md bg-surface-muted-hover" />
    </main>
  );
}
