"use client";

import { CalculatorFieldGrid } from "@/components/calculators/CalculatorFieldGrid";
import { CalculatorShell } from "@/components/calculators/CalculatorShell";
import { CurrencyInput } from "@/components/calculators/CurrencyInput";
import { NumberInput } from "@/components/calculators/NumberInput";
import { ResultRow } from "@/components/calculators/ResultRow";
import { ResultsPanel } from "@/components/calculators/ResultsPanel";
import { useCurrencyInput, useNumberInput } from "@/components/calculators/hooks";
import { calculateBond } from "@/lib/calculators/bond";
import { formatZAR } from "@/lib/format/currency";

export function BondCalculator() {
  const loan = useCurrencyInput(2_000_000);
  const rate = useNumberInput(10, 1);
  const term = useNumberInput(20);

  const result = calculateBond(loan.value, rate.value, term.value);
  const hasResults = loan.value > 0 && term.value > 0;

  return (
    <CalculatorShell
      title="Bond Calculator"
      subtitle="Standard amortization with monthly compounding. Enter the annual interest rate as a percentage (e.g. 10 for 10%)."
      disclaimer="Estimates only. Actual repayments may differ based on bank fees, insurance, and rate concessions."
    >
      <CalculatorFieldGrid>
        <CurrencyInput id="loan-amount" label="Loan amount" value={loan.inputValue} onChange={loan.onChange} />
        <NumberInput id="interest-rate" label="Interest rate (per year)" value={rate.inputValue} onChange={rate.onChange} onBlur={rate.onBlur} suffix="%" placeholder="e.g. 10" />
        <NumberInput id="loan-term" label="Loan term" value={term.inputValue} onChange={term.onChange} onBlur={term.onBlur} suffix="yrs" placeholder="e.g. 20" />
      </CalculatorFieldGrid>
      <ResultsPanel hasResults={hasResults}>
        <ResultRow label="Monthly repayment" value={formatZAR(result.monthlyPayment)} highlight />
        <ResultRow label="Total amount payable" value={formatZAR(result.totalPayment)} sublabel={`${term.value * 12} monthly payments`} />
        <ResultRow label="Total interest paid" value={formatZAR(result.totalInterest)} />
      </ResultsPanel>

      <details className="mt-6 rounded-xl border border-border bg-background">
        <summary className="cursor-pointer px-4 py-3 text-sm font-medium text-foreground">
          How this is calculated
        </summary>
        <div className="space-y-3 px-4 pb-4 text-sm text-muted">
          <p>Standard mortgage amortization formula:</p>
          <p className="rounded-lg bg-muted-bg px-3 py-2 font-mono text-xs text-foreground">
            Payment = P × [r(1 + r)ⁿ] / [(1 + r)ⁿ − 1]
          </p>
          <ul className="list-inside list-disc space-y-1 text-xs">
            <li><strong className="text-foreground">P</strong> — loan amount</li>
            <li><strong className="text-foreground">r</strong> — annual rate ÷ 100 ÷ 12</li>
            <li><strong className="text-foreground">n</strong> — loan term × 12 months</li>
          </ul>
          <p className="text-xs">
            Example: R2 000 000 at 10% over 20 years → ≈ R19 300/month, ≈ R4.6m total.
          </p>
        </div>
      </details>
    </CalculatorShell>
  );
}
