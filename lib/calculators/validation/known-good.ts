import {
  AFFORDABILITY_REFERENCES,
  BOND_REFERENCES,
  COMPOUND_INTEREST_REFERENCES,
  INCOME_TAX_REFERENCES,
  INFLATION_REFERENCES,
  RENTAL_YIELD_REFERENCES,
  RETIREMENT_REFERENCES,
  TRANSFER_DUTY_REFERENCES,
  VAT_REFERENCES,
} from "../__fixtures__/reference-values";
import { calculateAffordability } from "../affordability";
import { calculateBond } from "../bond";
import { calculateCapitalGainsTax } from "../capital-gains-tax";
import { calculateCompoundInterest } from "../compound-interest";
import { calculateDeposit } from "../deposit";
import { calculateEmergencyFund } from "../emergency-fund";
import { calculateInflation } from "../inflation";
import { calculateRetirement } from "../retirement";
import { calculateIncomeTax } from "../income-tax";
import { calculateRentalYield } from "../rental-yield";
import { calculateTransferDuty } from "../transfer-duty";
import { calculateVat } from "../vat";
import { assertApprox } from "./guards";

export type KnownGoodTest = {
  calculatorId: string;
  label: string;
  source: string;
  run: () => void;
};

/** Externally verified known-good values — any change to formulas should fail these. */
export const KNOWN_GOOD_TESTS: KnownGoodTest[] = [
  ...BOND_REFERENCES.map((ref) => ({
    calculatorId: "bond",
    label: ref.label,
    source: ref.source,
    run: () => {
      const r = calculateBond(ref.loanAmount, ref.annualRatePercent, ref.termYears);
      assertApprox(r.monthlyPayment, ref.expectedMonthly, ref.monthlyTolerance);
      assertApprox(r.totalPayment, ref.expectedTotal, ref.totalTolerance);
    },
  })),
  ...TRANSFER_DUTY_REFERENCES.map((ref) => ({
    calculatorId: "transfer-duty",
    label: ref.label,
    source: ref.source,
    run: () => {
      assertApprox(calculateTransferDuty(ref.purchasePrice), ref.expectedDuty, 1);
    },
  })),
  ...COMPOUND_INTEREST_REFERENCES.map((ref) => ({
    calculatorId: "compound-interest",
    label: ref.label,
    source: ref.source,
    run: () => {
      const r = calculateCompoundInterest(
        ref.initial,
        ref.monthly,
        ref.annualRatePercent,
        ref.years,
      );
      assertApprox(r.futureValue, ref.expectedFV, ref.tolerance);
    },
  })),
  ...RETIREMENT_REFERENCES.map((ref) => ({
    calculatorId: "retirement",
    label: ref.label,
    source: ref.source,
    run: () => {
      const r = calculateRetirement(
        ref.currentAge,
        ref.retirementAge,
        ref.currentSavings,
        ref.desiredMonthlyIncome,
        ref.monthlyContribution,
        ref.annualRatePercent,
      );
      assertApprox(r.projectedSavings, ref.expectedProjected, ref.projectedTolerance);
      if (ref.expectedNestEgg) {
        assertApprox(r.requiredNestEgg, ref.expectedNestEgg, 1);
      }
    },
  })),
  ...INFLATION_REFERENCES.map((ref) => ({
    calculatorId: "inflation",
    label: ref.label,
    source: ref.source,
    run: () => {
      const r = calculateInflation(ref.amount, ref.annualRatePercent, ref.years);
      assertApprox(r.futureValue, ref.expectedFuture, ref.tolerance);
    },
  })),
  ...RENTAL_YIELD_REFERENCES.map((ref) => ({
    calculatorId: "rental-yield",
    label: ref.label,
    source: ref.source,
    run: () => {
      const r = calculateRentalYield(
        ref.propertyValue,
        ref.monthlyRent,
        ref.monthlyExpenses,
      );
      assertApprox(r.grossYield, ref.expectedGross, 0.1);
      assertApprox(r.netYield, ref.expectedNet, 0.1);
    },
  })),
  ...AFFORDABILITY_REFERENCES.map((ref) => ({
    calculatorId: "affordability",
    label: ref.label,
    source: ref.source,
    run: () => {
      const r = calculateAffordability(
        ref.grossMonthlyIncome,
        ref.existingDebt,
        ref.annualRatePercent,
        ref.termYears,
      );
      assertApprox(r.maxMonthlyPayment, ref.expectedMaxPayment, 1);
      assertApprox(r.maxPropertyPrice, ref.expectedMaxProperty, ref.propertyTolerance);
    },
  })),
  ...INCOME_TAX_REFERENCES.map((ref) => ({
    calculatorId: "income-tax",
    label: ref.label,
    source: ref.source,
    run: () => {
      const r = calculateIncomeTax(ref.annualIncome, ref.ageGroup);
      assertApprox(r.grossTax, ref.expectedGrossTax, ref.tolerance);
      assertApprox(r.netTax, ref.expectedNetTax, ref.tolerance);
    },
  })),
  ...VAT_REFERENCES.map((ref) => ({
    calculatorId: "vat",
    label: ref.label,
    source: ref.source,
    run: () => {
      const r = calculateVat(ref.amount, ref.mode);
      assertApprox(r.amountExclVat, ref.expectedExcl, 0.01);
      assertApprox(r.vatAmount, ref.expectedVat, 0.01);
      assertApprox(r.amountInclVat, ref.expectedIncl, 0.01);
    },
  })),
  {
    calculatorId: "deposit",
    label: "R2m, 10% deposit, R80k saved",
    source: "Deposit + SARS transfer duty",
    run: () => {
      const r = calculateDeposit(2_000_000, 10, 80_000);
      assertApprox(r.depositAmount, 200_000, 1);
      assertApprox(r.transferDuty, 33_786, 1);
      assertApprox(r.remainingToSave, 120_000, 1);
    },
  },
  {
    calculatorId: "capital-gains-tax",
    label: "R3m sale, R1.8m cost, 31% marginal",
    source: "SA CGT 40% inclusion rate",
    run: () => {
      const r = calculateCapitalGainsTax(3_000_000, 1_800_000, 31, false);
      assertApprox(r.capitalGain, 1_200_000, 1);
      assertApprox(r.cgtPayable, 148_800, 1);
    },
  },
  {
    calculatorId: "emergency-fund",
    label: "R20k expenses, 6 months, R30k saved",
    source: "Target = expenses × months",
    run: () => {
      const r = calculateEmergencyFund(20_000, 6, 30_000);
      assertApprox(r.targetFund, 120_000, 1);
      assertApprox(r.remainingToSave, 90_000, 1);
      assertApprox(r.percentComplete, 25, 0.1);
    },
  },
  {
    calculatorId: "compound-interest",
    label: "R100k + R1k/mo at 10% for 20 years",
    source: "Monthly FV annuity formula",
    run: () => {
      const r = calculateCompoundInterest(100_000, 1_000, 10, 20);
      assertApprox(r.futureValue, 1_492_176, 2_000);
    },
  },
  {
    calculatorId: "vat",
    label: "R100 excl → R115 incl",
    source: "SARS 15% VAT",
    run: () => {
      const r = calculateVat(100, "add");
      assertApprox(r.amountExclVat, 100, 0.01);
      assertApprox(r.vatAmount, 15, 0.01);
      assertApprox(r.amountInclVat, 115, 0.01);
    },
  },
];
