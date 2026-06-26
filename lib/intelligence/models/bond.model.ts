export type { BondResult } from "@/lib/calculators/bond";

export type BondCalculationInput = {
  loanAmount: number;
  annualRatePercent: number;
  termYears: number;
};

export type BondAmortizationInput = BondCalculationInput & {
  paymentsMade: number;
};

export type BondRemainingBalanceInput = {
  loanAmount: number;
  monthlyPayment: number;
  annualRatePercent: number;
  paymentsMade: number;
};
