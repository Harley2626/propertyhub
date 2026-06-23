"use client";

import { CalculatorShell } from "@/components/calculators/CalculatorShell";
import { CurrencyInput } from "@/components/calculators/CurrencyInput";
import { ResultRow } from "@/components/calculators/ResultRow";
import { ResultsPanel } from "@/components/calculators/ResultsPanel";
import { useCurrencyInput } from "@/components/calculators/hooks";
import {
  calculateTransferDutyBreakdown,
  TRANSFER_DUTY_EFFECTIVE_DATE,
  transferDutyBrackets,
} from "@/lib/calculators/transfer-duty";
import { formatZAR } from "@/lib/format/currency";

export function TransferDutyCalculator() {
  const price = useCurrencyInput(2_500_000);
  const breakdown = calculateTransferDutyBreakdown(price.value);

  return (
    <CalculatorShell
      title="Transfer Duty Calculator"
      subtitle={`SARS rates effective ${TRANSFER_DUTY_EFFECTIVE_DATE}. Results update automatically as you type.`}
      disclaimer="Transfer costs are estimates based on typical conveyancing tariffs and deeds office fees. Actual fees may vary by attorney. No transfer duty is payable on VAT-able transactions. This calculator is for information only and does not constitute financial or legal advice."
    >
      <CurrencyInput
        id="purchase-price"
        label="Property purchase price"
        value={price.inputValue}
        onChange={price.onChange}
        placeholder="e.g. 2 500 000"
      />

      <ResultsPanel hasResults={price.value > 0}>
        <ResultRow label="Transfer Duty" sublabel="Payable to SARS" value={formatZAR(breakdown.transferDuty)} />
        <ResultRow label="Transfer Costs" sublabel="Attorney, deeds office & admin (estimate)" value={formatZAR(breakdown.transferCosts)} />
        <div className="space-y-1 text-xs text-muted">
          <p>Conveyancing fee (incl. VAT): {formatZAR(breakdown.conveyancingFee)}</p>
          <p>Deeds office fee: {formatZAR(breakdown.deedsOfficeFee)}</p>
          <p>Postages & petties: {formatZAR(breakdown.postagesAndPetties)}</p>
        </div>
        <ResultRow label="Purchase Price" value={formatZAR(breakdown.purchasePrice)} />
        <ResultRow label="Total Purchase Cost" sublabel="Purchase price + transfer duty + transfer costs" value={formatZAR(breakdown.totalPurchaseCost)} highlight />
      </ResultsPanel>

      <details className="mt-6 rounded-xl border border-border bg-background">
        <summary className="cursor-pointer px-4 py-3 text-sm font-medium text-foreground">
          View SARS transfer duty brackets
        </summary>
        <div className="overflow-x-auto px-4 pb-4">
          <table className="w-full min-w-[320px] text-left text-sm">
            <thead>
              <tr className="border-b border-border text-muted">
                <th className="py-2 pr-4 font-medium">Property value</th>
                <th className="py-2 font-medium">Rate of duty</th>
              </tr>
            </thead>
            <tbody>
              {transferDutyBrackets.map((bracket) => (
                <tr key={bracket.from} className="border-b border-border/60">
                  <td className="py-2 pr-4 text-muted">
                    {bracket.to
                      ? `R${bracket.from.toLocaleString("en-ZA")} – R${bracket.to.toLocaleString("en-ZA")}`
                      : `R${bracket.from.toLocaleString("en-ZA")} and above`}
                  </td>
                  <td className="py-2 text-foreground">{bracket.rate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </CalculatorShell>
  );
}
