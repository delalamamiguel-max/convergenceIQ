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
// JOB MARKETS DOMAIN DATA — Product Management Focus
// ============================================================

// Geographic view type for PM job market data
export type PMGeoView = 'us' | 'austin' | 'austin-surrounding' | 'remote';

export interface PMRoleSignal extends Signal {
  geoView: PMGeoView;
  medianSalary?: number;
  openRoles?: number;
  demandTrend?: 'surging' | 'growing' | 'steady' | 'cooling' | 'declining';
  explanation: string;
  whyItMatters: string;
  recommendedAction: string;
}

export interface PMMarketInsight {
  id: string;
  geoView: PMGeoView;
  title: string;
  metric: string;
  metricValue: string;
  explanation: string;
  whyItMatters: string;
  recommendedAction: string;
  severity: 'positive' | 'neutral' | 'caution';
}

export interface PMRecommendation {
  id: string;
  priority: number;
  title: string;
  body: string;
  geoViews: PMGeoView[];
  category: 'role-priority' | 'skill-gap' | 'location-strategy' | 'repositioning';
}

// --- PM Role Signals by Geography ---

export const pmRolesUS: PMRoleSignal[] = [
  { id: 'pm-us-1', sourceId: 'bls-linkedin', domain: 'jobMarkets', category: 'technological', label: 'Product Manager (General)', value: 72, rawValue: 14, unit: '% growth 2024-2034', trend: 'up', trendMagnitude: 14, timestamp: '2026', sector: 'product', region: 'United States', geoView: 'us', medianSalary: 158000, openRoles: 34200, demandTrend: 'growing', explanation: 'Generalist PM roles are growing at roughly twice the national average for all occupations. The BLS projects 14% growth over the next decade, driven by companies embedding product thinking into every team — not just tech.', whyItMatters: 'This is the broadest PM category and your most accessible entry point. Growth above 10% signals sustained hiring, meaning more openings and more lateral-move options once you are in.', recommendedAction: 'If you are entering PM or pivoting, target generalist PM roles at mid-market companies (500–5,000 employees) where the title is less gatekept and cross-functional scope is wide.' },
  { id: 'pm-us-2', sourceId: 'bls-linkedin', domain: 'jobMarkets', category: 'technological', label: 'AI Product Manager', value: 94, rawValue: 42, unit: '% growth 2024-2034', trend: 'up', trendMagnitude: 42, timestamp: '2026', sector: 'product', region: 'United States', geoView: 'us', medianSalary: 192000, openRoles: 8900, demandTrend: 'surging', explanation: 'AI PM is the fastest-growing PM subspecialty in the country. At 42% projected growth, it outpaces nearly every other knowledge-work role. Employers are looking for PMs who can translate model capabilities into user-facing products.', whyItMatters: 'This is where salary premiums are highest and competition for talent is fiercest. Companies will pay 20-30% above base PM comp because they cannot find enough people who speak both "product" and "ML."', recommendedAction: 'Build a working knowledge of LLM capabilities, prompt engineering, and evaluation metrics. You do not need to code models — you need to scope what they can and cannot do, and ship products around that.' },
  { id: 'pm-us-3', sourceId: 'bls-linkedin', domain: 'jobMarkets', category: 'technological', label: 'Technical Product Manager', value: 82, rawValue: 22, unit: '% growth 2024-2034', trend: 'up', trendMagnitude: 22, timestamp: '2026', sector: 'product', region: 'United States', geoView: 'us', medianSalary: 175000, openRoles: 15600, demandTrend: 'growing', explanation: 'Technical PMs — those managing platform, infrastructure, or developer-facing products — are growing at 22%. Companies building APIs, SDKs, and internal platforms need PMs who can write specs that engineers respect.', whyItMatters: 'Technical PM roles are less susceptible to AI displacement because the work requires deep system understanding, trade-off reasoning, and stakeholder negotiation that AI cannot automate.', recommendedAction: 'If you have engineering or data background, lean into Technical PM roles. Highlight system design understanding, API product experience, or developer-experience projects in your portfolio.' },
  { id: 'pm-us-4', sourceId: 'bls-linkedin', domain: 'jobMarkets', category: 'cultural', label: 'Growth Product Manager', value: 68, rawValue: 18, unit: '% growth 2024-2034', trend: 'up', trendMagnitude: 18, timestamp: '2026', sector: 'product', region: 'United States', geoView: 'us', medianSalary: 165000, openRoles: 7800, demandTrend: 'growing', explanation: 'Growth PM is expanding at 18% as companies shift from "build features" to "move metrics." These roles sit at the intersection of product, data, and marketing.', whyItMatters: 'Growth PMs are valued for their direct impact on revenue and retention. This is one of the clearest paths to demonstrating measurable business impact, which matters for career progression.', recommendedAction: 'Develop fluency in experimentation frameworks (A/B testing, cohort analysis) and activation/retention funnels. Prepare case studies showing how you moved a specific metric.' },
  { id: 'pm-us-5', sourceId: 'bls-linkedin', domain: 'jobMarkets', category: 'regulatory', label: 'Product Strategy / Product Ops', value: 60, rawValue: 12, unit: '% growth 2024-2034', trend: 'up', trendMagnitude: 12, timestamp: '2026', sector: 'product', region: 'United States', geoView: 'us', medianSalary: 155000, openRoles: 5200, demandTrend: 'steady', explanation: 'Product Strategy and Product Ops roles are growing at 12%, roughly in line with the broader PM category. These roles emerge at scale — companies with 10+ PMs need someone to align roadmaps and standardize processes.', whyItMatters: 'These roles suit experienced PMs who prefer influence over direct execution. They are harder to find at smaller companies but offer high visibility and leadership-track positioning at larger orgs.', recommendedAction: 'Target Series C+ startups or enterprises with large product orgs. Emphasize cross-team alignment, roadmap governance, and portfolio prioritization experience.' },
  { id: 'pm-us-6', sourceId: 'bls-linkedin', domain: 'jobMarkets', category: 'technological', label: 'Program / Product Delivery Manager', value: 58, rawValue: 10, unit: '% growth 2024-2034', trend: 'stable', trendMagnitude: 10, timestamp: '2026', sector: 'product', region: 'United States', geoView: 'us', medianSalary: 142000, openRoles: 12400, demandTrend: 'steady', explanation: 'Delivery-focused PM and program management roles are growing at 10%. These roles emphasize execution rigor — shipping on time, managing dependencies, and clearing blockers.', whyItMatters: 'Demand is stable but not accelerating. These roles face moderate AI displacement risk as project-tracking and status-reporting tasks get automated. The value shifts to complex cross-team coordination.', recommendedAction: 'If you are in delivery/program management, start adding strategic PM skills (discovery, prioritization, outcome framing) to avoid being boxed into a shrinking tactical niche.' },
  { id: 'pm-us-7', sourceId: 'bls-linkedin', domain: 'jobMarkets', category: 'ethical', label: 'Innovation / R&D Product Lead', value: 55, rawValue: 8, unit: '% growth 2024-2034', trend: 'stable', trendMagnitude: 8, timestamp: '2026', sector: 'product', region: 'United States', geoView: 'us', medianSalary: 170000, openRoles: 3100, demandTrend: 'steady', explanation: 'Innovation and R&D product roles are growing at 8%, slower than core PM. These roles exist primarily at large enterprises and research-heavy companies (pharma, defense, hardware).', whyItMatters: 'Low volume but high compensation. These roles reward deep domain expertise and tolerance for ambiguity. They are not a volume play — you are targeting a small set of specific companies.', recommendedAction: 'Pursue these roles only if you have domain expertise in a specific vertical (health, energy, defense). For generalists, the better ROI is AI PM or Growth PM.' },
];

