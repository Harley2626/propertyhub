import { clampRatePercent, ensureFinite } from "@/lib/format/numbers";

export type CompoundInterestResult = {
  futureValue: number;
  totalContributions: number;
  totalInterest: number;
};

/**
 * Future value with monthly compounding and end-of-month contributions:
 *
 *   FV = P × (1 + r)ⁿ + PMT × [(1 + r)ⁿ − 1] / r
 *
 * Where:
 *   r = annualRatePercent / 100 / 12
 *   n = years × 12
 */
export function calculateCompoundInterest(
  initialInvestment: number,
  monthlyContribution: number,
  annualRatePercent: number,
  years: number,
): CompoundInterestResult {
  if (years <= 0) {
    return {
      futureValue: ensureFinite(initialInvestment),
      totalContributions: ensureFinite(initialInvestment),
      totalInterest: 0,
    };
  }

  const months = years * 12;
  const annualRate = clampRatePercent(annualRatePercent);
  const monthlyRate = annualRate / 100 / 12;

  let futureValue: number;

  if (monthlyRate === 0) {
    futureValue = initialInvestment + monthlyContribution * months;
  } else {
    const growthFactor = Math.pow(1 + monthlyRate, months);
    futureValue =
      initialInvestment * growthFactor +
      monthlyContribution * ((growthFactor - 1) / monthlyRate);
  }

  futureValue = ensureFinite(futureValue, initialInvestment);

  const totalContributions = initialInvestment + monthlyContribution * months;
  const totalInterest = futureValue - totalContributions;

  return {
    futureValue,
    totalContributions: ensureFinite(totalContributions),
    totalInterest: ensureFinite(totalInterest),
  };
}

/**
 *   PMT = (FV − P × (1+r)ⁿ) × r / [(1+r)ⁿ − 1]
 */
export function calculateRequiredMonthlyContribution(
  targetFutureValue: number,
  initialInvestment: number,
  annualRatePercent: number,
  years: number,
): number {
  if (years <= 0 || targetFutureValue <= initialInvestment) return 0;

  const months = years * 12;
  const annualRate = clampRatePercent(annualRatePercent);
  const monthlyRate = annualRate / 100 / 12;

  if (monthlyRate === 0) {
    return ensureFinite((targetFutureValue - initialInvestment) / months);
  }

  const growthFactor = Math.pow(1 + monthlyRate, months);
  const futureValueOfPrincipal = initialInvestment * growthFactor;
  const gap = targetFutureValue - futureValueOfPrincipal;

  if (gap <= 0) return 0;

  return ensureFinite((gap * monthlyRate) / (growthFactor - 1));
}
