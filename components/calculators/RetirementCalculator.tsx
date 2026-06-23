"use client";

import { CalculatorFieldGrid } from "@/components/calculators/CalculatorFieldGrid";
import { CalculatorShell } from "@/components/calculators/CalculatorShell";
import { CurrencyInput } from "@/components/calculators/CurrencyInput";
import { NumberInput } from "@/components/calculators/NumberInput";
import { ResultRow } from "@/components/calculators/ResultRow";
import { ResultsPanel } from "@/components/calculators/ResultsPanel";
import { useCurrencyInput, useNumberInput } from "@/components/calculators/hooks";
import { calculateRetirement } from "@/lib/calculators/retirement";
import { formatZAR } from "@/lib/format/currency";

export function RetirementCalculator() {
  const age = useNumberInput(35);
  const retireAge = useNumberInput(65);
  const savings = useCurrencyInput(500_000);
  const income = useCurrencyInput(25_000);
  const contribution = useCurrencyInput(3_000);
  const rate = useNumberInput(8, 1);

  const result = calculateRetirement(
    age.value,
    retireAge.value,
    savings.value,
    income.value,
    contribution.value,
    rate.value,
  );
  const hasResults = retireAge.value > age.value && income.value > 0;

  return (
    <CalculatorShell
      title="Retirement Calculator"
      subtitle="Uses the 4% withdrawal rule to estimate required retirement savings."
    >
      <CalculatorFieldGrid>
        <NumberInput id="current-age" label="Current age" value={age.inputValue} onChange={age.onChange} suffix="yrs" />
        <NumberInput id="retirement-age" label="Retirement age" value={retireAge.inputValue} onChange={retireAge.onChange} suffix="yrs" />
        <CurrencyInput id="current-savings" label="Current retirement savings" value={savings.inputValue} onChange={savings.onChange} placeholder="e.g. 500 000" />
        <CurrencyInput id="desired-income" label="Desired monthly retirement income" value={income.inputValue} onChange={income.onChange} placeholder="e.g. 25 000" />
        <CurrencyInput id="monthly-contribution" label="Monthly contribution" value={contribution.inputValue} onChange={contribution.onChange} placeholder="e.g. 3 000" />
        <NumberInput id="annual-return" label="Expected annual return" value={rate.inputValue} onChange={rate.onChange} suffix="%" decimals={1} />
      </CalculatorFieldGrid>
      <ResultsPanel hasResults={hasResults}>
        <ResultRow
          label={result.onTrack ? "On track" : "Not on track"}
          value={result.onTrack ? "Yes" : "No"}
          highlight
        />
        <ResultRow label="Projected savings at retirement" value={formatZAR(result.projectedSavings)} />
        <ResultRow label="Required nest egg" value={formatZAR(result.requiredNestEgg)} sublabel="Based on 4% withdrawal rule" />
        {!result.onTrack && (
          <ResultRow label="Extra monthly saving needed" value={formatZAR(result.monthlyShortfall)} />
        )}
      </ResultsPanel>
    </CalculatorShell>
  );
}
