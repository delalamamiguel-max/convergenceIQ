import { Signal, CorrelationEntry, ConfluenceAlert, ScenarioVariable, ThresholdPreset } from '@/types/dashboard';

// ============================================================
// INVESTING DOMAIN DATA
// ============================================================

export const conflictData: Signal[] = [
  { id: 'conflict-1', sourceId: 'acled', domain: 'investing', category: 'ethical', label: 'Ukraine-Russia Conflict Intensity', value: 78, rawValue: 2340, unit: 'events/month', trend: 'down', trendMagnitude: -8.5, timestamp: '2026-05-01', region: 'Eastern Europe', sector: 'defense' },
  { id: 'conflict-2', sourceId: 'acled', domain: 'investing', category: 'ethical', label: 'Middle East Instability Index', value: 65, rawValue: 1580, unit: 'events/month', trend: 'stable', trendMagnitude: 1.2, timestamp: '2026-05-01', region: 'Middle East', sector: 'energy' },
  { id: 'conflict-3', sourceId: 'acled', domain: 'investing', category: 'ethical', label: 'Sub-Saharan Africa Conflict', value: 72, rawValue: 1890, unit: 'events/month', trend: 'up', trendMagnitude: 12.3, timestamp: '2026-05-01', region: 'Sub-Saharan Africa', sector: 'mining' },
  { id: 'conflict-4', sourceId: 'acled', domain: 'investing', category: 'ethical', label: 'South China Sea Tensions', value: 45, rawValue: 890, unit: 'incidents/quarter', trend: 'up', trendMagnitude: 15.0, timestamp: '2026-05-01', region: 'East Asia', sector: 'shipping' },
  { id: 'conflict-5', sourceId: 'acled', domain: 'investing', category: 'ethical', label: 'Latin America Political Instability', value: 38, rawValue: 720, unit: 'events/month', trend: 'down', trendMagnitude: -5.2, timestamp: '2026-05-01', region: 'Latin America', sector: 'commodities' },
];

export const lobbyingData: Signal[] = [
  { id: 'lobby-1', sourceId: 'opensecrets', domain: 'investing', category: 'regulatory', label: 'Tech Sector Lobbying', value: 88, rawValue: 42.5, unit: 'billion $', trend: 'up', trendMagnitude: 22.0, timestamp: '2026-Q1', sector: 'technology' },
  { id: 'lobby-2', sourceId: 'opensecrets', domain: 'investing', category: 'regulatory', label: 'Pharma/Health Lobbying', value: 92, rawValue: 48.2, unit: 'billion $', trend: 'up', trendMagnitude: 8.5, timestamp: '2026-Q1', sector: 'healthcare' },
  { id: 'lobby-3', sourceId: 'opensecrets', domain: 'investing', category: 'regulatory', label: 'Finance/Insurance Lobbying', value: 85, rawValue: 38.7, unit: 'billion $', trend: 'stable', trendMagnitude: 2.1, timestamp: '2026-Q1', sector: 'finance' },
  { id: 'lobby-4', sourceId: 'opensecrets', domain: 'investing', category: 'regulatory', label: 'Energy/Natural Resources Lobbying', value: 75, rawValue: 28.9, unit: 'billion $', trend: 'down', trendMagnitude: -12.0, timestamp: '2026-Q1', sector: 'energy' },
  { id: 'lobby-5', sourceId: 'opensecrets', domain: 'investing', category: 'regulatory', label: 'Defense Sector Lobbying', value: 70, rawValue: 25.1, unit: 'billion $', trend: 'up', trendMagnitude: 15.3, timestamp: '2026-Q1', sector: 'defense' },
  { id: 'lobby-6', sourceId: 'opensecrets', domain: 'investing', category: 'regulatory', label: 'Real Estate Lobbying', value: 62, rawValue: 18.4, unit: 'billion $', trend: 'down', trendMagnitude: -8.7, timestamp: '2026-Q1', sector: 'real_estate' },
];

