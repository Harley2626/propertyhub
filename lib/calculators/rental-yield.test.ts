import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { calculateRentalYield } from "./rental-yield.ts";
import { RENTAL_YIELD_REFERENCES } from "./__fixtures__/reference-values.ts";
import { assertApprox, assertFinite } from "./test-utils.ts";

describe("Rental Yield — reference values", () => {
  for (const ref of RENTAL_YIELD_REFERENCES) {
    test(ref.label, () => {
      const result = calculateRentalYield(
        ref.propertyValue,
        ref.monthlyRent,
        ref.monthlyExpenses,
      );

      assertApprox(result.grossYield, ref.expectedGross, 0.1, "gross yield");
      assertApprox(result.netYield, ref.expectedNet, 0.1, "net yield");
      assert.equal(result.annualRent, ref.monthlyRent * 12);
      assert.equal(result.annualExpenses, ref.monthlyExpenses * 12);
    });
  }
});

describe("Rental Yield — edge cases", () => {
  test("zero property value — no division by zero", () => {
    const result = calculateRentalYield(0, 12_000, 2_500);
    assert.equal(result.grossYield, 0);
    assert.equal(result.netYield, 0);
  });

  test("expenses exceed rent — negative net yield", () => {
    const result = calculateRentalYield(1_000_000, 5_000, 8_000);
    assert.ok(result.grossYield > 0);
    assert.ok(result.netYield < 0);
    assertFinite(result.netYield);
  });

  test("negative inputs treated as zero", () => {
    const result = calculateRentalYield(1_000_000, -5_000, -1_000);
    assert.equal(result.annualRent, 0);
    assert.equal(result.grossYield, 0);
  });
});

describe("Rental Yield — formula verification", () => {
  test("gross yield = (monthly rent × 12 / value) × 100", () => {
    const value = 3_000_000;
    const rent = 20_000;
    const result = calculateRentalYield(value, rent, 0);
    const expected = ((rent * 12) / value) * 100;
    assertApprox(result.grossYield, expected, 0.001);
  });
});
