import {
  TickerProfile, TickerAlignment, PortfolioHolding,
  RevisedAllocation, PortfolioSummary, TaxContext, TaxImplication,
} from '@/types/dashboard';
import { sectorGrowthData } from '@/lib/data/curated-datasets';

// Known ticker database — covers common holdings a retail investor might have
const tickerDb: Record<string, TickerProfile> = {
  AAPL: { ticker: 'AAPL', name: 'Apple Inc.', sector: 'Information Technology', assetClass: 'stock', themes: ['ai-integration', 'consumer-tech', 'platform', 'hardware'], description: 'Consumer tech giant with expanding AI integration across devices and services.' },
  MSFT: { ticker: 'MSFT', name: 'Microsoft Corp.', sector: 'Information Technology', assetClass: 'stock', themes: ['ai-leader', 'cloud', 'enterprise', 'platform'], description: 'Enterprise AI and cloud leader through Azure and Copilot ecosystem.' },
  GOOGL: { ticker: 'GOOGL', name: 'Alphabet Inc.', sector: 'Communication Services', assetClass: 'stock', themes: ['ai-leader', 'advertising', 'cloud', 'search'], description: 'AI research leader with Gemini models, dominant in search and digital advertising.' },
  GOOG: { ticker: 'GOOG', name: 'Alphabet Inc. (C)', sector: 'Communication Services', assetClass: 'stock', themes: ['ai-leader', 'advertising', 'cloud', 'search'], description: 'Alphabet Class C shares — same company as GOOGL.' },
  AMZN: { ticker: 'AMZN', name: 'Amazon.com Inc.', sector: 'Consumer Discretionary', assetClass: 'stock', themes: ['cloud', 'ai-integration', 'ecommerce', 'logistics'], description: 'AWS cloud dominance with growing AI services and e-commerce scale.' },
  NVDA: { ticker: 'NVDA', name: 'NVIDIA Corp.', sector: 'Information Technology', assetClass: 'stock', themes: ['ai-leader', 'semiconductors', 'data-center', 'gaming'], description: 'Dominant AI chip supplier — the infrastructure backbone of the AI buildout.' },
  META: { ticker: 'META', name: 'Meta Platforms Inc.', sector: 'Communication Services', assetClass: 'stock', themes: ['ai-integration', 'advertising', 'social', 'metaverse'], description: 'Social media giant investing heavily in AI for content and advertising optimization.' },
  TSLA: { ticker: 'TSLA', name: 'Tesla Inc.', sector: 'Consumer Discretionary', assetClass: 'stock', themes: ['ev', 'autonomy', 'energy', 'ai-integration'], description: 'EV and autonomous driving leader with energy storage and AI robotics ambitions.' },
  TSM: { ticker: 'TSM', name: 'Taiwan Semiconductor', sector: 'Information Technology', assetClass: 'stock', themes: ['semiconductors', 'ai-supply-chain', 'manufacturing'], description: 'World\'s largest chip foundry — essential to AI hardware supply chain.' },
  AMD: { ticker: 'AMD', name: 'Advanced Micro Devices', sector: 'Information Technology', assetClass: 'stock', themes: ['ai-integration', 'semiconductors', 'data-center'], description: 'GPU and CPU competitor to NVIDIA, gaining share in AI data center chips.' },
  AVGO: { ticker: 'AVGO', name: 'Broadcom Inc.', sector: 'Information Technology', assetClass: 'stock', themes: ['semiconductors', 'networking', 'ai-supply-chain'], description: 'Custom AI chip designer and networking semiconductor leader.' },
  CRM: { ticker: 'CRM', name: 'Salesforce Inc.', sector: 'Information Technology', assetClass: 'stock', themes: ['enterprise', 'ai-integration', 'saas', 'crm'], description: 'Enterprise SaaS leader integrating AI agents across CRM workflows.' },
  ORCL: { ticker: 'ORCL', name: 'Oracle Corp.', sector: 'Information Technology', assetClass: 'stock', themes: ['cloud', 'enterprise', 'database', 'ai-infrastructure'], description: 'Cloud infrastructure and enterprise database with growing AI workload demand.' },
  JPM: { ticker: 'JPM', name: 'JPMorgan Chase', sector: 'Financials', assetClass: 'stock', themes: ['banking', 'fintech', 'regulation'], description: 'Largest US bank — benefits from rate environment and financial stability.' },
  V: { ticker: 'V', name: 'Visa Inc.', sector: 'Financials', assetClass: 'stock', themes: ['payments', 'fintech', 'global-commerce'], description: 'Global payments network benefiting from digital commerce expansion.' },
  JNJ: { ticker: 'JNJ', name: 'Johnson & Johnson', sector: 'Health Care', assetClass: 'stock', themes: ['pharma', 'healthcare', 'defensive'], description: 'Diversified healthcare company — pharma and medical devices.' },
  UNH: { ticker: 'UNH', name: 'UnitedHealth Group', sector: 'Health Care', assetClass: 'stock', themes: ['healthcare', 'insurance', 'data-analytics'], description: 'Health insurance giant with data-driven Optum health services division.' },
  LLY: { ticker: 'LLY', name: 'Eli Lilly', sector: 'Health Care', assetClass: 'stock', themes: ['pharma', 'biotech', 'obesity-drugs'], description: 'Pharma leader driven by GLP-1 obesity/diabetes drug pipeline.' },
  PG: { ticker: 'PG', name: 'Procter & Gamble', sector: 'Consumer Staples', assetClass: 'stock', themes: ['consumer-staples', 'defensive', 'dividend'], description: 'Consumer staples defensive holding with steady dividend yield.' },
  KO: { ticker: 'KO', name: 'Coca-Cola Co.', sector: 'Consumer Staples', assetClass: 'stock', themes: ['consumer-staples', 'defensive', 'dividend', 'global'], description: 'Global beverage company — classic defensive income holding.' },
  XOM: { ticker: 'XOM', name: 'Exxon Mobil Corp.', sector: 'Energy', assetClass: 'stock', themes: ['oil-gas', 'energy', 'dividend'], description: 'Integrated oil major — faces headwinds from energy transition and declining sector.' },
  CVX: { ticker: 'CVX', name: 'Chevron Corp.', sector: 'Energy', assetClass: 'stock', themes: ['oil-gas', 'energy', 'dividend'], description: 'Major oil producer with transition risks as renewables gain share.' },
  BA: { ticker: 'BA', name: 'Boeing Co.', sector: 'Industrials', assetClass: 'stock', themes: ['aerospace', 'defense', 'manufacturing'], description: 'Aerospace and defense manufacturer facing operational challenges.' },
  LMT: { ticker: 'LMT', name: 'Lockheed Martin', sector: 'Industrials', assetClass: 'stock', themes: ['defense', 'geopolitical', 'government'], description: 'Defense contractor benefiting from rising global conflict and defense spending.' },
  DIS: { ticker: 'DIS', name: 'Walt Disney Co.', sector: 'Communication Services', assetClass: 'stock', themes: ['entertainment', 'streaming', 'consumer'], description: 'Entertainment conglomerate navigating streaming transition.' },
  NFLX: { ticker: 'NFLX', name: 'Netflix Inc.', sector: 'Communication Services', assetClass: 'stock', themes: ['streaming', 'entertainment', 'ai-integration', 'global'], description: 'Streaming leader using AI for content recommendation and production.' },
  PLTR: { ticker: 'PLTR', name: 'Palantir Technologies', sector: 'Information Technology', assetClass: 'stock', themes: ['ai-leader', 'data-analytics', 'government', 'defense'], description: 'AI and data analytics platform for government and enterprise.' },
  COIN: { ticker: 'COIN', name: 'Coinbase Global', sector: 'Financials', assetClass: 'stock', themes: ['crypto', 'fintech', 'regulation'], description: 'Crypto exchange — high volatility, regulatory-sensitive.' },
  SNOW: { ticker: 'SNOW', name: 'Snowflake Inc.', sector: 'Information Technology', assetClass: 'stock', themes: ['cloud', 'data-analytics', 'ai-integration'], description: 'Cloud data platform enabling AI/ML workloads across enterprises.' },
  NET: { ticker: 'NET', name: 'Cloudflare Inc.', sector: 'Information Technology', assetClass: 'stock', themes: ['cybersecurity', 'cloud', 'edge-computing', 'developer-tools'], description: 'Edge computing and cybersecurity platform for developers and enterprises.' },
  CRWD: { ticker: 'CRWD', name: 'CrowdStrike Holdings', sector: 'Information Technology', assetClass: 'stock', themes: ['cybersecurity', 'ai-integration', 'enterprise'], description: 'AI-powered cybersecurity platform — zero trust security leader.' },
  PANW: { ticker: 'PANW', name: 'Palo Alto Networks', sector: 'Information Technology', assetClass: 'stock', themes: ['cybersecurity', 'ai-integration', 'enterprise'], description: 'Enterprise cybersecurity leader with AI-driven threat detection.' },
  SHOP: { ticker: 'SHOP', name: 'Shopify Inc.', sector: 'Information Technology', assetClass: 'stock', themes: ['ecommerce', 'platform', 'smb', 'ai-integration'], description: 'E-commerce platform empowering small businesses with AI tools.' },
  SQ: { ticker: 'SQ', name: 'Block Inc.', sector: 'Financials', assetClass: 'stock', themes: ['fintech', 'payments', 'crypto', 'smb'], description: 'Fintech company with Square payments and Cash App ecosystem.' },
  SOFI: { ticker: 'SOFI', name: 'SoFi Technologies', sector: 'Financials', assetClass: 'stock', themes: ['fintech', 'banking', 'lending'], description: 'Digital banking and fintech platform targeting younger demographics.' },
  ENPH: { ticker: 'ENPH', name: 'Enphase Energy', sector: 'Energy', assetClass: 'stock', themes: ['solar', 'clean-energy', 'climate-tech'], description: 'Solar microinverter company — climate tech play with volatile demand.' },
  NEE: { ticker: 'NEE', name: 'NextEra Energy', sector: 'Utilities', assetClass: 'stock', themes: ['renewables', 'utilities', 'clean-energy'], description: 'Largest wind/solar generator in US — utility with renewables exposure.' },
  O: { ticker: 'O', name: 'Realty Income Corp.', sector: 'Real Estate', assetClass: 'reit', themes: ['reit', 'income', 'commercial-real-estate'], description: 'Monthly dividend REIT — commercial real estate faces remote work headwinds.' },
  // ETFs
  VTI: { ticker: 'VTI', name: 'Vanguard Total Stock Market', sector: 'Broad Market', assetClass: 'etf', themes: ['diversified', 'us-market', 'passive'], description: 'Total US stock market index — broadest possible US equity exposure.' },
  VOO: { ticker: 'VOO', name: 'Vanguard S&P 500', sector: 'Large Cap', assetClass: 'etf', themes: ['diversified', 'large-cap', 'passive'], description: 'S&P 500 index fund — large-cap US equity exposure.' },
  SPY: { ticker: 'SPY', name: 'SPDR S&P 500 ETF', sector: 'Large Cap', assetClass: 'etf', themes: ['diversified', 'large-cap', 'passive'], description: 'S&P 500 tracker — most traded ETF in the world.' },
  QQQ: { ticker: 'QQQ', name: 'Invesco QQQ Trust', sector: 'Technology', assetClass: 'etf', themes: ['tech-heavy', 'growth', 'ai-exposure'], description: 'Nasdaq-100 index — heavy tech/AI exposure through top holdings.' },
  ARKK: { ticker: 'ARKK', name: 'ARK Innovation ETF', sector: 'Disruptive Innovation', assetClass: 'etf', themes: ['disruption', 'ai-integration', 'high-risk', 'growth'], description: 'Active ETF focused on disruptive innovation — high conviction, high volatility.' },
  ARKG: { ticker: 'ARKG', name: 'ARK Genomic Revolution', sector: 'Health Care', assetClass: 'etf', themes: ['biotech', 'genomics', 'healthcare', 'high-risk'], description: 'Active ETF focused on genomic and biotech innovation.' },
  VGT: { ticker: 'VGT', name: 'Vanguard Info Tech ETF', sector: 'Information Technology', assetClass: 'etf', themes: ['tech-focused', 'ai-exposure', 'growth'], description: 'IT sector ETF — concentrated tech exposure including AI leaders.' },
  SCHD: { ticker: 'SCHD', name: 'Schwab US Dividend Equity', sector: 'Dividend', assetClass: 'etf', themes: ['dividend', 'value', 'income', 'defensive'], description: 'Dividend-focused ETF — quality income stocks, lower growth exposure.' },
  VYM: { ticker: 'VYM', name: 'Vanguard High Dividend Yield', sector: 'Dividend', assetClass: 'etf', themes: ['dividend', 'value', 'income'], description: 'High dividend yield ETF — income-oriented, underweights growth/tech.' },
  VXUS: { ticker: 'VXUS', name: 'Vanguard Total Intl Stock', sector: 'International', assetClass: 'etf', themes: ['international', 'diversified', 'emerging-markets'], description: 'Total international stock index — non-US equity diversification.' },
  VWO: { ticker: 'VWO', name: 'Vanguard Emerging Markets', sector: 'Emerging Markets', assetClass: 'etf', themes: ['emerging-markets', 'international', 'growth'], description: 'Emerging market equities — higher risk, geopolitical exposure.' },
  BND: { ticker: 'BND', name: 'Vanguard Total Bond Market', sector: 'Bonds', assetClass: 'bond-etf', themes: ['fixed-income', 'defensive', 'rate-sensitive'], description: 'Total US bond market — rate-sensitive, defensive allocation.' },
  AGG: { ticker: 'AGG', name: 'iShares Core US Aggregate Bond', sector: 'Bonds', assetClass: 'bond-etf', themes: ['fixed-income', 'defensive', 'rate-sensitive'], description: 'Aggregate bond index — similar to BND, core fixed-income allocation.' },
  TLT: { ticker: 'TLT', name: 'iShares 20+ Year Treasury', sector: 'Long-Term Bonds', assetClass: 'bond-etf', themes: ['fixed-income', 'long-duration', 'rate-sensitive'], description: 'Long-term treasuries — highly rate-sensitive, benefits from rate cuts.' },
  GLD: { ticker: 'GLD', name: 'SPDR Gold Shares', sector: 'Commodities', assetClass: 'commodity', themes: ['gold', 'inflation-hedge', 'geopolitical-hedge'], description: 'Gold ETF — traditional safe-haven and inflation hedge.' },
  IBIT: { ticker: 'IBIT', name: 'iShares Bitcoin Trust', sector: 'Cryptocurrency', assetClass: 'etf', themes: ['crypto', 'speculative', 'digital-assets'], description: 'Spot Bitcoin ETF — highly volatile, speculative digital asset exposure.' },
  XLK: { ticker: 'XLK', name: 'Technology Select SPDR', sector: 'Information Technology', assetClass: 'etf', themes: ['tech-focused', 'ai-exposure', 'large-cap'], description: 'Technology sector ETF — concentrated in mega-cap tech names.' },
  XLF: { ticker: 'XLF', name: 'Financial Select SPDR', sector: 'Financials', assetClass: 'etf', themes: ['financials', 'banking', 'rate-sensitive'], description: 'Financial sector ETF — banking, insurance, and fintech exposure.' },
  XLE: { ticker: 'XLE', name: 'Energy Select SPDR', sector: 'Energy', assetClass: 'etf', themes: ['oil-gas', 'energy', 'dividend'], description: 'Energy sector ETF — concentrated in oil and gas majors.' },
  XLV: { ticker: 'XLV', name: 'Health Care Select SPDR', sector: 'Health Care', assetClass: 'etf', themes: ['healthcare', 'pharma', 'defensive'], description: 'Healthcare sector ETF — pharma, biotech, and health services.' },
  ICLN: { ticker: 'ICLN', name: 'iShares Global Clean Energy', sector: 'Clean Energy', assetClass: 'etf', themes: ['clean-energy', 'climate-tech', 'renewables'], description: 'Global clean energy ETF — solar, wind, and renewable energy companies.' },
  SMH: { ticker: 'SMH', name: 'VanEck Semiconductor ETF', sector: 'Semiconductors', assetClass: 'etf', themes: ['semiconductors', 'ai-supply-chain', 'tech-focused'], description: 'Semiconductor ETF — concentrated AI hardware supply chain exposure.' },
  HACK: { ticker: 'HACK', name: 'ETFMG Prime Cyber Security', sector: 'Cybersecurity', assetClass: 'etf', themes: ['cybersecurity', 'ai-integration', 'defense'], description: 'Cybersecurity ETF — pure-play cybersecurity exposure.' },
  BOTZ: { ticker: 'BOTZ', name: 'Global X Robotics & AI', sector: 'AI & Robotics', assetClass: 'etf', themes: ['ai-leader', 'robotics', 'automation'], description: 'AI and robotics ETF — exposure to automation and AI companies.' },
};

