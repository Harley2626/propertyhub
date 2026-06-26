export type {
  TransferDutyBreakdown,
} from "@/lib/calculators/transfer-duty";

export { TRANSFER_DUTY_EFFECTIVE_DATE } from "@/lib/calculators/transfer-duty";

export type TransferDutyCalculationInput = {
  purchasePrice: number;
};

export type TransferDutyBreakdownInput = TransferDutyCalculationInput;