export const pmRolesAustin: PMRoleSignal[] = [
  { id: 'pm-atx-1', sourceId: 'linkedin-indeed', domain: 'jobMarkets', category: 'technological', label: 'Product Manager (Austin Metro)', value: 78, rawValue: 18, unit: '% growth 2024-2034', trend: 'up', trendMagnitude: 18, timestamp: '2026', sector: 'product', region: 'Austin, TX', geoView: 'austin', medianSalary: 152000, openRoles: 2800, demandTrend: 'growing', explanation: 'Austin PM roles are growing 4 points faster than the national average. The city now hosts major product orgs from Apple, Google, Meta, Oracle, Tesla, and a deep bench of Series B-D startups.', whyItMatters: 'Austin has crossed the threshold from "emerging tech hub" to established talent market. More PM roles means more options, but also more competition from Bay Area transplants.', recommendedAction: 'Network into Austin-specific PM communities (ProductCamp Austin, Austin Product Meetup). Local network matters more here than in remote-first markets.' },
  { id: 'pm-atx-2', sourceId: 'linkedin-indeed', domain: 'jobMarkets', category: 'technological', label: 'AI Product Manager (Austin)', value: 90, rawValue: 48, unit: '% growth 2024-2034', trend: 'up', trendMagnitude: 48, timestamp: '2026', sector: 'product', region: 'Austin, TX', geoView: 'austin', medianSalary: 185000, openRoles: 620, demandTrend: 'surging', explanation: 'AI PM demand in Austin is growing even faster than the national rate, driven by AI labs and enterprise AI teams at companies like Oracle, Dell, and a wave of AI-native startups.', whyItMatters: 'Austin is becoming a secondary hub for AI product work after SF/NYC. Getting in now positions you before the market fully matures and competition intensifies.', recommendedAction: 'Attend Austin AI meetups, target companies like WP Engine, Disco, Athena Intelligence, and enterprise AI teams at Dell/Oracle. The AI PM talent pool here is still small — being visible matters.' },
  { id: 'pm-atx-3', sourceId: 'linkedin-indeed', domain: 'jobMarkets', category: 'technological', label: 'Technical PM (Austin)', value: 80, rawValue: 24, unit: '% growth 2024-2034', trend: 'up', trendMagnitude: 24, timestamp: '2026', sector: 'product', region: 'Austin, TX', geoView: 'austin', medianSalary: 168000, openRoles: 1100, demandTrend: 'growing', explanation: 'Austin\'s strong platform and infrastructure engineering scene (Apple silicon, Tesla firmware, Indeed platform) drives above-average Technical PM demand.', whyItMatters: 'Technical PM roles in Austin pay within 5-10% of SF rates but with 25-35% lower cost of living. This is one of the best compensation-to-cost-of-living ratios in the country for this role.', recommendedAction: 'Target platform teams at Apple Austin, Indeed, or Tesla. Highlight any experience with developer tools, API design, or infrastructure products.' },
  { id: 'pm-atx-4', sourceId: 'linkedin-indeed', domain: 'jobMarkets', category: 'cultural', label: 'Growth PM (Austin)', value: 65, rawValue: 15, unit: '% growth 2024-2034', trend: 'up', trendMagnitude: 15, timestamp: '2026', sector: 'product', region: 'Austin, TX', geoView: 'austin', medianSalary: 155000, openRoles: 480, demandTrend: 'growing', explanation: 'Growth PM roles in Austin are concentrated at consumer-facing companies and marketplaces. The volume is smaller than generalist PM, but growing steadily.', whyItMatters: 'Fewer roles means pickier hiring. Companies want demonstrated experimentation experience and clear metric-impact stories.', recommendedAction: 'Build a portfolio of growth experiments with documented results. Target companies like Indeed, Bumble, and high-growth Austin SaaS companies with PLG motions.' },
  { id: 'pm-atx-5', sourceId: 'linkedin-indeed', domain: 'jobMarkets', category: 'regulatory', label: 'Product Ops / Strategy (Austin)', value: 52, rawValue: 10, unit: '% growth 2024-2034', trend: 'stable', trendMagnitude: 10, timestamp: '2026', sector: 'product', region: 'Austin, TX', geoView: 'austin', medianSalary: 148000, openRoles: 320, demandTrend: 'steady', explanation: 'Product Ops and Strategy roles in Austin are limited to larger product orgs. Most Austin companies are not yet at the scale where these roles are common.', whyItMatters: 'Low volume makes this a difficult primary target in Austin. If this is your specialty, you may need to combine it with remote opportunities.', recommendedAction: 'Broaden your search to include remote Product Ops roles while keeping Austin-based generalist PM as a fallback.' },
];

