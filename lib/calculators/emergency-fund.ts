import { clampPercent, ensureFinite } from "@/lib/format/numbers";

export type EmergencyFundResult = {
  targetFund: number;
  remainingToSave: number;
  percentComplete: number;
  monthsOfCover: number;
};

/**
 * Target emergency fund = monthly essential expenses × months of cover.
 */
export function calculateEmergencyFund(
  monthlyExpenses: number,
  targetMonths: number,
  amountSaved: number,
): EmergencyFundResult {
  if (monthlyExpenses <= 0 || targetMonths <= 0) {
    return {
      targetFund: 0,
      remainingToSave: 0,
      percentComplete: 0,
      monthsOfCover: 0,
    };
  }

  const months = clampPercent(targetMonths, 24);
  const saved = Math.max(0, amountSaved);
  const targetFund = ensureFinite(monthlyExpenses * months);
  const remainingToSave = ensureFinite(Math.max(0, targetFund - saved));
  const percentComplete = ensureFinite(
    Math.min(100, (saved / targetFund) * 100),
  );
  const monthsOfCover = ensureFinite(saved / monthlyExpenses);

  return {
    targetFund,
    remainingToSave,
    percentComplete,
    monthsOfCover,
  };
}
