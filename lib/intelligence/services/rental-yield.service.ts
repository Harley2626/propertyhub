import type { CalculationService } from "../core/types";
import type { RentalYieldCalculationInput } from "../models/rental-yield.model";
import type { RentalYieldResult } from "../models/rental-yield.model";
import { calculatorEngine } from "../providers/calculator-engine";

export class RentalYieldService
  implements CalculationService<RentalYieldCalculationInput, RentalYieldResult>
{
  readonly id = "rental-yield" as const;

  calculate(input: RentalYieldCalculationInput): RentalYieldResult {
    return calculatorEngine.rentalYield(
      input.propertyValue,
      input.monthlyRent,
      input.monthlyExpenses,
    );
  }
}

export const rentalYieldService = new RentalYieldService();