export const pmRolesAustinSurrounding: PMRoleSignal[] = [
  { id: 'pm-atxs-1', sourceId: 'linkedin-indeed', domain: 'jobMarkets', category: 'technological', label: 'Product Manager (Round Rock / Cedar Park)', value: 62, rawValue: 12, unit: '% growth 2024-2034', trend: 'up', trendMagnitude: 12, timestamp: '2026', sector: 'product', region: 'Round Rock / Cedar Park', geoView: 'austin-surrounding', medianSalary: 145000, openRoles: 380, demandTrend: 'growing', explanation: 'Round Rock and Cedar Park PM roles are anchored by Dell Technologies, Emerson Automation, and a growing cluster of mid-market SaaS companies relocating from downtown Austin for lower lease costs.', whyItMatters: 'These roles typically offer similar comp to Austin proper with shorter commutes and lower competition. Dell alone runs multiple product orgs out of Round Rock.', recommendedAction: 'If you are open to enterprise/B2B product work, Dell and Emerson are strong targets. The PM culture skews enterprise but the work is substantive.' },
  { id: 'pm-atxs-2', sourceId: 'linkedin-indeed', domain: 'jobMarkets', category: 'technological', label: 'Product Manager (Georgetown / Leander)', value: 40, rawValue: 6, unit: '% growth 2024-2034', trend: 'up', trendMagnitude: 6, timestamp: '2026', sector: 'product', region: 'Georgetown / Leander', geoView: 'austin-surrounding', medianSalary: 138000, openRoles: 85, demandTrend: 'steady', explanation: 'Georgetown and Leander have very few dedicated PM roles. Most product work in these areas is at satellite offices or small companies where PM overlaps with founder or project-management functions.', whyItMatters: 'Do not plan your job search around these locations specifically. The role volume is too low to be a reliable pipeline.', recommendedAction: 'Treat Georgetown/Leander roles as bonuses, not targets. Focus your search on Austin proper, Round Rock, or remote — and live wherever you prefer.' },
  { id: 'pm-atxs-3', sourceId: 'linkedin-indeed', domain: 'jobMarkets', category: 'technological', label: 'Product Manager (San Marcos / Pflugerville)', value: 38, rawValue: 5, unit: '% growth 2024-2034', trend: 'stable', trendMagnitude: 5, timestamp: '2026', sector: 'product', region: 'San Marcos / Pflugerville', geoView: 'austin-surrounding', medianSalary: 135000, openRoles: 65, demandTrend: 'steady', explanation: 'San Marcos is primarily a university town (Texas State) with very limited tech employer density. Pflugerville is residential with almost no primary PM employers — most residents commute to Austin or Round Rock.', whyItMatters: 'Neither location has the employer density to support a PM job search. The numbers here confirm that living in these areas is a lifestyle choice, not a job-market choice.', recommendedAction: 'If you live in San Marcos or Pflugerville, search Austin and Round Rock roles or go remote. Your address does not limit your options — your search radius does.' },
  { id: 'pm-atxs-4', sourceId: 'linkedin-indeed', domain: 'jobMarkets', category: 'technological', label: 'AI/Technical PM (Surrounding Areas)', value: 45, rawValue: 8, unit: '% growth 2024-2034', trend: 'up', trendMagnitude: 8, timestamp: '2026', sector: 'product', region: 'Austin Surrounding', geoView: 'austin-surrounding', medianSalary: 148000, openRoles: 120, demandTrend: 'steady', explanation: 'AI and Technical PM roles outside Austin city limits are almost entirely at Dell (Round Rock) and a handful of defense/semiconductor companies. The specialization premium exists but the volume is very thin.', whyItMatters: 'If you want AI PM work and live in the surrounding areas, you will most likely need to commute to Austin or work remotely. The suburban employer base has not caught up to the AI PM wave.', recommendedAction: 'Combine an Austin-city AI PM search with remote applications. Do not restrict yourself to your immediate zip code for specialized roles.' },
];

