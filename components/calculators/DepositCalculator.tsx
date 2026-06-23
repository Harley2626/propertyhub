"use client";

import { CalculatorFieldGrid } from "@/components/calculators/CalculatorFieldGrid";
import { CalculatorShell } from "@/components/calculators/CalculatorShell";
import { CurrencyInput } from "@/components/calculators/CurrencyInput";
import { NumberInput } from "@/components/calculators/NumberInput";
import { ResultRow } from "@/components/calculators/ResultRow";
import { ResultsPanel } from "@/components/calculators/ResultsPanel";
import { useCurrencyInput, useNumberInput } from "@/components/calculators/hooks";
import { calculateDeposit } from "@/lib/calculators/deposit";
import { formatZAR } from "@/lib/format/currency";

export function DepositCalculator() {
  const price = useCurrencyInput(2_000_000);
  const depositPct = useNumberInput(10, 1);
  const saved = useCurrencyInput(80_000);

  const result = calculateDeposit(price.value, depositPct.value, saved.value);
  const hasResults = price.value > 0;

  return (
    <CalculatorShell title="Deposit Calculator">
      <CalculatorFieldGrid>
        <CurrencyInput id="property-price" label="Target property price" value={price.inputValue} onChange={price.onChange} />
        <NumberInput id="deposit-percent" label="Deposit percentage" value={depositPct.inputValue} onChange={depositPct.onChange} suffix="%" decimals={1} />
        <CurrencyInput id="amount-saved" label="Amount already saved" value={saved.inputValue} onChange={saved.onChange} placeholder="e.g. 80 000" />
      </CalculatorFieldGrid>
      <ResultsPanel hasResults={hasResults}>
        <ResultRow label="Deposit required" value={formatZAR(result.depositAmount)} highlight />
        <ResultRow label="Still need to save" value={formatZAR(result.remainingToSave)} />
        <ResultRow label="Transfer duty" value={formatZAR(result.transferDuty)} />
        <ResultRow label="Transfer costs (estimate)" value={formatZAR(result.transferCosts)} />
        <ResultRow label="Total upfront costs" value={formatZAR(result.totalUpfrontCosts)} sublabel="Deposit + transfer duty + transfer costs" />
      </ResultsPanel>
    </CalculatorShell>
  );
}
