import {
  WatchlistEntity, WatchlistEntry, WatchlistAlert, AlertType, AlertSeverity,
  ExposureType, Confidence, AlertStatus, WatchlistKPIs, MovementTimelineEntry,
} from '@/types/watchlist';

// ── Watched Entities ──

export const watchedEntities: WatchlistEntity[] = [
  { id: 'dtj', name: 'Donald Trump Jr.', role: 'Executive VP, Trump Org', avatar: 'DTJ' },
  { id: 'et', name: 'Eric Trump', role: 'Executive VP, Trump Org', avatar: 'ET' },
  { id: 'it', name: 'Ivanka Trump', role: 'Former Senior Advisor', avatar: 'IT' },
  { id: 'jk', name: 'Jared Kushner', role: 'Affinity Partners Founder', avatar: 'JK' },
];

// ── Mock Watchlist Data ──

const now = new Date();
const daysAgo = (d: number) => new Date(now.getTime() - d * 86400000).toISOString();
const hoursAgo = (h: number) => new Date(now.getTime() - h * 3600000).toISOString();

export const watchlistEntries: WatchlistEntry[] = [
  // Jared Kushner - Affinity Partners
  { id: 'w1', entityId: 'jk', asset: 'Affinity Partners Fund I', exposureType: 'private-equity', previousValue: 2800000000, latestValue: 3420000000, pctChange: 22.1, source: 'SEC Form D filing', sourceUrl: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&company=affinity+partners', timestamp: daysAgo(3), confidence: 'high', status: 'new' },
  { id: 'w2', entityId: 'jk', asset: 'Saudi PIF Co-Investment Vehicle', exposureType: 'private-equity', previousValue: 0, latestValue: 450000000, pctChange: 100, source: 'Financial Times report', sourceUrl: '#', timestamp: daysAgo(5), confidence: 'medium', status: 'new' },
  { id: 'w3', entityId: 'jk', asset: 'World Liberty Financial (WLFI)', exposureType: 'crypto', previousValue: 18000000, latestValue: 42000000, pctChange: 133.3, source: 'Blockchain analytics / Arkham', sourceUrl: '#', timestamp: daysAgo(1), confidence: 'high', status: 'new' },
  { id: 'w4', entityId: 'jk', asset: 'Israeli Tech Fund LP', exposureType: 'venture-capital', previousValue: 320000000, latestValue: 345000000, pctChange: 7.8, source: 'Bloomberg report', sourceUrl: '#', timestamp: daysAgo(14), confidence: 'medium', status: 'reviewed' },
  { id: 'w5', entityId: 'jk', asset: 'Abu Dhabi RE Holdings', exposureType: 'real-estate', previousValue: 180000000, latestValue: 195000000, pctChange: 8.3, source: 'Property records / Reuters', sourceUrl: '#', timestamp: daysAgo(21), confidence: 'low', status: 'reviewed' },

  // Donald Trump Jr.
  { id: 'w6', entityId: 'dtj', asset: 'Trump Media & Tech (DJT)', exposureType: 'public-equity', previousValue: 165000000, latestValue: 112000000, pctChange: -32.1, source: 'SEC Form 4 filing', sourceUrl: '#', timestamp: daysAgo(2), confidence: 'high', status: 'new' },
  { id: 'w7', entityId: 'dtj', asset: '$TRUMP Meme Coin', exposureType: 'crypto', previousValue: 8500000, latestValue: 24300000, pctChange: 185.9, source: 'On-chain data / Dune Analytics', sourceUrl: '#', timestamp: hoursAgo(8), confidence: 'high', status: 'new' },
  { id: 'w8', entityId: 'dtj', asset: 'Trump Org Hotel Portfolio', exposureType: 'real-estate', previousValue: 420000000, latestValue: 445000000, pctChange: 5.9, source: 'Property valuations / CoStar', sourceUrl: '#', timestamp: daysAgo(30), confidence: 'low', status: 'dismissed' },
  { id: 'w9', entityId: 'dtj', asset: 'World Liberty Financial (WLFI)', exposureType: 'crypto', previousValue: 12000000, latestValue: 31000000, pctChange: 158.3, source: 'Blockchain analytics / Etherscan', sourceUrl: '#', timestamp: daysAgo(1), confidence: 'high', status: 'new' },
  { id: 'w10', entityId: 'dtj', asset: 'Trump Winery LLC', exposureType: 'private-business', previousValue: 25000000, latestValue: 28000000, pctChange: 12.0, source: 'Annual disclosure', sourceUrl: '#', timestamp: daysAgo(45), confidence: 'medium', status: 'reviewed' },

  // Eric Trump
  { id: 'w11', entityId: 'et', asset: 'Trump Org RE Development', exposureType: 'real-estate', previousValue: 580000000, latestValue: 615000000, pctChange: 6.0, source: 'Property filings', sourceUrl: '#', timestamp: daysAgo(18), confidence: 'medium', status: 'reviewed' },
  { id: 'w12', entityId: 'et', asset: 'World Liberty Financial (WLFI)', exposureType: 'crypto', previousValue: 5000000, latestValue: 19500000, pctChange: 290.0, source: 'Blockchain analytics', sourceUrl: '#', timestamp: daysAgo(1), confidence: 'high', status: 'new' },
  { id: 'w13', entityId: 'et', asset: 'Trump Golf Properties', exposureType: 'real-estate', previousValue: 310000000, latestValue: 325000000, pctChange: 4.8, source: 'Appraisal data', sourceUrl: '#', timestamp: daysAgo(60), confidence: 'low', status: 'dismissed' },
  { id: 'w14', entityId: 'et', asset: 'American Bitcoin Mining Corp', exposureType: 'crypto', previousValue: 0, latestValue: 8200000, pctChange: 100, source: 'Corporate filing / Bloomberg', sourceUrl: '#', timestamp: daysAgo(4), confidence: 'medium', status: 'new' },

  // Ivanka Trump
  { id: 'w15', entityId: 'it', asset: 'Ivanka Trump Brand IP', exposureType: 'private-business', previousValue: 50000000, latestValue: 42000000, pctChange: -16.0, source: 'Trademark filings / annual disclosure', sourceUrl: '#', timestamp: daysAgo(90), confidence: 'low', status: 'reviewed' },
  { id: 'w16', entityId: 'it', asset: 'Miami RE Portfolio', exposureType: 'real-estate', previousValue: 45000000, latestValue: 68000000, pctChange: 51.1, source: 'Property records / Miami-Dade', sourceUrl: '#', timestamp: daysAgo(7), confidence: 'high', status: 'new' },
  { id: 'w17', entityId: 'it', asset: 'Kushner Family Trust', exposureType: 'private-equity', previousValue: 120000000, latestValue: 138000000, pctChange: 15.0, source: 'Financial disclosure', sourceUrl: '#', timestamp: daysAgo(12), confidence: 'medium', status: 'new' },
  { id: 'w18', entityId: 'it', asset: 'World Liberty Financial (WLFI)', exposureType: 'crypto', previousValue: 3000000, latestValue: 9800000, pctChange: 226.7, source: 'Blockchain analytics', sourceUrl: '#', timestamp: daysAgo(1), confidence: 'high', status: 'new' },
];

// ── Alert Scoring Engine ──

interface ScoringFactors {
  magnitudeScore: number;
  speedScore: number;
  noveltyScore: number;
  sourceScore: number;
  sectorVolatilityScore: number;
  freshnessScore: number;
}

const SCORING_WEIGHTS = {
  magnitude: 0.25,
  speed: 0.15,
  novelty: 0.20,
  source: 0.10,
  sectorVolatility: 0.15,
  freshness: 0.15,
};

function computeMagnitudeScore(pctChange: number): number {
  const abs = Math.abs(pctChange);
  if (abs >= 100) return 100;
  if (abs >= 50) return 80 + (abs - 50) * 0.4;
  if (abs >= 25) return 60 + (abs - 25) * 0.8;
  if (abs >= 15) return 40 + (abs - 15) * 2;
  if (abs >= 5) return 10 + (abs - 5) * 3;
  return abs * 2;
}

function computeSpeedScore(timestamp: string): number {
  const ageHours = (now.getTime() - new Date(timestamp).getTime()) / 3600000;
  if (ageHours <= 24) return 100;
  if (ageHours <= 72) return 80;
  if (ageHours <= 168) return 60;
  if (ageHours <= 720) return 30;
  return 10;
}

function computeNoveltyScore(entry: WatchlistEntry): number {
  if (entry.previousValue === 0) return 100;
  if (entry.pctChange <= -90) return 95;
  return 0;
}

function computeSourceScore(confidence: Confidence): number {
  if (confidence === 'high') return 90;
  if (confidence === 'medium') return 60;
  return 30;
}

function computeSectorVolatilityScore(exposureType: ExposureType): number {
  const scores: Record<ExposureType, number> = {
    'crypto': 95,
    'venture-capital': 70,
    'private-equity': 60,
    'public-equity': 55,
    'private-business': 40,
    'real-estate': 30,
    'fund': 50,
    'other': 35,
  };
  return scores[exposureType];
}

function computeFreshnessScore(timestamp: string): number {
  const ageDays = (now.getTime() - new Date(timestamp).getTime()) / 86400000;
  if (ageDays <= 1) return 100;
  if (ageDays <= 3) return 85;
  if (ageDays <= 7) return 70;
  if (ageDays <= 14) return 50;
  if (ageDays <= 30) return 30;
  return 10;
}

export function computeAlertScore(entry: WatchlistEntry): { score: number; factors: ScoringFactors } {
  const factors: ScoringFactors = {
    magnitudeScore: computeMagnitudeScore(entry.pctChange),
    speedScore: computeSpeedScore(entry.timestamp),
    noveltyScore: computeNoveltyScore(entry),
    sourceScore: computeSourceScore(entry.confidence),
    sectorVolatilityScore: computeSectorVolatilityScore(entry.exposureType),
    freshnessScore: computeFreshnessScore(entry.timestamp),
  };

  const score = Math.round(
    factors.magnitudeScore * SCORING_WEIGHTS.magnitude +
    factors.speedScore * SCORING_WEIGHTS.speed +
    factors.noveltyScore * SCORING_WEIGHTS.novelty +
    factors.sourceScore * SCORING_WEIGHTS.source +
    factors.sectorVolatilityScore * SCORING_WEIGHTS.sectorVolatility +
    factors.freshnessScore * SCORING_WEIGHTS.freshness
  );

  return { score: Math.min(100, score), factors };
}

function classifyAlertType(entry: WatchlistEntry): AlertType {
  if (entry.previousValue === 0) return 'new-position';
  if (entry.pctChange <= -90) return 'position-exited';
  if (entry.exposureType === 'crypto' && Math.abs(entry.pctChange) >= 20) return 'crypto-movement';
  if (entry.exposureType === 'private-equity' || entry.exposureType === 'fund') {
    if (entry.pctChange >= 10) return 'fund-aum-jump';
  }
  if (entry.pctChange >= 15) return 'large-increase';
  if (entry.pctChange <= -15) return 'large-decrease';
  return 'clustered-reporting';
}

function classifySeverity(score: number): AlertSeverity {
  if (score >= 70) return 'high';
  if (score >= 50) return 'medium';
  return 'low';
}

function generateWhyItMatters(entry: WatchlistEntry, alertType: AlertType, score: number): string {
  const entity = watchedEntities.find(e => e.id === entry.entityId);
  const name = entity?.name ?? 'Unknown';

  switch (alertType) {
    case 'new-position':
      return `${name} has a newly reported position in ${entry.asset} valued at ${fmtCompact(entry.latestValue)}. New holdings often signal strategic shifts or emerging opportunities.`;
    case 'position-exited':
      return `${name} appears to have exited their position in ${entry.asset}. Full exits can indicate a change in conviction or regulatory pressure.`;
    case 'large-increase':
      return `${entry.asset} exposure for ${name} jumped ${entry.pctChange.toFixed(1)}% (${fmtCompact(entry.previousValue)} → ${fmtCompact(entry.latestValue)}). Changes above 15% within a reporting window suggest active capital deployment.`;
    case 'large-decrease':
      return `${entry.asset} exposure for ${name} dropped ${Math.abs(entry.pctChange).toFixed(1)}%. Large drawdowns may reflect profit-taking, forced sales, or valuation corrections.`;
    case 'crypto-movement':
      return `Sudden crypto activity detected: ${entry.asset} for ${name} changed ${entry.pctChange.toFixed(1)}%. Crypto positions are high-volatility and often tied to token launches or market events.`;
    case 'fund-aum-jump':
      return `${entry.asset} AUM grew ${entry.pctChange.toFixed(1)}% to ${fmtCompact(entry.latestValue)}. Rapid fund growth can signal new LP capital, deployment activity, or mark-to-market gains.`;
    case 'clustered-reporting':
      return `Multiple data points recently updated for ${name}'s ${entry.asset} position. Clustered reporting often precedes significant announcements.`;
  }
}

function generateActionLabel(severity: AlertSeverity, alertType: AlertType): string {
  if (severity === 'high') {
    if (alertType === 'crypto-movement' || alertType === 'new-position') return 'Review now';
    return 'Worth watching';
  }
  if (severity === 'medium') return 'Worth watching';
  return 'Monitor only';
}

function fmtCompact(n: number): string {
  if (n >= 1e9) return `$${(n / 1e9).toFixed(1)}B`;
  if (n >= 1e6) return `$${(n / 1e6).toFixed(1)}M`;
  if (n >= 1e3) return `$${(n / 1e3).toFixed(0)}K`;
  return `$${n.toFixed(0)}`;
}

// ── Alert Generation ──

export function generateAlerts(entries: WatchlistEntry[]): WatchlistAlert[] {
  const alerts: WatchlistAlert[] = [];
  const seen = new Set<string>();

  for (const entry of entries) {
    const { score, factors } = computeAlertScore(entry);
    const severity = classifySeverity(score);

    // Deduplicate: same asset + same entity within low-score range
    const dedupeKey = `${entry.entityId}:${entry.asset}`;
    if (seen.has(dedupeKey) && score < 50) continue;
    seen.add(dedupeKey);

    // Only surface alerts for score >= 50 or new/exit positions
    const alertType = classifyAlertType(entry);
    const isNovel = alertType === 'new-position' || alertType === 'position-exited';
    if (score < 50 && !isNovel) continue;

    // Suppress tiny changes unless tied to novelty
    if (Math.abs(entry.pctChange) < 5 && !isNovel) continue;

    alerts.push({
      id: `alert-${entry.id}`,
      entryId: entry.id,
      entityId: entry.entityId,
      asset: entry.asset,
      alertType,
      severity,
      score,
      factors,
      whyItMatters: generateWhyItMatters(entry, alertType, score),
      actionLabel: generateActionLabel(severity, alertType),
      timestamp: entry.timestamp,
      status: entry.status === 'dismissed' ? 'dismissed' : entry.status === 'reviewed' ? 'reviewed' : 'active',
    });
  }

  return alerts.sort((a, b) => {
    const sevOrder = { high: 0, medium: 1, low: 2 };
    if (sevOrder[a.severity] !== sevOrder[b.severity]) return sevOrder[a.severity] - sevOrder[b.severity];
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
  });
}

// ── KPIs ──

export function computeKPIs(alerts: WatchlistAlert[], entries: WatchlistEntry[]): WatchlistKPIs {
  const active = alerts.filter(a => a.status === 'active');
  const highPriority = active.filter(a => a.severity === 'high');
  const totalExposure = entries.reduce((s, e) => s + e.latestValue, 0);
  const cryptoEntries = entries.filter(e => e.exposureType === 'crypto');
  const cryptoExposure = cryptoEntries.reduce((s, e) => s + e.latestValue, 0);
  const timestamps = entries.map(e => new Date(e.timestamp).getTime());
  const lastUpdated = new Date(Math.max(...timestamps)).toISOString();
  const oldestActive = active.length > 0
    ? new Date(Math.min(...active.map(a => new Date(a.timestamp).getTime()))).toISOString()
    : lastUpdated;

  return {
    activeAlerts: active.length,
    highPriorityCount: highPriority.length,
    totalExposureTracked: totalExposure,
    cryptoExposure,
    entitiesWatched: watchedEntities.length,
    lastUpdated,
    oldestUnreviewedAlert: oldestActive,
    averageScore: active.length > 0 ? Math.round(active.reduce((s, a) => s + a.score, 0) / active.length) : 0,
  };
}

// ── Timeline ──

export function buildTimeline(entries: WatchlistEntry[], alerts: WatchlistAlert[]): MovementTimelineEntry[] {
  return entries
    .map(entry => {
      const alert = alerts.find(a => a.entryId === entry.id);
      const entity = watchedEntities.find(e => e.id === entry.entityId);
      return {
        id: entry.id,
        entityId: entry.entityId,
        entityName: entity?.name ?? 'Unknown',
        entityAvatar: entity?.avatar ?? '??',
        asset: entry.asset,
        exposureType: entry.exposureType,
        pctChange: entry.pctChange,
        latestValue: entry.latestValue,
        timestamp: entry.timestamp,
        alertSeverity: alert?.severity,
        alertScore: alert?.score,
      };
    })
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}

// ── Helpers ──

export { fmtCompact };

export const EXPOSURE_TYPE_LABELS: Record<ExposureType, string> = {
  'public-equity': 'Public Equity',
  'private-equity': 'Private Equity',
  'crypto': 'Crypto',
  'real-estate': 'Real Estate',
  'venture-capital': 'Venture Capital',
  'private-business': 'Private Business',
  'fund': 'Fund',
  'other': 'Other',
};

export const ALERT_TYPE_LABELS: Record<AlertType, string> = {
  'new-position': 'New Position',
  'position-exited': 'Position Exited',
  'large-increase': 'Large Increase',
  'large-decrease': 'Large Decrease',
  'crypto-movement': 'Crypto Movement',
  'fund-aum-jump': 'Fund AUM Jump',
  'clustered-reporting': 'Clustered Reporting',
};
