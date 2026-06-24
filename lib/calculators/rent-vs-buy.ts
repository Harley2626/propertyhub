import { clampRatePercent, ensureFinite } from "@/lib/format/numbers";
import { calculateBond } from "./bond";

export type RentVsBuyResult = {
  totalRentCost: number;
  totalBuyCost: number;
  equityBuilt: number;
  netBuyCost: number;
  recommendation: "rent" | "buy" | "neutral";
  monthlyBondPayment: number;
};

/** Remaining loan balance after a number of payments. */
export function calculateRemainingBalance(
  loanAmount: number,
  monthlyPayment: number,
  annualRatePercent: number,
  paymentsMade: number,
): number {
  if (loanAmount <= 0 || paymentsMade <= 0) return Math.max(0, loanAmount);

  const annualRate = clampRatePercent(annualRatePercent);
  const monthlyRate = annualRate / 100 / 12;

  if (monthlyRate === 0) {
    return ensureFinite(Math.max(0, loanAmount - monthlyPayment * paymentsMade));
  }

  const factor = Math.pow(1 + monthlyRate, paymentsMade);
  const balance =
    loanAmount * factor - (monthlyPayment * (factor - 1)) / monthlyRate;

  return ensureFinite(Math.max(0, balance));
}

export function calculateRentVsBuy(
  monthlyRent: number,
  propertyPrice: number,
  depositPercent: number,
  annualRatePercent: number,
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

  const rentGrowth = clampRatePercent(rentIncreasePercent, 20);
  const propertyGrowth = clampRatePercent(propertyGrowthPercent, 20);
  const depositPct = Math.min(100, Math.max(0, depositPercent));

  let totalRentCost = 0;
  let currentRent = Math.max(0, monthlyRent);
  for (let year = 0; year < comparisonYears; year++) {
    totalRentCost += currentRent * 12;
    currentRent *= 1 + rentGrowth / 100;
  }

  const deposit = propertyPrice * (depositPct / 100);
  const loanAmount = propertyPrice - deposit;
  const bond = calculateBond(loanAmount, annualRatePercent, termYears);
  const monthsCompared = comparisonYears * 12;
  const bondPayments = bond.monthlyPayment * monthsCompared;

  const maintenanceRate = 0.01;
  const ratesRate = 0.005;
  const maintenanceAndRates =
    propertyPrice * (maintenanceRate + ratesRate) * comparisonYears;

  const totalBuyCost = deposit + bondPayments + maintenanceAndRates;
  const futurePropertyValue =
    propertyPrice * Math.pow(1 + propertyGrowth / 100, comparisonYears);

  const remainingBalance = calculateRemainingBalance(
    loanAmount,
    bond.monthlyPayment,
    annualRatePercent,
    monthsCompared,
  );

  const equityBuilt = futurePropertyValue - remainingBalance;
  const netBuyCost = totalBuyCost - equityBuilt;

  let recommendation: RentVsBuyResult["recommendation"] = "neutral";
  if (netBuyCost < totalRentCost * 0.95) recommendation = "buy";
  else if (totalRentCost < netBuyCost * 0.95) recommendation = "rent";

  return {
    totalRentCost: ensureFinite(totalRentCost),
    totalBuyCost: ensureFinite(totalBuyCost),
    equityBuilt: ensureFinite(equityBuilt),
    netBuyCost: ensureFinite(netBuyCost),
    recommendation,
    monthlyBondPayment: ensureFinite(bond.monthlyPayment),
  };
}
