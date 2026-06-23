export type RentalYieldResult = {
  grossYield: number;
  netYield: number;
  annualRent: number;
  annualExpenses: number;
  netAnnualIncome: number;
};

export function calculateRentalYield(
  propertyValue: number,
  monthlyRent: number,
  monthlyExpenses: number,
): RentalYieldResult {
  if (propertyValue <= 0) {
    return {
      grossYield: 0,
      netYield: 0,
      annualRent: 0,
      annualExpenses: 0,
      netAnnualIncome: 0,
    };
  }

  const annualRent = monthlyRent * 12;
  const annualExpenses = monthlyExpenses * 12;
  const netAnnualIncome = annualRent - annualExpenses;
  const grossYield = (annualRent / propertyValue) * 100;
  const netYield = (netAnnualIncome / propertyValue) * 100;

  return {
    grossYield,
    netYield,
    annualRent,
    annualExpenses,
    netAnnualIncome,
  };
}
