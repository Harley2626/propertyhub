import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { calculateIncomeTax } from "./income-tax.ts";
import { INCOME_TAX_REFERENCES } from "./__fixtures__/reference-values.ts";
import { assertApprox, assertFinite } from "./test-utils.ts";

describe("Income Tax — SARS 2026/2027 reference values", () => {
  for (const ref of INCOME_TAX_REFERENCES) {
    test(ref.label, () => {
      const result = calculateIncomeTax(ref.annualIncome, ref.ageGroup);

      assertApprox(result.grossTax, ref.expectedGrossTax, ref.tolerance, "gross tax");
      assertApprox(result.netTax, ref.expectedNetTax, ref.tolerance, "net tax");
      assert.equal(result.marginalRate, ref.expectedMarginal);
      assertFinite(result.takeHomeMonthly);
    });
  }
});

describe("Income Tax — bracket boundaries", () => {
  test("R245,100 top of 18% bracket", () => {
    const result = calculateIncomeTax(245_100, "under65");
    assertApprox(result.grossTax, 44_118, 1);
  });

  test("R245,101 starts 26% bracket", () => {
    const result = calculateIncomeTax(245_101, "under65");
    assertApprox(result.grossTax, 44_118.26, 1);
  });

  test("tax increases with income", () => {
    const low = calculateIncomeTax(300_000, "under65");
    const high = calculateIncomeTax(600_000, "under65");
    assert.ok(high.netTax > low.netTax);
  });
});

describe("Income Tax — rebates by age", () => {
  test("under 65 — primary rebate only (R17,820)", () => {
    const result = calculateIncomeTax(600_000, "under65");
    assert.equal(result.rebates, 17_820);
  });

  test("65–74 — primary + secondary (R27,585)", () => {
    const result = calculateIncomeTax(600_000, "65to74");
    assert.equal(result.rebates, 17_820 + 9_765);
    assert.ok(result.netTax < calculateIncomeTax(600_000, "under65").netTax);
  });

  test("75+ — all three rebates (R30,834)", () => {
    const result = calculateIncomeTax(600_000, "75plus");
    assert.equal(result.rebates, 17_820 + 9_765 + 3_249);
  });
});

describe("Income Tax — edge cases", () => {
  test("zero income", () => {
    const result = calculateIncomeTax(0, "under65");
    assert.equal(result.netTax, 0);
    assert.equal(result.effectiveRate, 0);
  });

  test("take-home + tax equals gross (monthly)", () => {
    const result = calculateIncomeTax(500_000, "under65");
    assertApprox(
      result.takeHomeMonthly * 12 + result.netTax,
      500_000,
      1,
    );
  });
});
