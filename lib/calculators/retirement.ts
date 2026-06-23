import { calculateCompoundInterest } from "./compound-interest";

export type RetirementResult = {
  projectedSavings: number;
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
  annualReturn: number,
): RetirementResult {
  const yearsToRetirement = Math.max(0, retirementAge - currentAge);

  const projected = calculateCompoundInterest(
    currentSavings,
    monthlyContribution,
    annualReturn,
    yearsToRetirement,
  );

  const requiredNestEgg =
    desiredMonthlyIncome > 0
      ? (desiredMonthlyIncome * 12) / WITHDRAWAL_RATE
      : 0;

  const gap = requiredNestEgg - projected.futureValue;
  const onTrack = gap <= 0;

  let monthlyShortfall = 0;
  if (!onTrack && yearsToRetirement > 0) {
    const months = yearsToRetirement * 12;
    const monthlyRate = annualReturn / 100 / 12;
    if (monthlyRate === 0) {
      monthlyShortfall = gap / months;
    } else {
      const factor = Math.pow(1 + monthlyRate, months);
      monthlyShortfall = (gap * monthlyRate) / (factor - 1);
    }
  }

  return {
    projectedSavings: projected.futureValue,
    requiredNestEgg,
    monthlyShortfall,
    onTrack,
    yearsToRetirement,
  };
}
