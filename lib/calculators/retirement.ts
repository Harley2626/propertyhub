import { clampRatePercent } from "@/lib/format/numbers";
import {
  calculateCompoundInterest,
  calculateRequiredMonthlyContribution,
} from "./compound-interest";

export type RetirementResult = {
  projectedSavings: number;
  totalContributions: number;
  totalInterest: number;
  requiredNestEgg: number;
  monthlyShortfall: number;
  onTrack: boolean;
  yearsToRetirement: number;
};

const WITHDRAWAL_RATE = 0.04;

export function calculateRetirement(
  currentAge: number,
  retirementAge: number,
  currentSavings: number,
  desiredMonthlyIncome: number,
  monthlyContribution: number,
  annualReturnPercent: number,
): RetirementResult {
  const yearsToRetirement = Math.max(0, retirementAge - currentAge);
  const annualRate = clampRatePercent(annualReturnPercent);

  const projected = calculateCompoundInterest(
    currentSavings,
    monthlyContribution,
    annualRate,
    yearsToRetirement,
  );

  const requiredNestEgg =
    desiredMonthlyIncome > 0
      ? (desiredMonthlyIncome * 12) / WITHDRAWAL_RATE
      : 0;

  const gap = requiredNestEgg - projected.futureValue;
  const onTrack = gap <= 0;

  const monthlyShortfall = onTrack
    ? 0
    : calculateRequiredMonthlyContribution(
        requiredNestEgg,
        currentSavings,
        annualRate,
        yearsToRetirement,
      ) - monthlyContribution;

  return {
    projectedSavings: projected.futureValue,
    totalContributions: projected.totalContributions,
    totalInterest: projected.totalInterest,
    requiredNestEgg,
    monthlyShortfall: Math.max(0, monthlyShortfall),
    onTrack,
    yearsToRetirement,
  };
}
