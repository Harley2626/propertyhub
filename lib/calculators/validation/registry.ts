import { calculateAffordability } from "../affordability";
import { calculateBond } from "../bond";
import { calculateCapitalGainsTax } from "../capital-gains-tax";
import { calculateCompoundInterest } from "../compound-interest";
import { calculateDeposit } from "../deposit";
import { calculateEmergencyFund } from "../emergency-fund";
import { calculateInflation } from "../inflation";
import { calculateIncomeTax } from "../income-tax";
import { calculateRentalYield } from "../rental-yield";
import { calculateRentVsBuy } from "../rent-vs-buy";
import { calculateRetirement } from "../retirement";
import {
  calculateTransferDuty,
  calculateTransferDutyBreakdown,
} from "../transfer-duty";
import { calculateVat } from "../vat";

export type CalculatorId =
  | "bond"
  | "transfer-duty"
  | "compound-interest"
  | "retirement"
  | "inflation"
  | "rental-yield"
  | "affordability"
  | "income-tax"
  | "vat"
  | "deposit"
  | "capital-gains-tax"
  | "emergency-fund"
  | "rent-vs-buy";

export type CalculatorDefinition = {
  id: CalculatorId;
  name: string;
  usesRatePercent: boolean;
  /** Typical scenario — all fields must be finite */
  runTypical: () => Record<string, unknown>;
  /** Edge cases that must not throw and must return finite numbers */
  edgeCases: Array<{
    label: string;
    run: () => Record<string, unknown>;
  }>;
  /** Run at 10% and 100% rate — compareField direction depends on rateCompareDirection */
  rateSafety?: () => {
    at10: Record<string, number>;
    at100: Record<string, number>;
    compareField: string;
    /** "lower" = payment-like (10% < 100%); "higher" = affordability-like (10% > 100%) */
    rateCompareDirection?: "lower" | "higher";
  };
};

