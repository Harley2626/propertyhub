import { test, describe } from "node:test";
import assert from "node:assert/strict";
import {
  calculateAffordability,
  calculateMaxLoanFromPayment,
} from "./affordability.ts";
import { calculateBond } from "./bond.ts";
import { AFFORDABILITY_REFERENCES } from "./__fixtures__/reference-values.ts";
import { assertApprox, assertFinite } from "./test-utils.ts";

describe("Affordability — reference values", () => {
  for (const ref of AFFORDABILITY_REFERENCES) {
    test(ref.label, () => {
      const result = calculateAffordability(
        ref.grossMonthlyIncome,
        ref.existingDebt,
        ref.annualRatePercent,
        ref.termYears,
      );

      assert.equal(result.maxMonthlyPayment, ref.expectedMaxPayment);
      assertApprox(
        result.maxPropertyPrice,
        ref.expectedMaxProperty,
        ref.propertyTolerance,
        "max property price",
      );
      assertFinite(result.maxLoanAmount);
    });
  }
});

describe("Affordability — bond formula consistency", () => {
  test("max loan from payment round-trips with bond calculator", () => {
    const bond = calculateBond(2_000_000, 10, 20);
    const maxLoan = calculateMaxLoanFromPayment(bond.monthlyPayment, 10, 20);
    assertApprox(maxLoan, 2_000_000, 100);
  });

  test("max payment at 30% of income minus debt", () => {
    const result = calculateAffordability(45_000, 5_000, 10, 20);
    assert.equal(result.maxMonthlyPayment, 45_000 * 0.3 - 5_000);
  });
});

describe("Affordability — edge cases", () => {
  test("zero income — all zeros", () => {
    const result = calculateAffordability(0, 0, 10, 20);
    assert.equal(result.maxLoanAmount, 0);
  });

  test("zero term — no NaN", () => {
    const result = calculateAffordability(45_000, 0, 10, 0);
    assert.equal(result.maxLoanAmount, 0);
    assert.ok(Number.isFinite(result.maxPropertyPrice));
  });

  test("debt exceeds 30% of income — zero payment capacity", () => {
    const result = calculateAffordability(30_000, 10_000, 10, 20);
    assert.equal(result.maxMonthlyPayment, 0);
    assert.equal(result.maxLoanAmount, 0);
  });
});

describe("Affordability — percentage safety", () => {
  test("10% rate gives realistic property price, not inflated by 100% bug", () => {
    const at10 = calculateAffordability(50_000, 0, 10, 20);
    const at100 = calculateAffordability(50_000, 0, 100, 20);

    assertApprox(at10.maxPropertyPrice, 1_726_000, 50_000);
    assert.ok(at10.maxPropertyPrice > at100.maxPropertyPrice || at100.maxPropertyPrice < 500_000);
    assertFinite(at100.maxPropertyPrice);
  });
});
