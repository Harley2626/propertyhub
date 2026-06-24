/**
 * Cross-calculator regression tests for the locale percentage parsing bug.
 *
 * Bug: formatNumberInput("10,0") → parseNumberInput stripped comma → 100
 * Symptom: 10% annual rate treated as 100%, producing R166k bond payments
 * and quadrillion retirement projections.
 */
import { test, describe } from "node:test";
import assert from "node:assert/strict";
import {
  formatNumberInput,
  parseNumberInput,
  clampRatePercent,
} from "../format/numbers.ts";
import { calculateBond } from "./bond.ts";
import { calculateCompoundInterest } from "./compound-interest.ts";
import { calculateRetirement } from "./retirement.ts";
import { calculateInflation } from "./inflation.ts";
import { calculateAffordability } from "./affordability.ts";
import {
  PERCENTAGE_SAFETY_CASES,
  UNREALISTIC_PAYMENT_THRESHOLD,
} from "./__fixtures__/reference-values.ts";
import { assertApprox, assertFinite } from "./test-utils.ts";

describe("Number parsing — percentage input round-trip", () => {
  for (const { input, expectedRate } of PERCENTAGE_SAFETY_CASES) {
    test(`"${input}" parses as ${expectedRate}`, () => {
      assert.equal(parseNumberInput(input), expectedRate);
    });
  }

  test("format then parse preserves 10% rate", () => {
    assert.equal(parseNumberInput(formatNumberInput(10, 1)), 10);
    assert.equal(parseNumberInput(formatNumberInput(11.5, 1)), 11.5);
  });

  test('"10,0" must NOT become 100', () => {
    assert.notEqual(parseNumberInput("10,0"), 100);
    assert.equal(parseNumberInput("10,0"), 10);
  });
});

describe("Rate clamping", () => {
  test("clampRatePercent caps at 30", () => {
    assert.equal(clampRatePercent(10), 10);
    assert.equal(clampRatePercent(100), 30);
    assert.equal(clampRatePercent(-5), 0);
  });
});

describe("Cross-calculator: 10% must never produce 100% results", () => {
  test("bond: 10% → ~R19,300/month", () => {
    const rate = parseNumberInput(formatNumberInput(10, 1));
    const result = calculateBond(2_000_000, rate, 20);
    assertApprox(result.monthlyPayment, 19_300, 500);
    assert.ok(result.monthlyPayment < UNREALISTIC_PAYMENT_THRESHOLD.maxMonthlyAt10Percent);
  });

  test("compound interest: 10% → ~R9.96m not quadrillion", () => {
    const rate = parseNumberInput(formatNumberInput(10, 1));
    const result = calculateCompoundInterest(160_000, 3_000, rate, 30);
    assertApprox(result.futureValue, 9_955_448, 50_000);
    assert.ok(result.futureValue < 50_000_000);
  });

  test("retirement: 10% → ~R9.96m projected", () => {
    const rate = parseNumberInput(formatNumberInput(10, 1));
    const result = calculateRetirement(35, 65, 160_000, 25_000, 3_000, rate);
    assertApprox(result.projectedSavings, 9_955_448, 50_000);
    assertFinite(result.projectedSavings);
  });

  test("inflation: 10% over 10 years ≈ R259k future cost for R100k", () => {
    const rate = parseNumberInput(formatNumberInput(10, 1));
    const result = calculateInflation(100_000, rate, 10);
    assertApprox(result.futureValue, 259_374, 1000);
    assert.ok(result.futureValue < 1_000_000);
  });

  test("affordability: 10% gives ~R978k max property at R45k income", () => {
    const rate = parseNumberInput(formatNumberInput(10, 1));
    const result = calculateAffordability(45_000, 5_000, rate, 20);
    assertApprox(result.maxPropertyPrice, 978_000, 50_000);
  });
});

describe("Simulated user input flow (type 10, blur format)", () => {
  function simulateRateInput(typed: string): number {
    const parsed = parseNumberInput(typed);
    const formatted = parsed > 0 ? formatNumberInput(parsed, 1) : "";
    return parseNumberInput(formatted);
  }

  test('user types "10" → blur → still 10', () => {
    assert.equal(simulateRateInput("10"), 10);
  });

  test('user types "10,0" → still 10', () => {
    assert.equal(simulateRateInput("10,0"), 10);
  });

  test('user types "11.5" → still 11.5', () => {
    assert.equal(simulateRateInput("11.5"), 11.5);
  });
});
