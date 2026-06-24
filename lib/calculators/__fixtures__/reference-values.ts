/**
 * Externally verified reference values for calculator tests.
 *
 * Sources:
 * - Bond: standard amortization formula (matches Ooba / BetterBond / bank calculators)
 * - Transfer duty: SARS brackets effective 1 April 2025
 * - Compound interest / retirement: monthly compounding FV annuity formula
 * - Income tax: SARS 2026/2027 individual tax tables
 * - VAT: SARS standard rate 15%
 * - Inflation: compound growth formula
 * - Rental yield: gross/net yield standard property formula
 */

export const BOND_REFERENCES = [
  {
    label: "R2m at 10% over 20 years",
    source: "Standard amortization (Ooba-calculator equivalent)",
    loanAmount: 2_000_000,
    annualRatePercent: 10,
    termYears: 20,
    expectedMonthly: 19_300,
    expectedTotal: 4_632_587,
    monthlyTolerance: 50,
    totalTolerance: 500,
  },
  {
    label: "R1.5m at 11.5% over 20 years",
    source: "Standard amortization",
    loanAmount: 1_500_000,
    annualRatePercent: 11.5,
    termYears: 20,
    expectedMonthly: 15_996,
    expectedTotal: 3_839_040,
    monthlyTolerance: 50,
    totalTolerance: 500,
  },
  {
    label: "R800k at 9% over 30 years",
    source: "Standard amortization",
    loanAmount: 800_000,
    annualRatePercent: 9,
    termYears: 30,
    expectedMonthly: 6_437,
    expectedTotal: 2_317_320,
    monthlyTolerance: 50,
    totalTolerance: 500,
  },
] as const;

export const TRANSFER_DUTY_REFERENCES = [
  {
    label: "Below R1.21m threshold",
    source: "SARS 2025 brackets",
    purchasePrice: 1_210_000,
    expectedDuty: 0,
  },
  {
    label: "R2m purchase",
    source: "SARS 2025 brackets",
    purchasePrice: 2_000_000,
    expectedDuty: 33_786,
  },
  {
    label: "R2.5m purchase",
    source: "SARS 2025 brackets",
    purchasePrice: 2_500_000,
    expectedDuty: 67_200,
  },
  {
    label: "Upper 6% bracket boundary",
    source: "SARS 2025 brackets",
    purchasePrice: 2_329_300,
    expectedDuty: 53_544,
  },
] as const;

export const COMPOUND_INTEREST_REFERENCES = [
  {
    label: "R160k + R3k/month at 10% for 30 years",
    source: "Monthly FV annuity formula",
    initial: 160_000,
    monthly: 3_000,
    annualRatePercent: 10,
    years: 30,
    expectedFV: 9_955_448,
    tolerance: 50_000,
  },
  {
    label: "R100k lump sum at 8% for 10 years (no contributions)",
    source: "Monthly compounding FV = P(1+r)^n",
    initial: 100_000,
    monthly: 0,
    annualRatePercent: 8,
    years: 10,
    expectedFV: 221_964,
    tolerance: 500,
  },
  {
    label: "R50k + R1k/month at 7% for 20 years",
    source: "Monthly FV annuity formula",
    initial: 50_000,
    monthly: 1_000,
    annualRatePercent: 7,
    years: 20,
    expectedFV: 722_864,
    tolerance: 2_000,
  },
] as const;

export const RETIREMENT_REFERENCES = [
  {
    label: "Age 35→65, R160k saved, R3k/month at 10%",
    source: "Same FV as compound interest reference",
    currentAge: 35,
    retirementAge: 65,
    currentSavings: 160_000,
    desiredMonthlyIncome: 25_000,
    monthlyContribution: 3_000,
    annualRatePercent: 10,
    expectedProjected: 9_955_448,
    expectedNestEgg: 7_500_000,
    projectedTolerance: 50_000,
  },
] as const;

export const INFLATION_REFERENCES = [
  {
    label: "R100k at 5.5% CPI for 10 years",
    source: "Future cost = P × (1 + rate)^years",
    amount: 100_000,
    annualRatePercent: 5.5,
    years: 10,
    expectedFuture: 170_814,
    expectedPurchasingPower: 58_543,
    tolerance: 500,
  },
  {
    label: "R50k at 6% for 5 years",
    source: "Compound inflation",
    amount: 50_000,
    annualRatePercent: 6,
    years: 5,
    expectedFuture: 66_911,
    tolerance: 100,
  },
] as const;

