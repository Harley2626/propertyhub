/** SARS transfer duty brackets effective 1 April 2025 */
export const TRANSFER_DUTY_EFFECTIVE_DATE = "1 April 2025";

export type TransferDutyBreakdown = {
  transferDuty: number;
  conveyancingFee: number;
  deedsOfficeFee: number;
  postagesAndPetties: number;
  transferCosts: number;
  purchasePrice: number;
  totalPurchaseCost: number;
};

/**
 * Calculates SARS transfer duty using the progressive sliding scale
 * effective from 1 April 2025. Same rates apply to all acquirers.
 */
export function calculateTransferDuty(purchasePrice: number): number {
  if (purchasePrice <= 0) return 0;
  if (purchasePrice <= 1_210_000) return 0;
  if (purchasePrice <= 1_663_800) {
    return (purchasePrice - 1_210_000) * 0.03;
  }
  if (purchasePrice <= 2_329_300) {
    return 13_614 + (purchasePrice - 1_663_800) * 0.06;
  }
  if (purchasePrice <= 2_994_800) {
    return 53_544 + (purchasePrice - 2_329_300) * 0.08;
  }
  if (purchasePrice <= 13_310_000) {
    return 106_784 + (purchasePrice - 2_994_800) * 0.11;
  }
  return 1_241_456 + (purchasePrice - 13_310_000) * 0.13;
}

/** Law Society recommended conveyancing tariff (ex VAT), estimate only */
function calculateConveyancingFeeExVat(purchasePrice: number): number {
  if (purchasePrice <= 0) return 0;
  if (purchasePrice <= 100_000) return 5_400;
  if (purchasePrice <= 500_000) {
    return 5_400 + ((purchasePrice - 100_000) / 1_000) * 10.7;
  }
  if (purchasePrice <= 1_000_000) {
    return 9_680 + ((purchasePrice - 500_000) / 1_000) * 8.8;
  }
  if (purchasePrice <= 3_000_000) {
    return 14_080 + ((purchasePrice - 1_000_000) / 1_000) * 7.3;
  }
  if (purchasePrice <= 5_000_000) {
    return 28_680 + ((purchasePrice - 3_000_000) / 1_000) * 5.5;
  }
  return 39_680 + ((purchasePrice - 5_000_000) / 1_000) * 4.5;
}

/** Deeds office registration fee estimate based on property value */
function calculateDeedsOfficeFee(purchasePrice: number): number {
  if (purchasePrice <= 0) return 0;
  if (purchasePrice <= 100_000) return 473;
  if (purchasePrice <= 200_000) return 683;
  if (purchasePrice <= 300_000) return 893;
  if (purchasePrice <= 600_000) return 1_103;
  if (purchasePrice <= 800_000) return 1_313;
  if (purchasePrice <= 1_000_000) return 1_523;
  if (purchasePrice <= 2_000_000) {
    return 1_523 + ((purchasePrice - 1_000_000) / 10_000) * 6.9;
  }
  if (purchasePrice <= 4_000_000) {
    return 2_213 + ((purchasePrice - 2_000_000) / 10_000) * 10.35;
  }
  return 4_283 + ((purchasePrice - 4_000_000) / 10_000) * 13.8;
}

const POSTAGES_AND_PETTIES = 850;
const VAT_RATE = 0.15;

export function calculateTransferDutyBreakdown(
  purchasePrice: number,
): TransferDutyBreakdown {
  const transferDuty = calculateTransferDuty(purchasePrice);
  const conveyancingFee =
    calculateConveyancingFeeExVat(purchasePrice) * (1 + VAT_RATE);
  const deedsOfficeFee = calculateDeedsOfficeFee(purchasePrice);
  const postagesAndPetties = POSTAGES_AND_PETTIES;
  const transferCosts = conveyancingFee + deedsOfficeFee + postagesAndPetties;
  const totalPurchaseCost = purchasePrice + transferDuty + transferCosts;

  return {
    transferDuty,
    conveyancingFee,
    deedsOfficeFee,
    postagesAndPetties,
    transferCosts,
    purchasePrice,
    totalPurchaseCost,
  };
}

export const transferDutyBrackets = [
  { from: 0, to: 1_210_000, rate: "0%" },
  { from: 1_210_001, to: 1_663_800, rate: "3% above R1 210 000" },
  { from: 1_663_801, to: 2_329_300, rate: "R13 614 + 6% above R1 663 800" },
  { from: 2_329_301, to: 2_994_800, rate: "R53 544 + 8% above R2 329 300" },
  { from: 2_994_801, to: 13_310_000, rate: "R106 784 + 11% above R2 994 800" },
  { from: 13_310_001, to: null, rate: "R1 241 456 + 13% above R13 310 000" },
] as const;
