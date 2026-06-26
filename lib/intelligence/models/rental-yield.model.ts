export type { RentalYieldResult } from "@/lib/calculators/rental-yield";

export type RentalYieldCalculationInput = {
  propertyValue: number;
  monthlyRent: number;
  monthlyExpenses: number;
};