export const RENTAL_YIELD_REFERENCES = [
  {
    label: "R2m property, R15k/month rent, no expenses",
    source: "Gross yield = (rent × 12) / value × 100",
    propertyValue: 2_000_000,
    monthlyRent: 15_000,
    monthlyExpenses: 0,
    expectedGross: 9.0,
    expectedNet: 9.0,
  },
  {
    label: "R1.8m property, R12k rent, R2.5k expenses",
    source: "Net yield after expenses",
    propertyValue: 1_800_000,
    monthlyRent: 12_000,
    monthlyExpenses: 2_500,
    expectedGross: 8.0,
    expectedNet: 6.333,
  },
] as const;

export const AFFORDABILITY_REFERENCES = [
  {
    label: "R45k income, R5k debt, 10%, 20 years",
    source: "30% rule + inverse amortization",
    grossMonthlyIncome: 45_000,
    existingDebt: 5_000,
    annualRatePercent: 10,
    termYears: 20,
    expectedMaxPayment: 8_500,
    expectedMaxProperty: 978_000,
    propertyTolerance: 50_000,
  },
  {
    label: "R50k income, no debt, 10%, 20 years",
    source: "30% rule",
    grossMonthlyIncome: 50_000,
    existingDebt: 0,
    annualRatePercent: 10,
    termYears: 20,
    expectedMaxPayment: 15_000,
    expectedMaxProperty: 1_726_000,
    propertyTolerance: 50_000,
  },
] as const;

export const INCOME_TAX_REFERENCES = [
  {
    label: "R500k taxable, under 65",
    source: "SARS 2026/2027 tax tables",
    annualIncome: 500_000,
    ageGroup: "under65" as const,
    expectedGrossTax: 116_237,
    expectedNetTax: 98_417,
    expectedMarginal: 31,
    tolerance: 1,
  },
  {
    label: "R600k taxable, under 65",
    source: "SARS 2026/2027 tax tables",
    annualIncome: 600_000,
    ageGroup: "under65" as const,
    expectedGrossTax: 150_727,
    expectedNetTax: 132_907,
    expectedMarginal: 36,
    tolerance: 1,
  },
  {
    label: "R99k — below tax threshold",
    source: "SARS tax threshold R99,000 (2027)",
    annualIncome: 99_000,
    ageGroup: "under65" as const,
    expectedGrossTax: 17_820,
    expectedNetTax: 0,
    expectedMarginal: 18,
    tolerance: 1,
  },
] as const;

export const VAT_REFERENCES = [
  {
    label: "Add 15% to R1,000 excl",
    source: "SARS standard VAT rate",
    amount: 1_000,
    mode: "add" as const,
    expectedExcl: 1_000,
    expectedVat: 150,
    expectedIncl: 1_150,
  },
  {
    label: "Remove 15% from R115 incl",
    source: "SARS standard VAT rate",
    amount: 115,
    mode: "remove" as const,
    expectedExcl: 100,
    expectedVat: 15,
    expectedIncl: 115,
  },
  {
    label: "Add 15% to R10,000 excl",
    source: "SARS standard VAT rate",
    amount: 10_000,
    mode: "add" as const,
    expectedExcl: 10_000,
    expectedVat: 1_500,
    expectedIncl: 11_500,
  },
] as const;

/** Rate values that must NOT be confused due to locale parsing bugs */
export const PERCENTAGE_SAFETY_CASES = [
  { input: "10", expectedRate: 10 },
  { input: "10.0", expectedRate: 10 },
  { input: "10,0", expectedRate: 10 },
  { input: "11.5", expectedRate: 11.5 },
  { input: "11,5", expectedRate: 11.5 },
] as const;

/** Monthly payment at 10% must never approach loan/12 (100% rate symptom) */
export const UNREALISTIC_PAYMENT_THRESHOLD = {
  loanAmount: 2_000_000,
  maxMonthlyAt10Percent: 25_000,
  minMonthlyAt10Percent: 15_000,
};
