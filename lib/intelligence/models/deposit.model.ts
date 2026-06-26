export type { DepositResult } from "@/lib/calculators/deposit";

export type DepositCalculationInput = {
  propertyPrice: number;
  depositPercent: number;
  amountSaved: number;
};