export const sectorGrowthData = {
  sectors: [
    { name: 'Information Technology', ytd: 18.5, oneMonth: 4.25, threeMonth: 8.75, peRatio: 32.5, dividendYield: 0.8 },
    { name: 'Communication Services', ytd: 22.8, oneMonth: 5.40, threeMonth: 11.20, peRatio: 28.3, dividendYield: 1.1 },
    { name: 'Health Care', ytd: 8.75, oneMonth: 2.87, threeMonth: 5.30, peRatio: 22.1, dividendYield: 1.5 },
    { name: 'Consumer Discretionary', ytd: 14.2, oneMonth: 3.12, threeMonth: 6.45, peRatio: 26.8, dividendYield: 0.9 },
    { name: 'Financials', ytd: 12.3, oneMonth: 1.65, threeMonth: 4.20, peRatio: 15.2, dividendYield: 2.1 },
    { name: 'Industrials', ytd: 9.45, oneMonth: 1.88, threeMonth: 3.55, peRatio: 21.5, dividendYield: 1.6 },
    { name: 'Materials', ytd: 6.85, oneMonth: 2.05, threeMonth: 3.65, peRatio: 18.7, dividendYield: 1.8 },
    { name: 'Utilities', ytd: 7.2, oneMonth: 1.35, threeMonth: 2.90, peRatio: 20.2, dividendYield: 3.2 },
    { name: 'Consumer Staples', ytd: 4.3, oneMonth: 0.92, threeMonth: 1.80, peRatio: 24.1, dividendYield: 2.5 },
    { name: 'Energy', ytd: -6.5, oneMonth: -2.15, threeMonth: -4.30, peRatio: 11.8, dividendYield: 3.8 },
    { name: 'Real Estate', ytd: -3.1, oneMonth: -1.20, threeMonth: -2.85, peRatio: 35.5, dividendYield: 4.1 },
  ],
};

// ============================================================
// ENTREPRENEURSHIP DOMAIN DATA
// ============================================================

export const corruptionIndex: Signal[] = [
  { id: 'cpi-1', sourceId: 'transparency', domain: 'entrepreneurship', category: 'ethical', label: 'Denmark CPI Score', value: 90, rawValue: 90, unit: 'score', trend: 'stable', trendMagnitude: 0, timestamp: '2025', region: 'Europe' },
  { id: 'cpi-2', sourceId: 'transparency', domain: 'entrepreneurship', category: 'ethical', label: 'Finland CPI Score', value: 87, rawValue: 87, unit: 'score', trend: 'stable', trendMagnitude: -1, timestamp: '2025', region: 'Europe' },
  { id: 'cpi-3', sourceId: 'transparency', domain: 'entrepreneurship', category: 'ethical', label: 'Singapore CPI Score', value: 83, rawValue: 83, unit: 'score', trend: 'up', trendMagnitude: 2, timestamp: '2025', region: 'Asia' },
  { id: 'cpi-4', sourceId: 'transparency', domain: 'entrepreneurship', category: 'ethical', label: 'United States CPI Score', value: 69, rawValue: 69, unit: 'score', trend: 'down', trendMagnitude: -2, timestamp: '2025', region: 'North America' },
  { id: 'cpi-5', sourceId: 'transparency', domain: 'entrepreneurship', category: 'ethical', label: 'UAE CPI Score', value: 68, rawValue: 68, unit: 'score', trend: 'up', trendMagnitude: 3, timestamp: '2025', region: 'Middle East' },
  { id: 'cpi-6', sourceId: 'transparency', domain: 'entrepreneurship', category: 'ethical', label: 'India CPI Score', value: 39, rawValue: 39, unit: 'score', trend: 'stable', trendMagnitude: 1, timestamp: '2025', region: 'Asia' },
  { id: 'cpi-7', sourceId: 'transparency', domain: 'entrepreneurship', category: 'ethical', label: 'Brazil CPI Score', value: 36, rawValue: 36, unit: 'score', trend: 'down', trendMagnitude: -3, timestamp: '2025', region: 'Latin America' },
  { id: 'cpi-8', sourceId: 'transparency', domain: 'entrepreneurship', category: 'ethical', label: 'Nigeria CPI Score', value: 25, rawValue: 25, unit: 'score', trend: 'down', trendMagnitude: -2, timestamp: '2025', region: 'Sub-Saharan Africa' },
];

