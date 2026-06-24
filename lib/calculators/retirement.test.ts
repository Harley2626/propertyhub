import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { calculateRetirement } from "./retirement.ts";
import { RETIREMENT_REFERENCES } from "./__fixtures__/reference-values.ts";
import {
  assertApprox,
  assertFinite,
  assertRealisticFutureValue,
} from "./test-utils.ts";

describe("Retirement Calculator — reference values", () => {
  for (const ref of RETIREMENT_REFERENCES) {
    test(ref.label, () => {
      const result = calculateRetirement(
        ref.currentAge,
        ref.retirementAge,
        ref.currentSavings,
        ref.desiredMonthlyIncome,
        ref.monthlyContribution,
        ref.annualRatePercent,
      );

      assertApprox(
        result.projectedSavings,
        ref.expectedProjected,
        ref.projectedTolerance,
        "projected savings",
      );
      assert.equal(result.requiredNestEgg, ref.expectedNestEgg);
      assert.equal(result.yearsToRetirement, 30);
      assertRealisticFutureValue(
        result.projectedSavings,
        result.totalContributions,
      );
    });
  }
});

describe("Retirement Calculator — 4% withdrawal rule", () => {
  test("R25k/month income requires R7.5m nest egg", () => {
    const result = calculateRetirement(35, 65, 0, 25_000, 0, 8);
    assert.equal(result.requiredNestEgg, 7_500_000);
  });

  test("on track when projected exceeds required", () => {
    const result = calculateRetirement(35, 65, 5_000_000, 10_000, 5_000, 8);
    assert.equal(result.onTrack, true);
    assert.equal(result.monthlyShortfall, 0);
  });
});

describe("Retirement Calculator — edge cases", () => {
  test("same age — no growth period", () => {
    const result = calculateRetirement(65, 65, 500_000, 25_000, 0, 10);
    assert.equal(result.projectedSavings, 500_000);
    assert.equal(result.yearsToRetirement, 0);
  });

  test("retirement before current age — zero years", () => {
    const result = calculateRetirement(50, 45, 100_000, 20_000, 1_000, 10);
    assert.equal(result.yearsToRetirement, 0);
  });
});

describe("Retirement Calculator — percentage safety", () => {
  test("10% return ≈ R9.96m, not quadrillions", () => {
    const at10 = calculateRetirement(35, 65, 160_000, 25_000, 3_000, 10);
    assertApprox(at10.projectedSavings, 9_955_448, 50_000);
    assert.ok(at10.projectedSavings < 20_000_000);
  });

  test("100% input clamped to 30%", () => {
    const at100 = calculateRetirement(35, 65, 160_000, 25_000, 3_000, 100);
    const at30 = calculateRetirement(35, 65, 160_000, 25_000, 3_000, 30);
    assert.equal(
      Math.round(at100.projectedSavings),
      Math.round(at30.projectedSavings),
    );
    assertFinite(at100.projectedSavings);
  });
});
