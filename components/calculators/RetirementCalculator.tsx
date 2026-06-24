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
  const savings = useCurrencyInput(160_000);
  const income = useCurrencyInput(25_000);
  const contribution = useCurrencyInput(3_000);
  const rate = useNumberInput(10, 1);

  const result = calculateRetirement(
    age.value,
    retireAge.value,
    savings.value,
    income.value,
    contribution.value,
    rate.value,
  );
  const hasResults = retireAge.value > age.value;

  return (
    <CalculatorShell
      title="Retirement Calculator"
      subtitle="Projects savings with monthly compounding. Uses the 4% withdrawal rule for the required nest egg."
    >
      <CalculatorFieldGrid>
        <NumberInput id="current-age" label="Current age" value={age.inputValue} onChange={age.onChange} onBlur={age.onBlur} suffix="yrs" />
        <NumberInput id="retirement-age" label="Retirement age" value={retireAge.inputValue} onChange={retireAge.onChange} onBlur={retireAge.onBlur} suffix="yrs" />
        <CurrencyInput id="current-savings" label="Current retirement savings" value={savings.inputValue} onChange={savings.onChange} placeholder="e.g. 160 000" />
        <CurrencyInput id="desired-income" label="Desired monthly retirement income" value={income.inputValue} onChange={income.onChange} placeholder="e.g. 25 000" />
        <CurrencyInput id="monthly-contribution" label="Monthly contribution" value={contribution.inputValue} onChange={contribution.onChange} placeholder="e.g. 3 000" />
        <NumberInput id="annual-return" label="Expected annual return" value={rate.inputValue} onChange={rate.onChange} onBlur={rate.onBlur} suffix="%" placeholder="e.g. 10" />
      </CalculatorFieldGrid>
      <ResultsPanel hasResults={hasResults}>
        <ResultRow label="Projected savings at retirement" value={formatZAR(result.projectedSavings)} highlight />
        <ResultRow label="Total contributions" value={formatZAR(result.totalContributions)} />
        <ResultRow label="Total interest earned" value={formatZAR(result.totalInterest)} />
        {income.value > 0 && (
          <>
            <ResultRow label="Required nest egg" value={formatZAR(result.requiredNestEgg)} sublabel="4% rule: (monthly income × 12) ÷ 0.04" />
            <ResultRow
              label={result.onTrack ? "On track" : "Not on track"}
              value={result.onTrack ? "Yes" : "No"}
            />
            {!result.onTrack && (
              <ResultRow label="Extra monthly saving needed" value={formatZAR(result.monthlyShortfall)} />
            )}
          </>
        )}
      </ResultsPanel>

      <details className="mt-6 rounded-xl border border-border bg-background">
        <summary className="cursor-pointer px-4 py-3 text-sm font-medium text-foreground">
          How this is calculated
        </summary>
        <div className="space-y-3 px-4 pb-4 text-sm text-muted">
          <p>
            Monthly compounding formula (end-of-month contributions):
          </p>
          <p className="rounded-lg bg-muted-bg px-3 py-2 font-mono text-xs text-foreground">
            FV = P × (1 + r)ⁿ + PMT × [(1 + r)ⁿ − 1] / r
          </p>
          <ul className="list-inside list-disc space-y-1 text-xs">
            <li><strong className="text-foreground">P</strong> — current savings</li>
            <li><strong className="text-foreground">PMT</strong> — monthly contribution</li>
            <li><strong className="text-foreground">r</strong> — annual return ÷ 100 ÷ 12</li>
            <li><strong className="text-foreground">n</strong> — years to retirement × 12</li>
          </ul>
          <p className="text-xs">
            Example at 10% over 30 years: R160 000 + R3 000/month ≈ R9.9 million projected.
          </p>
        </div>
      </details>
    </CalculatorShell>
  );
}