export const disruptionData: Signal[] = [
  { id: 'disrupt-1', sourceId: 'crunchbase', domain: 'entrepreneurship', category: 'technological', label: 'AI/ML Startup Funding', value: 95, rawValue: 28.5, unit: 'billion $', trend: 'up', trendMagnitude: 45, timestamp: '2026-Q1', sector: 'ai_ml' },
  { id: 'disrupt-2', sourceId: 'crunchbase', domain: 'entrepreneurship', category: 'technological', label: 'Climate Tech Funding', value: 78, rawValue: 18.2, unit: 'billion $', trend: 'up', trendMagnitude: 32, timestamp: '2026-Q1', sector: 'climate_tech' },
  { id: 'disrupt-3', sourceId: 'crunchbase', domain: 'entrepreneurship', category: 'technological', label: 'FinTech Disruption Index', value: 72, rawValue: 14.8, unit: 'billion $', trend: 'stable', trendMagnitude: 5, timestamp: '2026-Q1', sector: 'fintech' },
  { id: 'disrupt-4', sourceId: 'crunchbase', domain: 'entrepreneurship', category: 'technological', label: 'HealthTech Innovation', value: 82, rawValue: 21.3, unit: 'billion $', trend: 'up', trendMagnitude: 28, timestamp: '2026-Q1', sector: 'healthtech' },
  { id: 'disrupt-5', sourceId: 'crunchbase', domain: 'entrepreneurship', category: 'technological', label: 'EdTech Market Growth', value: 55, rawValue: 8.9, unit: 'billion $', trend: 'up', trendMagnitude: 18, timestamp: '2026-Q1', sector: 'edtech' },
  { id: 'disrupt-6', sourceId: 'crunchbase', domain: 'entrepreneurship', category: 'technological', label: 'SpaceTech Ventures', value: 48, rawValue: 6.2, unit: 'billion $', trend: 'up', trendMagnitude: 55, timestamp: '2026-Q1', sector: 'spacetech' },
  { id: 'disrupt-7', sourceId: 'crunchbase', domain: 'entrepreneurship', category: 'technological', label: 'Web3/Blockchain Funding', value: 35, rawValue: 4.1, unit: 'billion $', trend: 'down', trendMagnitude: -25, timestamp: '2026-Q1', sector: 'web3' },
];

export const culturalTrends: Signal[] = [
  { id: 'culture-1', sourceId: 'pew', domain: 'entrepreneurship', category: 'cultural', label: 'Remote Work Preference', value: 72, rawValue: 72, unit: '% workforce', trend: 'stable', trendMagnitude: 2, timestamp: '2026-Q1' },
  { id: 'culture-2', sourceId: 'pew', domain: 'entrepreneurship', category: 'cultural', label: 'Sustainability Priority (Gen Z)', value: 85, rawValue: 85, unit: '% respondents', trend: 'up', trendMagnitude: 8, timestamp: '2026-Q1' },
  { id: 'culture-3', sourceId: 'pew', domain: 'entrepreneurship', category: 'cultural', label: 'AI Trust Level', value: 42, rawValue: 42, unit: '% positive', trend: 'up', trendMagnitude: 12, timestamp: '2026-Q1' },
  { id: 'culture-4', sourceId: 'pew', domain: 'entrepreneurship', category: 'cultural', label: 'Digital Privacy Concern', value: 78, rawValue: 78, unit: '% concerned', trend: 'up', trendMagnitude: 5, timestamp: '2026-Q1' },
  { id: 'culture-5', sourceId: 'pew', domain: 'entrepreneurship', category: 'cultural', label: 'Creator Economy Participation', value: 38, rawValue: 38, unit: '% adults', trend: 'up', trendMagnitude: 22, timestamp: '2026-Q1' },
  { id: 'culture-6', sourceId: 'pew', domain: 'entrepreneurship', category: 'cultural', label: 'Mental Health Awareness', value: 88, rawValue: 88, unit: '% priority', trend: 'up', trendMagnitude: 10, timestamp: '2026-Q1' },
];

