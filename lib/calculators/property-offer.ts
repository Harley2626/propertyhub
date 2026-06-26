import { calculateBond } from "./bond";
import { calculateDeposit } from "./deposit";
import { clampPercent, ensureFinite } from "@/lib/format/numbers";

export type PropertyType = "house" | "apartment" | "townhouse" | "cluster";
export type PropertyCondition = "excellent" | "good" | "fair" | "needs-work";
export type IntendedUse = "primary" | "investment";

export type PropertyOfferInput = {
  askingPrice: number;
  propertyType: PropertyType;
  bedrooms: number;
  bathrooms: number;
  condition: PropertyCondition;
  intendedUse: IntendedUse;
  depositPercent: number;
  annualRatePercent: number;
  termYears: number;
};

export type OfferFinanceSnapshot = {
  offerPrice: number;
  depositAmount: number;
  transferDuty: number;
  transferCosts: number;
  totalCashRequired: number;
  loanAmount: number;
  monthlyBondRepayment: number;
};

export type PropertyOfferResult = {
  askingPrice: number;
  suggestedOfferMin: number;
  suggestedOfferMax: number;
  discountFromAskingMin: number;
  discountFromAskingMax: number;
  rationale: string[];
  negotiationChecklist: string[];
  nextSteps: string[];
  financeAtMinOffer: OfferFinanceSnapshot;
  financeAtMaxOffer: OfferFinanceSnapshot;
};

const BASE_DISCOUNT_MIN = 0.02;
const BASE_DISCOUNT_MAX = 0.08;

const CONDITION_ADJUSTMENT: Record<
  PropertyCondition,
  { minAdd: number; maxAdd: number }
> = {
  excellent: { minAdd: -0.015, maxAdd: -0.025 },
  good: { minAdd: 0, maxAdd: 0 },
  fair: { minAdd: 0.02, maxAdd: 0.03 },
  "needs-work": { minAdd: 0.05, maxAdd: 0.07 },
};

const USE_ADJUSTMENT: Record<IntendedUse, { minAdd: number; maxAdd: number }> =
  {
    primary: { minAdd: 0, maxAdd: 0 },
    investment: { minAdd: 0.01, maxAdd: 0.02 },
  };

function emptySnapshot(): OfferFinanceSnapshot {
  return {
    offerPrice: 0,
    depositAmount: 0,
    transferDuty: 0,
    transferCosts: 0,
    totalCashRequired: 0,
    loanAmount: 0,
    monthlyBondRepayment: 0,
  };
}

function buildFinanceSnapshot(
  offerPrice: number,
  depositPercent: number,
  annualRatePercent: number,
  termYears: number,
): OfferFinanceSnapshot {
  if (offerPrice <= 0) return emptySnapshot();

  const depositPct = clampPercent(depositPercent, 100);
  const loanAmount = ensureFinite(offerPrice * (1 - depositPct / 100));
  const bond = calculateBond(loanAmount, annualRatePercent, termYears);
  const deposit = calculateDeposit(offerPrice, depositPct, 0);

  return {
    offerPrice,
    depositAmount: deposit.depositAmount,
    transferDuty: deposit.transferDuty,
    transferCosts: deposit.transferCosts,
    totalCashRequired: deposit.totalUpfrontCosts,
    loanAmount,
    monthlyBondRepayment: bond.monthlyPayment,
  };
}

function buildRationale(input: PropertyOfferInput, discountMax: number): string[] {
  const rationale: string[] = [
    `Starting from the asking price of R${input.askingPrice.toLocaleString("en-ZA")} — not a market valuation or comparable sales analysis.`,
    `Typical buyer negotiation in South Africa often targets ${Math.round(discountMax * 100)}% below asking, depending on motivation and property condition.`,
  ];

  const conditionNotes: Record<PropertyCondition, string> = {
    excellent:
      "Excellent condition usually means less room to negotiate below asking.",
    good: "Good condition aligns with a standard negotiation band.",
    fair: "Fair condition may justify a larger discount — verify repair costs independently.",
    "needs-work":
      "Properties needing work often warrant a wider discount — budget renovation costs separately.",
  };
  rationale.push(conditionNotes[input.condition]);

  if (input.intendedUse === "investment") {
    rationale.push(
      "Investment buyers typically factor in yield and may negotiate harder than owner-occupiers.",
    );
  }

  const typeLabels: Record<PropertyType, string> = {
    house: "Freehold house",
    apartment: "Sectional title apartment",
    townhouse: "Townhouse",
    cluster: "Cluster home",
  };
  rationale.push(
    `${typeLabels[input.propertyType]} with ${input.bedrooms} bed / ${input.bathrooms} bath — layout affects appeal but does not change market value without comparables.`,
  );

  rationale.push(
    "This range is guidance for negotiation planning only. Confirm pricing with your estate agent and a comparative market analysis.",
  );

  return rationale;
}

