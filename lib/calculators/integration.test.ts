/**
 * Cross-calculator integration consistency tests.
 */
import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { calculateBond } from "./bond.ts";
import { calculateAffordability, calculateMaxLoanFromPayment } from "./affordability.ts";
import { calculateCompoundInterest } from "./compound-interest.ts";
import { calculateRetirement } from "./retirement.ts";
import { calculateDeposit } from "./deposit.ts";
import { calculateTransferDuty } from "./transfer-duty.ts";
import { assertApprox } from "./test-utils.ts";

describe("Bond ↔ Affordability consistency", () => {
  test("max loan from affordability payment equals original loan", () => {
    const loan = 1_800_000;
    const rate = 10;
    const term = 20;
    const bond = calculateBond(loan, rate, term);
    const maxLoan = calculateMaxLoanFromPayment(bond.monthlyPayment, rate, term);
    assertApprox(maxLoan, loan, 50);
  });
});

describe("Compound Interest ↔ Retirement consistency", () => {
  test("retirement projection equals compound interest for same inputs", () => {
    const compound = calculateCompoundInterest(160_000, 3_000, 10, 30);
    const retirement = calculateRetirement(35, 65, 160_000, 0, 3_000, 10);
    assert.equal(
      Math.round(compound.futureValue),
      Math.round(retirement.projectedSavings),
    );
  });
});

describe("Deposit ↔ Transfer Duty consistency", () => {
  test("deposit calculator uses same transfer duty as direct calculation", () => {
    const price = 2_500_000;
    const deposit = calculateDeposit(price, 10, 0);
    assert.equal(Math.round(deposit.transferDuty), Math.round(calculateTransferDuty(price)));
  });
});

describe("All calculators return finite numbers for typical inputs", () => {
  test("no NaN or Infinity in standard scenario", () => {
    const bond = calculateBond(2_000_000, 10, 20);
    const afford = calculateAffordability(45_000, 5_000, 10, 20);
    const compound = calculateCompoundInterest(100_000, 1_000, 8, 15);
    const retirement = calculateRetirement(35, 65, 100_000, 20_000, 2_000, 8);
    const deposit = calculateDeposit(2_000_000, 10, 50_000);

    for (const [name, value] of Object.entries({
      bondPayment: bond.monthlyPayment,
      affordPrice: afford.maxPropertyPrice,
      compoundFV: compound.futureValue,
      retirementFV: retirement.projectedSavings,
      depositTotal: deposit.totalUpfrontCosts,
    })) {
      assert.ok(Number.isFinite(value), `${name} must be finite, got ${value}`);
    }
  });
});