export const techAdoptionForecasts: Signal[] = [
  { id: 'tech-1', sourceId: 'gartner-alt', domain: 'entrepreneurship', category: 'technological', label: 'Generative AI Enterprise Adoption', value: 78, rawValue: 78, unit: '% enterprises', trend: 'up', trendMagnitude: 35, timestamp: '2026', sector: 'ai_ml' },
  { id: 'tech-2', sourceId: 'gartner-alt', domain: 'entrepreneurship', category: 'technological', label: 'Edge Computing Maturity', value: 62, rawValue: 62, unit: '% deployment', trend: 'up', trendMagnitude: 20, timestamp: '2026', sector: 'infrastructure' },
  { id: 'tech-3', sourceId: 'gartner-alt', domain: 'entrepreneurship', category: 'technological', label: 'Quantum Computing Readiness', value: 15, rawValue: 15, unit: '% enterprises', trend: 'up', trendMagnitude: 50, timestamp: '2026', sector: 'quantum' },
  { id: 'tech-4', sourceId: 'gartner-alt', domain: 'entrepreneurship', category: 'technological', label: 'Zero Trust Security Adoption', value: 72, rawValue: 72, unit: '% organizations', trend: 'up', trendMagnitude: 18, timestamp: '2026', sector: 'security' },
  { id: 'tech-5', sourceId: 'gartner-alt', domain: 'entrepreneurship', category: 'technological', label: 'Autonomous Systems Deployment', value: 28, rawValue: 28, unit: '% applicable industries', trend: 'up', trendMagnitude: 40, timestamp: '2026', sector: 'autonomy' },
  { id: 'tech-6', sourceId: 'gartner-alt', domain: 'entrepreneurship', category: 'technological', label: 'Digital Twin Adoption', value: 45, rawValue: 45, unit: '% manufacturers', trend: 'up', trendMagnitude: 25, timestamp: '2026', sector: 'manufacturing' },
];

// ============================================================
// JOB MARKETS DOMAIN DATA
// ============================================================

export const jobProjections: Signal[] = [
  { id: 'job-1', sourceId: 'bls', domain: 'jobMarkets', category: 'technological', label: 'Software Developers', value: 92, rawValue: 25, unit: '% growth 2024-2034', trend: 'up', trendMagnitude: 25, timestamp: '2026', sector: 'technology' },
  { id: 'job-2', sourceId: 'bls', domain: 'jobMarkets', category: 'technological', label: 'Data Scientists', value: 88, rawValue: 36, unit: '% growth 2024-2034', trend: 'up', trendMagnitude: 36, timestamp: '2026', sector: 'technology' },
  { id: 'job-3', sourceId: 'bls', domain: 'jobMarkets', category: 'cultural', label: 'Nurse Practitioners', value: 90, rawValue: 40, unit: '% growth 2024-2034', trend: 'up', trendMagnitude: 40, timestamp: '2026', sector: 'healthcare' },
  { id: 'job-4', sourceId: 'bls', domain: 'jobMarkets', category: 'technological', label: 'AI/ML Engineers', value: 95, rawValue: 50, unit: '% growth 2024-2034', trend: 'up', trendMagnitude: 50, timestamp: '2026', sector: 'technology' },
  { id: 'job-5', sourceId: 'bls', domain: 'jobMarkets', category: 'regulatory', label: 'Compliance Officers', value: 65, rawValue: 8, unit: '% growth 2024-2034', trend: 'up', trendMagnitude: 8, timestamp: '2026', sector: 'finance' },
  { id: 'job-6', sourceId: 'bls', domain: 'jobMarkets', category: 'ethical', label: 'Solar Panel Installers', value: 82, rawValue: 22, unit: '% growth 2024-2034', trend: 'up', trendMagnitude: 22, timestamp: '2026', sector: 'energy' },
  { id: 'job-7', sourceId: 'bls', domain: 'jobMarkets', category: 'technological', label: 'Cybersecurity Analysts', value: 87, rawValue: 33, unit: '% growth 2024-2034', trend: 'up', trendMagnitude: 33, timestamp: '2026', sector: 'technology' },
  { id: 'job-8', sourceId: 'bls', domain: 'jobMarkets', category: 'cultural', label: 'Mental Health Counselors', value: 78, rawValue: 18, unit: '% growth 2024-2034', trend: 'up', trendMagnitude: 18, timestamp: '2026', sector: 'healthcare' },
  { id: 'job-9', sourceId: 'bls', domain: 'jobMarkets', category: 'technological', label: 'Robotics Engineers', value: 80, rawValue: 20, unit: '% growth 2024-2034', trend: 'up', trendMagnitude: 20, timestamp: '2026', sector: 'manufacturing' },
  { id: 'job-10', sourceId: 'bls', domain: 'jobMarkets', category: 'regulatory', label: 'Financial Examiners', value: 60, rawValue: 11, unit: '% growth 2024-2034', trend: 'up', trendMagnitude: 11, timestamp: '2026', sector: 'finance' },
];

