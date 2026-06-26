/** Shared primitives for intelligence services. */

export type ServiceId =
  | "bond"
  | "transfer-duty"
  | "affordability"
  | "rental-yield"
  | "deposit"
  | "property-finance"
  | "property-analysis";

/** Standard contract for deterministic calculation services. */
export type CalculationService<TInput, TOutput> = {
  readonly id: ServiceId;
  calculate(input: TInput): TOutput;
};

export type DataConfidence = "high" | "medium" | "low" | "indicative";

export type IndicatedValue = {
  amount: number;
  currency: "ZAR";
  confidence: DataConfidence;
  source?: string;
  asOf?: string;
};

export type ScoredIndicator = {
  score: number;
  scale: { min: number; max: number };
  label: string;
  confidence: DataConfidence;
  summary?: string;
};

export type AvailabilityStatus = "available" | "partial" | "unavailable";

export type AnalysisField<T> = {
  status: AvailabilityStatus;
  value?: T;
  reason?: string;
};

export type PropertyLocationRef = {
  suburbSlug?: string;
  citySlug?: string;
  province?: string;
  latitude?: number;
  longitude?: number;
};

export type ServiceExecutionMeta = {
  computedAt: string;
  serviceVersion: string;
  locale: "en-ZA";
};
