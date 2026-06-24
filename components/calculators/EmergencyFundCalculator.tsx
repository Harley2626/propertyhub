"use client";

import { CalculatorFieldGrid } from "@/components/calculators/CalculatorFieldGrid";
import { CalculatorShell } from "@/components/calculators/CalculatorShell";
import { CurrencyInput } from "@/components/calculators/CurrencyInput";
import { NumberInput } from "@/components/calculators/NumberInput";
import { ResultRow } from "@/components/calculators/ResultRow";
import { ResultsPanel } from "@/components/calculators/ResultsPanel";
import { useCurrencyInput, useNumberInput } from "@/components/calculators/hooks";
import { calculateEmergencyFund } from "@/lib/calculators/emergency-fund";
import { formatZAR } from "@/lib/format/currency";
import { formatPercent } from "@/lib/format/numbers";

export function EmergencyFundCalculator() {
  const expenses = useCurrencyInput(20_000);
  const months = useNumberInput(6);
  const saved = useCurrencyInput(30_000);

  const result = calculateEmergencyFund(expenses.value, months.value, saved.value);
  const hasResults = expenses.value > 0 && months.value > 0;

  return (
    <CalculatorShell
      title="Emergency Fund Calculator"
      subtitle="Target fund = monthly essential expenses × months of cover."
    >
      <CalculatorFieldGrid>
        <CurrencyInput id="monthly-expenses" label="Monthly essential expenses" value={expenses.inputValue} onChange={expenses.onChange} placeholder="e.g. 20 000" />
        <NumberInput id="target-months" label="Target months of cover" value={months.inputValue} onChange={months.onChange} onBlur={months.onBlur} suffix="months" placeholder="e.g. 6" />
        <CurrencyInput id="amount-saved" label="Amount already saved" value={saved.inputValue} onChange={saved.onChange} placeholder="e.g. 30 000" />
      </CalculatorFieldGrid>
      <ResultsPanel hasResults={hasResults}>
        <ResultRow label="Target emergency fund" value={formatZAR(result.targetFund)} highlight />
        <ResultRow label="Still need to save" value={formatZAR(result.remainingToSave)} />
        <ResultRow label="Progress" value={formatPercent(result.percentComplete)} />
        <ResultRow label="Current months of cover" value={result.monthsOfCover.toFixed(1)} sublabel="Based on saved amount" />
      </ResultsPanel>
    </CalculatorShell>
  );
}
