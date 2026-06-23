"use client";

import { CalculatorFieldGrid } from "@/components/calculators/CalculatorFieldGrid";
import { CalculatorShell } from "@/components/calculators/CalculatorShell";
import { CurrencyInput } from "@/components/calculators/CurrencyInput";
import { ResultRow } from "@/components/calculators/ResultRow";
import { ResultsPanel } from "@/components/calculators/ResultsPanel";
import { useCurrencyInput } from "@/components/calculators/hooks";
import { calculateRentalYield } from "@/lib/calculators/rental-yield";
import { formatZAR } from "@/lib/format/currency";
import { formatPercent } from "@/lib/format/numbers";

export function RentalYieldCalculator() {
  const value = useCurrencyInput(1_800_000);
  const rent = useCurrencyInput(12_000);
  const expenses = useCurrencyInput(2_500);

  const result = calculateRentalYield(value.value, rent.value, expenses.value);
  const hasResults = value.value > 0;

  return (
    <CalculatorShell title="Rental Yield Calculator">
      <CalculatorFieldGrid>
        <CurrencyInput id="property-value" label="Property value" value={value.inputValue} onChange={value.onChange} />
        <CurrencyInput id="monthly-rent" label="Monthly rental income" value={rent.inputValue} onChange={rent.onChange} placeholder="e.g. 12 000" />
        <CurrencyInput id="monthly-expenses" label="Monthly expenses" value={expenses.inputValue} onChange={expenses.onChange} placeholder="e.g. 2 500" />
      </CalculatorFieldGrid>
      <ResultsPanel hasResults={hasResults}>
        <ResultRow label="Gross rental yield" value={formatPercent(result.grossYield)} highlight />
        <ResultRow label="Net rental yield" value={formatPercent(result.netYield)} />
        <ResultRow label="Annual rental income" value={formatZAR(result.annualRent)} />
        <ResultRow label="Net annual income" value={formatZAR(result.netAnnualIncome)} sublabel="After expenses" />
      </ResultsPanel>
    </CalculatorShell>
  );
}
