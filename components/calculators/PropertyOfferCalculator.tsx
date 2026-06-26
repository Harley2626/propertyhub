"use client";

import { CalculatorFieldGrid } from "@/components/calculators/CalculatorFieldGrid";
import { CalculatorShell } from "@/components/calculators/CalculatorShell";
import { CurrencyInput } from "@/components/calculators/CurrencyInput";
import { NumberInput } from "@/components/calculators/NumberInput";
import { ResultRow } from "@/components/calculators/ResultRow";
import { ResultsPanel } from "@/components/calculators/ResultsPanel";
import { SelectInput } from "@/components/calculators/SelectInput";
import { useCurrencyInput, useNumberInput } from "@/components/calculators/hooks";
import {
  calculatePropertyOffer,
  type PropertyCondition,
  type PropertyType,
  type IntendedUse,
} from "@/lib/calculators/property-offer";
import { PROPERTY_FINANCE_DEFAULTS } from "@/lib/intelligence";
import { formatZAR } from "@/lib/format/currency";
import { useMemo, useState } from "react";

export function PropertyOfferCalculator() {
  const askingPrice = useCurrencyInput(2_500_000);
  const bedrooms = useNumberInput(3);
  const bathrooms = useNumberInput(2);
  const depositPct = useNumberInput(PROPERTY_FINANCE_DEFAULTS.depositPercent, 1);
  const rate = useNumberInput(PROPERTY_FINANCE_DEFAULTS.annualRatePercent, 1);
  const term = useNumberInput(PROPERTY_FINANCE_DEFAULTS.termYears);

  const [propertyType, setPropertyType] = useState<PropertyType>("house");
  const [condition, setCondition] = useState<PropertyCondition>("good");
  const [intendedUse, setIntendedUse] = useState<IntendedUse>("primary");

  const result = useMemo(
    () =>
      calculatePropertyOffer({
        askingPrice: askingPrice.value,
        propertyType,
        bedrooms: bedrooms.value,
        bathrooms: bathrooms.value,
        condition,
        intendedUse,
        depositPercent: depositPct.value,
        annualRatePercent: rate.value,
        termYears: term.value,
      }),
    [
      askingPrice.value,
      propertyType,
      bedrooms.value,
      bathrooms.value,
      condition,
      intendedUse,
      depositPct.value,
      rate.value,
      term.value,
    ],
  );

  const hasResults = askingPrice.value > 0;
  const finance = result.financeAtMaxOffer;

  return (
    <CalculatorShell
      title="Property Offer Calculator"
      subtitle="Plan your offer using the asking price and your finance assumptions. This is negotiation guidance — not a property valuation."
      disclaimer="Suggested offer ranges are based on typical negotiation patterns and your inputs only. They do not use comparable sales or automated valuations. Always confirm pricing with your estate agent."
    >
      <CalculatorFieldGrid>
        <CurrencyInput
          id="asking-price"
          label="Asking price"
          value={askingPrice.inputValue}
          onChange={askingPrice.onChange}
        />
        <SelectInput
          id="property-type"
          label="Property type"
          value={propertyType}
          onChange={(v) => setPropertyType(v as PropertyType)}
          options={[
            { value: "house", label: "Freehold house" },
            { value: "apartment", label: "Apartment / flat" },
            { value: "townhouse", label: "Townhouse" },
            { value: "cluster", label: "Cluster home" },
          ]}
        />
        <NumberInput
          id="bedrooms"
          label="Bedrooms"
          value={bedrooms.inputValue}
          onChange={bedrooms.onChange}
          onBlur={bedrooms.onBlur}
        />
        <NumberInput
          id="bathrooms"
          label="Bathrooms"
          value={bathrooms.inputValue}
          onChange={bathrooms.onChange}
          onBlur={bathrooms.onBlur}
        />
        <SelectInput
          id="condition"
          label="Estimated condition"
          value={condition}
          onChange={(v) => setCondition(v as PropertyCondition)}
          options={[
            { value: "excellent", label: "Excellent — move-in ready" },
            { value: "good", label: "Good — well maintained" },
            { value: "fair", label: "Fair — some updates needed" },
            { value: "needs-work", label: "Needs work — major repairs" },
          ]}
        />
        <SelectInput
          id="intended-use"
          label="Intended use"
          value={intendedUse}
          onChange={(v) => setIntendedUse(v as IntendedUse)}
          options={[
            { value: "primary", label: "Primary residence" },
            { value: "investment", label: "Investment / rental" },
          ]}
        />
        <NumberInput
          id="deposit-percent"
          label="Planned deposit"
          value={depositPct.inputValue}
          onChange={depositPct.onChange}
          onBlur={depositPct.onBlur}
          suffix="%"
          decimals={1}
        />
        <NumberInput
          id="interest-rate"
          label="Estimated interest rate"
          value={rate.inputValue}
          onChange={rate.onChange}
          onBlur={rate.onBlur}
          suffix="%"
        />
        <NumberInput
          id="bond-term"
          label="Bond term"
          value={term.inputValue}
          onChange={term.onChange}
          onBlur={term.onBlur}
          suffix="yrs"
        />
      </CalculatorFieldGrid>

      <ResultsPanel hasResults={hasResults}>
        <ResultRow
          label="Suggested offer range (guidance only)"
          value={`${formatZAR(result.suggestedOfferMin)} – ${formatZAR(result.suggestedOfferMax)}`}
          highlight
          sublabel={`${Math.round(result.discountFromAskingMin * 100)}–${Math.round(result.discountFromAskingMax * 100)}% below asking — not a valuation`}
        />
        <ResultRow
          label="Estimated cash required"
          value={formatZAR(finance.totalCashRequired)}
          sublabel="At top of offer range: deposit + transfer duty + transfer costs"
        />
        <ResultRow
          label="Transfer duty"
          value={formatZAR(finance.transferDuty)}
          sublabel={`Transfer costs estimate: ${formatZAR(finance.transferCosts)}`}
        />
        <ResultRow
          label="Bond repayment estimate"
          value={formatZAR(finance.monthlyBondRepayment)}
          sublabel={`Loan ${formatZAR(finance.loanAmount)} at ${rate.value}% over ${term.value} years`}
        />
        <ResultRow
          label="Deposit required"
          value={formatZAR(finance.depositAmount)}
        />
      </ResultsPanel>

      {hasResults && (
        <>
          <div className="mt-6 rounded-xl border border-border bg-background p-4">
            <h3 className="text-sm font-semibold text-foreground">
              Why this range?
            </h3>
            <ul className="mt-3 list-inside list-disc space-y-2 text-sm text-muted">
              {result.rationale.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="mt-4 rounded-xl border border-border bg-background p-4">
            <h3 className="text-sm font-semibold text-foreground">
              Negotiation checklist
            </h3>
            <ul className="mt-3 list-inside list-disc space-y-2 text-sm text-muted">
              {result.negotiationChecklist.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="mt-4 rounded-xl border border-border bg-background p-4">
            <h3 className="text-sm font-semibold text-foreground">
              Next steps for buyers
            </h3>
            <ol className="mt-3 list-inside list-decimal space-y-2 text-sm text-muted">
              {result.nextSteps.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </div>
        </>
      )}
    </CalculatorShell>
  );
}
