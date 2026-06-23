export type VatMode = "add" | "remove";

export type VatResult = {
  amountExclVat: number;
  vatAmount: number;
  amountInclVat: number;
};

export const VAT_RATE = 15;

export function calculateVat(amount: number, mode: VatMode): VatResult {
  if (amount <= 0) {
    return { amountExclVat: 0, vatAmount: 0, amountInclVat: 0 };
  }

  if (mode === "add") {
    const vatAmount = amount * (VAT_RATE / 100);
    return {
      amountExclVat: amount,
      vatAmount,
      amountInclVat: amount + vatAmount,
    };
  }

  const amountExclVat = amount / (1 + VAT_RATE / 100);
  const vatAmount = amount - amountExclVat;
  return { amountExclVat, vatAmount, amountInclVat: amount };
}
