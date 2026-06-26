import type {
  AnalysisField,
  PropertyLocationRef,
} from "../core/types";
import type {
  PropertyAnalysis,
  PropertyAnalysisInput,
  RentalEstimate,
} from "../core/property-analysis";
import {
  PROPERTY_ANALYSIS_SERVICE_VERSION,
  UNAVAILABLE_REASON,
} from "../core/property-analysis";
import {
  PROPERTY_FINANCE_DEFAULTS,
  type PropertyFinanceInput,
} from "../models/property-finance.model";
import { propertyFinanceService } from "./property-finance.service";
import { rentalYieldService } from "./rental-yield.service";

/** Future extension point: external market data (Phase 3). */
export type MarketDataProvider = {
  getEstimatedValue?(
    location: PropertyLocationRef,
    propertyPrice: number,
  ): Promise<AnalysisField<import("../core/types").IndicatedValue>>;
};

/** Future extension point: geospatial / amenity data (Phase 3). */
export type LocationIntelligenceProvider = {
  getSchoolProximity?(
    location: PropertyLocationRef,
  ): Promise<PropertyAnalysis["schoolProximity"]>;
  getTransport?(
    location: PropertyLocationRef,
  ): Promise<PropertyAnalysis["transport"]>;
  getCrimeIndicators?(
    location: PropertyLocationRef,
  ): Promise<PropertyAnalysis["crimeIndicators"]>;
};

export type PropertyAnalysisDependencies = {
  marketData?: MarketDataProvider;
  locationIntelligence?: LocationIntelligenceProvider;
};

function unavailable<T>(reason: string): AnalysisField<T> {
  return { status: "unavailable", reason };
}

function buildRentalEstimate(input: PropertyAnalysisInput): AnalysisField<RentalEstimate> {
  if (input.monthlyRent === undefined || input.monthlyRent <= 0) {
    return unavailable(UNAVAILABLE_REASON.rentalData);
  }

  const yieldResult = rentalYieldService.calculate({
    propertyValue: input.propertyPrice,
    monthlyRent: input.monthlyRent,
    monthlyExpenses: input.monthlyExpenses ?? 0,
  });

  return {
    status: "available",
    value: {
      monthlyRent: input.monthlyRent,
      annualRent: yieldResult.annualRent,
      grossYieldPercent: yieldResult.grossYield,
      currency: "ZAR",
      confidence: "indicative",
    },
  };
}

function toFinanceInput(input: PropertyAnalysisInput): PropertyFinanceInput {
  return {
    propertyPrice: input.propertyPrice,
    depositPercent: input.depositPercent ?? PROPERTY_FINANCE_DEFAULTS.depositPercent,
    annualRatePercent:
      input.annualRatePercent ?? PROPERTY_FINANCE_DEFAULTS.annualRatePercent,
    termYears: input.termYears ?? PROPERTY_FINANCE_DEFAULTS.termYears,
    amountSaved: input.amountSaved,
    monthlyLevy: input.monthlyLevy,
    monthlyRates: input.monthlyRates,
    monthlyInsurance: input.monthlyInsurance,
    maintenancePercentOfValue: input.maintenancePercentOfValue,
    monthlyRent: input.monthlyRent,
    monthlyRentalExpenses: input.monthlyExpenses,
  };
}

export class PropertyAnalysisService {
  readonly id = "property-analysis" as const;

  constructor(private readonly deps: PropertyAnalysisDependencies = {}) {}

  /** Synchronous baseline analysis using finance services only. */
  analyze(input: PropertyAnalysisInput): PropertyAnalysis {
    const finance = propertyFinanceService.calculate(toFinanceInput(input));

    return {
      location: input.location,
      finance,
      estimatedValue: unavailable(UNAVAILABLE_REASON.marketData),
      offerRecommendation: unavailable(UNAVAILABLE_REASON.offerEngine),
      monthlyOwnershipCost: {
        status: "available",
        value: finance.monthlyOwnership,
      },
      rentalEstimate: buildRentalEstimate(input),
      investmentScore: unavailable(UNAVAILABLE_REASON.investmentScore),
      riskScore: unavailable(UNAVAILABLE_REASON.riskScore),
      futureGrowthIndicators: unavailable(UNAVAILABLE_REASON.growth),
      schoolProximity: unavailable(UNAVAILABLE_REASON.schools),
      transport: unavailable(UNAVAILABLE_REASON.transport),
      crimeIndicators: unavailable(UNAVAILABLE_REASON.crime),
      meta: {
        computedAt: new Date().toISOString(),
        serviceVersion: PROPERTY_ANALYSIS_SERVICE_VERSION,
        locale: "en-ZA",
      },
    };
  }

  /**
   * Async analysis entry point for Phase 3 providers.
   * Merges external data when providers are registered.
   */
  async analyzeAsync(input: PropertyAnalysisInput): Promise<PropertyAnalysis> {
    const base = this.analyze(input);
    const location = input.location;

    if (!location) return base;

    const [estimatedValue, schoolProximity, transport, crimeIndicators] =
      await Promise.all([
        this.deps.marketData?.getEstimatedValue?.(location, input.propertyPrice),
        this.deps.locationIntelligence?.getSchoolProximity?.(location),
        this.deps.locationIntelligence?.getTransport?.(location),
        this.deps.locationIntelligence?.getCrimeIndicators?.(location),
      ]);

    return {
      ...base,
      estimatedValue: estimatedValue ?? base.estimatedValue,
      schoolProximity: schoolProximity ?? base.schoolProximity,
      transport: transport ?? base.transport,
      crimeIndicators: crimeIndicators ?? base.crimeIndicators,
    };
  }
}

export const propertyAnalysisService = new PropertyAnalysisService();

export function createPropertyAnalysisService(
  deps: PropertyAnalysisDependencies,
): PropertyAnalysisService {
  return new PropertyAnalysisService(deps);
}
