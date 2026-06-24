import { test, describe } from "node:test";
import assert from "node:assert/strict";
import {
  calculateTransferDuty,
  calculateTransferDutyBreakdown,
} from "./transfer-duty.ts";
import { TRANSFER_DUTY_REFERENCES } from "./__fixtures__/reference-values.ts";
import { assertApprox, assertFinite } from "./test-utils.ts";

describe("Transfer Duty — SARS 2025 reference values", () => {
  for (const ref of TRANSFER_DUTY_REFERENCES) {
    test(ref.label, () => {
      assertApprox(calculateTransferDuty(ref.purchasePrice), ref.expectedDuty, 1);
    });
  }
});

describe("Transfer Duty — edge cases", () => {
  test("zero and negative price — zero duty", () => {
    assert.equal(calculateTransferDuty(0), 0);
    assert.equal(calculateTransferDuty(-500_000), 0);
  });

  test("breakdown is internally consistent", () => {
    const b = calculateTransferDutyBreakdown(2_500_000);
    assertFinite(b.transferDuty);
    assertFinite(b.conveyancingFee);
    assertFinite(b.deedsOfficeFee);
    assert.equal(
      Math.round(b.totalPurchaseCost),
      Math.round(b.purchasePrice + b.transferDuty + b.transferCosts),
    );
    assert.ok(b.transferCosts > 0, "transfer costs should be positive");
  });

  test("duty increases monotonically with price", () => {
    const d1 = calculateTransferDuty(1_500_000);
    const d2 = calculateTransferDuty(2_000_000);
    const d3 = calculateTransferDuty(2_500_000);
    assert.ok(d1 < d2);
    assert.ok(d2 < d3);
  });
});
