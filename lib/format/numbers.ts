/** Returns fallback when value is NaN, Infinity, or -Infinity. */
export function ensureFinite(value: number, fallback = 0): number {
  return Number.isFinite(value) ? value : fallback;
}

/** Clamp a percentage to [0, max]. */
export function clampPercent(value: number, max = 100): number {
  if (!Number.isFinite(value) || value < 0) return 0;
  if (value > max) return max;
  return value;
}

/** Clamp annual rate used in compound/bond calculations (0–30%). */
export function clampRatePercent(rate: number, max = 30): number {
  return clampPercent(rate, max);
}

/** Clamp marginal income tax rate (0–45%). */
export function clampTaxRatePercent(rate: number): number {
  return clampPercent(rate, 45);
}

/** Clamp inflation rate (0–50%). */
export function clampInflationRatePercent(rate: number): number {
  return clampPercent(rate, 50);
}

/**
 * Parse a numeric input string. Treats comma as a decimal separator (e.g. "10,5"
 * → 10.5) and strips space thousand separators (e.g. "1 000" → 1000).
 */
export function parseNumberInput(value: string): number {
  const trimmed = value.trim();
  if (!trimmed) return 0;

  let normalized = trimmed.replace(/\s/g, "");

  const hasComma = normalized.includes(",");
  const hasDot = normalized.includes(".");

  if (hasComma && hasDot) {
    const lastComma = normalized.lastIndexOf(",");
    const lastDot = normalized.lastIndexOf(".");
    if (lastComma > lastDot) {
      normalized = normalized.replace(/\./g, "").replace(",", ".");
    } else {
      normalized = normalized.replace(/,/g, "");
    }
  } else if (hasComma) {
    normalized = normalized.replace(",", ".");
  }

  normalized = normalized.replace(/[^\d.-]/g, "");
  const parsed = Number.parseFloat(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
}

/** Format for editable inputs — always uses a dot decimal (no locale comma bug). */
export function formatNumberInput(value: number, decimals = 0): string {
  if (value === 0) return "";
  return decimals > 0 ? value.toFixed(decimals) : String(Math.round(value));
}

export function formatPercent(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`;
}