export const aiDisruptionData: Signal[] = [
  { id: 'aid-1', sourceId: 'mit', domain: 'jobMarkets', category: 'technological', label: 'Administrative Assistants - AI Risk', value: 85, rawValue: 85, unit: '% automation risk', trend: 'up', trendMagnitude: 15, timestamp: '2026', sector: 'administration' },
  { id: 'aid-2', sourceId: 'mit', domain: 'jobMarkets', category: 'technological', label: 'Truck Drivers - AI Risk', value: 62, rawValue: 62, unit: '% automation risk', trend: 'up', trendMagnitude: 8, timestamp: '2026', sector: 'transportation' },
  { id: 'aid-3', sourceId: 'mit', domain: 'jobMarkets', category: 'technological', label: 'Radiologists - AI Risk', value: 55, rawValue: 55, unit: '% automation risk', trend: 'up', trendMagnitude: 20, timestamp: '2026', sector: 'healthcare' },
  { id: 'aid-4', sourceId: 'mit', domain: 'jobMarkets', category: 'technological', label: 'Accountants - AI Risk', value: 72, rawValue: 72, unit: '% automation risk', trend: 'up', trendMagnitude: 12, timestamp: '2026', sector: 'finance' },
  { id: 'aid-5', sourceId: 'mit', domain: 'jobMarkets', category: 'technological', label: 'Teachers - AI Risk', value: 18, rawValue: 18, unit: '% automation risk', trend: 'stable', trendMagnitude: 2, timestamp: '2026', sector: 'education' },
  { id: 'aid-6', sourceId: 'mit', domain: 'jobMarkets', category: 'technological', label: 'Software Engineers - AI Risk', value: 35, rawValue: 35, unit: '% automation risk', trend: 'up', trendMagnitude: 25, timestamp: '2026', sector: 'technology' },
  { id: 'aid-7', sourceId: 'mit', domain: 'jobMarkets', category: 'technological', label: 'Customer Service Reps - AI Risk', value: 78, rawValue: 78, unit: '% automation risk', trend: 'up', trendMagnitude: 18, timestamp: '2026', sector: 'services' },
  { id: 'aid-8', sourceId: 'mit', domain: 'jobMarkets', category: 'technological', label: 'Lawyers - AI Risk', value: 42, rawValue: 42, unit: '% automation risk', trend: 'up', trendMagnitude: 30, timestamp: '2026', sector: 'legal' },
];

// ============================================================
// CROSS-DOMAIN DATA
// ============================================================