export const pmRolesRemote: PMRoleSignal[] = [
  { id: 'pm-rem-1', sourceId: 'linkedin-builtin', domain: 'jobMarkets', category: 'cultural', label: 'Remote Product Manager (US)', value: 70, rawValue: 15, unit: '% growth 2024-2034', trend: 'up', trendMagnitude: 15, timestamp: '2026', sector: 'product', region: 'Remote (US)', geoView: 'remote', medianSalary: 155000, openRoles: 11200, demandTrend: 'growing', explanation: 'Roughly 33% of all PM job postings in the US now list "remote" as an option, up from 22% in 2023. Remote PM is growing at 15%, on pace with the overall PM market.', whyItMatters: 'Remote PM is a real, sustained category — not a pandemic anomaly. However, competition per role is 3-5x higher than local postings because you are competing nationally.', recommendedAction: 'Apply to remote roles but do not make them your only channel. Combine with Austin-local search for a balanced pipeline. Tailor each remote application — generic submissions get filtered out at much higher rates.' },
  { id: 'pm-rem-2', sourceId: 'linkedin-builtin', domain: 'jobMarkets', category: 'technological', label: 'Remote AI Product Manager', value: 88, rawValue: 38, unit: '% growth 2024-2034', trend: 'up', trendMagnitude: 38, timestamp: '2026', sector: 'product', region: 'Remote (US)', geoView: 'remote', medianSalary: 188000, openRoles: 3200, demandTrend: 'surging', explanation: 'Remote AI PM roles are surging because AI-native startups are overwhelmingly remote-first. Many AI companies have no physical office — the entire product org works distributed.', whyItMatters: 'This is the highest-demand, highest-comp intersection in the PM market right now. Remote AI PM is where the talent shortage is most acute.', recommendedAction: 'This should be your highest-priority remote target. Build visible AI product expertise (blog posts, case studies, open-source contributions) because remote hiring relies heavily on portfolio signals.' },
  { id: 'pm-rem-3', sourceId: 'linkedin-builtin', domain: 'jobMarkets', category: 'technological', label: 'Remote Technical PM', value: 75, rawValue: 20, unit: '% growth 2024-2034', trend: 'up', trendMagnitude: 20, timestamp: '2026', sector: 'product', region: 'Remote (US)', geoView: 'remote', medianSalary: 170000, openRoles: 5800, demandTrend: 'growing', explanation: 'Remote Technical PM roles are common at developer-tools companies, cloud infrastructure providers, and API-first businesses — many of which were remote before 2020.', whyItMatters: 'These roles are more stable than hype-driven categories because the companies hiring for them have mature remote practices and real revenue.', recommendedAction: 'Target companies like Vercel, Supabase, PlanetScale, Datadog, or Cloudflare. Emphasize platform thinking, API design, and developer experience in applications.' },
  { id: 'pm-rem-4', sourceId: 'linkedin-builtin', domain: 'jobMarkets', category: 'cultural', label: 'Remote Growth PM', value: 62, rawValue: 14, unit: '% growth 2024-2034', trend: 'up', trendMagnitude: 14, timestamp: '2026', sector: 'product', region: 'Remote (US)', geoView: 'remote', medianSalary: 160000, openRoles: 2900, demandTrend: 'growing', explanation: 'Remote Growth PM roles are common at PLG (product-led growth) companies where the product is the acquisition and retention engine. These companies care about experiment velocity, not office presence.', whyItMatters: 'Growth PM roles reward output over presence, making them a natural fit for remote work. If you can show experiment-driven results, location becomes irrelevant.', recommendedAction: 'Document 3-5 experiments you have run with clear before/after metrics. PLG companies want to see that you think in hypotheses and measure impact — this matters more than where you sit.' },
  { id: 'pm-rem-5', sourceId: 'linkedin-builtin', domain: 'jobMarkets', category: 'regulatory', label: 'Remote Product Ops / Strategy', value: 55, rawValue: 11, unit: '% growth 2024-2034', trend: 'stable', trendMagnitude: 11, timestamp: '2026', sector: 'product', region: 'Remote (US)', geoView: 'remote', medianSalary: 150000, openRoles: 1800, demandTrend: 'steady', explanation: 'Remote Product Ops and Strategy roles exist at scale-stage companies (500+ employees) that already have distributed product teams. These are coordination-heavy roles where remote is viable but not the default.', whyItMatters: 'Companies hiring remote Product Ops are signaling that they trust async coordination. This typically means a mature product org with established processes.', recommendedAction: 'Look for remote Product Ops roles at companies with "distributed" in their culture description. Highlight async communication, documentation, and cross-timezone facilitation skills.' },
];

