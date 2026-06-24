import {
  formatNumberInput,
  parseNumberInput,
} from "../../format/numbers";

/**
 * Simulates the UI rate input flow: user types → optional blur format → parse for calculation.
 * Must never turn 10 into 100 (the en-ZA comma bug).
 */
export function parseRateFromUserInput(typed: string): number {
  const parsed = parseNumberInput(typed);
  if (parsed <= 0) return 0;
  return parseNumberInput(formatNumberInput(parsed, 1));
}

export const PERCENTAGE_CONVERSION_CASES = [
  { input: "10", expected: 10, label: "plain integer" },
  { input: "10.0", expected: 10, label: "dot decimal" },
  { input: "10,0", expected: 10, label: "comma decimal (en-ZA)" },
  { input: "11.5", expected: 11.5, label: "dot half-percent" },
  { input: "11,5", expected: 11.5, label: "comma half-percent" },
] as const;

export function assertPercentageParsing(
  input: string,
  expected: number,
): void {
  const parsed = parseNumberInput(input);
  if (parsed !== expected) {
    throw new Error(
      `Percentage parse failed: "${input}" → ${parsed}, expected ${expected}`,
    );
  }
  const roundTrip = parseRateFromUserInput(input);
  if (roundTrip !== expected && expected > 0) {
    throw new Error(
      `Percentage round-trip failed: "${input}" → ${roundTrip}, expected ${expected}`,
    );
  }
}

/** Must never parse as 100 when user intended 10. */
export function assertNotConfusedWith100(input: string): void {
  const parsed = parseNumberInput(input);
  if (parsed === 100 && input.includes("10") && !input.includes("100")) {
    throw new Error(
      `Critical locale bug: "${input}" parsed as 100 instead of 10`,
    );
  }
}
