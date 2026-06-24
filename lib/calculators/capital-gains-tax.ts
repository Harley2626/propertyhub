import { clampTaxRatePercent, ensureFinite } from "@/lib/format/numbers";

export type CapitalGainsTaxResult = {
  capitalGain: number;
  exclusionApplied: number;
  taxableGain: number;
  cgtPayable: number;
  inclusionRate: number;
};

const INCLUSION_RATE = 0.4;
const PRIMARY_RESIDENCE_EXCLUSION = 2_000_000;

/**
 * CGT for individuals: 40% of gain included in taxable income × marginal rate.
 * Primary residence: R2m exclusion on capital gain.
 */
export function calculateCapitalGainsTax(
  salePrice: number,
  baseCost: number,
  marginalTaxRatePercent: number,
  isPrimaryResidence: boolean,
): CapitalGainsTaxResult {
  if (salePrice <= 0) {
    return {
      capitalGain: 0,
      exclusionApplied: 0,
      taxableGain: 0,
      cgtPayable: 0,
      inclusionRate: INCLUSION_RATE * 100,
    };
  }

  const marginalRate = clampTaxRatePercent(marginalTaxRatePercent);
  const capitalGain = Math.max(0, salePrice - baseCost);
  const exclusionApplied = isPrimaryResidence
    ? Math.min(capitalGain, PRIMARY_RESIDENCE_EXCLUSION)
    : 0;
  const gainAfterExclusion = Math.max(0, capitalGain - exclusionApplied);
  const taxableGain = gainAfterExclusion * INCLUSION_RATE;
  const cgtPayable = ensureFinite(taxableGain * (marginalRate / 100));

  return {
    capitalGain: ensureFinite(capitalGain),
    exclusionApplied: ensureFinite(exclusionApplied),
    taxableGain: ensureFinite(taxableGain),
    cgtPayable,
    inclusionRate: INCLUSION_RATE * 100,
  };
}