// Theme alignment weights based on report insights
const themeScores: Record<string, number> = {
  'ai-leader': 9.5,
  'ai-integration': 8.0,
  'ai-infrastructure': 8.5,
  'ai-supply-chain': 8.0,
  'semiconductors': 7.5,
  'cloud': 7.0,
  'cybersecurity': 7.5,
  'enterprise': 6.5,
  'platform': 7.0,
  'developer-tools': 7.0,
  'data-analytics': 7.0,
  'edge-computing': 6.5,
  'climate-tech': 7.0,
  'clean-energy': 6.5,
  'renewables': 6.0,
  'solar': 6.0,
  'healthcare': 6.0,
  'pharma': 5.5,
  'biotech': 6.5,
  'obesity-drugs': 7.0,
  'fintech': 6.0,
  'payments': 6.0,
  'banking': 5.0,
  'ecommerce': 6.0,
  'streaming': 5.5,
  'advertising': 5.5,
  'consumer-tech': 6.5,
  'defense': 6.5,
  'geopolitical': 6.0,
  'geopolitical-hedge': 6.0,
  'government': 5.5,
  'diversified': 6.0,
  'passive': 5.5,
  'us-market': 6.0,
  'large-cap': 5.5,
  'tech-heavy': 7.5,
  'tech-focused': 7.0,
  'ai-exposure': 8.0,
  'growth': 6.5,
  'disruption': 6.5,
  'high-risk': 4.0,
  'speculative': 3.0,
  'dividend': 4.5,
  'value': 4.5,
  'income': 4.0,
  'defensive': 4.0,
  'consumer-staples': 3.5,
  'fixed-income': 4.0,
  'rate-sensitive': 4.5,
  'long-duration': 4.0,
  'oil-gas': 2.5,
  'energy': 3.5,
  'ev': 6.0,
  'autonomy': 7.0,
  'robotics': 7.5,
  'automation': 7.0,
  'crypto': 3.5,
  'digital-assets': 3.5,
  'reit': 3.0,
  'commercial-real-estate': 2.5,
  'inflation-hedge': 5.0,
  'gold': 5.0,
  'international': 4.5,
  'emerging-markets': 4.0,
  'social': 5.0,
  'metaverse': 4.0,
  'smb': 5.5,
  'global': 5.5,
  'global-commerce': 6.0,
  'lending': 4.5,
  'regulation': 4.5,
  'manufacturing': 5.0,
  'aerospace': 5.0,
  'entertainment': 5.0,
  'consumer': 5.0,
  'search': 6.0,
  'saas': 6.5,
  'crm': 6.0,
  'database': 5.5,
  'hardware': 6.0,
  'genomics': 5.5,
  'insurance': 5.0,
  'data-center': 7.5,
  'gaming': 5.5,
  'networking': 6.0,
  'logistics': 6.0,
};

