import type { CalculationService } from "../core/types";
import type {
  TransferDutyBreakdownInput,
  TransferDutyCalculationInput,
} from "../models/transfer-duty.model";
import type { TransferDutyBreakdown } from "../models/transfer-duty.model";
import { calculatorEngine } from "../providers/calculator-engine";

export class TransferDutyService
  implements CalculationService<TransferDutyCalculationInput, number>
{
  readonly id = "transfer-duty" as const;

  calculate(input: TransferDutyCalculationInput): number {
    return calculatorEngine.transferDuty(input.purchasePrice);
  }

  breakdown(input: TransferDutyBreakdownInput): TransferDutyBreakdown {
    return calculatorEngine.transferDutyBreakdown(input.purchasePrice);
  }
}

export const transferDutyService = new TransferDutyService();
