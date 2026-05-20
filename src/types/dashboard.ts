export type Domain = 'investing' | 'entrepreneurship' | 'jobMarkets';

export type SignalCategory = 'ethical' | 'cultural' | 'regulatory' | 'technological';

export interface DataSource {
  id: string;
  name: string;
  provider: string;
  domain: Domain;
  category: SignalCategory;
  description: string;
  apiType: 'live' | 'curated';
  freshness: Date | string;
}

export interface Signal {
  id: string;
  sourceId: string;
  domain: Domain;
  category: SignalCategory;
  label: string;
  value: number; // normalized 0-100
  rawValue: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  trendMagnitude: number; // percentage change
  timestamp: string;
  region?: string;
  sector?: string;
}

export interface CompositeScore {
  domain: Domain;
  sector: string;
  region: string;
  score: number; // 0-100
  signals: Signal[];
  breakdown: {
    ethical: number;
    cultural: number;
    regulatory: number;
    technological: number;
  };
}

export interface ThresholdConfig {
  ethical: number;
  cultural: number;
  regulatory: number;
  technological: number;
}

export interface ThresholdPreset {
  id: string;
  name: string;
  description: string;
  icon: string;
  thresholds: ThresholdConfig;
  weights: WeightConfig;
}

export interface WeightConfig {
  ethical: number;
  cultural: number;
  regulatory: number;
  technological: number;
}

export interface ConfluenceAlert {
  id: string;
  domains: Domain[];
  sector: string;
  region: string;
  signalCount: number;
  signals: Signal[];
  severity: 'high' | 'medium' | 'low';
  description: string;
  timestamp: string;
}

export interface ScenarioVariable {
  id: string;
  label: string;
  domain: Domain;
  category: SignalCategory;
  currentValue: number;
  min: number;
  max: number;
  unit: string;
  step: number;
}

export interface ScenarioEffect {
  targetDomain: Domain;
  targetSector: string;
  metric: string;
  baselineValue: number;
  projectedValue: number;
  changePercent: number;
  confidence: number;
}

export interface HistoricalDataPoint {
  date: string;
  value: number;
  projected?: boolean;
}

export interface TimeSeriesData {
  sourceId: string;
  label: string;
  data: HistoricalDataPoint[];
  color: string;
}

export interface CorrelationEntry {
  source: string;
  target: string;
  correlation: number; // -1 to 1
  lag: number; // months
  significance: number;
}

export interface DrillDownData {
  signal: Signal;
  history: HistoricalDataPoint[];
  relatedSignals: Signal[];
  sourceUrl?: string;
  methodology?: string;
}

// Portfolio Alignment types
export interface TickerProfile {
  ticker: string;
  name: string;
  sector: string;
  assetClass: 'stock' | 'etf' | 'fund' | 'bond-etf' | 'reit' | 'commodity';
  themes: string[];
  description: string;
}

export interface TickerAlignment {
  ticker: string;
  name: string;
  sector: string;
  alignmentScore: number;
  explanation: string;
  risks: string;
  recommendation: 'hold' | 'review' | 'reduce' | 'add selectively' | 'research further';
}

export interface PortfolioHolding {
  ticker: string;
  currentAllocation: number;
}

export interface RevisedAllocation {
  ticker: string;
  name: string;
  currentPct: number;
  suggestedPct: number;
  direction: 'increase' | 'decrease' | 'maintain';
  reason: string;
  supportingInsight: string;
}

export interface PortfolioSummary {
  overallAlignment: 'broadly aligned' | 'partially aligned' | 'misaligned';
  score: number;
  summary: string;
  strengths: string[];
  gaps: string[];
}

export type AccountType = 'taxable' | 'traditional-ira' | 'roth-ira' | '401k' | 'hsa' | 'multiple' | '';
export type TaxBracket = '10-12' | '22-24' | '32-35' | '37' | 'unsure' | '';
export type GainStatus = 'mostly-gains' | 'mostly-losses' | 'mixed' | 'unsure' | '';
export type GainTerm = 'short-term' | 'long-term' | 'both' | 'unsure' | '';

export interface TaxContext {
  accountType: AccountType;
  taxBracket: TaxBracket;
  state: string;
  gainStatus: GainStatus;
  gainTerm: GainTerm;
  withdrawalPlanned: boolean | null;
  hasLossHarvesting: boolean | null;
  hasRestrictions: boolean | null;
}

export interface TaxImplication {
  ticker: string;
  investmentRationale: string;
  taxConsiderations: string;
  accountGuidance: string;
  assumptions: string[];
}

// API response types
export interface FREDResponse {
  observations: Array<{
    date: string;
    value: string;
  }>;
}

export interface BLSResponse {
  Results: {
    series: Array<{
      seriesID: string;
      data: Array<{
        year: string;
        period: string;
        value: string;
        periodName: string;
      }>;
    }>;
  };
}

export interface AlphaVantageResponse {
  'Meta Data': Record<string, string>;
  [key: string]: unknown;
}
