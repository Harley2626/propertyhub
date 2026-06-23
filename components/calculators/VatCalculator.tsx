"use client";

import { CalculatorFieldGrid } from "@/components/calculators/CalculatorFieldGrid";
import { CalculatorShell } from "@/components/calculators/CalculatorShell";
import { CurrencyInput } from "@/components/calculators/CurrencyInput";
import { SelectInput } from "@/components/calculators/SelectInput";
import { ResultRow } from "@/components/calculators/ResultRow";
import { ResultsPanel } from "@/components/calculators/ResultsPanel";
import { useCurrencyInput } from "@/components/calculators/hooks";
import { calculateVat, VAT_RATE, type VatMode } from "@/lib/calculators/vat";
import { formatZAR } from "@/lib/format/currency";
import { useState } from "react";

export function VatCalculator() {
  const amount = useCurrencyInput(1_150);
  const [mode, setMode] = useState<VatMode>("remove");

  const result = calculateVat(amount.value, mode);
  const hasResults = amount.value > 0;

  return (
    <CalculatorShell
      title="VAT Calculator South Africa"
      subtitle={`Standard VAT rate: ${VAT_RATE}%. For zero-rated or exempt items, consult SARS.`}
    >
      <CalculatorFieldGrid>
        <CurrencyInput id="vat-amount" label="Amount" value={amount.inputValue} onChange={amount.onChange} placeholder="e.g. 1 150" />
        <SelectInput
          id="vat-mode"
          label="Calculation type"
          value={mode}
          onChange={(v) => setMode(v as VatMode)}
          options={[
            { value: "add", label: "Add VAT (excl. → incl.)" },
            { value: "remove", label: "Remove VAT (incl. → excl.)" },
          ]}
        />
      </CalculatorFieldGrid>
      <ResultsPanel hasResults={hasResults}>
        <ResultRow label="Amount excl. VAT" value={formatZAR(result.amountExclVat)} />
        <ResultRow label="VAT amount (15%)" value={formatZAR(result.vatAmount)} highlight />
        <ResultRow label="Amount incl. VAT" value={formatZAR(result.amountInclVat)} />
      </ResultsPanel>
    </CalculatorShell>
  );
}
