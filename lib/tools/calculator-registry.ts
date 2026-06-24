import type { ComponentType } from "react";
import { AffordabilityCalculator } from "@/components/calculators/AffordabilityCalculator";
import { BondCalculator } from "@/components/calculators/BondCalculator";
import { CapitalGainsTaxCalculator } from "@/components/calculators/CapitalGainsTaxCalculator";
import { CompoundInterestCalculator } from "@/components/calculators/CompoundInterestCalculator";
import { DepositCalculator } from "@/components/calculators/DepositCalculator";
import { EmergencyFundCalculator } from "@/components/calculators/EmergencyFundCalculator";
import { IncomeTaxCalculator } from "@/components/calculators/IncomeTaxCalculator";
import { InflationCalculator } from "@/components/calculators/InflationCalculator";
import { RentalYieldCalculator } from "@/components/calculators/RentalYieldCalculator";
import { RentVsBuyCalculator } from "@/components/calculators/RentVsBuyCalculator";
import { RetirementCalculator } from "@/components/calculators/RetirementCalculator";
import { TransferDutyCalculator } from "@/components/calculators/TransferDutyCalculator";
import { VatCalculator } from "@/components/calculators/VatCalculator";

export const calculatorRegistry: Record<string, ComponentType> = {
  "transfer-duty-calculator": TransferDutyCalculator,
  "bond-calculator": BondCalculator,
  "affordability-calculator": AffordabilityCalculator,
  "rental-yield-calculator": RentalYieldCalculator,
  "deposit-calculator": DepositCalculator,
  "rent-vs-buy-calculator": RentVsBuyCalculator,
  "compound-interest-calculator": CompoundInterestCalculator,
  "retirement-calculator": RetirementCalculator,
  "inflation-calculator": InflationCalculator,
  "emergency-fund-calculator": EmergencyFundCalculator,
  "income-tax-calculator": IncomeTaxCalculator,
  "vat-calculator": VatCalculator,
  "capital-gains-tax-calculator": CapitalGainsTaxCalculator,
};

export function getCalculatorComponent(slug: string): ComponentType | undefined {
  return calculatorRegistry[slug];
}
