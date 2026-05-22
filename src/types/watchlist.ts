export type ExposureType =
  | 'public-equity' | 'private-equity' | 'crypto' | 'real-estate'
  | 'venture-capital' | 'private-business' | 'fund' | 'other';

export type Confidence = 'high' | 'medium' | 'low';
export type AlertSeverity = 'high' | 'medium' | 'low';
export type AlertStatus = 'active' | 'snoozed' | 'dismissed' | 'reviewed';

export type AlertType =
  | 'new-position' | 'position-exited' | 'large-increase' | 'large-decrease'
  | 'crypto-movement' | 'fund-aum-jump' | 'clustered-reporting';

export interface WatchlistEntity {
  id: string;
  name: string;
  role: string;
  avatar: string;
}

export interface WatchlistEntry {
  id: string;
  entityId: string;
  asset: string;
  exposureType: ExposureType;
  previousValue: number;
  latestValue: number;
  pctChange: number;
  source: string;
  sourceUrl: string;
  timestamp: string;
  confidence: Confidence;
  status: 'new' | 'reviewed' | 'dismissed';
}

export interface WatchlistAlert {
  id: string;
  entryId: string;
  entityId: string;
  asset: string;
  alertType: AlertType;
  severity: AlertSeverity;
  score: number;
  factors: {
    magnitudeScore: number;
    speedScore: number;
    noveltyScore: number;
    sourceScore: number;
    sectorVolatilityScore: number;
    freshnessScore: number;
  };
  whyItMatters: string;
  actionLabel: string;
  timestamp: string;
  status: AlertStatus;
}

export interface WatchlistKPIs {
  activeAlerts: number;
  highPriorityCount: number;
  totalExposureTracked: number;
  cryptoExposure: number;
  entitiesWatched: number;
  lastUpdated: string;
  oldestUnreviewedAlert: string;
  averageScore: number;
}

export interface MovementTimelineEntry {
  id: string;
  entityId: string;
  entityName: string;
  entityAvatar: string;
  asset: string;
  exposureType: ExposureType;
  pctChange: number;
  latestValue: number;
  timestamp: string;
  alertSeverity?: AlertSeverity;
  alertScore?: number;
}

export type WatchlistPersonFilter = string | 'all';
export type WatchlistAssetFilter = ExposureType | 'all';
export type WatchlistSeverityFilter = AlertSeverity | 'all';

export interface WatchlistFilters {
  person: WatchlistPersonFilter;
  assetType: WatchlistAssetFilter;
  severity: WatchlistSeverityFilter;
  dateRange: 'all' | '24h' | '7d' | '30d' | '90d';
}
