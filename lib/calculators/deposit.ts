import { calculateTransferDutyBreakdown } from "./transfer-duty";

export type DepositResult = {
  depositAmount: number;
  remainingToSave: number;
  transferDuty: number;
  transferCosts: number;
  totalUpfrontCosts: number;
};

export function calculateDeposit(
  propertyPrice: number,
  depositPercent: number,
  amountSaved: number,
): DepositResult {
  if (propertyPrice <= 0) {
    return {
      depositAmount: 0,
      remainingToSave: 0,
      transferDuty: 0,
      transferCosts: 0,
      totalUpfrontCosts: 0,
    };
  }

  const depositAmount = propertyPrice * (depositPercent / 100);
  const remainingToSave = Math.max(0, depositAmount - amountSaved);
  const transfer = calculateTransferDutyBreakdown(propertyPrice);
  const totalUpfrontCosts =
    depositAmount + transfer.transferDuty + transfer.transferCosts;

  return {
    depositAmount,
    remainingToSave,
    transferDuty: transfer.transferDuty,
    transferCosts: transfer.transferCosts,
    totalUpfrontCosts,
  };
}