function getRecommendation(score: number, themes: string[]): TickerAlignment['recommendation'] {
  const hasHighRisk = themes.includes('high-risk') || themes.includes('speculative');
  if (score >= 8) return hasHighRisk ? 'review' : 'hold';
  if (score >= 7) return 'hold';
  if (score >= 5) return 'review';
  if (score >= 3) return 'research further';
  return 'reduce';
}

function getSectorYtd(sector: string): number | null {
  const match = sectorGrowthData.sectors.find(s =>
    s.name.toLowerCase().includes(sector.toLowerCase().replace('information ', ''))
  );
  return match ? match.ytd : null;
}

function buildExplanation(profile: TickerProfile, score: number): string {
  const ytd = getSectorYtd(profile.sector);
  const ytdNote = ytd !== null ? ` The ${profile.sector} sector is ${ytd >= 0 ? 'up' : 'down'} ${Math.abs(ytd).toFixed(1)}% YTD.` : '';

  if (score >= 8) {
    return `${profile.name} scores highly because it directly participates in the report's strongest themes — AI adoption, technology infrastructure, and high-growth sectors.${ytdNote} ${profile.description}`;
  }
  if (score >= 6) {
    return `${profile.name} has solid alignment with several report themes but is not a direct play on the highest-conviction insights.${ytdNote} ${profile.description}`;
  }
  if (score >= 4) {
    return `${profile.name} has moderate alignment. It touches some relevant themes but is not positioned at the center of the report's strongest signals.${ytdNote} ${profile.description}`;
  }
  return `${profile.name} has limited alignment with the report's current insights. It may serve a portfolio role (income, diversification, hedging) but does not benefit from the report's primary growth themes.${ytdNote} ${profile.description}`;
}

