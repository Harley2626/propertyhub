"use client";

import { CalculatorFieldGrid } from "@/components/calculators/CalculatorFieldGrid";
import { CalculatorShell } from "@/components/calculators/CalculatorShell";
import { CurrencyInput } from "@/components/calculators/CurrencyInput";
import { NumberInput } from "@/components/calculators/NumberInput";
import { SelectInput } from "@/components/calculators/SelectInput";
import { ResultRow } from "@/components/calculators/ResultRow";
import { ResultsPanel } from "@/components/calculators/ResultsPanel";
import { useCurrencyInput, useNumberInput } from "@/components/calculators/hooks";
import { calculateCapitalGainsTax } from "@/lib/calculators/capital-gains-tax";
import { formatZAR } from "@/lib/format/currency";
import { formatPercent } from "@/lib/format/numbers";
import { useState } from "react";

export function CapitalGainsTaxCalculator() {
  const sale = useCurrencyInput(3_000_000);
  const cost = useCurrencyInput(1_800_000);
  const taxRate = useNumberInput(31, 1);
  const [isPrimary, setIsPrimary] = useState("no");

  const result = calculateCapitalGainsTax(
    sale.value,
    cost.value,
    taxRate.value,
    isPrimary === "yes",
  );
  const hasResults = sale.value > 0;

  return (
    <CalculatorShell
      title="Capital Gains Tax Calculator"
      subtitle="40% inclusion rate for individuals. Primary residence R2m exclusion available."
    >
      <CalculatorFieldGrid>
        <CurrencyInput id="sale-price" label="Sale price" value={sale.inputValue} onChange={sale.onChange} />
        <CurrencyInput id="base-cost" label="Base cost (purchase + improvements)" value={cost.inputValue} onChange={cost.onChange} />
        <NumberInput id="marginal-rate" label="Marginal tax rate" value={taxRate.inputValue} onChange={taxRate.onChange} suffix="%" decimals={1} />
        <SelectInput
          id="primary-residence"
          label="Primary residence?"
          value={isPrimary}
          onChange={setIsPrimary}
          options={[
            { value: "no", label: "No" },
            { value: "yes", label: "Yes (R2m exclusion)" },
          ]}
        />
      </CalculatorFieldGrid>
      <ResultsPanel hasResults={hasResults}>
        <ResultRow label="Capital gain" value={formatZAR(result.capitalGain)} />
        {result.exclusionApplied > 0 && (
          <ResultRow label="Primary residence exclusion" value={formatZAR(result.exclusionApplied)} />
        )}
        <ResultRow label="Taxable gain (after inclusion)" value={formatZAR(result.taxableGain)} sublabel={`${formatPercent(result.inclusionRate)} inclusion rate`} />
        <ResultRow label="Estimated CGT payable" value={formatZAR(result.cgtPayable)} highlight />
      </ResultsPanel>
    </CalculatorShell>
  );
}
