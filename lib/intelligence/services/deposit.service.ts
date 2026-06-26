import type { CalculationService } from "../core/types";
import type { DepositCalculationInput } from "../models/deposit.model";
import type { DepositResult } from "../models/deposit.model";
import { calculatorEngine } from "../providers/calculator-engine";

export class DepositService
  implements CalculationService<DepositCalculationInput, DepositResult>
{
  readonly id = "deposit" as const;

  calculate(input: DepositCalculationInput): DepositResult {
    return calculatorEngine.deposit(
      input.propertyPrice,
      input.depositPercent,
      input.amountSaved,
    );
  }
}

export const depositService = new DepositService();