function buildRisks(profile: TickerProfile, score: number): string {
  const risks: string[] = [];

  if (profile.themes.includes('oil-gas')) risks.push('Energy transition headwinds — declining sector in the report\'s data (-6.5% YTD).');
  if (profile.themes.includes('rate-sensitive')) risks.push('Fed funds rate at 4.5% — rate-sensitive holdings face duration risk if rates stay elevated.');
  if (profile.themes.includes('high-risk') || profile.themes.includes('speculative')) risks.push('High volatility and speculative risk — position sizing matters.');
  if (profile.themes.includes('commercial-real-estate')) risks.push('Remote work trend (72% preference) creates structural headwinds for commercial real estate.');
  if (profile.themes.includes('crypto') || profile.themes.includes('digital-assets')) risks.push('Regulatory uncertainty and high volatility in digital assets.');
  if (profile.themes.includes('defensive') || profile.themes.includes('consumer-staples')) risks.push('Defensive holdings lag in growth-driven markets — low YTD performance in Consumer Staples (+4.3%).');
  if (profile.themes.includes('emerging-markets')) risks.push('Geopolitical risk — South China Sea tensions (+15% trend) and emerging market instability affect returns.');

  if (profile.sector === 'Information Technology' && score >= 7) {
    risks.push('Concentration risk if portfolio is already heavy in tech. Sector lobbying ($42.5B) may invite regulatory scrutiny.');
  }
  if (profile.themes.includes('ai-leader') || profile.themes.includes('ai-integration')) {
    risks.push('AI valuation premium may compress if adoption slows or regulation tightens.');
  }

  if (risks.length === 0) {
    risks.push('Standard market risk. Monitor sector-specific developments and macro shifts.');
  }

  return risks.join(' ');
}

