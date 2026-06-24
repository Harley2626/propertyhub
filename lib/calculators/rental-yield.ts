import { ensureFinite } from "@/lib/format/numbers";

export type RentalYieldResult = {
  grossYield: number;
  netYield: number;
  annualRent: number;
  annualExpenses: number;
  netAnnualIncome: number;
};

/** Gross and net rental yield as percentages of property value. */
export function calculateRentalYield(
  propertyValue: number,
  monthlyRent: number,
  monthlyExpenses: number,
): RentalYieldResult {
  if (propertyValue <= 0) {
    return {
      grossYield: 0,
      netYield: 0,
      annualRent: 0,
      annualExpenses: 0,
      netAnnualIncome: 0,
    };
  }

  const annualRent = Math.max(0, monthlyRent) * 12;
  const annualExpenses = Math.max(0, monthlyExpenses) * 12;
  const netAnnualIncome = annualRent - annualExpenses;
  const grossYield = ensureFinite((annualRent / propertyValue) * 100);
  const netYield = ensureFinite((netAnnualIncome / propertyValue) * 100);

  return {
    grossYield,
    netYield,
    annualRent: ensureFinite(annualRent),
    annualExpenses: ensureFinite(annualExpenses),
    netAnnualIncome: ensureFinite(netAnnualIncome),
  };
}
