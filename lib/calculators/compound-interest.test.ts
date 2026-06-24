import { test, describe } from "node:test";
import assert from "node:assert/strict";
import {
  calculateCompoundInterest,
  calculateRequiredMonthlyContribution,
} from "./compound-interest.ts";
import { COMPOUND_INTEREST_REFERENCES } from "./__fixtures__/reference-values.ts";
import {
  assertApprox,
  assertFinite,
  assertRealisticFutureValue,
} from "./test-utils.ts";

describe("Compound Interest — reference values", () => {
  for (const ref of COMPOUND_INTEREST_REFERENCES) {
    test(ref.label, () => {
      const result = calculateCompoundInterest(
        ref.initial,
        ref.monthly,
        ref.annualRatePercent,
        ref.years,
      );

      assertApprox(result.futureValue, ref.expectedFV, ref.tolerance, "future value");
      assert.equal(
        Math.round(result.totalInterest),
        Math.round(result.futureValue - result.totalContributions),
      );
      assertRealisticFutureValue(result.futureValue, result.totalContributions);
    });
  }
});

describe("Compound Interest — edge cases", () => {
  test("zero rate — linear accumulation, no interest", () => {
    const result = calculateCompoundInterest(100_000, 1_000, 0, 10);
    assert.equal(result.futureValue, 100_000 + 1_000 * 120);
    assert.equal(result.totalInterest, 0);
  });

  test("zero years — returns initial only", () => {
    const result = calculateCompoundInterest(50_000, 1_000, 10, 0);
    assert.equal(result.futureValue, 50_000);
  });

  test("required contribution round-trips to target FV", () => {
    const target = 7_500_000;
    const pmt = calculateRequiredMonthlyContribution(target, 160_000, 10, 30);
    const result = calculateCompoundInterest(160_000, pmt, 10, 30);
    assertApprox(result.futureValue, target, 1000);
  });
});

describe("Compound Interest — percentage safety", () => {
  test("10% over 30 years ≈ R9.96m not quadrillions", () => {
    const at10 = calculateCompoundInterest(160_000, 3_000, 10, 30);
    const at100 = calculateCompoundInterest(160_000, 3_000, 100, 30);

    assertApprox(at10.futureValue, 9_955_448, 50_000);
    assert.ok(at10.futureValue < 20_000_000);
    assert.equal(
      Math.round(at100.futureValue),
      Math.round(calculateCompoundInterest(160_000, 3_000, 30, 30).futureValue),
    );
    assertFinite(at100.futureValue);
  });
});
