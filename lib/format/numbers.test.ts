import { test, describe } from "node:test";
import assert from "node:assert/strict";
import {
  parseNumberInput,
  formatNumberInput,
  clampRatePercent,
  clampTaxRatePercent,
  clampInflationRatePercent,
  clampPercent,
} from "./numbers.ts";

describe("parseNumberInput — locale-safe parsing", () => {
  test("en-ZA decimal comma: 10,0 → 10 (NOT 100)", () => {
    assert.equal(parseNumberInput("10,0"), 10);
    assert.notEqual(parseNumberInput("10,0"), 100);
  });

  test("dot decimal: 10.0 → 10", () => {
    assert.equal(parseNumberInput("10.0"), 10);
  });

  test("format → parse round-trip for rates", () => {
    assert.equal(parseNumberInput(formatNumberInput(10, 1)), 10);
    assert.equal(parseNumberInput(formatNumberInput(11.5, 1)), 11.5);
  });

  test("thousand separators with spaces", () => {
    assert.equal(parseNumberInput("2 500 000"), 2_500_000);
    assert.equal(parseNumberInput("1 000"), 1_000);
  });

  test("European format: 1.234,56", () => {
    assert.equal(parseNumberInput("1.234,56"), 1234.56);
  });

  test("US format: 1,234.56", () => {
    assert.equal(parseNumberInput("1,234.56"), 1234.56);
  });

  test("empty and invalid → 0", () => {
    assert.equal(parseNumberInput(""), 0);
    assert.equal(parseNumberInput("abc"), 0);
  });
});

describe("formatNumberInput — always dot decimal", () => {
  test("uses dot not comma for decimals", () => {
    assert.equal(formatNumberInput(10, 1), "10.0");
    assert.equal(formatNumberInput(11.5, 1), "11.5");
    assert.notEqual(formatNumberInput(10, 1), "10,0");
  });
});

describe("rate clamping helpers", () => {
  test("clampRatePercent: 0–30", () => {
    assert.equal(clampRatePercent(10), 10);
    assert.equal(clampRatePercent(100), 30);
    assert.equal(clampRatePercent(-1), 0);
  });

  test("clampTaxRatePercent: 0–45", () => {
    assert.equal(clampTaxRatePercent(31), 31);
    assert.equal(clampTaxRatePercent(100), 45);
  });

  test("clampInflationRatePercent: 0–50", () => {
    assert.equal(clampInflationRatePercent(5.5), 5.5);
    assert.equal(clampInflationRatePercent(100), 50);
  });

  test("clampPercent: 0–100 default", () => {
    assert.equal(clampPercent(10), 10);
    assert.equal(clampPercent(150), 100);
  });
});
