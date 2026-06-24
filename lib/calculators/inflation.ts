import {
  clampInflationRatePercent,
  ensureFinite,
} from "@/lib/format/numbers";

export type InflationResult = {
  futureValue: number;
  purchasingPowerLoss: number;
  equivalentToday: number;
};

/**
 * Projects nominal future cost and purchasing power erosion:
 *   futureCost = amount × (1 + rate)ⁿ
 *   futurePurchasingPower = amount / (1 + rate)ⁿ
 */
export function calculateInflation(
  amount: number,
  annualInflationRatePercent: number,
  years: number,
): InflationResult {
  if (amount <= 0 || years <= 0) {
    return {
      futureValue: ensureFinite(amount),
      purchasingPowerLoss: 0,
      equivalentToday: ensureFinite(amount),
    };
  }

  const rate = clampInflationRatePercent(annualInflationRatePercent) / 100;
  const factor = Math.pow(1 + rate, years);

  const futureValue = ensureFinite(amount * factor);
  const equivalentToday = ensureFinite(amount / factor);
  const purchasingPowerLoss = ensureFinite(amount - equivalentToday);

  return { futureValue, purchasingPowerLoss, equivalentToday };
}
