import type { CalculationService } from "../core/types";
import type {
  AffordabilityCalculationInput,
  BondPaymentEstimateInput,
  MaxLoanFromPaymentInput,
} from "../models/affordability.model";
import type { AffordabilityResult } from "../models/affordability.model";
import { calculatorEngine } from "../providers/calculator-engine";

export class AffordabilityService
  implements CalculationService<AffordabilityCalculationInput, AffordabilityResult>
{
  readonly id = "affordability" as const;

  calculate(input: AffordabilityCalculationInput): AffordabilityResult {
    return calculatorEngine.affordability(
      input.grossMonthlyIncome,
      input.existingMonthlyDebt,
      input.annualRatePercent,
      input.termYears,
      input.depositPercent,
    );
  }

  maxLoanFromPayment(input: MaxLoanFromPaymentInput): number {
    return calculatorEngine.maxLoanFromPayment(
      input.maxMonthlyPayment,
      input.annualRatePercent,
      input.termYears,
    );
  }

  estimateBondPayment(input: BondPaymentEstimateInput): number {
    return calculatorEngine.estimateBondPayment(
      input.loanAmount,
      input.annualRatePercent,
      input.termYears,
    );
  }
}

export const affordabilityService = new AffordabilityService();