export const correlationMatrix: CorrelationEntry[] = [
  { source: 'Fed Funds Rate', target: 'Tech Startup Funding', correlation: -0.72, lag: 3, significance: 0.95 },
  { source: 'Fed Funds Rate', target: 'Real Estate Jobs', correlation: -0.68, lag: 6, significance: 0.92 },
  { source: 'AI Adoption Rate', target: 'AI/ML Job Growth', correlation: 0.89, lag: 1, significance: 0.98 },
  { source: 'AI Adoption Rate', target: 'Admin Job Displacement', correlation: 0.76, lag: 2, significance: 0.94 },
  { source: 'Conflict Intensity', target: 'Defense Sector Growth', correlation: 0.65, lag: 1, significance: 0.88 },
  { source: 'Conflict Intensity', target: 'Energy Prices', correlation: 0.58, lag: 0, significance: 0.85 },
  { source: 'Lobbying Spend (Tech)', target: 'Regulatory Leniency', correlation: 0.55, lag: 6, significance: 0.82 },
  { source: 'Corruption Index', target: 'FDI Inflows', correlation: 0.71, lag: 0, significance: 0.93 },
  { source: 'Consumer Sentiment', target: 'Retail Sector Growth', correlation: 0.68, lag: 1, significance: 0.90 },
  { source: 'Remote Work %', target: 'Commercial Real Estate', correlation: -0.62, lag: 3, significance: 0.87 },
  { source: 'Sustainability Priority', target: 'Climate Tech Funding', correlation: 0.78, lag: 2, significance: 0.96 },
  { source: 'SEC Regulatory Volume', target: 'Compliance Job Growth', correlation: 0.82, lag: 2, significance: 0.97 },
  { source: 'Cybersecurity Threats', target: 'Cybersecurity Job Growth', correlation: 0.85, lag: 1, significance: 0.96 },
  { source: 'VIX (Volatility)', target: 'VC Funding', correlation: -0.55, lag: 1, significance: 0.80 },
  { source: 'Gen Z Sustainability', target: 'ESG Fund Inflows', correlation: 0.72, lag: 0, significance: 0.91 },
];

export const confluenceAlerts: ConfluenceAlert[] = [
  {
    id: 'ca-1',
    domains: ['investing', 'entrepreneurship', 'jobMarkets'],
    sector: 'AI/Machine Learning',
    region: 'Global',
    signalCount: 7,
    signals: [],
    severity: 'high',
    description: 'Strong convergence: AI enterprise adoption (78%), record AI startup funding ($28.5B), and 50% projected job growth in AI/ML engineering all signal massive opportunity with regulatory tailwind from SEC AI transparency rules.',
    timestamp: '2026-05-20',
  },
  {
    id: 'ca-2',
    domains: ['investing', 'entrepreneurship'],
    sector: 'Climate Tech',
    region: 'Global',
    signalCount: 5,
    signals: [],
    severity: 'high',
    description: 'Climate tech convergence: Record renewable investment ($580B), Gen Z sustainability priority (85%), falling energy sector creating disruption vacuum, and green bond SEC standards creating framework for growth.',
    timestamp: '2026-05-20',
  },
  {
    id: 'ca-3',
    domains: ['investing', 'jobMarkets'],
    sector: 'Cybersecurity',
    region: 'North America',
    signalCount: 4,
    signals: [],
    severity: 'medium',
    description: 'Cybersecurity demand surge: Rising threat landscape driving $300B market projection, 33% job growth forecast, and SEC incident reporting rules creating compliance demand.',
    timestamp: '2026-05-20',
  },
  {
    id: 'ca-4',
    domains: ['entrepreneurship', 'jobMarkets'],
    sector: 'Healthcare/BioTech',
    region: 'Global',
    signalCount: 5,
    signals: [],
    severity: 'medium',
    description: 'HealthTech opportunity: Mental health awareness (88%) drives demand, telehealth adoption persistent, BioTech M&A wave, nurse practitioner demand (40% growth), and AI drug discovery funding surge.',
    timestamp: '2026-05-20',
  },
  {
    id: 'ca-5',
    domains: ['investing', 'entrepreneurship', 'jobMarkets'],
    sector: 'Financial Services',
    region: 'Global',
    signalCount: 4,
    signals: [],
    severity: 'low',
    description: 'Regulatory-driven opportunity: Digital asset framework creating new compliance roles, FinTech steady funding, but high AI automation risk for traditional finance roles.',
    timestamp: '2026-05-20',
  },
];

