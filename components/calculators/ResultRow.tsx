type ResultRowProps = {
  label: string;
  value: string;
  highlight?: boolean;
  sublabel?: string;
};

export function ResultRow({
  label,
  value,
  highlight = false,
  sublabel,
}: ResultRowProps) {
  return (
    <div
      className={`flex items-start justify-between gap-4 py-3 ${
        highlight
          ? "border-t-2 border-accent pt-4"
          : "border-t border-border first:border-t-0 first:pt-0"
      }`}
    >
      <div>
        <p
          className={`text-sm ${highlight ? "font-semibold text-foreground" : "text-muted"}`}
        >
          {label}
        </p>
        {sublabel && (
          <p className="mt-0.5 text-xs text-muted">{sublabel}</p>
        )}
      </div>
      <p
        className={`shrink-0 text-right tabular-nums ${
          highlight
            ? "text-xl font-bold text-accent"
            : "text-sm font-semibold text-foreground"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
