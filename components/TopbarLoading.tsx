interface TopbarLoadingProps {
  haveBackButton?: boolean;
}

const TopbarLoading = ({ haveBackButton = false }: TopbarLoadingProps) => {
  return (
    <div className="bg-primary px-4 py-4 pb-6 flex items-center gap-2">
      {haveBackButton && (
        <div className="size-5 shrink-0 rounded-full bg-white/25" />
      )}
      <div className="flex-1 flex flex-col gap-2">
        <div className="h-3 w-32 rounded-full bg-white/30" />
        <div className="h-2.5 w-16 rounded-full bg-white/20" />
      </div>
      <div className="size-9 shrink-0 rounded-full bg-white/25" />
    </div>
  );
};

export default TopbarLoading;
