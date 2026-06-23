"use client";

import { CalculatorFieldGrid } from "@/components/calculators/CalculatorFieldGrid";
import { CalculatorShell } from "@/components/calculators/CalculatorShell";
import { CurrencyInput } from "@/components/calculators/CurrencyInput";
import { NumberInput } from "@/components/calculators/NumberInput";
import { ResultRow } from "@/components/calculators/ResultRow";
import { ResultsPanel } from "@/components/calculators/ResultsPanel";
import { useCurrencyInput, useNumberInput } from "@/components/calculators/hooks";
import { calculateRentVsBuy } from "@/lib/calculators/rent-vs-buy";
import { formatZAR } from "@/lib/format/currency";

const recommendationLabel = {
  rent: "Renting may cost less over this period",
  buy: "Buying may cost less over this period",
  neutral: "Costs are roughly similar",
};

export function RentVsBuyCalculator() {
  const rent = useCurrencyInput(15_000);
  const price = useCurrencyInput(2_500_000);
  const deposit = useNumberInput(10, 1);
  const rate = useNumberInput(11.5, 1);
  const years = useNumberInput(10);
  const rentIncrease = useNumberInput(5, 1);
  const growth = useNumberInput(4, 1);

  const result = calculateRentVsBuy(
    rent.value,
    price.value,
    deposit.value,
    rate.value,
    20,
    years.value,
    rentIncrease.value,
    growth.value,
  );
  const hasResults = price.value > 0 && years.value > 0;

  return (
    <CalculatorShell
      title="Rent vs Buy Calculator"
      subtitle="Compares total housing costs including equity built from property growth."
    >
      <CalculatorFieldGrid>
        <CurrencyInput id="monthly-rent" label="Monthly rent" value={rent.inputValue} onChange={rent.onChange} placeholder="e.g. 15 000" />
        <CurrencyInput id="property-price" label="Property purchase price" value={price.inputValue} onChange={price.onChange} />
        <NumberInput id="deposit" label="Deposit" value={deposit.inputValue} onChange={deposit.onChange} suffix="%" decimals={1} />
        <NumberInput id="interest-rate" label="Interest rate" value={rate.inputValue} onChange={rate.onChange} suffix="%" decimals={1} />
        <NumberInput id="comparison-years" label="Comparison period" value={years.inputValue} onChange={years.onChange} suffix="yrs" />
        <NumberInput id="rent-increase" label="Annual rent increase" value={rentIncrease.inputValue} onChange={rentIncrease.onChange} suffix="%" decimals={1} />
        <NumberInput id="property-growth" label="Expected property growth" value={growth.inputValue} onChange={growth.onChange} suffix="%/yr" decimals={1} />
      </CalculatorFieldGrid>
      <ResultsPanel hasResults={hasResults}>
        <ResultRow label="Recommendation" value={recommendationLabel[result.recommendation]} highlight />
        <ResultRow label="Total rent cost" value={formatZAR(result.totalRentCost)} />
        <ResultRow label="Net cost of buying" value={formatZAR(result.netBuyCost)} sublabel="Total paid minus equity built" />
        <ResultRow label="Equity built" value={formatZAR(result.equityBuilt)} />
        <ResultRow label="Monthly bond payment" value={formatZAR(result.monthlyBondPayment)} />
      </ResultsPanel>
    </CalculatorShell>
  );
}