// Backward-compatible exports used by overview.tsx and scoring engine
export const jobProjections: Signal[] = [...pmRolesUS, ...pmRolesAustin, ...pmRolesAustinSurrounding, ...pmRolesRemote] as Signal[];
export const aiDisruptionData: Signal[] = [];

// --- Market-Level Insights ---

export const pmMarketInsights: PMMarketInsight[] = [
  { id: 'pmi-us-1', geoView: 'us', title: 'AI PM is the #1 growth role in product management', metric: 'Projected Growth', metricValue: '42% (2024-2034)', explanation: 'AI PM roles are growing faster than any other PM subspecialty because every company shipping AI features needs someone who can scope what models can do and turn that into a product roadmap.', whyItMatters: 'This is not a temporary spike. Enterprise AI adoption is at 78% and accelerating. The companies that are not hiring AI PMs today will be hiring them in 18 months.', recommendedAction: 'Invest in AI product skills now, even if you are not targeting AI PM roles immediately. This knowledge will become table stakes for all PM roles within 3-5 years.', severity: 'positive' },
  { id: 'pmi-us-2', geoView: 'us', title: 'PM salaries are compressing outside top-10 metros', metric: 'Median Salary Spread', metricValue: '$142K-$192K', explanation: 'The salary gap between the highest-paying PM subspecialty (AI PM at $192K) and the lowest (Program/Delivery PM at $142K) is $50K. Outside major metros, generalist PM salaries are clustering around $140-155K.', whyItMatters: 'If you are chasing salary growth, the path is through specialization (AI, Technical, Growth), not through seniority in generalist roles. The generalist PM salary ceiling is flattening.', recommendedAction: 'Pick a specialization and build depth. The salary premium for specialization is 15-25% above generalist PM at the same level.', severity: 'caution' },
  { id: 'pmi-us-3', geoView: 'us', title: 'Delivery/Program PM roles face automation pressure', metric: 'AI Displacement Risk', metricValue: 'Moderate (35-45%)', explanation: 'AI tools are already automating status updates, dependency tracking, and project timelines — the core tasks of delivery-focused PM roles. The roles are not disappearing, but the tactical portion is shrinking.', whyItMatters: 'If your day-to-day is mostly coordination, status reporting, and timeline management, the market value of those tasks is declining. The roles that survive will require more strategic judgment.', recommendedAction: 'If you are in delivery/program PM, start taking on discovery, prioritization, or stakeholder-negotiation responsibilities now — before the role shrinks around you.', severity: 'caution' },
  { id: 'pmi-atx-1', geoView: 'austin', title: 'Austin PM market is outpacing the national average', metric: 'Local Growth Rate', metricValue: '18% vs. 14% nationally', explanation: 'Austin PM roles are growing 4 points faster than the US average, driven by tech company expansions (Apple, Google, Oracle) and a dense startup ecosystem.', whyItMatters: 'Austin has crossed from "emerging" to "established" as a PM market. The growth rate means new roles are being created faster than local talent can fill them — good for job seekers.', recommendedAction: 'If you are in Austin, you are in a strong position. Prioritize building local network connections — hiring managers here still rely heavily on referrals.', severity: 'positive' },
  { id: 'pmi-atx-2', geoView: 'austin', title: 'Austin AI PM demand exceeds supply by ~3:1', metric: 'Supply-Demand Ratio', metricValue: '620 roles / ~200 qualified local candidates', explanation: 'Austin has roughly 620 open AI PM roles but the local pool of PMs with genuine AI product experience is estimated at around 200. Companies are competing for a small talent pool.', whyItMatters: 'This supply-demand imbalance means Austin AI PM candidates have strong negotiating leverage. Companies are offering relocation packages and above-market comp to fill these seats.', recommendedAction: 'If you have any AI product experience, make yourself visible in the Austin market immediately. Even adjacent experience (data products, ML-adjacent features) qualifies.', severity: 'positive' },
  { id: 'pmi-atxs-1', geoView: 'austin-surrounding', title: 'Surrounding areas have thin PM employer density', metric: 'Total PM Openings', metricValue: '~650 across all surrounding areas', explanation: 'Round Rock, Cedar Park, Georgetown, Leander, San Marcos, and Pflugerville combined have about 650 PM openings — roughly 23% of Austin city alone. The vast majority are at Dell in Round Rock.', whyItMatters: 'You cannot build a PM career search around suburban Austin locations alone. The numbers are too thin for reliable pipeline flow.', recommendedAction: 'Live wherever you want in the Austin metro. Search for roles in Austin city and Round Rock, and supplement with remote applications. Your home address matters less than your search radius.', severity: 'neutral' },
  { id: 'pmi-atxs-2', geoView: 'austin-surrounding', title: 'Round Rock is the only surrounding area with PM depth', metric: 'Round Rock PM Openings', metricValue: '~380 roles', explanation: 'Round Rock accounts for 58% of all PM roles in the Austin surrounding areas, almost entirely due to Dell Technologies. Cedar Park has a small but growing cluster.', whyItMatters: 'If you specifically want to avoid commuting to Austin, Round Rock is your only suburban option with meaningful PM role volume. Everything else is too sparse.', recommendedAction: 'Target Dell and its ecosystem partners in Round Rock. For all other surrounding areas, plan to commute or go remote.', severity: 'neutral' },
  { id: 'pmi-rem-1', geoView: 'remote', title: '33% of PM postings now offer remote — but competition is 3-5x higher', metric: 'Remote PM Share', metricValue: '33% of all US PM postings', explanation: 'One-third of all PM job postings list remote as an option. This is a real, sustained shift — not a pandemic blip. However, each remote posting receives 3-5 times more applications than a local equivalent.', whyItMatters: 'Remote PM is viable but harder to land. Your application needs to stand out more because you are competing against the entire country, not just your metro.', recommendedAction: 'Treat remote applications as a supplement to your local search, not a replacement. Invest more per application — custom cover letter, portfolio link, and a clear "why this company" hook.', severity: 'neutral' },
  { id: 'pmi-rem-2', geoView: 'remote', title: 'Remote AI PM is the highest-comp remote PM category', metric: 'Median Remote AI PM Salary', metricValue: '$188,000', explanation: 'Remote AI PM roles pay a median of $188K — higher than most in-office generalist PM roles at top-tier companies. AI-native startups are willing to pay top dollar because the talent pool is small and distributed.', whyItMatters: 'If you can land a remote AI PM role, you get SF-level comp without SF cost of living. This is the best financial arbitrage available in the PM market right now.', recommendedAction: 'Build a public portfolio of AI product thinking — write about how you would design AI features, publish case studies, or contribute to AI product communities. Remote AI PM hiring is portfolio-driven.', severity: 'positive' },
];

