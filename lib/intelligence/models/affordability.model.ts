export type { AffordabilityResult } from "@/lib/calculators/affordability";

export type AffordabilityCalculationInput = {
  grossMonthlyIncome: number;
  existingMonthlyDebt: number;
  annualRatePercent: number;
  termYears: number;
  depositPercent?: number;
};

export type MaxLoanFromPaymentInput = {
  maxMonthlyPayment: number;
  annualRatePercent: number;
  termYears: number;
};

export type BondPaymentEstimateInput = {
  loanAmount: number;
  annualRatePercent: number;
  termYears: number;
};
