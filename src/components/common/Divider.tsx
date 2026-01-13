type Props = {
  height?: string;
};

export function Divider({ height = "h-24" }: Props) {
  return (
    <div className={`relative ${height} flex items-center justify-center`}>
      <div className="h-px w-64 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  );
}
