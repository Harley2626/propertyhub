import type { CalculationService } from "../core/types";
import type {
  BondCalculationInput,
  BondRemainingBalanceInput,
} from "../models/bond.model";
import type { BondResult } from "../models/bond.model";
import { calculatorEngine } from "../providers/calculator-engine";

export class BondService implements CalculationService<BondCalculationInput, BondResult> {
  readonly id = "bond" as const;

  calculate(input: BondCalculationInput): BondResult {
    return calculatorEngine.bond(
      input.loanAmount,
      input.annualRatePercent,
      input.termYears,
    );
  }

  remainingBalance(input: BondRemainingBalanceInput): number {
    return calculatorEngine.remainingBalance(
      input.loanAmount,
      input.monthlyPayment,
      input.annualRatePercent,
      input.paymentsMade,
    );
  }
}

export const bondService = new BondService();
