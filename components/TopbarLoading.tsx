interface TopbarLoadingProps {
  haveBackButton?: boolean;
  haveProfile?: boolean;
  haveSubtitle?: boolean;
  haveSummary?: boolean;
}

const TopbarLoading = ({
  haveBackButton = false,
  haveSubtitle = false,
  haveProfile = false,
  haveSummary = false,
}: TopbarLoadingProps) => {
  return (
    <div className="bg-linear-to-b from-primary-dark to-primary">
      <div className="px-4 pt-4 flex items-center gap-2">
        {haveBackButton && (
          <div className="size-5 shrink-0 rounded-full bg-white/25" />
        )}
        <div className="flex-1 flex flex-col gap-2">
          <div className="h-4 w-32 rounded-full bg-white/30" />
          {haveSubtitle && (
            <div className="h-2.5 w-16 rounded-full bg-white/20" />
          )}
        </div>
        {haveProfile && (
          <div className="size-10 shrink-0 rounded-full bg-white/25" />
        )}
      </div>

      {haveSummary && (
        <div className="px-4 pt-5 flex flex-col gap-2">
          <div className="h-2.5 w-24 rounded-full bg-white/20" />
          <div className="h-9 w-40 rounded-full bg-white/30" />
          <div className="h-2.5 w-20 rounded-full bg-white/20" />
        </div>
      )}

      <div className="mt-5 h-5 rounded-t-3xl bg-background" />
    </div>
  );
};

export default TopbarLoading;
