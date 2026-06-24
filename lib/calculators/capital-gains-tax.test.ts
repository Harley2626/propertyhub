import { test } from "node:test";
import { calculateCapitalGainsTax } from "./capital-gains-tax.ts";
import { assertApprox, assertFinite } from "./test-utils.ts";
import assert from "node:assert/strict";

test("R3m sale, R1.8m cost, 31% marginal — CGT ≈ R148,800", () => {
  const r = calculateCapitalGainsTax(3_000_000, 1_800_000, 31, false);
  assert.equal(r.capitalGain, 1_200_000);
  assert.equal(r.taxableGain, 480_000);
  assertApprox(r.cgtPayable, 148_800, 1);
});

test("primary residence R2m exclusion", () => {
  const r = calculateCapitalGainsTax(3_000_000, 1_800_000, 31, true);
  assert.equal(r.exclusionApplied, 1_200_000);
  assert.equal(r.cgtPayable, 0);
});

test("gain below R2m exclusion — no CGT", () => {
  const r = calculateCapitalGainsTax(2_500_000, 1_000_000, 31, true);
  assert.equal(r.cgtPayable, 0);
});

test("loss — zero gain", () => {
  const r = calculateCapitalGainsTax(1_000_000, 1_500_000, 31, false);
  assert.equal(r.capitalGain, 0);
  assert.equal(r.cgtPayable, 0);
});

test("marginal rate clamped at 45%", () => {
  const r = calculateCapitalGainsTax(3_000_000, 1_800_000, 100, false);
  assertApprox(r.cgtPayable, 480_000 * 0.45, 1);
  assertFinite(r.cgtPayable);
});
