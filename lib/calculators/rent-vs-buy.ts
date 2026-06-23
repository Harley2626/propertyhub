import { calculateBond } from "./bond";

export type RentVsBuyResult = {
  totalRentCost: number;
  totalBuyCost: number;
  equityBuilt: number;
  netBuyCost: number;
  recommendation: "rent" | "buy" | "neutral";
  monthlyBondPayment: number;
};

export function calculateRentVsBuy(
  monthlyRent: number,
  propertyPrice: number,
  depositPercent: number,
  annualRate: number,
  termYears: number,
  comparisonYears: number,
  rentIncreasePercent: number,
  propertyGrowthPercent: number,
): RentVsBuyResult {
  if (comparisonYears <= 0 || propertyPrice <= 0) {
    return {
      totalRentCost: 0,
      totalBuyCost: 0,
      equityBuilt: 0,
      netBuyCost: 0,
      recommendation: "neutral",
      monthlyBondPayment: 0,
    };
  }

  let totalRentCost = 0;
  let currentRent = monthlyRent;
  for (let year = 0; year < comparisonYears; year++) {
    totalRentCost += currentRent * 12;
    currentRent *= 1 + rentIncreasePercent / 100;
  }

  const deposit = propertyPrice * (depositPercent / 100);
  const loanAmount = propertyPrice - deposit;
  const bond = calculateBond(loanAmount, annualRate, termYears);
  const monthsCompared = comparisonYears * 12;
  const bondPayments = bond.monthlyPayment * monthsCompared;

  const maintenanceRate = 0.01;
  const ratesRate = 0.005;
  const maintenanceAndRates =
    propertyPrice * (maintenanceRate + ratesRate) * comparisonYears;

  const totalBuyCost = deposit + bondPayments + maintenanceAndRates;
  const futurePropertyValue =
    propertyPrice * Math.pow(1 + propertyGrowthPercent / 100, comparisonYears);

  const months = termYears * 12;
  const monthlyRate = annualRate / 100 / 12;
  let remainingBalance = loanAmount;

  if (monthlyRate > 0) {
    const paymentsMade = Math.min(monthsCompared, months);
    const factor = Math.pow(1 + monthlyRate, paymentsMade);
    remainingBalance =
      loanAmount * factor -
      (bond.monthlyPayment * (factor - 1)) / monthlyRate;
    remainingBalance = Math.max(0, remainingBalance);
  } else {
    remainingBalance = Math.max(0, loanAmount - bond.monthlyPayment * monthsCompared);
  }

  const equityBuilt = futurePropertyValue - remainingBalance;
  const netBuyCost = totalBuyCost - equityBuilt;

  let recommendation: RentVsBuyResult["recommendation"] = "neutral";
  if (netBuyCost < totalRentCost * 0.95) recommendation = "buy";
  else if (totalRentCost < netBuyCost * 0.95) recommendation = "rent";

  return {
    totalRentCost,
    totalBuyCost,
    equityBuilt,
    netBuyCost,
    recommendation,
    monthlyBondPayment: bond.monthlyPayment,
  };
}
