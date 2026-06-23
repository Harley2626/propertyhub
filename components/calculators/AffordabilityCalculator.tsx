"use client";

import { CalculatorFieldGrid } from "@/components/calculators/CalculatorFieldGrid";
import { CalculatorShell } from "@/components/calculators/CalculatorShell";
import { CurrencyInput } from "@/components/calculators/CurrencyInput";
import { NumberInput } from "@/components/calculators/NumberInput";
import { ResultRow } from "@/components/calculators/ResultRow";
import { ResultsPanel } from "@/components/calculators/ResultsPanel";
import { useCurrencyInput, useNumberInput } from "@/components/calculators/hooks";
import { calculateAffordability } from "@/lib/calculators/affordability";
import { formatZAR } from "@/lib/format/currency";

export function AffordabilityCalculator() {
  const income = useCurrencyInput(45_000);
  const debt = useCurrencyInput(5_000);
  const rate = useNumberInput(11.5, 1);
  const term = useNumberInput(20);

  const result = calculateAffordability(
    income.value,
    debt.value,
    rate.value,
    term.value,
  );
  const hasResults = income.value > 0;

  return (
    <CalculatorShell
      title="Affordability Calculator"
      subtitle="Based on a 30% bond-to-income ratio. Indicative only — banks apply their own criteria."
    >
      <CalculatorFieldGrid>
        <CurrencyInput id="gross-income" label="Gross monthly income" value={income.inputValue} onChange={income.onChange} placeholder="e.g. 45 000" />
        <CurrencyInput id="existing-debt" label="Existing monthly debt" value={debt.inputValue} onChange={debt.onChange} placeholder="e.g. 5 000" />
        <NumberInput id="interest-rate" label="Estimated interest rate" value={rate.inputValue} onChange={rate.onChange} suffix="%" decimals={1} />
        <NumberInput id="loan-term" label="Loan term" value={term.inputValue} onChange={term.onChange} suffix="yrs" />
      </CalculatorFieldGrid>
      <ResultsPanel hasResults={hasResults}>
        <ResultRow label="Max property price" value={formatZAR(result.maxPropertyPrice)} highlight sublabel="Assuming 10% deposit" />
        <ResultRow label="Max loan amount" value={formatZAR(result.maxLoanAmount)} />
        <ResultRow label="Max monthly bond payment" value={formatZAR(result.maxMonthlyPayment)} />
        <ResultRow label="Recommended deposit (10%)" value={formatZAR(result.recommendedDeposit)} />
      </ResultsPanel>
    </CalculatorShell>
  );
}