export const CALCULATOR_REGISTRY: CalculatorDefinition[] = [
  {
    id: "bond",
    name: "Bond Calculator",
    usesRatePercent: true,
    runTypical: () => {
      const r = calculateBond(2_000_000, 10, 20);
      return { ...r };
    },
    edgeCases: [
      {
        label: "zero loan",
        run: () => ({ ...calculateBond(0, 10, 20) }),
      },
      {
        label: "zero term",
        run: () => ({ ...calculateBond(2_000_000, 10, 0) }),
      },
      {
        label: "zero rate",
        run: () => ({ ...calculateBond(2_000_000, 0, 20) }),
      },
      {
        label: "negative inputs",
        run: () => ({ ...calculateBond(-1, -10, -5) }),
      },
    ],
    rateSafety: () => ({
      at10: calculateBond(2_000_000, 10, 20) as Record<string, number>,
      at100: calculateBond(2_000_000, 100, 20) as Record<string, number>,
      compareField: "monthlyPayment",
    }),
  },
  {
    id: "transfer-duty",
    name: "Transfer Duty Calculator",
    usesRatePercent: false,
    runTypical: () => {
      const duty = calculateTransferDuty(2_500_000);
      const b = calculateTransferDutyBreakdown(2_500_000);
      return { duty, ...b };
    },
    edgeCases: [
      { label: "zero price", run: () => ({ duty: calculateTransferDuty(0) }) },
      {
        label: "negative price",
        run: () => ({ duty: calculateTransferDuty(-100) }),
      },
      {
        label: "below threshold",
        run: () => ({ duty: calculateTransferDuty(1_000_000) }),
      },
    ],
  },
  {
    id: "compound-interest",
    name: "Compound Interest Calculator",
    usesRatePercent: true,
    runTypical: () => ({ ...calculateCompoundInterest(100_000, 1_000, 10, 20) }),
    edgeCases: [
      {
        label: "zero years",
        run: () => ({ ...calculateCompoundInterest(100_000, 1_000, 10, 0) }),
      },
      {
        label: "zero rate",
        run: () => ({ ...calculateCompoundInterest(100_000, 1_000, 0, 10) }),
      },
      {
        label: "zero initial and contributions",
        run: () => ({ ...calculateCompoundInterest(0, 0, 10, 10) }),
      },
    ],
    rateSafety: () => ({
      at10: calculateCompoundInterest(160_000, 3_000, 10, 30) as Record<
        string,
        number
      >,
      at100: calculateCompoundInterest(160_000, 3_000, 100, 30) as Record<
        string,
        number
      >,
      compareField: "futureValue",
    }),
  },
  {
    id: "retirement",
    name: "Retirement Calculator",
    usesRatePercent: true,
    runTypical: () => ({
      ...calculateRetirement(35, 65, 160_000, 25_000, 3_000, 10),
    }),
    edgeCases: [
      {
        label: "same age",
        run: () => ({
          ...calculateRetirement(65, 65, 500_000, 25_000, 0, 10),
        }),
      },
      {
        label: "retirement before current age",
        run: () => ({
          ...calculateRetirement(50, 45, 100_000, 20_000, 1_000, 10),
        }),
      },
      {
        label: "zero savings and contributions",
        run: () => ({
          ...calculateRetirement(35, 65, 0, 0, 0, 8),
        }),
      },
    ],
    rateSafety: () => ({
      at10: calculateRetirement(35, 65, 160_000, 25_000, 3_000, 10) as Record<
        string,
        number
      >,
      at100: calculateRetirement(35, 65, 160_000, 25_000, 3_000, 100) as Record<
        string,
        number
      >,
      compareField: "projectedSavings",
    }),
  },
  {
    id: "inflation",
    name: "Inflation Calculator",
    usesRatePercent: true,
    runTypical: () => ({ ...calculateInflation(100_000, 5.5, 10) }),
    edgeCases: [
      {
        label: "zero years",
        run: () => ({ ...calculateInflation(100_000, 5.5, 0) }),
      },
      { label: "zero amount", run: () => ({ ...calculateInflation(0, 5.5, 10) }) },
      {
        label: "zero inflation rate",
        run: () => ({ ...calculateInflation(100_000, 0, 10) }),
      },
    ],
    rateSafety: () => ({
      at10: calculateInflation(100_000, 10, 10) as Record<string, number>,
      at100: calculateInflation(100_000, 100, 10) as Record<string, number>,
      compareField: "futureValue",
    }),
  },
  {
    id: "rental-yield",
    name: "Rental Yield Calculator",
    usesRatePercent: false,
    runTypical: () =>
      ({ ...calculateRentalYield(1_800_000, 12_000, 2_500) }),
    edgeCases: [
      {
        label: "zero property value (division by zero)",
        run: () => ({ ...calculateRentalYield(0, 12_000, 2_500) }),
      },
      {
        label: "negative rent and expenses",
        run: () => ({ ...calculateRentalYield(1_000_000, -5_000, -1_000) }),
      },
      {
        label: "expenses exceed rent",
        run: () => ({ ...calculateRentalYield(1_000_000, 5_000, 8_000) }),
      },
    ],
  },
  {
    id: "affordability",
    name: "Affordability Calculator",
    usesRatePercent: true,
    runTypical: () => ({ ...calculateAffordability(45_000, 5_000, 10, 20) }),
    edgeCases: [
      {
        label: "zero income",
        run: () => ({ ...calculateAffordability(0, 0, 10, 20) }),
      },
      {
        label: "zero term (division by zero)",
        run: () => ({ ...calculateAffordability(45_000, 0, 10, 0) }),
      },
      {
        label: "debt exceeds 30% capacity",
        run: () => ({ ...calculateAffordability(30_000, 10_000, 10, 20) }),
      },
    ],
    rateSafety: () => ({
      at10: calculateAffordability(50_000, 0, 10, 20) as Record<string, number>,
      at100: calculateAffordability(50_000, 0, 100, 20) as Record<
        string,
        number
      >,
      compareField: "maxPropertyPrice",
      rateCompareDirection: "higher" as const,
    }),
  },
  {
    id: "income-tax",
    name: "Income Tax Calculator",
    usesRatePercent: false,
    runTypical: () => ({ ...calculateIncomeTax(600_000, "under65") }),
    edgeCases: [
      { label: "zero income", run: () => ({ ...calculateIncomeTax(0, "under65") }) },
      {
        label: "below threshold",
        run: () => ({ ...calculateIncomeTax(99_000, "under65") }),
      },
      {
        label: "negative income",
        run: () => ({ ...calculateIncomeTax(-50_000, "under65") }),
      },
    ],
  },
  {
    id: "vat",
    name: "VAT Calculator",
    usesRatePercent: false,
    runTypical: () => ({ ...calculateVat(1_000, "add") }),
    edgeCases: [
      { label: "zero amount", run: () => ({ ...calculateVat(0, "add") }) },
      { label: "negative amount", run: () => ({ ...calculateVat(-100, "add") }) },
      { label: "remove mode", run: () => ({ ...calculateVat(1_150, "remove") }) },
    ],
  },
  {
    id: "deposit",
    name: "Deposit Calculator",
    usesRatePercent: false,
    runTypical: () => ({ ...calculateDeposit(2_000_000, 10, 80_000) }),
    edgeCases: [
      {
        label: "zero property price",
        run: () => ({ ...calculateDeposit(0, 10, 0) }),
      },
      {
        label: "deposit exceeds 100%",
        run: () => ({ ...calculateDeposit(1_000_000, 150, 0) }),
      },
      {
        label: "saved exceeds deposit",
        run: () => ({ ...calculateDeposit(1_000_000, 10, 500_000) }),
      },
    ],
  },
  {
    id: "capital-gains-tax",
    name: "Capital Gains Tax Calculator",
    usesRatePercent: true,
    runTypical: () =>
      ({ ...calculateCapitalGainsTax(3_000_000, 1_800_000, 31, false) }),
    edgeCases: [
      {
        label: "zero sale price",
        run: () => ({ ...calculateCapitalGainsTax(0, 1_000_000, 31, false) }),
      },
      {
        label: "loss on sale",
        run: () =>
          ({ ...calculateCapitalGainsTax(1_000_000, 1_500_000, 31, false) }),
      },
      {
        label: "primary residence exclusion",
        run: () =>
          ({ ...calculateCapitalGainsTax(3_000_000, 1_800_000, 31, true) }),
      },
    ],
    rateSafety: () => ({
      at10: calculateCapitalGainsTax(3_000_000, 1_800_000, 10, false) as Record<
        string,
        number
      >,
      at100: calculateCapitalGainsTax(3_000_000, 1_800_000, 100, false) as Record<
        string,
        number
      >,
      compareField: "cgtPayable",
    }),
  },
  {
    id: "emergency-fund",
    name: "Emergency Fund Calculator",
    usesRatePercent: false,
    runTypical: () => ({ ...calculateEmergencyFund(20_000, 6, 30_000) }),
    edgeCases: [
      {
        label: "zero expenses (division by zero)",
        run: () => ({ ...calculateEmergencyFund(0, 6, 30_000) }),
      },
      {
        label: "zero months",
        run: () => ({ ...calculateEmergencyFund(20_000, 0, 30_000) }),
      },
      {
        label: "months clamped at 24",
        run: () => ({ ...calculateEmergencyFund(10_000, 100, 0) }),
      },
    ],
  },
  {
    id: "rent-vs-buy",
    name: "Rent vs Buy Calculator",
    usesRatePercent: true,
    runTypical: () =>
      ({
        ...calculateRentVsBuy(15_000, 2_500_000, 10, 10, 20, 10, 5, 4),
      }),
    edgeCases: [
      {
        label: "zero comparison years",
        run: () =>
          ({ ...calculateRentVsBuy(15_000, 2_500_000, 10, 10, 20, 0, 5, 4) }),
      },
      {
        label: "zero property price",
        run: () =>
          ({ ...calculateRentVsBuy(15_000, 0, 10, 10, 20, 10, 5, 4) }),
      },
      {
        label: "zero rent",
        run: () =>
          ({ ...calculateRentVsBuy(0, 2_500_000, 10, 10, 20, 10, 5, 4) }),
      },
    ],
    rateSafety: () => ({
      at10: calculateRentVsBuy(15_000, 2_500_000, 10, 10, 20, 10, 5, 4) as Record<
        string,
        number
      >,
      at100: calculateRentVsBuy(15_000, 2_500_000, 10, 100, 20, 10, 5, 4) as Record<
        string,
        number
      >,
      compareField: "monthlyBondPayment",
    }),
  },
];

export function getCalculatorById(id: CalculatorId): CalculatorDefinition {
  const calc = CALCULATOR_REGISTRY.find((c) => c.id === id);
  if (!calc) throw new Error(`Unknown calculator: ${id}`);
  return calc;
}

export const CALCULATOR_COUNT = CALCULATOR_REGISTRY.length;
