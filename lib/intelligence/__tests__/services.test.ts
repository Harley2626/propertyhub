import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { calculateBond } from "@/lib/calculators/bond";
import { calculateAffordability } from "@/lib/calculators/affordability";
import { calculateTransferDuty } from "@/lib/calculators/transfer-duty";
import { calculateDeposit } from "@/lib/calculators/deposit";
import { calculateRentalYield } from "@/lib/calculators/rental-yield";
import { BOND_REFERENCES } from "@/lib/calculators/__fixtures__/reference-values";
import { assertApprox } from "@/lib/calculators/test-utils";
import {
  bondService,
  affordabilityService,
  transferDutyService,
  depositService,
  rentalYieldService,
  propertyFinanceService,
  propertyAnalysisService,
} from "../services";

describe("Intelligence services — parity with lib/calculators", () => {
  test("BondService matches calculateBond", () => {
    for (const ref of BOND_REFERENCES.slice(0, 3)) {
      const direct = calculateBond(
        ref.loanAmount,
        ref.annualRatePercent,
        ref.termYears,
      );
      const viaService = bondService.calculate({
        loanAmount: ref.loanAmount,
        annualRatePercent: ref.annualRatePercent,
        termYears: ref.termYears,
      });
      assert.deepEqual(viaService, direct);
    }
  });

  test("AffordabilityService matches calculateAffordability", () => {
    const input = {
      grossMonthlyIncome: 45_000,
      existingMonthlyDebt: 3_500,
      annualRatePercent: 11,
      termYears: 20,
      depositPercent: 10,
    };
    assert.deepEqual(
      affordabilityService.calculate(input),
      calculateAffordability(
        input.grossMonthlyIncome,
        input.existingMonthlyDebt,
        input.annualRatePercent,
        input.termYears,
        input.depositPercent,
      ),
    );
  });

  test("TransferDutyService matches calculateTransferDuty", () => {
    const price = 2_500_000;
    assert.equal(
      transferDutyService.calculate({ purchasePrice: price }),
      calculateTransferDuty(price),
    );
  });

  test("DepositService matches calculateDeposit", () => {
    const input = {
      propertyPrice: 2_000_000,
      depositPercent: 10,
      amountSaved: 100_000,
    };
    assert.deepEqual(
      depositService.calculate(input),
      calculateDeposit(
        input.propertyPrice,
        input.depositPercent,
        input.amountSaved,
      ),
    );
  });

  test("RentalYieldService matches calculateRentalYield", () => {
    const input = {
      propertyValue: 1_800_000,
      monthlyRent: 12_500,
      monthlyExpenses: 1_500,
    };
    assert.deepEqual(
      rentalYieldService.calculate(input),
      calculateRentalYield(
        input.propertyValue,
        input.monthlyRent,
        input.monthlyExpenses,
      ),
    );
  });
});

describe("PropertyFinanceService", () => {
  test("composes bond, transfer duty, deposit, and ownership cost", () => {
    const snapshot = propertyFinanceService.calculate({
      propertyPrice: 2_000_000,
      depositPercent: 10,
      annualRatePercent: 11,
      termYears: 20,
      monthlyLevy: 2_500,
      monthlyRates: 900,
    });

    assert.equal(snapshot.loanAmount, 1_800_000);
    assert.ok(snapshot.bond.monthlyPayment > 0);
    assert.ok(snapshot.transferDuty.transferDuty >= 0);
    assert.equal(snapshot.deposit.depositAmount, 200_000);
    assertApprox(
      snapshot.monthlyOwnership.totalMonthly,
      snapshot.bond.monthlyPayment + 2_500 + 900 + snapshot.monthlyOwnership.maintenance,
      0.01,
      "total monthly ownership",
    );
  });
});

describe("PropertyAnalysisService", () => {
  test("returns finance snapshot and unavailable future fields", () => {
    const analysis = propertyAnalysisService.analyze({
      propertyPrice: 1_500_000,
      monthlyRent: 10_000,
    });

    assert.equal(analysis.finance.propertyPrice, 1_500_000);
    assert.equal(analysis.monthlyOwnershipCost.status, "available");
    assert.equal(analysis.rentalEstimate.status, "available");
    assert.equal(analysis.estimatedValue.status, "unavailable");
    assert.equal(analysis.crimeIndicators.status, "unavailable");
    assert.ok(analysis.meta.serviceVersion);
  });
});
