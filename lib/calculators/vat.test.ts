import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { calculateVat, VAT_RATE } from "./vat.ts";
import { VAT_REFERENCES } from "./__fixtures__/reference-values.ts";
import { assertApprox } from "./test-utils.ts";

describe("VAT Calculator — SARS 15% reference values", () => {
  for (const ref of VAT_REFERENCES) {
    test(ref.label, () => {
      const result = calculateVat(ref.amount, ref.mode);

      assertApprox(result.amountExclVat, ref.expectedExcl, 0.01, "excl VAT");
      assertApprox(result.vatAmount, ref.expectedVat, 0.01, "VAT amount");
      assertApprox(result.amountInclVat, ref.expectedIncl, 0.01, "incl VAT");
    });
  }
});

describe("VAT Calculator — formula verification", () => {
  test("standard rate is 15%", () => {
    assert.equal(VAT_RATE, 15);
  });

  test("add: VAT = amount × 0.15", () => {
    const result = calculateVat(200, "add");
    assert.equal(result.vatAmount, 30);
    assert.equal(result.amountInclVat, 230);
  });

  test("remove: excl = incl / 1.15", () => {
    const result = calculateVat(1_150, "remove");
    assertApprox(result.amountExclVat, 1_000, 0.01);
    assertApprox(result.vatAmount, 150, 0.01);
  });

  test("add then remove is symmetric", () => {
    for (const amount of [100, 1_000, 10_000, 99.99]) {
      const added = calculateVat(amount, "add");
      const removed = calculateVat(added.amountInclVat, "remove");
      assertApprox(removed.amountExclVat, amount, 0.02, `round-trip ${amount}`);
    }
  });
});

describe("VAT Calculator — edge cases", () => {
  test("zero amount", () => {
    const result = calculateVat(0, "add");
    assert.equal(result.vatAmount, 0);
  });

  test("negative amount treated as zero output", () => {
    const result = calculateVat(-100, "add");
    assert.equal(result.vatAmount, 0);
  });
});

describe("VAT Calculator — percentage safety", () => {
  test("15% of R1,000 is R150 not R150,000", () => {
    const result = calculateVat(1_000, "add");
    assert.equal(result.vatAmount, 150);
    assert.ok(result.vatAmount < 1_000, "VAT must be fraction of amount, not 100×");
  });
});