export function lookupTicker(ticker: string): TickerProfile | null {
  return tickerDb[ticker.toUpperCase()] || null;
}

export function analyzeAlignment(tickers: string[]): TickerAlignment[] {
  return tickers.map(t => {
    const ticker = t.toUpperCase();
    const profile = tickerDb[ticker];

    if (!profile) {
      return {
        ticker,
        name: `${ticker} (Unknown)`,
        sector: 'Unknown',
        alignmentScore: 5,
        explanation: `${ticker} is not in our analysis database. We cannot score its alignment with the report's insights. Research the holding manually against the current themes: AI adoption, sector growth, geopolitical risk, and regulatory shifts.`,
        risks: 'Unable to assess specific risks without ticker data. Review the holding against the report\'s key themes.',
        recommendation: 'research further' as const,
      };
    }

    const themeValues = profile.themes.map(th => themeScores[th] || 5);
    const rawScore = themeValues.reduce((sum, v) => sum + v, 0) / themeValues.length;
    const score = Math.round(Math.min(10, Math.max(1, rawScore)) * 10) / 10;

    return {
      ticker,
      name: profile.name,
      sector: profile.sector,
      alignmentScore: score,
      explanation: buildExplanation(profile, score),
      risks: buildRisks(profile, score),
      recommendation: getRecommendation(score, profile.themes),
    };
  });
}

