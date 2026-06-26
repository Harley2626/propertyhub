import type { CalculationService, ServiceId } from "../core/types";
import { affordabilityService } from "./affordability.service";
import { bondService } from "./bond.service";
import { depositService } from "./deposit.service";
import { propertyAnalysisService } from "./property-analysis.service";
import { propertyFinanceService } from "./property-finance.service";
import { rentalYieldService } from "./rental-yield.service";
import { transferDutyService } from "./transfer-duty.service";

/** Central registry for intelligence services. */
export const intelligenceServices = {
  bond: bondService,
  transferDuty: transferDutyService,
  affordability: affordabilityService,
  rentalYield: rentalYieldService,
  deposit: depositService,
  propertyFinance: propertyFinanceService,
  propertyAnalysis: propertyAnalysisService,
} as const;

export type IntelligenceServiceRegistry = typeof intelligenceServices;

export function getIntelligenceService(id: ServiceId) {
  const keyMap = {
    bond: "bond",
    "transfer-duty": "transferDuty",
    affordability: "affordability",
    "rental-yield": "rentalYield",
    deposit: "deposit",
    "property-finance": "propertyFinance",
    "property-analysis": "propertyAnalysis",
  } as const satisfies Record<ServiceId, keyof IntelligenceServiceRegistry>;

  return intelligenceServices[keyMap[id]];
}

export type { CalculationService };

export { bondService } from "./bond.service";
export { transferDutyService } from "./transfer-duty.service";
export { affordabilityService } from "./affordability.service";
export { rentalYieldService } from "./rental-yield.service";
export { depositService } from "./deposit.service";
export { propertyFinanceService } from "./property-finance.service";
export {
  propertyAnalysisService,
  createPropertyAnalysisService,
  type MarketDataProvider,
  type LocationIntelligenceProvider,
  type PropertyAnalysisDependencies,
} from "./property-analysis.service";
