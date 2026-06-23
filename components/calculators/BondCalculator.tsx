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
  const rate = useNumberInput(11.5, 1);
  const term = useNumberInput(20);

  const result = calculateBond(loan.value, rate.value, term.value);
  const hasResults = loan.value > 0 && term.value > 0;

  return (
    <CalculatorShell
      title="Bond Calculator"
      disclaimer="Estimates only. Actual repayments may differ based on bank fees, insurance, and rate concessions."
    >
      <CalculatorFieldGrid>
        <CurrencyInput id="loan-amount" label="Loan amount" value={loan.inputValue} onChange={loan.onChange} />
        <NumberInput id="interest-rate" label="Interest rate" value={rate.inputValue} onChange={rate.onChange} suffix="%" decimals={1} placeholder="e.g. 11.5" />
        <NumberInput id="loan-term" label="Loan term" value={term.inputValue} onChange={term.onChange} suffix="yrs" placeholder="e.g. 20" />
      </CalculatorFieldGrid>
      <ResultsPanel hasResults={hasResults}>
        <ResultRow label="Monthly repayment" value={formatZAR(result.monthlyPayment)} highlight />
        <ResultRow label="Total amount payable" value={formatZAR(result.totalPayment)} />
        <ResultRow label="Total interest paid" value={formatZAR(result.totalInterest)} />
      </ResultsPanel>
    </CalculatorShell>
  );
}
