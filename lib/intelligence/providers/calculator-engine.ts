/**
 * Adapter boundary between intelligence services and lib/calculators.
 * All calculator implementations remain in lib/calculators for now;
 * this module is the single import point for services.
 */
import {
  calculateAffordability,
  calculateMaxLoanFromPayment,
  estimateBondPayment,
} from "@/lib/calculators/affordability";
import { calculateBond } from "@/lib/calculators/bond";
import { calculateDeposit } from "@/lib/calculators/deposit";
import { calculateRemainingBalance } from "@/lib/calculators/rent-vs-buy";
import { calculateRentalYield } from "@/lib/calculators/rental-yield";
import {
  calculateTransferDuty,
  calculateTransferDutyBreakdown,
} from "@/lib/calculators/transfer-duty";

export const calculatorEngine = {
  bond: calculateBond,
  transferDuty: calculateTransferDuty,
  transferDutyBreakdown: calculateTransferDutyBreakdown,
  affordability: calculateAffordability,
  maxLoanFromPayment: calculateMaxLoanFromPayment,
  estimateBondPayment,
  deposit: calculateDeposit,
  rentalYield: calculateRentalYield,
  remainingBalance: calculateRemainingBalance,
} as const;

export type CalculatorEngine = typeof calculatorEngine;
