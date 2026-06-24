import { test } from "node:test";
import { calculateRentVsBuy, calculateRemainingBalance } from "./rent-vs-buy.ts";
import { assertFinite } from "./test-utils.ts";
import assert from "node:assert/strict";

test("produces finite results for typical inputs", () => {
  const r = calculateRentVsBuy(15_000, 2_500_000, 10, 10, 20, 10, 5, 4);
  assertFinite(r.totalRentCost);
  assertFinite(r.netBuyCost);
  assertFinite(r.monthlyBondPayment);
  assert.ok(r.totalRentCost > 0);
  assert.ok(r.monthlyBondPayment > 10_000);
});

test("zero comparison years — neutral", () => {
  const r = calculateRentVsBuy(15_000, 2_500_000, 10, 10, 20, 0, 5, 4);
  assert.equal(r.recommendation, "neutral");
});

test("remaining balance decreases with payments", () => {
  const balance = calculateRemainingBalance(2_000_000, 19_300, 10, 60);
  assert.ok(balance < 2_000_000);
  assert.ok(balance > 0);
});

test("100% rate clamped — finite bond payment", () => {
  const r = calculateRentVsBuy(15_000, 2_500_000, 10, 100, 20, 10, 5, 4);
  assertFinite(r.monthlyBondPayment);
  assert.ok(r.monthlyBondPayment < 200_000);
});