export function computePortfolioSummary(alignments: TickerAlignment[], holdings?: PortfolioHolding[]): PortfolioSummary {
  let avgScore: number;

  if (holdings && holdings.length > 0) {
    let totalWeight = 0;
    let weightedScore = 0;
    for (const h of holdings) {
      const a = alignments.find(al => al.ticker === h.ticker.toUpperCase());
      if (a) {
        weightedScore += a.alignmentScore * h.currentAllocation;
        totalWeight += h.currentAllocation;
      }
    }
    avgScore = totalWeight > 0 ? weightedScore / totalWeight : alignments.reduce((s, a) => s + a.alignmentScore, 0) / alignments.length;
  } else {
    avgScore = alignments.reduce((s, a) => s + a.alignmentScore, 0) / alignments.length;
  }

  const overallAlignment: PortfolioSummary['overallAlignment'] =
    avgScore >= 7 ? 'broadly aligned' : avgScore >= 5 ? 'partially aligned' : 'misaligned';

  const strengths: string[] = [];
  const gaps: string[] = [];

  const highAligned = alignments.filter(a => a.alignmentScore >= 7);
  const lowAligned = alignments.filter(a => a.alignmentScore < 5);

  if (highAligned.length > 0) {
    strengths.push(`${highAligned.length} holding${highAligned.length > 1 ? 's' : ''} score 7+ and are well-positioned for the report's strongest themes.`);
  }

  const hasAI = alignments.some(a => {
    const p = tickerDb[a.ticker];
    return p && (p.themes.includes('ai-leader') || p.themes.includes('ai-integration'));
  });
  if (hasAI) strengths.push('Portfolio has exposure to AI themes, the report\'s top conviction signal.');
  if (!hasAI) gaps.push('No direct AI exposure — the report\'s #1 theme (AI adoption at 78%, AI startup funding $28.5B) is not represented.');

  const hasCyber = alignments.some(a => {
    const p = tickerDb[a.ticker];
    return p && p.themes.includes('cybersecurity');
  });
  if (hasCyber) strengths.push('Cybersecurity exposure aligns with rising threat landscape and 33% projected job growth.');
  if (!hasCyber) gaps.push('No cybersecurity exposure — the report flags a $300B market with SEC compliance demand.');

  const hasClimate = alignments.some(a => {
    const p = tickerDb[a.ticker];
    return p && (p.themes.includes('climate-tech') || p.themes.includes('clean-energy') || p.themes.includes('renewables'));
  });
  if (hasClimate) strengths.push('Climate/clean energy exposure aligns with Gen Z sustainability priority (85%) and record renewable investment.');
  if (!hasClimate) gaps.push('Missing climate tech exposure — $580B renewable investment and strong cultural tailwinds per the report.');

  if (lowAligned.length > alignments.length * 0.4) {
    gaps.push(`${lowAligned.length} of ${alignments.length} holdings score below 5 — a significant portion of the portfolio is misaligned with current insights.`);
  }

  const energyOld = alignments.filter(a => {
    const p = tickerDb[a.ticker];
    return p && p.themes.includes('oil-gas');
  });
  if (energyOld.length > 0) {
    gaps.push(`Traditional energy holdings (${energyOld.map(a => a.ticker).join(', ')}) are in a sector down -6.5% YTD with transition headwinds.`);
  }

  let summary: string;
  if (overallAlignment === 'broadly aligned') {
    summary = `Your portfolio has a weighted average alignment score of ${avgScore.toFixed(1)}/10. It is broadly aligned with the report's key insights — you have meaningful exposure to the themes driving growth and opportunity. Focus on fine-tuning rather than overhauling.`;
  } else if (overallAlignment === 'partially aligned') {
    summary = `Your portfolio has a weighted average alignment score of ${avgScore.toFixed(1)}/10. It is partially aligned — some holdings are well-positioned, but there are gaps in the report's highest-conviction themes. Targeted adjustments could improve alignment without major restructuring.`;
  } else {
    summary = `Your portfolio has a weighted average alignment score of ${avgScore.toFixed(1)}/10. It is currently misaligned with the report's key insights. The strongest growth themes (AI, tech infrastructure, cybersecurity) are underrepresented. Consider reviewing your allocation strategy.`;
  }

  return { overallAlignment, score: Math.round(avgScore * 10) / 10, summary, strengths, gaps };
}

