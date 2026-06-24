import { test } from "node:test";
import { calculateDeposit } from "./deposit.ts";
import { assertApprox, assertFinite } from "./test-utils.ts";
import assert from "node:assert/strict";

test("R2m property, 10% deposit, R80k saved", () => {
  const r = calculateDeposit(2_000_000, 10, 80_000);
  assert.equal(r.depositAmount, 200_000);
  assert.equal(r.remainingToSave, 120_000);
  assertApprox(r.transferDuty, 33_786, 1);
  assertFinite(r.totalUpfrontCosts);
});

test("saved exceeds deposit — zero remaining", () => {
  const r = calculateDeposit(1_000_000, 10, 200_000);
  assert.equal(r.remainingToSave, 0);
});

test("zero property price", () => {
  const r = calculateDeposit(0, 10, 0);
  assert.equal(r.depositAmount, 0);
});

test("deposit percent clamped at 100", () => {
  const r = calculateDeposit(1_000_000, 150, 0);
  assert.equal(r.depositAmount, 1_000_000);
});
