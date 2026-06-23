"use client";

import { CalculatorFieldGrid } from "@/components/calculators/CalculatorFieldGrid";
import { CalculatorShell } from "@/components/calculators/CalculatorShell";
import { CurrencyInput } from "@/components/calculators/CurrencyInput";
import { NumberInput } from "@/components/calculators/NumberInput";
import { ResultRow } from "@/components/calculators/ResultRow";
import { ResultsPanel } from "@/components/calculators/ResultsPanel";
import { useCurrencyInput, useNumberInput } from "@/components/calculators/hooks";
import { calculateInflation } from "@/lib/calculators/inflation";
import { formatZAR } from "@/lib/format/currency";

export function InflationCalculator() {
  const amount = useCurrencyInput(100_000);
  const rate = useNumberInput(5.5, 1);
  const years = useNumberInput(10);

  const result = calculateInflation(amount.value, rate.value, years.value);
  const hasResults = amount.value > 0 && years.value > 0;

  return (
    <CalculatorShell title="Inflation Calculator">
      <CalculatorFieldGrid>
        <CurrencyInput id="amount" label="Amount in today's rands" value={amount.inputValue} onChange={amount.onChange} placeholder="e.g. 100 000" />
        <NumberInput id="inflation-rate" label="Annual inflation rate" value={rate.inputValue} onChange={rate.onChange} suffix="%" decimals={1} />
        <NumberInput id="years" label="Number of years" value={years.inputValue} onChange={years.onChange} suffix="yrs" />
      </CalculatorFieldGrid>
      <ResultsPanel hasResults={hasResults}>
        <ResultRow label="Future cost" value={formatZAR(result.futureValue)} highlight sublabel="Amount needed to match today's purchasing power" />
        <ResultRow label="Future purchasing power" value={formatZAR(result.equivalentToday)} sublabel="What today's amount will be worth" />
        <ResultRow label="Purchasing power lost" value={formatZAR(result.purchasingPowerLoss)} />
      </ResultsPanel>
    </CalculatorShell>
  );
}
