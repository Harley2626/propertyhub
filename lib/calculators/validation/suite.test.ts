import { test, describe } from "node:test";
import {
  assertAllFieldsFinite,
  assertNoOverflow,
  assertRate10GreaterThan100,
  assertRate10LessThan100,
  assertRealisticBondPayment,
  assertRealisticFutureValue,
  OVERFLOW_CEILING,
} from "./guards";
import { KNOWN_GOOD_TESTS } from "./known-good";
import {
  assertNotConfusedWith100,
  assertPercentageParsing,
  parseRateFromUserInput,
  PERCENTAGE_CONVERSION_CASES,
} from "./percentage";
import { CALCULATOR_REGISTRY, CALCULATOR_COUNT } from "./registry";
import { calculateBond } from "../bond";
import { calculateCompoundInterest } from "../compound-interest";
import { calculateVat } from "../vat";
import { parseNumberInput } from "../../format/numbers";
import assert from "node:assert/strict";

describe("Validation Suite — registry completeness", () => {
  test(`all ${CALCULATOR_COUNT} calculators are registered`, () => {
    assert.equal(CALCULATOR_REGISTRY.length, 13);
    const ids = CALCULATOR_REGISTRY.map((c) => c.id);
    assert.ok(ids.includes("bond"));
    assert.ok(ids.includes("transfer-duty"));
    assert.ok(ids.includes("vat"));
    assert.ok(ids.includes("emergency-fund"));
  });
});

describe("Validation Suite — known good values", () => {
  for (const known of KNOWN_GOOD_TESTS) {
    test(`[${known.calculatorId}] ${known.label}`, () => {
      known.run();
    });
  }
});

describe("Validation Suite — edge cases & division-by-zero protection", () => {
  for (const calc of CALCULATOR_REGISTRY) {
    describe(calc.name, () => {
      test("typical scenario returns finite numbers", () => {
        const result = calc.runTypical();
        assertAllFieldsFinite(result, calc.name);
        assertNoOverflow(result, calc.name, OVERFLOW_CEILING);
      });

      for (const edge of calc.edgeCases) {
        test(`edge: ${edge.label}`, () => {
          const result = edge.run();
          assertAllFieldsFinite(result, `${calc.name} (${edge.label})`);
          assertNoOverflow(result, calc.name, OVERFLOW_CEILING);
        });
      }
    });
  }
});

describe("Validation Suite — overflow protection", () => {
  for (const calc of CALCULATOR_REGISTRY) {
    if (!calc.rateSafety) continue;

    test(`${calc.name}: 100% rate input is clamped and finite`, () => {
      const { at100 } = calc.rateSafety!();
      assertAllFieldsFinite(at100, calc.name);
      assertNoOverflow(at100, calc.name, OVERFLOW_CEILING);
    });
  }

  test("bond at 999% rate — clamped, no Infinity", () => {
    const r = calculateBond(2_000_000, 999, 20);
    assertAllFieldsFinite(r, "Bond (999% rate)");
    assert.ok(r.monthlyPayment < 200_000);
  });

  test("compound interest at 999% rate — clamped, no Infinity", () => {
    const r = calculateCompoundInterest(160_000, 3_000, 999, 30);
    assertAllFieldsFinite(r, "Compound Interest (999% rate)");
    assertNoOverflow(r, "Compound Interest (999% rate)", OVERFLOW_CEILING);
  });
});

describe("Validation Suite — percentage conversion", () => {
  for (const { input, expected, label } of PERCENTAGE_CONVERSION_CASES) {
    test(`parse "${input}" (${label}) → ${expected}`, () => {
      assertPercentageParsing(input, expected);
      assertNotConfusedWith100(input);
    });
  }

  test('"10,0" must never become 100', () => {
    assert.equal(parseNumberInput("10,0"), 10);
    assert.notEqual(parseNumberInput("10,0"), 100);
  });

  for (const calc of CALCULATOR_REGISTRY.filter((c) => c.rateSafety)) {
    test(`${calc.name}: 10% rate produces sensible result vs clamped 100%`, () => {
      const { at10, at100, compareField, rateCompareDirection } =
        calc.rateSafety!();
      if (rateCompareDirection === "higher") {
        assertRate10GreaterThan100(at10, at100, compareField, calc.name);
      } else {
        assertRate10LessThan100(at10, at100, compareField, calc.name);
      }
    });
  }
});

describe("Validation Suite — critical regression scenarios", () => {
  test("bond: parsed 10% → R19,300/month not R166,667", () => {
    const rate = parseRateFromUserInput("10,0");
    assert.equal(rate, 10);
    const r = calculateBond(2_000_000, rate, 20);
    assert.ok(r.monthlyPayment > 19_000 && r.monthlyPayment < 19_600);
    assertRealisticBondPayment(r.monthlyPayment, 2_000_000, 20, 10);
  });

  test("compound interest: parsed 10% → ~R9.96m not quadrillions", () => {
    const rate = parseRateFromUserInput("10");
    const r = calculateCompoundInterest(160_000, 3_000, rate, 30);
    assert.ok(r.futureValue > 9_000_000 && r.futureValue < 11_000_000);
    assertRealisticFutureValue(r.futureValue, r.totalContributions);
  });

  test("VAT: 15% of R100 is R15 not R150", () => {
    const r = calculateVat(100, "add");
    assert.equal(r.vatAmount, 15);
    assert.equal(r.amountInclVat, 115);
  });
});
