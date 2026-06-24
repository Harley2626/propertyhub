import { clampRatePercent, ensureFinite } from "@/lib/format/numbers";
import { calculateBond } from "./bond";

export type AffordabilityResult = {
  maxMonthlyPayment: number;
  maxLoanAmount: number;
  maxPropertyPrice: number;
  recommendedDeposit: number;
};

const MAX_BOND_TO_INCOME_RATIO = 0.3;
const DEFAULT_DEPOSIT_PERCENT = 10;

/**
 * Inverse amortization: max loan from max monthly payment.
 *   P = PMT × [(1 + r)ⁿ − 1] / [r(1 + r)ⁿ]
 */
export function calculateMaxLoanFromPayment(
  maxMonthlyPayment: number,
  annualRatePercent: number,
  termYears: number,
): number {
  if (maxMonthlyPayment <= 0 || termYears <= 0) return 0;

  const months = termYears * 12;
  const annualRate = clampRatePercent(annualRatePercent);
  const monthlyRate = annualRate / 100 / 12;

  if (monthlyRate === 0) {
    return ensureFinite(maxMonthlyPayment * months);
  }

  const growthFactor = Math.pow(1 + monthlyRate, months);
  const maxLoan =
    (maxMonthlyPayment * (growthFactor - 1)) / (monthlyRate * growthFactor);

  return ensureFinite(maxLoan);
}

export function calculateAffordability(
  grossMonthlyIncome: number,
  existingMonthlyDebt: number,
  annualRatePercent: number,
  termYears: number,
  depositPercent = DEFAULT_DEPOSIT_PERCENT,
): AffordabilityResult {
  if (grossMonthlyIncome <= 0 || termYears <= 0) {
    return {
      maxMonthlyPayment: 0,
      maxLoanAmount: 0,
      maxPropertyPrice: 0,
      recommendedDeposit: 0,
    };
  }

  const maxMonthlyPayment = Math.max(
    0,
    grossMonthlyIncome * MAX_BOND_TO_INCOME_RATIO - existingMonthlyDebt,
  );

  const maxLoanAmount = calculateMaxLoanFromPayment(
    maxMonthlyPayment,
    annualRatePercent,
    termYears,
  );

  const depositPct = Math.min(100, Math.max(0, depositPercent));
  const depositMultiplier = 1 - depositPct / 100;
  const maxPropertyPrice =
    depositMultiplier > 0 ? maxLoanAmount / depositMultiplier : maxLoanAmount;
  const recommendedDeposit = maxPropertyPrice * (depositPct / 100);

  return {
    maxMonthlyPayment: ensureFinite(maxMonthlyPayment),
    maxLoanAmount: ensureFinite(maxLoanAmount),
    maxPropertyPrice: ensureFinite(maxPropertyPrice),
    recommendedDeposit: ensureFinite(recommendedDeposit),
  };
}

export function estimateBondPayment(
  loanAmount: number,
  annualRatePercent: number,
  termYears: number,
): number {
  return calculateBond(loanAmount, annualRatePercent, termYears).monthlyPayment;
}