// --- Actionable Recommendations ---

export const pmRecommendations: PMRecommendation[] = [
  { id: 'rec-1', priority: 1, title: 'Prioritize AI Product Management as your primary target', body: 'AI PM has the highest growth rate (42% nationally, 48% in Austin), the highest median salary ($185-192K), and the most acute talent shortage. Whether you pursue it locally in Austin or remotely, this is where the market is moving fastest and where your effort-to-outcome ratio is best. You do not need an ML degree — you need to demonstrate that you can scope AI capabilities, define evaluation criteria, and ship AI-powered features.', geoViews: ['us', 'austin', 'remote'], category: 'role-priority' },
  { id: 'rec-2', priority: 2, title: 'Build AI product fluency even if you target other PM roles', body: 'Within 3-5 years, AI fluency will be expected in all PM roles, not just AI-specific ones. Start learning how LLMs work at a product level: what they can and cannot do, how to evaluate output quality, how to design human-in-the-loop workflows. This is the single highest-ROI skill investment you can make right now.', geoViews: ['us', 'austin', 'austin-surrounding', 'remote'], category: 'skill-gap' },
  { id: 'rec-3', priority: 3, title: 'Use Austin + Remote as a dual-channel search strategy', body: 'Austin has strong local PM demand (2,800+ roles in the city, growing at 18%) and you have geographic access. Remote opens another 11,200+ roles nationally. Run both channels simultaneously — apply locally with network-driven warm intros and remotely with portfolio-driven cold applications. This gives you the widest funnel without diluting focus.', geoViews: ['austin', 'remote'], category: 'location-strategy' },
  { id: 'rec-4', priority: 4, title: 'Do not restrict your search to Austin surrounding areas', body: 'Round Rock, Cedar Park, Georgetown, Leander, San Marcos, and Pflugerville combined have only ~650 PM openings, with 58% at a single employer (Dell). The numbers are too thin to build a reliable pipeline. Live wherever you prefer in the metro — commute to Austin or Round Rock when needed, and use remote opportunities for everything else.', geoViews: ['austin-surrounding'], category: 'location-strategy' },
  { id: 'rec-5', priority: 5, title: 'If you are in delivery/program PM, start repositioning now', body: 'Delivery and program PM roles are growing at only 10% and face 35-45% AI displacement risk on their core tasks. The market value of status reporting, timeline management, and dependency tracking is declining as AI tools automate these functions. Start taking on discovery, prioritization, or experiment-design responsibilities in your current role. Frame your next role search around strategic PM skills, not execution mechanics.', geoViews: ['us', 'austin', 'remote'], category: 'repositioning' },
  { id: 'rec-6', priority: 6, title: 'Specialize to break through the generalist salary ceiling', body: 'Generalist PM salaries are compressing around $142-158K outside top metros. The path to higher comp is specialization: AI PM ($185-192K), Technical PM ($168-175K), or Growth PM ($155-165K) all pay 15-25% premiums. Pick the specialization closest to your existing experience and build depth. One strong specialization story beats ten generalist applications.', geoViews: ['us', 'austin', 'remote'], category: 'skill-gap' },
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
    sector: 'AI Product Management',
    region: 'United States / Austin',
    signalCount: 7,
    signals: [],
    severity: 'high',
    description: 'Strong convergence: AI enterprise adoption (78%), record AI startup funding ($28.5B), and 42% projected AI PM job growth. Austin AI PM demand exceeds supply 3:1. Median AI PM salary ($192K nationally) leads all PM specialties.',
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
    sector: 'Technical PM / Platform',
    region: 'Austin / Remote',
    signalCount: 4,
    signals: [],
    severity: 'medium',
    description: 'Technical PM demand converges with platform investment: Austin tech PM growing at 24%, remote technical PM at 20%. Developer-tools companies (Vercel, Supabase, Datadog) are remote-first and hiring. Best comp-to-COL ratio in Austin.',
    timestamp: '2026-05-20',
  },
  {
    id: 'ca-4',
    domains: ['entrepreneurship', 'jobMarkets'],
    sector: 'Growth PM / PLG',
    region: 'United States / Remote',
    signalCount: 5,
    signals: [],
    severity: 'medium',
    description: 'Growth PM intersects with PLG startup wave: Product-led growth companies need PMs who drive metrics, not features. Remote-friendly by nature. Growth PM expertise is transferable across industries — hedge against sector-specific downturns.',
    timestamp: '2026-05-20',
  },
  {
    id: 'ca-5',
    domains: ['investing', 'entrepreneurship', 'jobMarkets'],
    sector: 'PM Role Automation',
    region: 'United States',
    signalCount: 4,
    signals: [],
    severity: 'low',
    description: 'Delivery/Program PM roles face 35-45% AI displacement on tactical tasks (status reports, timeline management). Generalist PM salaries compressing. Strategic specialization is the hedge — AI PM, Technical PM, and Growth PM roles are growing 2-4x faster.',
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
