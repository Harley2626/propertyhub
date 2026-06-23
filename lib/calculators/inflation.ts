export type InflationResult = {
  futureValue: number;
  purchasingPowerLoss: number;
  equivalentToday: number;
};

export function calculateInflation(
  amount: number,
  annualInflationRate: number,
  years: number,
): InflationResult {
  if (amount <= 0 || years <= 0) {
    return {
      futureValue: amount,
      purchasingPowerLoss: 0,
      equivalentToday: amount,
    };
  }

  const rate = annualInflationRate / 100;
  const futureValue = amount * Math.pow(1 + rate, years);
  const equivalentToday = amount / Math.pow(1 + rate, years);
  const purchasingPowerLoss = amount - equivalentToday;

  return { futureValue, purchasingPowerLoss, equivalentToday };
}
