import { calculateBond } from "./bond";

export type AffordabilityResult = {
  maxMonthlyPayment: number;
  maxLoanAmount: number;
  maxPropertyPrice: number;
  recommendedDeposit: number;
};

const MAX_BOND_TO_INCOME_RATIO = 0.3;
const DEFAULT_DEPOSIT_PERCENT = 10;

export function calculateAffordability(
  grossMonthlyIncome: number,
  existingMonthlyDebt: number,
  annualRate: number,
  termYears: number,
  depositPercent = DEFAULT_DEPOSIT_PERCENT,
): AffordabilityResult {
  if (grossMonthlyIncome <= 0) {
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

  const months = termYears * 12;
  const monthlyRate = annualRate / 100 / 12;
  let maxLoanAmount = 0;

  if (monthlyRate === 0) {
    maxLoanAmount = maxMonthlyPayment * months;
  } else {
    const factor = Math.pow(1 + monthlyRate, months);
    maxLoanAmount =
      (maxMonthlyPayment * (factor - 1)) / (monthlyRate * factor);
  }

  const depositMultiplier = 1 - depositPercent / 100;
  const maxPropertyPrice =
    depositMultiplier > 0 ? maxLoanAmount / depositMultiplier : maxLoanAmount;
  const recommendedDeposit = maxPropertyPrice * (depositPercent / 100);

  return {
    maxMonthlyPayment,
    maxLoanAmount,
    maxPropertyPrice,
    recommendedDeposit,
  };
}

export function estimateBondPayment(
  loanAmount: number,
  annualRate: number,
  termYears: number,
): number {
  return calculateBond(loanAmount, annualRate, termYears).monthlyPayment;
}
