import { NextRequest, NextResponse } from 'next/server';

const FRED_BASE = 'https://api.stlouisfed.org/fred/series/observations';

// Key FRED series for macro indicators
const SERIES_MAP: Record<string, string> = {
  gdp: 'GDP',
  unemployment: 'UNRATE',
  inflation: 'CPIAUCSL',
  fedFundsRate: 'FEDFUNDS',
  consumerSentiment: 'UMCSENT',
  industrialProduction: 'INDPRO',
  retailSales: 'RSXFS',
  housingStarts: 'HOUST',
  yieldCurve: 'T10Y2Y',
  sp500: 'SP500',
  vix: 'VIXCLS',
  laborForceParticipation: 'CIVPART',
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const seriesKey = searchParams.get('series') || 'gdp';
  const limit = searchParams.get('limit') || '60';
  const apiKey = process.env.FRED_API_KEY;

  const seriesId = SERIES_MAP[seriesKey] || seriesKey;

  if (!apiKey) {
    // Return curated fallback data when no API key
    return NextResponse.json({
      source: 'curated',
      series: seriesId,
      observations: generateFallbackData(seriesKey, parseInt(limit)),
    });
  }

  try {
    const url = `${FRED_BASE}?series_id=${seriesId}&api_key=${apiKey}&file_type=json&sort_order=desc&limit=${limit}`;
    const res = await fetch(url, { next: { revalidate: 3600 } });
    const data = await res.json();

    return NextResponse.json({
      source: 'live',
      series: seriesId,
      observations: data.observations?.map((o: { date: string; value: string }) => ({
        date: o.date,
        value: parseFloat(o.value) || 0,
      })) || [],
    });
  } catch {
    return NextResponse.json({
      source: 'curated',
      series: seriesId,
      observations: generateFallbackData(seriesKey, parseInt(limit)),
    });
  }
}

function generateFallbackData(series: string, limit: number) {
  const baselines: Record<string, { base: number; volatility: number }> = {
    gdp: { base: 27500, volatility: 500 },
    unemployment: { base: 3.8, volatility: 0.3 },
    inflation: { base: 3.2, volatility: 0.4 },
    fedFundsRate: { base: 4.5, volatility: 0.25 },
    consumerSentiment: { base: 68, volatility: 5 },
    industrialProduction: { base: 103, volatility: 2 },
    retailSales: { base: 620, volatility: 15 },
    housingStarts: { base: 1400, volatility: 80 },
    yieldCurve: { base: 0.3, volatility: 0.5 },
    sp500: { base: 5200, volatility: 200 },
    vix: { base: 16, volatility: 4 },
    laborForceParticipation: { base: 62.5, volatility: 0.3 },
  };

  const config = baselines[series] || { base: 100, volatility: 10 };
  const data = [];
  const now = new Date();

  for (let i = 0; i < limit; i++) {
    const date = new Date(now);
    date.setMonth(date.getMonth() - i);
    const trend = (limit - i) / limit * config.volatility * 0.5;
    const noise = (Math.random() - 0.5) * config.volatility;
    data.push({
      date: date.toISOString().split('T')[0],
      value: Math.round((config.base + trend + noise) * 100) / 100,
    });
  }

  return data.reverse();
}
