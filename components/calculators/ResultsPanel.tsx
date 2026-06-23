type ResultsPanelProps = {
  children: React.ReactNode;
  emptyMessage?: string;
  hasResults?: boolean;
};

export function ResultsPanel({
  children,
  emptyMessage = "Enter your details to see results.",
  hasResults = true,
}: ResultsPanelProps) {
  return (
    <div className="mt-8 rounded-xl bg-muted-bg p-6">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-muted">
        Your estimate
      </h3>
      {hasResults ? (
        <div className="mt-4">{children}</div>
      ) : (
        <p className="mt-4 text-sm text-muted">{emptyMessage}</p>
      )}
    </div>
  );
}
