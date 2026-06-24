import assert from "node:assert/strict";

/** Assert value is within tolerance of expected (for currency rounding). */
export function assertApprox(
  actual: number,
  expected: number,
  tolerance: number,
  label?: string,
): void {
  const prefix = label ? `${label}: ` : "";
  assert.ok(
    Number.isFinite(actual),
    `${prefix}expected finite number, got ${actual}`,
  );
  assert.ok(
    Math.abs(actual - expected) <= tolerance,
    `${prefix}expected ~${expected} (±${tolerance}), got ${actual}`,
  );
}

export function assertFinite(value: number, label?: string): void {
  assert.ok(Number.isFinite(value), `${label ?? "value"}: expected finite, got ${value}`);
}

export function assertFinitePositive(value: number, label?: string): void {
  assertFinite(value, label);
  assert.ok(value >= 0, `${label ?? "value"}: expected non-negative, got ${value}`);
}

/** Assert every numeric field on a result object is finite (not NaN/Infinity). */
export function assertAllFieldsFinite(
  result: Record<string, unknown>,
  calculatorName: string,
): void {
  for (const [key, value] of Object.entries(result)) {
    if (typeof value === "number") {
      assert.ok(
        Number.isFinite(value),
        `${calculatorName}.${key}: expected finite, got ${value}`,
      );
    }
  }
}

/** Assert no field exceeds a realistic maximum (overflow guard). */
export function assertNoOverflow(
  result: Record<string, unknown>,
  calculatorName: string,
  maxAbsoluteValue: number,
): void {
  for (const [key, value] of Object.entries(result)) {
    if (typeof value === "number") {
      assert.ok(
        Math.abs(value) <= maxAbsoluteValue,
        `${calculatorName}.${key}: ${value} exceeds max ${maxAbsoluteValue} — possible overflow`,
      );
    }
  }
}

/** Assert rate at 10% produces a higher result than clamped 100% for inverse metrics (e.g. affordability). */
export function assertRate10GreaterThan100<T extends Record<string, number>>(
  at10: T,
  at100: T,
  field: keyof T,
  calculatorName: string,
): void {
  assert.ok(
    at10[field] > at100[field],
    `${calculatorName}: 10% ${String(field)} (${at10[field]}) must exceed clamped 100% (${at100[field]})`,
  );
}

/** Assert rate at 10% produces a lower result than clamped 100% for payment-like metrics. */
export function assertRate10LessThan100<T extends Record<string, number>>(
  at10: T,
  at100: T,
  field: keyof T,
  calculatorName: string,
): void {
  assert.ok(
    at10[field] < at100[field],
    `${calculatorName}: 10% ${String(field)} (${at10[field]}) must be less than clamped 100% (${at100[field]})`,
  );
}

/** Assert a bond payment is in a realistic range (guards 100% rate bug). */
export function assertRealisticBondPayment(
  monthlyPayment: number,
  loanAmount: number,
  termYears: number,
  annualRatePercent: number,
): void {
  assertFinite(monthlyPayment, "monthlyPayment");
  const zeroInterestPayment = loanAmount / (termYears * 12);
  const maxPlausible = loanAmount / 12;

  assert.ok(
    monthlyPayment >= zeroInterestPayment * 0.99,
    `Payment R${Math.round(monthlyPayment)} below zero-interest floor R${Math.round(zeroInterestPayment)}`,
  );
  assert.ok(
    monthlyPayment <= maxPlausible,
    `Payment R${Math.round(monthlyPayment)} unrealistically high — max plausible ~R${Math.round(maxPlausible)}`,
  );

  if (annualRatePercent <= 15) {
    assert.ok(
      monthlyPayment < zeroInterestPayment * 3,
      `Payment R${Math.round(monthlyPayment)} too high for ${annualRatePercent}% rate`,
    );
  }
}

/** Assert FV is finite and not astronomically large (overflow / 100% rate bug). */
export function assertRealisticFutureValue(
  futureValue: number,
  totalContributions: number,
  maxMultipleOfContributions = 50,
): void {
  assertFinite(futureValue, "futureValue");
  if (totalContributions > 0) {
    assert.ok(
      futureValue <= totalContributions * maxMultipleOfContributions,
      `FV R${Math.round(futureValue)} exceeds ${maxMultipleOfContributions}× contributions — possible rate bug`,
    );
  }
}

/** Standard edge-case inputs that must never produce NaN or Infinity. */
export const STANDARD_EDGE_INPUTS = {
  zero: 0,
  negative: -1,
  extreme: 999_999_999,
} as const;

/** Maximum absolute value for any calculator output (overflow ceiling). */
export const OVERFLOW_CEILING = 1e15;
