import { clampRatePercent, ensureFinite } from "@/lib/format/numbers";

export type BondResult = {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
};

/**
 * Standard amortization formula (monthly compounding):
 *
 *   monthlyPayment = P × [r(1 + r)ⁿ] / [(1 + r)ⁿ − 1]
 *
 * Where:
 *   P = loan principal
 *   r = annualRatePercent / 100 / 12   (monthly rate as decimal)
 *   n = termYears × 12                   (total monthly payments)
 */
export function calculateBond(
  loanAmount: number,
  annualRatePercent: number,
  termYears: number,
): BondResult {
  if (loanAmount <= 0 || termYears <= 0) {
    return { monthlyPayment: 0, totalPayment: 0, totalInterest: 0 };
  }

  const months = termYears * 12;
  const annualRate = clampRatePercent(annualRatePercent);
  const monthlyRate = annualRate / 100 / 12;

  if (monthlyRate === 0) {
    const monthlyPayment = loanAmount / months;
    return {
      monthlyPayment,
      totalPayment: monthlyPayment * months,
      totalInterest: 0,
    };
  }

  const growthFactor = Math.pow(1 + monthlyRate, months);
  const monthlyPayment = ensureFinite(
    (loanAmount * monthlyRate * growthFactor) / (growthFactor - 1),
  );
  const totalPayment = ensureFinite(monthlyPayment * months);
  const totalInterest = ensureFinite(totalPayment - loanAmount);

  return { monthlyPayment, totalPayment, totalInterest };
}
