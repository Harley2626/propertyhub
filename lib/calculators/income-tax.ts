import { ensureFinite } from "@/lib/format/numbers";

export type IncomeTaxResult = {
  grossTax: number;
  rebates: number;
  netTax: number;
  monthlyTax: number;
  takeHomeMonthly: number;
  effectiveRate: number;
  marginalRate: number;
};

export type AgeGroup = "under65" | "65to74" | "75plus";

/** SARS tax year 2027 (1 March 2026 – 28 February 2027) */
export const TAX_YEAR_LABEL = "2026/2027";

function calculateGrossTax(taxableIncome: number): number {
  if (taxableIncome <= 0) return 0;
  if (taxableIncome <= 245_100) return taxableIncome * 0.18;
  if (taxableIncome <= 383_100) {
    return 44_118 + (taxableIncome - 245_100) * 0.26;
  }
  if (taxableIncome <= 530_200) {
    return 79_998 + (taxableIncome - 383_100) * 0.31;
  }
  if (taxableIncome <= 695_800) {
    return 125_599 + (taxableIncome - 530_200) * 0.36;
  }
  if (taxableIncome <= 887_000) {
    return 185_215 + (taxableIncome - 695_800) * 0.39;
  }
  if (taxableIncome <= 1_878_600) {
    return 259_783 + (taxableIncome - 887_000) * 0.41;
  }
  return 666_339 + (taxableIncome - 1_878_600) * 0.45;
}

function getMarginalRate(taxableIncome: number): number {
  if (taxableIncome <= 245_100) return 18;
  if (taxableIncome <= 383_100) return 26;
  if (taxableIncome <= 530_200) return 31;
  if (taxableIncome <= 695_800) return 36;
  if (taxableIncome <= 887_000) return 39;
  if (taxableIncome <= 1_878_600) return 41;
  return 45;
}

function getRebates(ageGroup: AgeGroup): number {
  const primary = 17_820;
  const secondary = 9_765;
  const tertiary = 3_249;

  if (ageGroup === "75plus") return primary + secondary + tertiary;
  if (ageGroup === "65to74") return primary + secondary;
  return primary;
}

export function calculateIncomeTax(
  annualTaxableIncome: number,
  ageGroup: AgeGroup,
): IncomeTaxResult {
  const income = Math.max(0, annualTaxableIncome);
  const grossTax = ensureFinite(calculateGrossTax(income));
  const rebates = getRebates(ageGroup);
  const netTax = ensureFinite(Math.max(0, grossTax - rebates));
  const monthlyTax = ensureFinite(netTax / 12);
  const takeHomeMonthly = ensureFinite(
    Math.max(0, income / 12 - monthlyTax),
  );
  const effectiveRate =
    income > 0 ? ensureFinite((netTax / income) * 100) : 0;

  return {
    grossTax,
    rebates,
    netTax,
    monthlyTax,
    takeHomeMonthly,
    effectiveRate,
    marginalRate: getMarginalRate(income),
  };
}