export function computeRevisedAllocations(
  holdings: PortfolioHolding[],
  alignments: TickerAlignment[]
): RevisedAllocation[] {
  const results: RevisedAllocation[] = [];

  for (const h of holdings) {
    const ticker = h.ticker.toUpperCase();
    const alignment = alignments.find(a => a.ticker === ticker);
    const profile = tickerDb[ticker];

    if (!alignment) continue;

    const name = alignment.name;
    const current = h.currentAllocation;
    let suggested = current;
    let direction: RevisedAllocation['direction'] = 'maintain';
    let reason = '';
    let supportingInsight = '';

    if (alignment.alignmentScore >= 8) {
      const bump = Math.min(current * 0.2, 5);
      suggested = Math.round((current + bump) * 10) / 10;
      direction = 'increase';
      reason = 'Strong alignment with report\'s top themes — AI, tech infrastructure, and high-growth sectors.';
      supportingInsight = 'AI enterprise adoption at 78% and accelerating. Tech sector +18.5% YTD leads all sectors.';
    } else if (alignment.alignmentScore >= 6.5) {
      direction = 'maintain';
      suggested = current;
      reason = 'Solid alignment — holding contributes to portfolio balance and theme exposure.';
      supportingInsight = `${alignment.sector} sector shows stable or positive signals in the report.`;
    } else if (alignment.alignmentScore >= 4.5) {
      direction = 'maintain';
      suggested = current;
      reason = 'Moderate alignment — may serve a portfolio role (diversification, income) but not a core growth driver.';
      supportingInsight = 'Report signals are neutral to mildly positive for this sector.';
    } else {
      const cut = Math.min(current * 0.3, 5);
      suggested = Math.max(0, Math.round((current - cut) * 10) / 10);
      direction = 'decrease';

      if (profile?.themes.includes('oil-gas')) {
        reason = 'Energy sector faces transition headwinds — report shows -6.5% YTD and declining lobbying spend.';
        supportingInsight = 'Energy sector down -6.5% YTD. Climate tech investment at $580B creates displacement pressure.';
      } else if (profile?.themes.includes('commercial-real-estate')) {
        reason = 'Commercial real estate headwinds from remote work trend (72% workforce preference).';
        supportingInsight = 'Remote work correlation: -0.62 with commercial real estate occupancy per the report.';
      } else if (profile?.themes.includes('consumer-staples')) {
        reason = 'Consumer staples underperforming — low growth alignment with report\'s themes.';
        supportingInsight = 'Consumer Staples +4.3% YTD — lowest performing non-negative sector.';
      } else {
        reason = 'Low alignment with report\'s growth themes — capital may be better deployed elsewhere.';
        supportingInsight = 'Highest-scoring themes (AI, cybersecurity, climate tech) are underrepresented.';
      }
    }

    results.push({
      ticker,
      name,
      currentPct: current,
      suggestedPct: suggested,
      direction,
      reason,
      supportingInsight,
    });
  }

  // Normalize suggested percentages to sum to ~100%
  const totalSuggested = results.reduce((s, r) => s + r.suggestedPct, 0);
  if (totalSuggested > 0 && Math.abs(totalSuggested - 100) > 1) {
    const factor = 100 / totalSuggested;
    for (const r of results) {
      r.suggestedPct = Math.round(r.suggestedPct * factor * 10) / 10;
    }
  }

  return results;
}

const highTaxStates = ['CA', 'NY', 'NJ', 'CT', 'HI', 'OR', 'MN', 'VT', 'DC', 'MA'];
const noIncomeTaxStates = ['TX', 'FL', 'NV', 'WA', 'WY', 'SD', 'TN', 'NH', 'AK'];

