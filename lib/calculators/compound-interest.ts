export type CompoundInterestResult = {
  futureValue: number;
  totalContributions: number;
  totalInterest: number;
};

export function calculateCompoundInterest(
  initialInvestment: number,
  monthlyContribution: number,
  annualRate: number,
  years: number,
): CompoundInterestResult {
  if (years <= 0) {
    return {
      futureValue: initialInvestment,
      totalContributions: initialInvestment,
      totalInterest: 0,
    };
  }

  const months = years * 12;
  const monthlyRate = annualRate / 100 / 12;
  let futureValue = initialInvestment;

  if (monthlyRate === 0) {
    futureValue = initialInvestment + monthlyContribution * months;
  } else {
    const factor = Math.pow(1 + monthlyRate, months);
    futureValue =
      initialInvestment * factor +
      monthlyContribution * ((factor - 1) / monthlyRate);
  }

  const totalContributions =
    initialInvestment + monthlyContribution * months;
  const totalInterest = futureValue - totalContributions;

  return { futureValue, totalContributions, totalInterest };
}
