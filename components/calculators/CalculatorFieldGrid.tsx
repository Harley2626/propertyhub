type CalculatorFieldGridProps = {
  children: React.ReactNode;
  columns?: 1 | 2;
};

export function CalculatorFieldGrid({
  children,
  columns = 2,
}: CalculatorFieldGridProps) {
  return (
    <div
      className={
        columns === 2
          ? "grid gap-5 sm:grid-cols-2"
          : "grid gap-5"
      }
    >
      {children}
    </div>
  );
}
