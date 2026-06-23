"use client";

import { CalculatorFieldGrid } from "@/components/calculators/CalculatorFieldGrid";
import { CalculatorShell } from "@/components/calculators/CalculatorShell";
import { CurrencyInput } from "@/components/calculators/CurrencyInput";
import { SelectInput } from "@/components/calculators/SelectInput";
import { ResultRow } from "@/components/calculators/ResultRow";
import { ResultsPanel } from "@/components/calculators/ResultsPanel";
import { useCurrencyInput } from "@/components/calculators/hooks";
import {
  calculateIncomeTax,
  TAX_YEAR_LABEL,
  type AgeGroup,
} from "@/lib/calculators/income-tax";
import { formatZAR } from "@/lib/format/currency";
import { formatPercent } from "@/lib/format/numbers";
import { useState } from "react";

export function IncomeTaxCalculator() {
  const salary = useCurrencyInput(600_000);
  const [ageGroup, setAgeGroup] = useState<AgeGroup>("under65");

  const result = calculateIncomeTax(salary.value, ageGroup);
  const hasResults = salary.value > 0;

  return (
    <CalculatorShell
      title="Income Tax Calculator South Africa"
      subtitle={`SARS rates for tax year ${TAX_YEAR_LABEL}. Excludes UIF, medical credits, and deductions.`}
    >
      <CalculatorFieldGrid>
        <CurrencyInput id="annual-income" label="Annual taxable income" value={salary.inputValue} onChange={salary.onChange} placeholder="e.g. 600 000" />
        <SelectInput
          id="age-group"
          label="Age group"
          value={ageGroup}
          onChange={(v) => setAgeGroup(v as AgeGroup)}
          options={[
            { value: "under65", label: "Under 65" },
            { value: "65to74", label: "65 to 74" },
            { value: "75plus", label: "75 and over" },
          ]}
        />
      </CalculatorFieldGrid>
      <ResultsPanel hasResults={hasResults}>
        <ResultRow label="Estimated annual tax" value={formatZAR(result.netTax)} highlight />
        <ResultRow label="Monthly tax (PAYE estimate)" value={formatZAR(result.monthlyTax)} />
        <ResultRow label="Estimated take-home pay" value={formatZAR(result.takeHomeMonthly)} sublabel="Per month after tax" />
        <ResultRow label="Effective tax rate" value={formatPercent(result.effectiveRate)} />
        <ResultRow label="Marginal tax rate" value={formatPercent(result.marginalRate)} />
        <ResultRow label="Tax rebates applied" value={formatZAR(result.rebates)} />
      </ResultsPanel>
    </CalculatorShell>
  );
}
