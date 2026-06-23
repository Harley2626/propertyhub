"use client";

import { CalculatorFieldGrid } from "@/components/calculators/CalculatorFieldGrid";
import { CalculatorShell } from "@/components/calculators/CalculatorShell";
import { CurrencyInput } from "@/components/calculators/CurrencyInput";
import { NumberInput } from "@/components/calculators/NumberInput";
import { ResultRow } from "@/components/calculators/ResultRow";
import { ResultsPanel } from "@/components/calculators/ResultsPanel";
import { useCurrencyInput, useNumberInput } from "@/components/calculators/hooks";
import { calculateCompoundInterest } from "@/lib/calculators/compound-interest";
import { formatZAR } from "@/lib/format/currency";

export function CompoundInterestCalculator() {
  const principal = useCurrencyInput(50_000);
  const monthly = useCurrencyInput(2_000);
  const rate = useNumberInput(10, 1);
  const years = useNumberInput(20);

  const result = calculateCompoundInterest(
    principal.value,
    monthly.value,
    rate.value,
    years.value,
  );
  const hasResults = years.value > 0 && (principal.value > 0 || monthly.value > 0);

  return (
    <CalculatorShell title="Compound Interest Calculator">
      <CalculatorFieldGrid>
        <CurrencyInput id="initial" label="Initial investment" value={principal.inputValue} onChange={principal.onChange} placeholder="e.g. 50 000" />
        <CurrencyInput id="monthly" label="Monthly contribution" value={monthly.inputValue} onChange={monthly.onChange} placeholder="e.g. 2 000" />
        <NumberInput id="return-rate" label="Expected annual return" value={rate.inputValue} onChange={rate.onChange} suffix="%" decimals={1} />
        <NumberInput id="years" label="Investment period" value={years.inputValue} onChange={years.onChange} suffix="yrs" />
      </CalculatorFieldGrid>
      <ResultsPanel hasResults={hasResults}>
        <ResultRow label="Future value" value={formatZAR(result.futureValue)} highlight />
        <ResultRow label="Total contributions" value={formatZAR(result.totalContributions)} />
        <ResultRow label="Total interest earned" value={formatZAR(result.totalInterest)} />
      </ResultsPanel>
    </CalculatorShell>
  );
}
