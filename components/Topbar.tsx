interface TopbarProps {
  title: string;
}

export function Topbar({ title }: TopbarProps) {
  return (
    <div className="bg-primary px-4 py-4">
      <p className="text-primary-foreground text-[15px] font-medium m-0">
        {title}
      </p>
    </div>
  );
}
