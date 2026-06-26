import { ensureFinite } from "@/lib/format/numbers";
import type { CalculationService } from "../core/types";
import type { MonthlyOwnershipCost } from "../core/property-analysis";
import type {
  PropertyFinanceInput,
  PropertyFinanceSnapshot,
} from "../models/property-finance.model";
import {
  PROPERTY_FINANCE_DEFAULTS,
  PROPERTY_FINANCE_SERVICE_VERSION,
} from "../models/property-finance.model";
import { bondService } from "./bond.service";
import { depositService } from "./deposit.service";
import { rentalYieldService } from "./rental-yield.service";
import { transferDutyService } from "./transfer-duty.service";

function buildMonthlyOwnership(
  input: PropertyFinanceInput,
  bondRepayment: number,
): MonthlyOwnershipCost {
  const maintenance =
    input.propertyPrice *
    ((input.maintenancePercentOfValue ??
      PROPERTY_FINANCE_DEFAULTS.maintenancePercentOfValue) /
      100) /
    12;

  const levies = input.monthlyLevy ?? 0;
  const rates = input.monthlyRates ?? 0;
  const insurance = input.monthlyInsurance ?? 0;

  return {
    bondRepayment: ensureFinite(bondRepayment),
    levies: ensureFinite(levies),
    rates: ensureFinite(rates),
    insurance: ensureFinite(insurance),
    maintenance: ensureFinite(maintenance),
    totalMonthly: ensureFinite(
      bondRepayment + levies + rates + insurance + maintenance,
    ),
    currency: "ZAR",
  };
}

export class PropertyFinanceService
  implements CalculationService<PropertyFinanceInput, PropertyFinanceSnapshot>
{
  readonly id = "property-finance" as const;

  calculate(input: PropertyFinanceInput): PropertyFinanceSnapshot {
    const depositPercent = input.depositPercent;
    const loanAmount = ensureFinite(
      input.propertyPrice * (1 - depositPercent / 100),
    );

    const bond = bondService.calculate({
      loanAmount,
      annualRatePercent: input.annualRatePercent,
      termYears: input.termYears,
    });

    const transferDuty = transferDutyService.breakdown({
      purchasePrice: input.propertyPrice,
    });

    const deposit = depositService.calculate({
      propertyPrice: input.propertyPrice,
      depositPercent,
      amountSaved: input.amountSaved ?? 0,
    });

    const monthlyOwnership = buildMonthlyOwnership(input, bond.monthlyPayment);

    const rentalYield =
      input.monthlyRent !== undefined
        ? rentalYieldService.calculate({
            propertyValue: input.propertyPrice,
            monthlyRent: input.monthlyRent,
            monthlyExpenses: input.monthlyRentalExpenses ?? 0,
          })
        : undefined;

    return {
      propertyPrice: input.propertyPrice,
      depositPercent,
      loanAmount,
      bond,
      transferDuty,
      deposit,
      monthlyOwnership,
      rentalYield,
      meta: {
        computedAt: new Date().toISOString(),
        serviceVersion: PROPERTY_FINANCE_SERVICE_VERSION,
        locale: "en-ZA",
      },
    };
  }

  /** Convenience: monthly bond + carrying costs only. */
  monthlyOwnershipCost(input: PropertyFinanceInput): MonthlyOwnershipCost {
    return this.calculate(input).monthlyOwnership;
  }
}

export const propertyFinanceService = new PropertyFinanceService();
