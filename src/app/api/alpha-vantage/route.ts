import { NextRequest, NextResponse } from 'next/server';

const AV_BASE = 'https://www.alphavantage.co/query';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const fn = searchParams.get('function') || 'SECTOR';
  const apiKey = process.env.ALPHA_VANTAGE_API_KEY;

  if (!apiKey) {
    return NextResponse.json({
      source: 'curated',
      data: fn === 'SECTOR' ? getSectorFallback() : getMarketFallback(),
    });
  }

  try {
    const url = `${AV_BASE}?function=${fn}&apikey=${apiKey}`;
    const res = await fetch(url, { next: { revalidate: 3600 } });
    const data = await res.json();

    if (data.Note || data['Error Message']) {
      throw new Error('Rate limited');
    }

    return NextResponse.json({ source: 'live', data });
  } catch {
    return NextResponse.json({
      source: 'curated',
      data: fn === 'SECTOR' ? getSectorFallback() : getMarketFallback(),
    });
  }
}

function getSectorFallback() {
  return {
    'Rank A: Real-Time Performance': {
      'Information Technology': '1.25%',
      'Health Care': '0.87%',
      'Financials': '-0.32%',
      'Consumer Discretionary': '0.54%',
      'Communication Services': '1.82%',
      'Industrials': '0.15%',
      'Consumer Staples': '-0.18%',
      'Energy': '-1.05%',
      'Utilities': '0.42%',
      'Real Estate': '-0.67%',
      'Materials': '0.28%',
    },
    'Rank B: 1 Day Performance': {
      'Information Technology': '0.95%',
      'Health Care': '1.12%',
      'Financials': '0.48%',
      'Consumer Discretionary': '-0.22%',
      'Communication Services': '1.55%',
      'Industrials': '0.33%',
      'Consumer Staples': '0.08%',
      'Energy': '-0.78%',
      'Utilities': '0.65%',
      'Real Estate': '-0.45%',
      'Materials': '0.18%',
    },
    'Rank E: 1 Month Performance': {
      'Information Technology': '4.25%',
      'Health Care': '2.87%',
      'Financials': '1.65%',
      'Consumer Discretionary': '3.12%',
      'Communication Services': '5.40%',
      'Industrials': '1.88%',
      'Consumer Staples': '0.92%',
      'Energy': '-2.15%',
      'Utilities': '1.35%',
      'Real Estate': '-1.20%',
      'Materials': '2.05%',
    },
    'Rank F: 3 Month Performance': {
      'Information Technology': '8.75%',
      'Health Care': '5.30%',
      'Financials': '4.20%',
      'Consumer Discretionary': '6.45%',
      'Communication Services': '11.20%',
      'Industrials': '3.55%',
      'Consumer Staples': '1.80%',
      'Energy': '-4.30%',
      'Utilities': '2.90%',
      'Real Estate': '-2.85%',
      'Materials': '3.65%',
    },
    'Rank G: Year-to-Date (YTD) Performance': {
      'Information Technology': '18.50%',
      'Health Care': '8.75%',
      'Financials': '12.30%',
      'Consumer Discretionary': '14.20%',
      'Communication Services': '22.80%',
      'Industrials': '9.45%',
      'Consumer Staples': '4.30%',
      'Energy': '-6.50%',
      'Utilities': '7.20%',
      'Real Estate': '-3.10%',
      'Materials': '6.85%',
    },
  };
}

function getMarketFallback() {
  return {
    overview: {
      sp500: 5432.10,
      nasdaq: 17250.30,
      dow: 42180.50,
      russell2000: 2285.40,
    },
  };
}
