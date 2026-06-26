"use client";

import { CalculatorFieldGrid } from "@/components/calculators/CalculatorFieldGrid";
import { CalculatorShell } from "@/components/calculators/CalculatorShell";
import { CurrencyInput } from "@/components/calculators/CurrencyInput";
import { NumberInput } from "@/components/calculators/NumberInput";
import { ResultRow } from "@/components/calculators/ResultRow";
import { ResultsPanel } from "@/components/calculators/ResultsPanel";
import { useCurrencyInput, useNumberInput } from "@/components/calculators/hooks";
import {
  PROPERTY_FINANCE_DEFAULTS,
  propertyFinanceService,
} from "@/lib/intelligence";
import { formatZAR } from "@/lib/format/currency";
import { useMemo } from "react";

export function MonthlyHomeOwnershipCostCalculator() {
  const price = useCurrencyInput(2_000_000);
  const depositPct = useNumberInput(PROPERTY_FINANCE_DEFAULTS.depositPercent, 1);
  const rate = useNumberInput(PROPERTY_FINANCE_DEFAULTS.annualRatePercent, 1);
  const term = useNumberInput(PROPERTY_FINANCE_DEFAULTS.termYears);
  const monthlyRates = useCurrencyInput(900);
  const monthlyLevy = useCurrencyInput(2_500);
  const monthlyInsurance = useCurrencyInput(450);
  const maintenancePct = useNumberInput(
    PROPERTY_FINANCE_DEFAULTS.maintenancePercentOfValue,
    1,
  );

  const snapshot = useMemo(
    () =>
      propertyFinanceService.calculate({
        propertyPrice: price.value,
        depositPercent: depositPct.value,
        annualRatePercent: rate.value,
        termYears: term.value,
        monthlyRates: monthlyRates.value,
        monthlyLevy: monthlyLevy.value,
        monthlyInsurance: monthlyInsurance.value,
        maintenancePercentOfValue: maintenancePct.value,
      }),
    [
      price.value,
      depositPct.value,
      rate.value,
      term.value,
      monthlyRates.value,
      monthlyLevy.value,
      monthlyInsurance.value,
      maintenancePct.value,
    ],
  );

  const { monthlyOwnership: costs } = snapshot;
  const hasResults = price.value > 0 && term.value > 0;
  const annualTotal = costs.totalMonthly * 12;

  return (
    <CalculatorShell
      title="Monthly Home Ownership Cost Calculator"
      subtitle="Estimate your full monthly cost of owning a home — bond repayment plus rates, levies, insurance, and maintenance."
      disclaimer="Estimates only. Actual costs vary by property, insurer, municipality, and body corporate. Bond repayment excludes life insurance and bank fees."
    >
      <CalculatorFieldGrid>
        <CurrencyInput
          id="property-price"
          label="Property price"
          value={price.inputValue}
          onChange={price.onChange}
        />
        <NumberInput
          id="deposit-percent"
          label="Deposit"
          value={depositPct.inputValue}
          onChange={depositPct.onChange}
          onBlur={depositPct.onBlur}
          suffix="%"
          decimals={1}
        />
        <NumberInput
          id="interest-rate"
          label="Interest rate (per year)"
          value={rate.inputValue}
          onChange={rate.onChange}
          onBlur={rate.onBlur}
          suffix="%"
          placeholder="e.g. 11"
        />
        <NumberInput
          id="bond-term"
          label="Bond term"
          value={term.inputValue}
          onChange={term.onChange}
          onBlur={term.onBlur}
          suffix="yrs"
          placeholder="e.g. 20"
        />
        <CurrencyInput
          id="monthly-rates"
          label="Municipal rates (monthly)"
          value={monthlyRates.inputValue}
          onChange={monthlyRates.onChange}
          placeholder="e.g. 900"
        />
        <CurrencyInput
          id="monthly-levy"
          label="Body corporate levy (monthly)"
          value={monthlyLevy.inputValue}
          onChange={monthlyLevy.onChange}
          placeholder="e.g. 2 500"
        />
        <CurrencyInput
          id="monthly-insurance"
          label="Building insurance (monthly)"
          value={monthlyInsurance.inputValue}
          onChange={monthlyInsurance.onChange}
          placeholder="e.g. 450"
        />
        <NumberInput
          id="maintenance-percent"
          label="Maintenance allowance"
          value={maintenancePct.inputValue}
          onChange={maintenancePct.onChange}
          onBlur={maintenancePct.onBlur}
          suffix="% p.a."
          decimals={1}
          placeholder="e.g. 1"
        />
      </CalculatorFieldGrid>

      <ResultsPanel hasResults={hasResults}>
        <ResultRow
          label="Monthly bond repayment"
          value={formatZAR(costs.bondRepayment)}
        />
        <ResultRow
          label="Total monthly ownership cost"
          value={formatZAR(costs.totalMonthly)}
          highlight
          sublabel="Bond + rates + levies + insurance + maintenance"
        />
        <ResultRow
          label="Annual ownership cost"
          value={formatZAR(annualTotal)}
          sublabel="Total monthly × 12"
        />
        <ResultRow label="Municipal rates" value={formatZAR(costs.rates)} />
        <ResultRow label="Body corporate levy" value={formatZAR(costs.levies)} />
        <ResultRow
          label="Building insurance"
          value={formatZAR(costs.insurance)}
        />
        <ResultRow
          label="Maintenance allowance"
          value={formatZAR(costs.maintenance)}
          sublabel={`${maintenancePct.value}% of property value per year`}
        />
      </ResultsPanel>

      <details className="mt-6 rounded-xl border border-border bg-background">
        <summary className="cursor-pointer px-4 py-3 text-sm font-medium text-foreground">
          What these costs mean
        </summary>
        <div className="space-y-3 px-4 pb-4 text-sm text-muted">
          <p>
            <strong className="text-foreground">Bond repayment</strong> is
            calculated on the loan amount after your deposit, using standard
            amortization at the interest rate and term you entered.
          </p>
          <p>
            <strong className="text-foreground">Municipal rates</strong> are
            billed by your municipality for services and infrastructure. Amounts
            vary widely by city and property value — use your latest statement
            or a rates clearance figure if available.
          </p>
          <p>
            <strong className="text-foreground">Body corporate levies</strong>{" "}
            apply to sectional title and estate properties. Enter zero for
            freehold houses with no estate levy.
          </p>
          <p>
            <strong className="text-foreground">Building insurance</strong> is
            often required by your bank. Home contents insurance is separate
            and not included here.
          </p>
          <p>
            <strong className="text-foreground">Maintenance</strong> is
            budgeted as a percentage of property value per year (typically 1–2%
            for homeowners). This covers repairs, painting, and general upkeep
            over time.
          </p>
          <p className="text-xs">
            Loan amount on this scenario: {formatZAR(snapshot.loanAmount)} (
            {depositPct.value}% deposit). Compare bond-only costs with the{" "}
            <a href="/tools/bond-calculator" className="text-accent underline">
              Bond Calculator
            </a>
            .
          </p>
        </div>
      </details>
    </CalculatorShell>
  );
}
