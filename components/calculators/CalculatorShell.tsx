type CalculatorShellProps = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  disclaimer?: string;
};

export function CalculatorShell({
  title,
  subtitle = "Results update automatically as you type.",
  children,
  disclaimer,
}: CalculatorShellProps) {
  return (
    <section aria-labelledby="calculator-heading">
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
        <div className="mb-8">
          <h2
            id="calculator-heading"
            className="text-xl font-semibold text-foreground"
          >
            {title}
          </h2>
          {subtitle && <p className="mt-1 text-sm text-muted">{subtitle}</p>}
        </div>
        {children}
        {disclaimer && (
          <p className="mt-4 text-xs leading-relaxed text-muted">{disclaimer}</p>
        )}
      </div>
    </section>
  );
}