export function computeTaxImplications(
  revisedAllocations: RevisedAllocation[],
  alignments: TickerAlignment[],
  taxContext: TaxContext,
): TaxImplication[] {
  const isTaxable = taxContext.accountType === 'taxable' || taxContext.accountType === 'multiple';
  const isTaxAdvantaged = ['roth-ira', 'traditional-ira', '401k', 'hsa'].includes(taxContext.accountType);
  const isHighBracket = taxContext.taxBracket === '32-35' || taxContext.taxBracket === '37';
  const isHighTaxState = highTaxStates.includes(taxContext.state.toUpperCase());
  const isNoTaxState = noIncomeTaxStates.includes(taxContext.state.toUpperCase());
  const hasGains = taxContext.gainStatus === 'mostly-gains' || taxContext.gainStatus === 'mixed';
  const hasLosses = taxContext.gainStatus === 'mostly-losses' || taxContext.gainStatus === 'mixed';
  const isShortTerm = taxContext.gainTerm === 'short-term' || taxContext.gainTerm === 'both';
  const nearWithdrawal = taxContext.withdrawalPlanned === true;
  const hasHarvesting = taxContext.hasLossHarvesting === true;

  return revisedAllocations.map(r => {
    const alignment = alignments.find(a => a.ticker === r.ticker);
    const profile = tickerDb[r.ticker.toUpperCase()];
    const assumptions: string[] = [];

    let investmentRationale = r.reason;
    let taxConsiderations = '';
    let accountGuidance = '';

    if (r.direction === 'decrease') {
      investmentRationale = `From an investment perspective: ${r.reason} ${r.supportingInsight}`;

      if (isTaxable && hasGains) {
        const gainType = isShortTerm ? 'short-term capital gains (taxed as ordinary income)' : 'long-term capital gains';
        taxConsiderations = `Selling ${r.ticker} in a taxable account may trigger ${gainType}.`;

        if (isHighBracket) {
          taxConsiderations += ` In the ${taxContext.taxBracket}% bracket, short-term gains face a significantly higher tax rate than long-term gains (0/15/20%).`;
        }
        if (isShortTerm) {
          taxConsiderations += ' Consider waiting for long-term holding period (>1 year) if possible to reduce the tax rate on any gain.';
        }
        if (isHighTaxState) {
          taxConsiderations += ` ${taxContext.state} imposes additional state income tax on capital gains — factor this into net proceeds.`;
        }
        if (hasHarvesting || hasLosses) {
          taxConsiderations += ' If you have losses elsewhere in the portfolio, you may be able to offset gains through tax-loss harvesting.';
        }
        if (nearWithdrawal) {
          taxConsiderations += ' With planned withdrawals in 12–24 months, timing the sale to align with a lower-income year could reduce the tax impact.';
        }
      } else if (isTaxAdvantaged) {
        taxConsiderations = `In a ${taxContext.accountType.replace('-', ' ').replace('ira', 'IRA')}, selling does not trigger capital gains tax. Rebalancing is generally tax-free within the account.`;
        if (taxContext.accountType === 'roth-ira') {
          taxConsiderations += ' Roth IRA gains are tax-free if qualified — this is an ideal account for rebalancing.';
        }
      } else {
        taxConsiderations = 'Tax impact depends on the account type. Selling in a taxable account may trigger capital gains; tax-advantaged accounts generally allow tax-free rebalancing.';
        assumptions.push('Account type not specified — tax impact is estimated.');
      }

      accountGuidance = isTaxAdvantaged
        ? `A ${taxContext.accountType.replace('-', ' ').replace('ira', 'IRA')} is well-suited for this change — no immediate tax consequences.`
        : isTaxable
          ? 'If you hold this position in both taxable and tax-advantaged accounts, consider reducing in the tax-advantaged account first to avoid triggering gains.'
          : 'Consider which account holds this position before acting.';

    } else if (r.direction === 'increase') {
      investmentRationale = `From an investment perspective: ${r.reason} ${r.supportingInsight}`;

      if (isTaxable) {
        const isDividendPayer = profile?.themes.includes('dividend') || profile?.themes.includes('income');
        taxConsiderations = 'Buying additional shares in a taxable account has no immediate tax impact.';
        if (isDividendPayer && isHighBracket) {
          taxConsiderations += ` However, ${r.ticker} generates dividends that would be taxed annually in a taxable account.`;
          accountGuidance = 'Dividend-paying holdings may be more tax-efficient in a tax-advantaged account (Traditional IRA, 401k) where dividends are not taxed until withdrawal.';
        } else {
          accountGuidance = 'Increasing this position is straightforward in either account type.';
        }
        if (isHighTaxState && isDividendPayer) {
          taxConsiderations += ` State taxes in ${taxContext.state} also apply to dividend income.`;
        }
      } else if (isTaxAdvantaged) {
        taxConsiderations = 'Adding to this position in a tax-advantaged account has no current tax impact.';
        if (taxContext.accountType === 'roth-ira') {
          accountGuidance = 'Roth IRA is ideal for high-growth holdings — future gains are tax-free.';
        } else {
          accountGuidance = `In a ${taxContext.accountType.replace('-', ' ').replace('ira', 'IRA')}, gains are tax-deferred until withdrawal.`;
        }
      } else {
        taxConsiderations = 'No immediate tax impact from purchasing. Future tax treatment depends on account type.';
        assumptions.push('Account type not specified.');
      }
    } else {
      investmentRationale = r.reason;
      taxConsiderations = 'No change recommended — no tax event triggered by holding.';
      accountGuidance = 'Maintaining current position has no tax implications.';
    }

    if (taxContext.hasRestrictions) {
      assumptions.push(`${r.ticker} may be subject to holding restrictions — verify with your employer or compliance team before trading.`);
    }

    if (!taxContext.taxBracket || taxContext.taxBracket === 'unsure') {
      assumptions.push('Federal tax bracket not specified — tax rate estimates are generalized.');
    }
    if (!taxContext.state) {
      assumptions.push('State not specified — state tax impact not calculated.');
    }
    if (!taxContext.gainStatus || taxContext.gainStatus === 'unsure') {
      assumptions.push(`Gain/loss status of ${r.ticker} is unknown — actual tax impact may differ.`);
    }

    return {
      ticker: r.ticker,
      investmentRationale,
      taxConsiderations,
      accountGuidance,
      assumptions,
    };
  });
}
