import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { calculatePropertyOffer } from "./property-offer";
import { calculateDeposit } from "./deposit";
import { assertApprox } from "./test-utils";

const baseInput = {
  askingPrice: 2_500_000,
  propertyType: "house" as const,
  bedrooms: 3,
  bathrooms: 2,
  condition: "good" as const,
  intendedUse: "primary" as const,
  depositPercent: 10,
  annualRatePercent: 11,
  termYears: 20,
};

describe("Property Offer Calculator", () => {
  test("suggested range is below asking and ordered correctly", () => {
    const result = calculatePropertyOffer(baseInput);

    assert.ok(result.suggestedOfferMin < result.suggestedOfferMax);
    assert.ok(result.suggestedOfferMax <= baseInput.askingPrice);
    assert.ok(result.suggestedOfferMin < baseInput.askingPrice);
  });

  test("needs-work condition widens discount vs excellent", () => {
    const excellent = calculatePropertyOffer({
      ...baseInput,
      condition: "excellent",
    });
    const needsWork = calculatePropertyOffer({
      ...baseInput,
      condition: "needs-work",
    });

    assert.ok(
      needsWork.suggestedOfferMin < excellent.suggestedOfferMin,
      "needs-work should suggest lower minimum offer",
    );
  });

  test("cash required matches deposit calculator at max offer", () => {
    const result = calculatePropertyOffer(baseInput);
    const direct = calculateDeposit(
      result.financeAtMaxOffer.offerPrice,
      baseInput.depositPercent,
      0,
    );

    assert.equal(
      result.financeAtMaxOffer.totalCashRequired,
      direct.totalUpfrontCosts,
    );
    assert.equal(result.financeAtMaxOffer.transferDuty, direct.transferDuty);
  });

  test("bond repayment is positive for valid inputs", () => {
    const result = calculatePropertyOffer(baseInput);
    assert.ok(result.financeAtMaxOffer.monthlyBondRepayment > 0);
    assert.ok(result.financeAtMaxOffer.loanAmount > 0);
  });

  test("zero asking price returns empty finance", () => {
    const result = calculatePropertyOffer({ ...baseInput, askingPrice: 0 });
    assert.equal(result.suggestedOfferMin, 0);
    assert.equal(result.financeAtMaxOffer.totalCashRequired, 0);
  });

  test("rationale states guidance not valuation", () => {
    const result = calculatePropertyOffer(baseInput);
    const combined = result.rationale.join(" ");
    assert.match(combined, /not a market valuation/i);
    assert.match(combined, /negotiation/i);
  });

  test("good condition baseline discount is 2–8%", () => {
    const result = calculatePropertyOffer(baseInput);
    assertApprox(result.discountFromAskingMin, 0.02, 0.001);
    assertApprox(result.discountFromAskingMax, 0.08, 0.001);
  });
});
