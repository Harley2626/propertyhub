import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { calculateInflation } from "./inflation.ts";
import { INFLATION_REFERENCES } from "./__fixtures__/reference-values.ts";
import { assertApprox, assertFinite } from "./test-utils.ts";

describe("Inflation Calculator — reference values", () => {
  for (const ref of INFLATION_REFERENCES) {
    test(ref.label, () => {
      const result = calculateInflation(
        ref.amount,
        ref.annualRatePercent,
        ref.years,
      );

      assertApprox(result.futureValue, ref.expectedFuture, ref.tolerance, "future cost");

      if ("expectedPurchasingPower" in ref) {
        assertApprox(
          result.equivalentToday,
          ref.expectedPurchasingPower,
          ref.tolerance,
          "purchasing power",
        );
        assertApprox(
          result.purchasingPowerLoss,
          ref.amount - ref.expectedPurchasingPower,
          ref.tolerance,
          "power lost",
        );
      }
    });
  }
});

describe("Inflation Calculator — edge cases", () => {
  test("zero years — no change", () => {
    const result = calculateInflation(100_000, 5.5, 0);
    assert.equal(result.futureValue, 100_000);
    assert.equal(result.purchasingPowerLoss, 0);
  });

  test("zero amount", () => {
    const result = calculateInflation(0, 5.5, 10);
    assert.equal(result.futureValue, 0);
  });

  test("0% inflation — purchasing power unchanged", () => {
    const result = calculateInflation(100_000, 0, 10);
    assert.equal(result.futureValue, 100_000);
    assert.equal(result.equivalentToday, 100_000);
    assert.equal(result.purchasingPowerLoss, 0);
  });
});

describe("Inflation Calculator — percentage safety", () => {
  test("rate is annual decimal not monthly (10% ≠ 10 per month)", () => {
    const at10 = calculateInflation(100_000, 10, 10);
    const at120 = calculateInflation(100_000, 120, 10); // clamped to 50%

    assertApprox(at10.futureValue, 259_374, 1000);
    assert.ok(at10.futureValue < 500_000, "10% over 10 years should not 5×+ unrealistically from monthly bug");
    assertFinite(at120.futureValue);
  });

  test("extreme rate clamped — finite output", () => {
    const result = calculateInflation(100_000, 999, 30);
    assertFinite(result.futureValue);
  });
});
