import type { BondResult } from "./bond.model";
import type { AffordabilityResult } from "./affordability.model";
import type { DepositResult } from "./deposit.model";
import type { TransferDutyBreakdown } from "./transfer-duty.model";
import type { RentalYieldResult } from "./rental-yield.model";
import type { MonthlyOwnershipCost } from "../core/property-analysis";
import type { ServiceExecutionMeta } from "../core/types";

export type PropertyFinanceInput = {
  propertyPrice: number;
  depositPercent: number;
  annualRatePercent: number;
  termYears: number;
  amountSaved?: number;
  monthlyLevy?: number;
  monthlyRates?: number;
  monthlyInsurance?: number;
  /** Annual maintenance as % of property value, default 1%. */
  maintenancePercentOfValue?: number;
  /** Optional rental inputs for yield within finance snapshot. */
  monthlyRent?: number;
  monthlyRentalExpenses?: number;
};

export type PropertyFinanceSnapshot = {
  propertyPrice: number;
  depositPercent: number;
  loanAmount: number;
  bond: BondResult;
  transferDuty: TransferDutyBreakdown;
  deposit: DepositResult;
  monthlyOwnership: MonthlyOwnershipCost;
  rentalYield?: RentalYieldResult;
  affordability?: AffordabilityResult;
  meta: ServiceExecutionMeta;
};

export const PROPERTY_FINANCE_DEFAULTS = {
  depositPercent: 10,
  annualRatePercent: 11,
  termYears: 20,
  maintenancePercentOfValue: 1,
} as const;

export const PROPERTY_FINANCE_SERVICE_VERSION = "0.1.0";
