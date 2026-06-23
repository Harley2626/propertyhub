export type BondResult = {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
};

export function calculateBond(
  loanAmount: number,
  annualRate: number,
  termYears: number,
): BondResult {
  if (loanAmount <= 0 || termYears <= 0) {
    return { monthlyPayment: 0, totalPayment: 0, totalInterest: 0 };
  }

  const months = termYears * 12;
  const monthlyRate = annualRate / 100 / 12;

  if (monthlyRate === 0) {
    const monthlyPayment = loanAmount / months;
    return {
      monthlyPayment,
      totalPayment: loanAmount,
      totalInterest: 0,
    };
  }

  const factor = Math.pow(1 + monthlyRate, months);
  const monthlyPayment = (loanAmount * monthlyRate * factor) / (factor - 1);
  const totalPayment = monthlyPayment * months;
  const totalInterest = totalPayment - loanAmount;

  return { monthlyPayment, totalPayment, totalInterest };
}