function buildNegotiationChecklist(input: PropertyOfferInput): string[] {
  const items = [
    "Confirm how long the property has been on the market and whether the price was reduced.",
    "Ask the agent why the seller is moving and whether there is competing interest.",
    "Request recent comparable sales in the same suburb — do not rely on this calculator for value.",
    "Inspect the property thoroughly or appoint a professional home inspector.",
    "Review body corporate financials and levy increases for sectional title units.",
    "Check municipal rates, utility costs, and any special levies or planned maintenance.",
    "Verify the title deed, zoning, and any servitudes or building plan approvals.",
    "Include suspensive conditions for bond approval and a satisfactory home inspection in your offer.",
  ];

  if (input.condition === "fair" || input.condition === "needs-work") {
    items.push(
      "Obtain quotes for visible repairs before finalising your offer amount.",
    );
  }

  if (input.intendedUse === "investment") {
    items.push(
      "Model gross and net rental yield separately using realistic vacancy and expense assumptions.",
    );
  }

  return items;
}

function buildNextSteps(): string[] {
  return [
    "Get home loan pre-approval so you know your maximum purchase price and interest rate.",
    "Calculate total upfront costs with the Deposit Calculator and Transfer Duty Calculator.",
    "Work out monthly affordability with the Bond and Home Ownership Cost calculators.",
    "Submit your offer through the estate agent with suspensive conditions where appropriate.",
    "Appoint a conveyancing attorney once the offer is accepted — they handle transfer duty and registration.",
    "Read our First-Time Home Buyer Guide for the full offer-to-transfer timeline.",
  ];
}

export function calculatePropertyOffer(
  input: PropertyOfferInput,
): PropertyOfferResult {
  if (input.askingPrice <= 0) {
    return {
      askingPrice: 0,
      suggestedOfferMin: 0,
      suggestedOfferMax: 0,
      discountFromAskingMin: 0,
      discountFromAskingMax: 0,
      rationale: [],
      negotiationChecklist: [],
      nextSteps: buildNextSteps(),
      financeAtMinOffer: emptySnapshot(),
      financeAtMaxOffer: emptySnapshot(),
    };
  }

  const conditionAdj = CONDITION_ADJUSTMENT[input.condition];
  const useAdj = USE_ADJUSTMENT[input.intendedUse];

  const discountMin = Math.max(
    0,
    BASE_DISCOUNT_MIN + conditionAdj.minAdd + useAdj.minAdd,
  );
  const discountMax = Math.min(
    0.15,
    BASE_DISCOUNT_MAX + conditionAdj.maxAdd + useAdj.maxAdd,
  );
  const effectiveMax = Math.max(discountMin, discountMax);

  const suggestedOfferMax = ensureFinite(
    input.askingPrice * (1 - discountMin),
  );
  const suggestedOfferMin = ensureFinite(
    input.askingPrice * (1 - effectiveMax),
  );

  const financeAtMinOffer = buildFinanceSnapshot(
    suggestedOfferMin,
    input.depositPercent,
    input.annualRatePercent,
    input.termYears,
  );
  const financeAtMaxOffer = buildFinanceSnapshot(
    suggestedOfferMax,
    input.depositPercent,
    input.annualRatePercent,
    input.termYears,
  );

  return {
    askingPrice: input.askingPrice,
    suggestedOfferMin,
    suggestedOfferMax,
    discountFromAskingMin: discountMin,
    discountFromAskingMax: effectiveMax,
    rationale: buildRationale(input, effectiveMax),
    negotiationChecklist: buildNegotiationChecklist(input),
    nextSteps: buildNextSteps(),
    financeAtMinOffer,
    financeAtMaxOffer,
  };
}
