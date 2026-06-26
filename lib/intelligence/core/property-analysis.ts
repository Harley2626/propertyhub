import type {
  AnalysisField,
  DataConfidence,
  IndicatedValue,
  PropertyLocationRef,
  ScoredIndicator,
  ServiceExecutionMeta,
} from "./types";
import type { PropertyFinanceSnapshot } from "../models/property-finance.model";

export type OfferRecommendation = {
  suggestedOfferMin: number;
  suggestedOfferMax: number;
  currency: "ZAR";
  confidence: DataConfidence;
  rationale: string[];
};

export type MonthlyOwnershipCost = {
  bondRepayment: number;
  levies: number;
  rates: number;
  insurance: number;
  maintenance: number;
  totalMonthly: number;
  currency: "ZAR";
};

export type RentalEstimate = {
  monthlyRent: number;
  annualRent: number;
  grossYieldPercent?: number;
  currency: "ZAR";
  confidence: DataConfidence;
};

export type FutureGrowthIndicator = {
  id: string;
  label: string;
  direction: "up" | "flat" | "down" | "unknown";
  confidence: DataConfidence;
  summary?: string;
};

export type ProximityIndicator = {
  label: string;
  distanceKm?: number;
  rating?: number;
  confidence: DataConfidence;
  summary?: string;
};

export type TransportIndicator = {
  modes: Array<{
    type: "car" | "public" | "walk" | "cycle";
    label: string;
    durationMinutes?: number;
  }>;
  confidence: DataConfidence;
};

export type CrimeIndicator = {
  level: "low" | "moderate" | "high" | "unknown";
  confidence: DataConfidence;
  summary?: string;
  asOf?: string;
};

/**
 * Unified property intelligence output.
 * Fields are wrapped in AnalysisField so consumers can distinguish
 * computed results from future data that is not yet available.
 */
export type PropertyAnalysis = {
  location?: PropertyLocationRef;
  finance: PropertyFinanceSnapshot;
  estimatedValue: AnalysisField<IndicatedValue>;
  offerRecommendation: AnalysisField<OfferRecommendation>;
  monthlyOwnershipCost: AnalysisField<MonthlyOwnershipCost>;
  rentalEstimate: AnalysisField<RentalEstimate>;
  investmentScore: AnalysisField<ScoredIndicator>;
  riskScore: AnalysisField<ScoredIndicator>;
  futureGrowthIndicators: AnalysisField<FutureGrowthIndicator[]>;
  schoolProximity: AnalysisField<ProximityIndicator[]>;
  transport: AnalysisField<TransportIndicator>;
  crimeIndicators: AnalysisField<CrimeIndicator>;
  meta: ServiceExecutionMeta;
};

export type PropertyAnalysisInput = {
  propertyPrice: number;
  depositPercent?: number;
  annualRatePercent?: number;
  termYears?: number;
  amountSaved?: number;
  monthlyRent?: number;
  monthlyExpenses?: number;
  monthlyLevy?: number;
  monthlyRates?: number;
  monthlyInsurance?: number;
  maintenancePercentOfValue?: number;
  location?: PropertyLocationRef;
};

export const PROPERTY_ANALYSIS_SERVICE_VERSION = "0.1.0";

export const UNAVAILABLE_REASON = {
  marketData:
    "Market data providers are not connected. Estimated value will be available in a future release.",
  offerEngine:
    "Offer recommendation engine is not connected. Finance inputs are available today.",
  rentalData:
    "Rental comparables are not connected. Provide monthlyRent to model yield locally.",
  investmentScore:
    "Investment scoring requires market and rental datasets not yet integrated.",
  riskScore:
    "Risk scoring requires crime, market volatility, and location datasets not yet integrated.",
  growth:
    "Growth indicators require historical price trend data not yet integrated.",
  schools:
    "School proximity requires geospatial datasets not yet integrated.",
  transport:
    "Transport scoring requires routing datasets not yet integrated.",
  crime:
    "Crime indicators require verified local data feeds not yet integrated.",
} as const;
