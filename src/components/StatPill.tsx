interface Props {
  label: string;
  value: string | number;
}

export function StatPill({ label, value }: Props) {
  return (
    <div className="flex flex-col items-center justify-center min-w-0 px-2 py-3 rounded-2xl bg-zinc-900/[0.04] dark:bg-white/[0.06]">
      <span className="text-lg font-semibold tracking-tight tabular-nums">{value}</span>
      <span className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5 text-center leading-tight">
        {label}
      </span>
    </div>
  );
}
