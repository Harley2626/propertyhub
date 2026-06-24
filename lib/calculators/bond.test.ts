import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { calculateBond } from "./bond.ts";
import { BOND_REFERENCES, UNREALISTIC_PAYMENT_THRESHOLD } from "./__fixtures__/reference-values.ts";
import {
  assertApprox,
  assertFinite,
  assertRealisticBondPayment,
} from "./test-utils.ts";

describe("Bond Calculator — external reference values", () => {
  for (const ref of BOND_REFERENCES) {
    test(ref.label, () => {
      const result = calculateBond(
        ref.loanAmount,
        ref.annualRatePercent,
        ref.termYears,
      );

      assertApprox(
        result.monthlyPayment,
        ref.expectedMonthly,
        ref.monthlyTolerance,
        "monthly payment",
      );
      assertApprox(
        result.totalPayment,
        ref.expectedTotal,
        ref.totalTolerance,
        "total payable",
      );
      assert.equal(
        Math.round(result.totalInterest),
        Math.round(result.totalPayment - ref.loanAmount),
      );
      assertRealisticBondPayment(
        result.monthlyPayment,
        ref.loanAmount,
        ref.termYears,
        ref.annualRatePercent,
      );
    });
  }
});

describe("Bond Calculator — edge cases", () => {
  test("0% rate — simple division, no interest", () => {
    const result = calculateBond(2_000_000, 0, 20);
    assert.equal(Math.round(result.monthlyPayment), Math.round(2_000_000 / 240));
    assert.equal(Math.round(result.totalPayment), 2_000_000);
    assert.equal(result.totalInterest, 0);
  });

  test("zero loan — all zeros", () => {
    const result = calculateBond(0, 10, 20);
    assert.equal(result.monthlyPayment, 0);
  });

  test("zero term — all zeros", () => {
    const result = calculateBond(2_000_000, 10, 0);
    assert.equal(result.monthlyPayment, 0);
  });

  test("negative inputs — safe zeros", () => {
    const result = calculateBond(-100, -10, -5);
    assert.equal(result.monthlyPayment, 0);
  });
});

describe("Bond Calculator — percentage safety", () => {
  test("10% rate produces ~R19,300 not ~R166,667 (100% bug symptom)", () => {
    const at10 = calculateBond(2_000_000, 10, 20);

    assertApprox(at10.monthlyPayment, UNREALISTIC_PAYMENT_THRESHOLD.minMonthlyAt10Percent, 5000);
    assert.ok(at10.monthlyPayment < UNREALISTIC_PAYMENT_THRESHOLD.maxMonthlyAt10Percent);
    // Simple division (0% rate) would be R8,333 — 10% must be higher but realistic
    assert.ok(at10.monthlyPayment > 2_000_000 / 240);
    assert.ok(at10.monthlyPayment < 2_000_000 / 12, "must not approach 100% monthly rate");
  });

  test("100% input clamped to 30% — same payment as explicit 30%", () => {
    const at10 = calculateBond(2_000_000, 10, 20);
    const at100 = calculateBond(2_000_000, 100, 20);
    const at30 = calculateBond(2_000_000, 30, 20);

    assert.equal(Math.round(at100.monthlyPayment), Math.round(at30.monthlyPayment));
    assertFinite(at100.monthlyPayment);
    assert.ok(at100.monthlyPayment > at10.monthlyPayment, "30% > 10% payment");
    assert.ok(at100.monthlyPayment < 2_000_000 / 12, "clamped rate stays realistic");
  });
});
