import { Signal, WeightConfig, ThresholdConfig, CompositeScore, ScenarioEffect, SignalCategory } from '@/types/dashboard';

export function computeCompositeScore(
  signals: Signal[],
  weights: WeightConfig,
  thresholds: ThresholdConfig
): CompositeScore[] {
  const grouped = groupBy(signals, s => `${s.sector || 'general'}|${s.region || 'global'}`);

  return Object.entries(grouped).map(([key, sigs]) => {
    const [sector, region] = key.split('|');
    const breakdown = {
      ethical: avgByCategory(sigs, 'ethical'),
      cultural: avgByCategory(sigs, 'cultural'),
      regulatory: avgByCategory(sigs, 'regulatory'),
      technological: avgByCategory(sigs, 'technological'),
    };

    const totalWeight = weights.ethical + weights.cultural + weights.regulatory + weights.technological;
    const score = (
      breakdown.ethical * weights.ethical +
      breakdown.cultural * weights.cultural +
      breakdown.regulatory * weights.regulatory +
      breakdown.technological * weights.technological
    ) / (totalWeight || 1);

    const meetsThresholds =
      breakdown.ethical >= thresholds.ethical ||
      breakdown.cultural >= thresholds.cultural ||
      breakdown.regulatory >= thresholds.regulatory ||
      breakdown.technological >= thresholds.technological;

    return {
      domain: sigs[0].domain,
      sector: sector || 'general',
      region: region || 'global',
      score: meetsThresholds ? score : score * 0.5,
      signals: sigs,
      breakdown,
    };
  }).sort((a, b) => b.score - a.score);
}

