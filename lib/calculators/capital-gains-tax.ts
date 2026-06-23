export type CapitalGainsTaxResult = {
  capitalGain: number;
  exclusionApplied: number;
  taxableGain: number;
  cgtPayable: number;
  inclusionRate: number;
};

const INCLUSION_RATE = 0.4;
const PRIMARY_RESIDENCE_EXCLUSION = 2_000_000;

export function calculateCapitalGainsTax(
  salePrice: number,
  baseCost: number,
  marginalTaxRate: number,
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

  const capitalGain = Math.max(0, salePrice - baseCost);
  const exclusionApplied = isPrimaryResidence
    ? Math.min(capitalGain, PRIMARY_RESIDENCE_EXCLUSION)
    : 0;
  const gainAfterExclusion = Math.max(0, capitalGain - exclusionApplied);
  const taxableGain = gainAfterExclusion * INCLUSION_RATE;
  const cgtPayable = taxableGain * (marginalTaxRate / 100);

  return {
    capitalGain,
    exclusionApplied,
    taxableGain,
    cgtPayable,
    inclusionRate: INCLUSION_RATE * 100,
  };
}