export const scenarioVariables: ScenarioVariable[] = [
  { id: 'sv-1', label: 'Federal Funds Rate', domain: 'investing', category: 'regulatory', currentValue: 4.5, min: 0, max: 8, unit: '%', step: 0.25 },
  { id: 'sv-2', label: 'AI Adoption Rate', domain: 'entrepreneurship', category: 'technological', currentValue: 78, min: 20, max: 100, unit: '%', step: 5 },
  { id: 'sv-3', label: 'Global Conflict Index', domain: 'investing', category: 'ethical', currentValue: 65, min: 0, max: 100, unit: 'index', step: 5 },
  { id: 'sv-4', label: 'Consumer Sentiment', domain: 'investing', category: 'cultural', currentValue: 68, min: 30, max: 100, unit: 'index', step: 5 },
  { id: 'sv-5', label: 'Corruption Perception', domain: 'entrepreneurship', category: 'ethical', currentValue: 69, min: 0, max: 100, unit: 'score', step: 5 },
  { id: 'sv-6', label: 'Regulatory Intensity', domain: 'investing', category: 'regulatory', currentValue: 60, min: 0, max: 100, unit: 'index', step: 5 },
  { id: 'sv-7', label: 'Remote Work Adoption', domain: 'jobMarkets', category: 'cultural', currentValue: 72, min: 20, max: 100, unit: '%', step: 5 },
  { id: 'sv-8', label: 'Climate Tech Investment', domain: 'entrepreneurship', category: 'ethical', currentValue: 580, min: 100, max: 1000, unit: 'billion $', step: 50 },
];

export const thresholdPresets: ThresholdPreset[] = [
  {
    id: 'ethical-investor',
    name: 'Ethical Investor',
    description: 'Prioritizes low-conflict regions, high transparency, and ESG-aligned sectors',
    icon: '🌿',
    thresholds: { ethical: 75, cultural: 50, regulatory: 60, technological: 40 },
    weights: { ethical: 0.4, cultural: 0.2, regulatory: 0.25, technological: 0.15 },
  },
  {
    id: 'risk-tolerant-founder',
    name: 'Risk-Tolerant Founder',
    description: 'Focuses on disruption potential and emerging tech, accepts higher uncertainty',
    icon: '🚀',
    thresholds: { ethical: 30, cultural: 40, regulatory: 25, technological: 80 },
    weights: { ethical: 0.1, cultural: 0.2, regulatory: 0.1, technological: 0.6 },
  },
  {
    id: 'ai-resilient-career',
    name: 'AI-Resilient Career Seeker',
    description: 'Identifies roles with low automation risk and high growth trajectory',
    icon: '🛡️',
    thresholds: { ethical: 40, cultural: 60, regulatory: 50, technological: 70 },
    weights: { ethical: 0.15, cultural: 0.25, regulatory: 0.2, technological: 0.4 },
  },
  {
    id: 'regulatory-arbitrage',
    name: 'Regulatory Arbitrage',
    description: 'Spots opportunities where regulatory shifts create asymmetric advantages',
    icon: '⚖️',
    thresholds: { ethical: 50, cultural: 30, regulatory: 85, technological: 45 },
    weights: { ethical: 0.15, cultural: 0.1, regulatory: 0.55, technological: 0.2 },
  },
  {
    id: 'balanced',
    name: 'Balanced Explorer',
    description: 'Equal weighting across all dimensions for broad opportunity scanning',
    icon: '⚖️',
    thresholds: { ethical: 50, cultural: 50, regulatory: 50, technological: 50 },
    weights: { ethical: 0.25, cultural: 0.25, regulatory: 0.25, technological: 0.25 },
  },
];