export function computeScenarioEffects(
  variableId: string,
  newValue: number,
  currentValue: number
): ScenarioEffect[] {
  const changePct = ((newValue - currentValue) / currentValue) * 100;
  const effects: ScenarioEffect[] = [];

  const cascadeRules: Record<string, Array<{
    targetDomain: 'investing' | 'entrepreneurship' | 'jobMarkets';
    targetSector: string;
    metric: string;
    sensitivity: number;
    inverse: boolean;
  }>> = {
    'sv-1': [ // Fed Funds Rate
      { targetDomain: 'investing', targetSector: 'Real Estate', metric: 'Sector Growth', sensitivity: -2.5, inverse: true },
      { targetDomain: 'investing', targetSector: 'Technology', metric: 'Valuations', sensitivity: -1.8, inverse: true },
      { targetDomain: 'entrepreneurship', targetSector: 'VC Funding', metric: 'Total Investment', sensitivity: -2.0, inverse: true },
      { targetDomain: 'jobMarkets', targetSector: 'PM Hiring Velocity', metric: 'Startup PM Roles', sensitivity: -1.5, inverse: true },
      { targetDomain: 'investing', targetSector: 'Financials', metric: 'Net Interest Margin', sensitivity: 1.2, inverse: false },
    ],
    'sv-2': [ // AI Adoption Rate
      { targetDomain: 'jobMarkets', targetSector: 'AI Product Management', metric: 'Job Openings', sensitivity: 1.8, inverse: false },
      { targetDomain: 'jobMarkets', targetSector: 'Delivery/Program PM', metric: 'Automation Displacement', sensitivity: 1.5, inverse: false },
      { targetDomain: 'entrepreneurship', targetSector: 'AI Startups', metric: 'Funding', sensitivity: 2.0, inverse: false },
      { targetDomain: 'investing', targetSector: 'Technology', metric: 'Revenue Growth', sensitivity: 1.3, inverse: false },
      { targetDomain: 'jobMarkets', targetSector: 'Technical PM', metric: 'Demand Growth', sensitivity: 1.2, inverse: false },
    ],
    'sv-3': [ // Global Conflict Index
      { targetDomain: 'investing', targetSector: 'Defense', metric: 'Revenue Growth', sensitivity: 1.5, inverse: false },
      { targetDomain: 'investing', targetSector: 'Energy', metric: 'Price Volatility', sensitivity: 1.8, inverse: false },
      { targetDomain: 'entrepreneurship', targetSector: 'Emerging Markets', metric: 'Investment Attractiveness', sensitivity: -1.2, inverse: true },
      { targetDomain: 'jobMarkets', targetSector: 'Technical PM (Defense/Security)', metric: 'Demand', sensitivity: 0.8, inverse: false },
    ],
    'sv-4': [ // Consumer Sentiment
      { targetDomain: 'investing', targetSector: 'Consumer Discretionary', metric: 'Sector Growth', sensitivity: 1.5, inverse: false },
      { targetDomain: 'investing', targetSector: 'Retail', metric: 'Revenue', sensitivity: 1.3, inverse: false },
      { targetDomain: 'entrepreneurship', targetSector: 'D2C Startups', metric: 'Success Rate', sensitivity: 1.0, inverse: false },
      { targetDomain: 'jobMarkets', targetSector: 'Growth PM', metric: 'Consumer Sector Demand', sensitivity: 0.8, inverse: false },
    ],
    'sv-5': [ // Corruption Perception
      { targetDomain: 'entrepreneurship', targetSector: 'Emerging Markets', metric: 'FDI Inflows', sensitivity: 1.5, inverse: false },
      { targetDomain: 'investing', targetSector: 'Emerging Markets', metric: 'Portfolio Allocation', sensitivity: 1.2, inverse: false },
      { targetDomain: 'jobMarkets', targetSector: 'Product Ops/Strategy', metric: 'Regulatory PM Demand', sensitivity: 0.6, inverse: false },
    ],
    'sv-6': [ // Regulatory Intensity
      { targetDomain: 'jobMarkets', targetSector: 'Product Ops/Strategy', metric: 'Regulatory Product Demand', sensitivity: 1.8, inverse: false },
      { targetDomain: 'entrepreneurship', targetSector: 'RegTech', metric: 'Market Opportunity', sensitivity: 2.0, inverse: false },
      { targetDomain: 'investing', targetSector: 'Small Cap', metric: 'Compliance Burden', sensitivity: -1.5, inverse: true },
    ],
    'sv-7': [ // Remote Work Adoption
      { targetDomain: 'investing', targetSector: 'Commercial Real Estate', metric: 'Occupancy Rates', sensitivity: -1.8, inverse: true },
      { targetDomain: 'entrepreneurship', targetSector: 'Collaboration Tools', metric: 'Market Growth', sensitivity: 1.5, inverse: false },
      { targetDomain: 'jobMarkets', targetSector: 'Remote PM Roles', metric: 'Availability', sensitivity: 1.5, inverse: false },
      { targetDomain: 'jobMarkets', targetSector: 'Austin PM Market', metric: 'Local Competition', sensitivity: -0.8, inverse: true },
    ],
    'sv-8': [ // Climate Tech Investment
      { targetDomain: 'investing', targetSector: 'Renewables', metric: 'Sector Growth', sensitivity: 1.2, inverse: false },
      { targetDomain: 'entrepreneurship', targetSector: 'Climate Tech', metric: 'Startup Funding', sensitivity: 1.5, inverse: false },
      { targetDomain: 'jobMarkets', targetSector: 'Innovation/R&D PM', metric: 'CleanTech PM Demand', sensitivity: 1.0, inverse: false },
      { targetDomain: 'investing', targetSector: 'Fossil Fuels', metric: 'Market Share', sensitivity: -0.8, inverse: true },
    ],
  };

  const rules = cascadeRules[variableId] || [];

  for (const rule of rules) {
    const effectivePct = changePct * rule.sensitivity * (rule.inverse ? -1 : 1);
    const baseValue = 50 + Math.random() * 30;
    effects.push({
      targetDomain: rule.targetDomain,
      targetSector: rule.targetSector,
      metric: rule.metric,
      baselineValue: baseValue,
      projectedValue: baseValue * (1 + effectivePct / 100),
      changePercent: effectivePct,
      confidence: Math.max(0.5, 1 - Math.abs(effectivePct) / 100),
    });
  }

  return effects;
}

function groupBy<T>(arr: T[], fn: (item: T) => string): Record<string, T[]> {
  return arr.reduce((acc, item) => {
    const key = fn(item);
    (acc[key] = acc[key] || []).push(item);
    return acc;
  }, {} as Record<string, T[]>);
}

function avgByCategory(signals: Signal[], category: SignalCategory): number {
  const filtered = signals.filter(s => s.category === category);
  if (filtered.length === 0) return 50;
  return filtered.reduce((sum, s) => sum + s.value, 0) / filtered.length;
}
