import { test } from "node:test";
import { calculateEmergencyFund } from "./emergency-fund.ts";
import { assertApprox } from "./test-utils.ts";
import assert from "node:assert/strict";

test("R20k expenses, 6 months, R30k saved", () => {
  const r = calculateEmergencyFund(20_000, 6, 30_000);
  assert.equal(r.targetFund, 120_000);
  assert.equal(r.remainingToSave, 90_000);
  assertApprox(r.percentComplete, 25, 0.1);
  assert.equal(r.monthsOfCover, 1.5);
});

test("fully funded", () => {
  const r = calculateEmergencyFund(20_000, 6, 150_000);
  assert.equal(r.remainingToSave, 0);
  assert.equal(r.percentComplete, 100);
});

test("zero expenses — no division by zero", () => {
  const r = calculateEmergencyFund(0, 6, 30_000);
  assert.equal(r.targetFund, 0);
  assert.equal(r.monthsOfCover, 0);
});

test("months clamped at 24", () => {
  const r = calculateEmergencyFund(10_000, 100, 0);
  assert.equal(r.targetFund, 240_000);
});
