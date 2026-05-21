'use client';

import { useState, useMemo } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  analyzeAlignment, computePortfolioSummary, computeRevisedAllocations, computeTaxImplications, lookupTicker, getTickerPrice, computePortfolioValuation,
} from '@/lib/portfolio-engine';
import { PortfolioHolding, TaxContext, AccountType, TaxBracket, GainStatus, GainTerm } from '@/types/dashboard';
import {
  PieChart, Briefcase, Plus, X, Trash2, ChevronDown, ChevronUp,
  CheckCircle2, AlertTriangle, Info, ArrowRight, TrendingUp, TrendingDown, Minus,
  BarChart3, Target, Lightbulb, RefreshCw, FileText, Scale, Building2,
  DollarSign, Hash, ShieldAlert,
} from 'lucide-react';

const actionConfig: Record<string, { icon: typeof TrendingUp; color: string; label: string; bg: string }> = {
  hold: { icon: Minus, color: 'text-[var(--dash-text-4)]', label: 'Hold', bg: 'bg-gray-50 dark:bg-gray-500/10 border-gray-200 dark:border-gray-500/20' },
  'buy more': { icon: TrendingUp, color: 'text-green-600 dark:text-green-400', label: 'Buy More', bg: 'bg-green-50 dark:bg-green-500/10 border-green-200 dark:border-green-500/20' },
  reduce: { icon: TrendingDown, color: 'text-amber-600 dark:text-amber-400', label: 'Reduce', bg: 'bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/20' },
  exit: { icon: X, color: 'text-red-600 dark:text-red-400', label: 'Exit', bg: 'bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/20' },
};

const recColors: Record<string, string> = {
  hold: 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-500/10 border-green-200 dark:border-green-500/20',
  review: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/20',
  reduce: 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/20',
  'add selectively': 'text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-500/10 border-cyan-200 dark:border-cyan-500/20',
  'research further': 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-500/10 border-purple-200 dark:border-purple-500/20',
};

const scoreColor = (s: number) =>
  s >= 8 ? 'text-green-600 dark:text-green-400' :
  s >= 6 ? 'text-cyan-600 dark:text-cyan-400' :
  s >= 4 ? 'text-amber-600 dark:text-amber-400' :
  'text-red-600 dark:text-red-400';

const scoreBg = (s: number) =>
  s >= 8 ? 'bg-green-500' :
  s >= 6 ? 'bg-cyan-500' :
  s >= 4 ? 'bg-amber-500' :
  'bg-red-500';

function fmtUsd(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(1)}K`;
  return `$${n.toFixed(2)}`;
}

function fmtPrice(n: number): string {
  return `$${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function PortfolioAlignment() {
  const [tickerInput, setTickerInput] = useState('');
  const [holdings, setHoldings] = useState<PortfolioHolding[]>([]);
  const [analyzed, setAnalyzed] = useState(false);
  const [expandedTicker, setExpandedTicker] = useState<string | null>(null);
  const [showRevised, setShowRevised] = useState(false);
  const [showTaxQ, setShowTaxQ] = useState(false);
  const [taxCompleted, setTaxCompleted] = useState(false);
  const [taxContext, setTaxContext] = useState<TaxContext>({
    accountType: '',
    taxBracket: '',
    state: '',
    gainStatus: '',
    gainTerm: '',
    withdrawalPlanned: null,
    hasLossHarvesting: null,
    hasRestrictions: null,
  });

  const addTicker = () => {
    const raw = tickerInput.toUpperCase().trim();
    if (!raw) return;
    const tickers = raw.split(/[\s,]+/).filter(Boolean);
    const newHoldings = tickers
      .filter(t => !holdings.find(h => h.ticker === t))
      .map(t => ({ ticker: t, shares: 0 }));
    setHoldings([...holdings, ...newHoldings]);
    setTickerInput('');
    setAnalyzed(false);
    setShowRevised(false);
  };

  const removeTicker = (ticker: string) => {
    setHoldings(holdings.filter(h => h.ticker !== ticker));
    setAnalyzed(false);
    setShowRevised(false);
  };

  const updateShares = (ticker: string, shares: number) => {
    setHoldings(holdings.map(h => h.ticker === ticker ? { ...h, shares } : h));
    setAnalyzed(false);
    setShowRevised(false);
  };

  const updateCostBasis = (ticker: string, costBasis: number | undefined) => {
    setHoldings(holdings.map(h => h.ticker === ticker ? { ...h, costBasis } : h));
    setAnalyzed(false);
    setShowRevised(false);
  };

  const hasShares = holdings.some(h => h.shares > 0);

  const valuation = useMemo(() =>
    hasShares ? computePortfolioValuation(holdings.filter(h => h.shares > 0)) : null,
    [holdings, hasShares]
  );

  const alignments = useMemo(() =>
    analyzed ? analyzeAlignment(holdings.map(h => h.ticker)) : [],
    [analyzed, holdings]
  );

  const summary = useMemo(() =>
    alignments.length > 0 ? computePortfolioSummary(alignments, valuation ?? undefined) : null,
    [alignments, valuation]
  );

  const revisedAllocations = useMemo(() =>
    showRevised && valuation ? computeRevisedAllocations(valuation, alignments) : [],
    [showRevised, valuation, alignments]
  );

  const taxImplications = useMemo(() =>
    taxCompleted && revisedAllocations.length > 0
      ? computeTaxImplications(revisedAllocations, alignments, taxContext)
      : [],
    [taxCompleted, revisedAllocations, alignments, taxContext]
  );

  const handleAnalyze = () => {
    if (holdings.length === 0) return;
    setAnalyzed(true);
  };

  const handleReset = () => {
    setHoldings([]);
    setAnalyzed(false);
    setShowRevised(false);
    setExpandedTicker(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center">
          <PieChart className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />
        </div>
        <div>
          <h3 className="text-sm md:text-base font-semibold text-[var(--dash-text-1)]">Portfolio Alignment</h3>
          <p className="text-xs text-[var(--dash-text-4)]">Enter your holdings to see how they align with the report's insights</p>
        </div>
      </div>

      {/* Ticker Input */}
      <div className="rounded-xl border p-4 md:p-5 transition-colors" style={{ backgroundColor: 'var(--dash-bg-card)', borderColor: 'var(--dash-border)' }}>
        <div className="text-xs text-[var(--dash-text-2)] mb-3">
          Enter the ticker symbols of your stocks, ETFs, or funds. Then specify how many shares you own for each.
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={tickerInput}
            onChange={e => setTickerInput(e.target.value.toUpperCase())}
            onKeyDown={e => { if (e.key === 'Enter') addTicker(); }}
            placeholder="e.g. AAPL, MSFT, VTI, QQQ, VOO"
            className="flex-1 px-3 py-2 rounded-lg border text-sm bg-transparent text-[var(--dash-text-1)] placeholder:text-[var(--dash-text-4)]"
            style={{ borderColor: 'var(--dash-border)' }}
          />
          <Button
            variant="outline"
            size="sm"
            onClick={addTicker}
            className="text-xs border-indigo-500/30 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-500/10"
          >
            <Plus className="w-3 h-3 mr-1" />
            Add
          </Button>
        </div>

        {/* Holdings Input Table */}
        {holdings.length > 0 && (
          <div className="mt-4 space-y-1">
            {/* Header */}
            <div className="hidden sm:grid grid-cols-[1fr_100px_120px_100px_40px] gap-2 px-2 text-xs text-[var(--dash-text-4)] font-medium">
              <div>Ticker</div>
              <div className="text-right">Shares</div>
              <div className="text-right">Cost Basis</div>
              <div className="text-right">Price</div>
              <div />
            </div>

            {holdings.map(h => {
              const profile = lookupTicker(h.ticker);
              const price = getTickerPrice(h.ticker);
              return (
                <div
                  key={h.ticker}
                  className="sm:grid sm:grid-cols-[1fr_100px_120px_100px_40px] gap-2 items-center rounded-lg border p-2 sm:p-2 transition-colors"
                  style={{ backgroundColor: 'var(--dash-bg-muted)', borderColor: 'var(--dash-border)' }}
                >
                  {/* Ticker info */}
                  <div className="flex items-center gap-2 mb-2 sm:mb-0">
                    <span className="font-mono font-bold text-sm text-[var(--dash-text-1)]">{h.ticker}</span>
                    {profile && <span className="text-xs text-[var(--dash-text-4)] truncate hidden sm:inline">{profile.name}</span>}
                    {!profile && <span className="text-xs text-amber-500">Unknown ticker</span>}
                  </div>

                  {/* Mobile layout: shares + cost basis side by side */}
                  <div className="flex gap-2 sm:contents">
                    <div className="flex-1 sm:flex-none">
                      <div className="text-xs text-[var(--dash-text-4)] sm:hidden mb-0.5">Shares</div>
                      <input
                        type="number"
                        min={0}
                        step={1}
                        value={h.shares || ''}
                        onChange={e => updateShares(h.ticker, parseFloat(e.target.value) || 0)}
                        placeholder="0"
                        className="w-full sm:w-auto px-2 py-1.5 rounded-lg border text-sm bg-transparent text-[var(--dash-text-1)] text-right"
                        style={{ borderColor: 'var(--dash-border)' }}
                      />
                    </div>
                    <div className="flex-1 sm:flex-none">
                      <div className="text-xs text-[var(--dash-text-4)] sm:hidden mb-0.5">Avg Cost</div>
                      <div className="relative">
                        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-[var(--dash-text-4)]">$</span>
                        <input
                          type="number"
                          min={0}
                          step={0.01}
                          value={h.costBasis ?? ''}
                          onChange={e => updateCostBasis(h.ticker, e.target.value ? parseFloat(e.target.value) : undefined)}
                          placeholder="optional"
                          className="w-full sm:w-auto pl-5 pr-2 py-1.5 rounded-lg border text-sm bg-transparent text-[var(--dash-text-1)] text-right"
                          style={{ borderColor: 'var(--dash-border)' }}
                        />
                      </div>
                    </div>

                    {/* Price (read-only) */}
                    <div className="hidden sm:flex items-center justify-end">
                      <span className="text-sm text-[var(--dash-text-3)]">{price ? fmtPrice(price) : '—'}</span>
                    </div>

                    {/* Remove */}
                    <div className="flex items-center justify-center">
                      <button onClick={() => removeTicker(h.ticker)} className="text-[var(--dash-text-4)] hover:text-red-500 p-1">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Portfolio Summary Bar */}
        {valuation && valuation.totalValue > 0 && (
          <div className="mt-3 rounded-lg border p-3 space-y-2" style={{ backgroundColor: 'var(--dash-bg-card)', borderColor: 'var(--dash-border)' }}>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
              <div>
                <div className="text-xs text-[var(--dash-text-4)]">Total Value</div>
                <div className="text-base font-bold text-[var(--dash-text-1)]">{fmtUsd(valuation.totalValue)}</div>
              </div>
              <div>
                <div className="text-xs text-[var(--dash-text-4)]">Holdings</div>
                <div className="text-base font-bold text-[var(--dash-text-1)]">{valuation.holdings.length}</div>
              </div>
              <div>
                <div className="text-xs text-[var(--dash-text-4)]">Top Holding</div>
                <div className="text-base font-bold text-[var(--dash-text-1)]">{valuation.topHoldingPct.toFixed(1)}%</div>
              </div>
              <div>
                <div className="text-xs text-[var(--dash-text-4)]">Concentration</div>
                <div className={`text-base font-bold capitalize ${
                  valuation.concentrationRisk === 'high' ? 'text-red-500' :
                  valuation.concentrationRisk === 'moderate' ? 'text-amber-500' :
                  'text-green-500'
                }`}>
                  {valuation.concentrationRisk}
                </div>
              </div>
            </div>

            {/* Allocation bars */}
            <div className="flex gap-0.5 h-3 rounded-full overflow-hidden">
              {valuation.holdings
                .sort((a, b) => b.allocationPct - a.allocationPct)
                .map((hv, i) => (
                  <div
                    key={hv.ticker}
                    className="h-full transition-all"
                    style={{
                      width: `${hv.allocationPct}%`,
                      backgroundColor: `hsl(${(i * 37 + 230) % 360}, 60%, 55%)`,
                      minWidth: hv.allocationPct > 0 ? '4px' : '0',
                    }}
                    title={`${hv.ticker}: ${hv.allocationPct.toFixed(1)}% (${fmtUsd(hv.marketValue)})`}
                  />
                ))}
            </div>
            <div className="flex flex-wrap gap-x-3 gap-y-0.5">
              {valuation.holdings
                .sort((a, b) => b.allocationPct - a.allocationPct)
                .map((hv, i) => (
                  <div key={hv.ticker} className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: `hsl(${(i * 37 + 230) % 360}, 60%, 55%)` }} />
                    <span className="text-xs text-[var(--dash-text-3)]">{hv.ticker} {hv.allocationPct.toFixed(1)}%</span>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        {holdings.length > 0 && (
          <div className="mt-4 flex gap-2">
            <Button
              size="sm"
              onClick={handleAnalyze}
              className="text-xs bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              <BarChart3 className="w-3 h-3 mr-1" />
              Analyze Portfolio
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className="text-xs text-[var(--dash-text-4)] hover:text-[var(--dash-text-2)]"
            >
              <Trash2 className="w-3 h-3 mr-1" />
              Clear All
            </Button>
          </div>
        )}
      </div>

      {/* Portfolio Summary */}
      {summary && (
        <div
          className={`rounded-xl border p-4 ${
            summary.overallAlignment === 'broadly aligned' ? 'border-green-500/30' :
            summary.overallAlignment === 'partially aligned' ? 'border-amber-500/30' :
            'border-red-500/30'
          }`}
          style={{ backgroundColor: 'var(--dash-bg-card)' }}
        >
          <div className="flex items-center gap-3 mb-3">
            {summary.overallAlignment === 'broadly aligned' ? (
              <CheckCircle2 className="w-5 h-5 text-green-500" />
            ) : summary.overallAlignment === 'partially aligned' ? (
              <AlertTriangle className="w-5 h-5 text-amber-500" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-red-500" />
            )}
            <div>
              <h4 className="text-sm md:text-base font-semibold text-[var(--dash-text-1)]">
                Portfolio-Level Summary: <span className="capitalize">{summary.overallAlignment}</span>
              </h4>
              <div className="text-xs text-[var(--dash-text-4)]">
                Weighted alignment score: <span className={`font-bold ${scoreColor(summary.score)}`}>{summary.score}/10</span>
              </div>
            </div>
          </div>

          <p className="text-xs text-[var(--dash-text-2)] leading-relaxed mb-3">{summary.summary}</p>

          {/* Concentration risk callout */}
          {valuation && valuation.concentrationRisk !== 'low' && (
            <div className={`rounded-lg p-3 mb-3 border ${
              valuation.concentrationRisk === 'high'
                ? 'bg-red-50 dark:bg-red-500/5 border-red-200 dark:border-red-500/10'
                : 'bg-amber-50 dark:bg-amber-500/5 border-amber-200 dark:border-amber-500/10'
            }`}>
              <div className="flex items-center gap-1.5">
                <ShieldAlert className={`w-3.5 h-3.5 ${valuation.concentrationRisk === 'high' ? 'text-red-500' : 'text-amber-500'}`} />
                <span className={`text-xs font-medium ${valuation.concentrationRisk === 'high' ? 'text-red-700 dark:text-red-400' : 'text-amber-700 dark:text-amber-400'}`}>
                  {valuation.concentrationRisk === 'high' ? 'High' : 'Moderate'} concentration risk — top holding is {valuation.topHoldingPct.toFixed(1)}% of portfolio (HHI: {Math.round(valuation.concentrationHHI)})
                </span>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {summary.strengths.length > 0 && (
              <div className="rounded-lg p-3 bg-green-50 dark:bg-green-500/5 border border-green-200 dark:border-green-500/10">
                <div className="text-xs uppercase tracking-wide text-green-700 dark:text-green-400 font-medium mb-1.5">Strengths</div>
                <ul className="space-y-1.5">
                  {summary.strengths.map((s, i) => (
                    <li key={i} className="text-sm text-green-800 dark:text-green-300 leading-relaxed flex gap-1.5">
                      <CheckCircle2 className="w-3 h-3 mt-0.5 flex-shrink-0" />{s}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {summary.gaps.length > 0 && (
              <div className="rounded-lg p-3 bg-amber-50 dark:bg-amber-500/5 border border-amber-200 dark:border-amber-500/10">
                <div className="text-xs uppercase tracking-wide text-amber-700 dark:text-amber-400 font-medium mb-1.5">Gaps & Watchouts</div>
                <ul className="space-y-1.5">
                  {summary.gaps.map((g, i) => (
                    <li key={i} className="text-sm text-amber-800 dark:text-amber-300 leading-relaxed flex gap-1.5">
                      <AlertTriangle className="w-3 h-3 mt-0.5 flex-shrink-0" />{g}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Individual Ticker Alignments */}
      {alignments.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Briefcase className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
            <h4 className="text-sm md:text-base font-semibold text-[var(--dash-text-1)]">Holding-by-Holding Analysis</h4>
            <span className="text-xs text-[var(--dash-text-4)]">— click any holding for full detail</span>
          </div>

          <div className="space-y-2">
            {alignments.sort((a, b) => b.alignmentScore - a.alignmentScore).map(a => {
              const expanded = expandedTicker === a.ticker;
              const hv = valuation?.holdings.find(h => h.ticker === a.ticker);
              return (
                <div
                  key={a.ticker}
                  className="rounded-xl border transition-all cursor-pointer"
                  style={{ backgroundColor: 'var(--dash-bg-card)', borderColor: expanded ? 'rgb(99 102 241 / 0.3)' : 'var(--dash-border)' }}
                  onClick={() => setExpandedTicker(expanded ? null : a.ticker)}
                >
                  {/* Header Row */}
                  <div className="p-3 flex items-center gap-3">
                    <div className="w-12 text-center">
                      <div className={`text-lg font-bold ${scoreColor(a.alignmentScore)}`}>{a.alignmentScore}</div>
                      <div className="w-full h-1 rounded-full bg-[var(--dash-border)] mt-1">
                        <div className={`h-full rounded-full ${scoreBg(a.alignmentScore)}`} style={{ width: `${a.alignmentScore * 10}%` }} />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold font-mono text-[var(--dash-text-1)]">{a.ticker}</span>
                        <span className="text-xs text-[var(--dash-text-3)] truncate">{a.name}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-[var(--dash-text-4)]">
                        <span>{a.sector}</span>
                        {hv && hv.marketValue > 0 && (
                          <>
                            <span>·</span>
                            <span>{fmtUsd(hv.marketValue)} ({hv.allocationPct.toFixed(1)}%)</span>
                            {hv.gainLossPct != null && (
                              <span className={hv.gainLossPct >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-500'}>
                                {hv.gainLossPct >= 0 ? '+' : ''}{hv.gainLossPct.toFixed(1)}%
                              </span>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                    <Badge variant="outline" className={`text-xs capitalize ${recColors[a.recommendation]}`}>
                      {a.recommendation}
                    </Badge>
                    {expanded ? <ChevronUp className="w-4 h-4 text-[var(--dash-text-4)]" /> : <ChevronDown className="w-4 h-4 text-[var(--dash-text-4)]" />}
                  </div>

                  {/* Expanded Detail */}
                  {expanded && (
                    <div className="px-4 pb-4 border-t border-[var(--dash-border)]">
                      <div className="mt-3 space-y-3">
                        {/* Position details */}
                        {hv && hv.marketValue > 0 && (
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            <div>
                              <div className="text-xs text-[var(--dash-text-4)]">Shares</div>
                              <div className="text-sm font-bold text-[var(--dash-text-1)]">{hv.shares}</div>
                            </div>
                            <div>
                              <div className="text-xs text-[var(--dash-text-4)]">Market Value</div>
                              <div className="text-sm font-bold text-[var(--dash-text-1)]">{fmtUsd(hv.marketValue)}</div>
                            </div>
                            <div>
                              <div className="text-xs text-[var(--dash-text-4)]">Allocation</div>
                              <div className="text-sm font-bold text-[var(--dash-text-1)]">{hv.allocationPct.toFixed(1)}%</div>
                            </div>
                            {hv.gainLoss != null && (
                              <div>
                                <div className="text-xs text-[var(--dash-text-4)]">Gain/Loss</div>
                                <div className={`text-sm font-bold ${hv.gainLoss >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-500'}`}>
                                  {hv.gainLoss >= 0 ? '+' : ''}{fmtUsd(Math.abs(hv.gainLoss))} ({hv.gainLossPct!.toFixed(1)}%)
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                        <div>
                          <div className="text-xs uppercase tracking-wide text-[var(--dash-text-4)] font-medium mb-1">Alignment Explanation</div>
                          <p className="text-xs text-[var(--dash-text-2)] leading-relaxed">{a.explanation}</p>
                        </div>
                        <div>
                          <div className="text-xs uppercase tracking-wide text-[var(--dash-text-4)] font-medium mb-1">Key Risks & Watchouts</div>
                          <p className="text-xs text-[var(--dash-text-2)] leading-relaxed">{a.risks}</p>
                        </div>
                        <div className={`rounded-lg p-3 border ${recColors[a.recommendation]}`}>
                          <div className="text-xs uppercase tracking-wide font-medium mb-1">Recommendation</div>
                          <p className="text-xs font-medium capitalize">{a.recommendation}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Score Legend */}
          <div className="mt-3 flex flex-wrap gap-4 text-xs text-[var(--dash-text-4)]">
            <span><span className="inline-block w-2 h-2 rounded-full bg-red-500 mr-1" />1-3: Low alignment</span>
            <span><span className="inline-block w-2 h-2 rounded-full bg-amber-500 mr-1" />4-6: Moderate</span>
            <span><span className="inline-block w-2 h-2 rounded-full bg-cyan-500 mr-1" />7-8: Strong</span>
            <span><span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-1" />9-10: Very strong</span>
          </div>
        </div>
      )}

      {/* Revised Portfolio View */}
      {alignments.length > 0 && hasShares && valuation && valuation.totalValue > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <RefreshCw className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
            <h4 className="text-sm md:text-base font-semibold text-[var(--dash-text-1)]">Revised Portfolio View</h4>
            {!showRevised && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowRevised(true)}
                className="ml-2 text-xs border-indigo-500/30 text-indigo-600 dark:text-indigo-400"
              >
                Generate Revised View
              </Button>
            )}
          </div>

          {!showRevised && (
            <div className="text-xs text-[var(--dash-text-3)] rounded-xl border p-4" style={{ backgroundColor: 'var(--dash-bg-card)', borderColor: 'var(--dash-border)' }}>
              This shows what a more aligned portfolio could look like based on the report's insights. Uses your current holdings as the starting point. Click "Generate Revised View" to see suggestions.
            </div>
          )}

          {showRevised && revisedAllocations.length > 0 && (
            <div className="space-y-3">
              <div className="rounded-xl border p-4" style={{ backgroundColor: 'var(--dash-bg-card)', borderColor: 'var(--dash-border)' }}>
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="w-4 h-4 text-amber-500" />
                  <span className="text-xs text-amber-600 dark:text-amber-400 font-medium uppercase tracking-wide">Educational Scenario — Not Financial Advice</span>
                </div>
                <p className="text-xs text-[var(--dash-text-2)] leading-relaxed mb-1">
                  This revised view shows how your portfolio could be adjusted to better align with the report's data signals. Recommendations are expressed as target share counts based on current market prices.
                </p>
                <p className="text-xs text-[var(--dash-text-4)]">
                  All suggestions are scenario-based and educational. Consult a financial advisor before making investment changes.
                </p>
              </div>

              <div className="space-y-2">
                {revisedAllocations.map(r => {
                  const ac = actionConfig[r.action];
                  const ActionIcon = ac.icon;
                  const shareDiff = r.targetShares - r.currentShares;
                  const taxInfo = taxImplications.find(t => t.ticker === r.ticker);
                  return (
                    <div
                      key={r.ticker}
                      className="rounded-xl border p-3 transition-colors"
                      style={{ backgroundColor: 'var(--dash-bg-card)', borderColor: 'var(--dash-border)' }}
                    >
                      {/* Ticker + action badge */}
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-sm font-bold font-mono text-[var(--dash-text-1)]">{r.ticker}</span>
                        <span className="text-xs text-[var(--dash-text-3)] truncate flex-1">{r.name}</span>
                        <Badge variant="outline" className={`text-xs capitalize border ${ac.bg} ${ac.color}`}>
                          <ActionIcon className="w-3 h-3 mr-1" />
                          {ac.label}
                        </Badge>
                      </div>

                      {/* Current → Target grid */}
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <div className="rounded-lg border p-2.5" style={{ borderColor: 'var(--dash-border)' }}>
                          <div className="text-xs text-[var(--dash-text-4)] mb-1">Current Position</div>
                          <div className="text-sm font-bold text-[var(--dash-text-1)]">{r.currentShares} shares</div>
                          <div className="text-xs text-[var(--dash-text-3)]">{fmtUsd(r.currentValue)} · {r.currentPct}%</div>
                        </div>
                        <div className={`rounded-lg border p-2.5 ${r.action !== 'hold' ? ac.bg : ''}`} style={r.action === 'hold' ? { borderColor: 'var(--dash-border)' } : {}}>
                          <div className="text-xs text-[var(--dash-text-4)] mb-1">Target Position</div>
                          <div className={`text-sm font-bold ${r.action !== 'hold' ? ac.color : 'text-[var(--dash-text-1)]'}`}>
                            {r.targetShares} shares
                          </div>
                          <div className="text-xs text-[var(--dash-text-3)]">{fmtUsd(r.targetValue)} · {r.targetPct}%</div>
                        </div>
                      </div>

                      {/* Share difference callout */}
                      {shareDiff !== 0 && (
                        <div className={`flex items-center gap-1.5 text-xs font-medium mb-2 ${ac.color}`}>
                          <ActionIcon className="w-3 h-3" />
                          {r.action === 'exit' ? (
                            <span>Sell all {r.currentShares} shares (est. {fmtUsd(r.currentValue)})</span>
                          ) : r.action === 'buy more' ? (
                            <span>Buy {shareDiff} more shares (est. {fmtUsd(Math.abs(shareDiff) * (r.targetValue / Math.max(r.targetShares, 1)))})</span>
                          ) : (
                            <span>Sell {Math.abs(shareDiff)} shares (est. {fmtUsd(Math.abs(shareDiff) * (r.currentValue / Math.max(r.currentShares, 1)))})</span>
                          )}
                        </div>
                      )}

                      <div className="text-xs text-[var(--dash-text-2)] leading-relaxed">{r.reason}</div>
                      <div className="text-xs text-[var(--dash-text-4)] mt-1 italic">{r.supportingInsight}</div>

                      {taxInfo && (
                        <div className="mt-3 border-t border-[var(--dash-border)] pt-3 space-y-2">
                          <div className="flex items-center gap-1.5 mb-1">
                            <Scale className="w-3 h-3 text-violet-500" />
                            <span className="text-xs uppercase tracking-wide text-violet-600 dark:text-violet-400 font-medium">Tax Context</span>
                          </div>
                          {r.action !== 'hold' && (
                            <div>
                              <div className="text-xs text-[var(--dash-text-4)] font-medium">Investment Rationale</div>
                              <p className="text-sm text-[var(--dash-text-2)] leading-relaxed">{taxInfo.investmentRationale}</p>
                            </div>
                          )}
                          <div>
                            <div className="text-xs text-[var(--dash-text-4)] font-medium">Tax Considerations</div>
                            <p className="text-sm text-[var(--dash-text-2)] leading-relaxed">{taxInfo.taxConsiderations}</p>
                          </div>
                          <div>
                            <div className="text-xs text-[var(--dash-text-4)] font-medium">Account Guidance</div>
                            <p className="text-sm text-[var(--dash-text-2)] leading-relaxed">{taxInfo.accountGuidance}</p>
                          </div>
                          {taxInfo.assumptions.length > 0 && (
                            <div className="rounded-lg p-2 bg-violet-50 dark:bg-violet-500/5 border border-violet-200 dark:border-violet-500/10">
                              <div className="text-xs text-violet-700 dark:text-violet-400 font-medium mb-0.5">Assumptions & Caveats</div>
                              <ul className="space-y-0.5">
                                {taxInfo.assumptions.map((a, i) => (
                                  <li key={i} className="text-xs text-violet-600 dark:text-violet-300 flex gap-1">
                                    <Info className="w-2.5 h-2.5 mt-0.5 flex-shrink-0" />{a}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Tax Context Questionnaire */}
              {!taxCompleted && (
                <div className="rounded-xl border p-4 border-violet-500/20" style={{ backgroundColor: 'var(--dash-bg-card)' }}>
                  <div className="flex items-center gap-2 mb-1">
                    <FileText className="w-4 h-4 text-violet-500" />
                    <h4 className="text-sm md:text-base font-semibold text-[var(--dash-text-1)]">Tax Context Questionnaire</h4>
                  </div>
                  <p className="text-xs text-[var(--dash-text-4)] mb-4">
                    Answer a few questions so we can layer in educational tax considerations for each recommendation. This is not tax advice — confirm details with a tax professional.
                  </p>

                  {!showTaxQ ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowTaxQ(true)}
                      className="text-xs border-violet-500/30 text-violet-600 dark:text-violet-400"
                    >
                      <Scale className="w-3 h-3 mr-1" />
                      Add Tax Context
                    </Button>
                  ) : (
                    <div className="space-y-4">
                      <TaxQuestion label="What type of account is this portfolio in?">
                        <TaxSelect
                          value={taxContext.accountType}
                          onChange={v => setTaxContext(p => ({ ...p, accountType: v as AccountType }))}
                          options={[
                            { value: '', label: 'Select...' },
                            { value: 'taxable', label: 'Taxable brokerage' },
                            { value: 'traditional-ira', label: 'Traditional IRA' },
                            { value: 'roth-ira', label: 'Roth IRA' },
                            { value: '401k', label: '401(k) / 403(b)' },
                            { value: 'hsa', label: 'HSA' },
                            { value: 'multiple', label: 'Multiple / mixed accounts' },
                          ]}
                        />
                      </TaxQuestion>
                      <TaxQuestion label="What is your estimated federal tax bracket?">
                        <TaxSelect
                          value={taxContext.taxBracket}
                          onChange={v => setTaxContext(p => ({ ...p, taxBracket: v as TaxBracket }))}
                          options={[
                            { value: '', label: 'Select...' },
                            { value: '10-12', label: '10–12%' },
                            { value: '22-24', label: '22–24%' },
                            { value: '32-35', label: '32–35%' },
                            { value: '37', label: '37%' },
                            { value: 'unsure', label: 'Not sure' },
                          ]}
                        />
                      </TaxQuestion>
                      <TaxQuestion label="What state do you live in?">
                        <input
                          type="text"
                          value={taxContext.state}
                          onChange={e => setTaxContext(p => ({ ...p, state: e.target.value.toUpperCase().slice(0, 2) }))}
                          placeholder="e.g. TX, CA, NY"
                          maxLength={2}
                          className="w-24 px-2 py-1.5 rounded-lg border text-xs bg-transparent text-[var(--dash-text-1)] uppercase"
                          style={{ borderColor: 'var(--dash-border)' }}
                        />
                      </TaxQuestion>
                      <TaxQuestion label="Are any holdings currently at a gain or loss?">
                        <TaxSelect
                          value={taxContext.gainStatus}
                          onChange={v => setTaxContext(p => ({ ...p, gainStatus: v as GainStatus }))}
                          options={[
                            { value: '', label: 'Select...' },
                            { value: 'mostly-gains', label: 'Mostly gains' },
                            { value: 'mostly-losses', label: 'Mostly losses' },
                            { value: 'mixed', label: 'Mixed gains and losses' },
                            { value: 'unsure', label: 'Not sure' },
                          ]}
                        />
                      </TaxQuestion>
                      <TaxQuestion label="Are the gains short-term or long-term?">
                        <TaxSelect
                          value={taxContext.gainTerm}
                          onChange={v => setTaxContext(p => ({ ...p, gainTerm: v as GainTerm }))}
                          options={[
                            { value: '', label: 'Select...' },
                            { value: 'short-term', label: 'Mostly short-term (<1 year)' },
                            { value: 'long-term', label: 'Mostly long-term (>1 year)' },
                            { value: 'both', label: 'Both' },
                            { value: 'unsure', label: 'Not sure' },
                          ]}
                        />
                      </TaxQuestion>
                      <TaxQuestion label="Are you planning to withdraw money from this portfolio in the next 12–24 months?">
                        <TaxYesNo
                          value={taxContext.withdrawalPlanned}
                          onChange={v => setTaxContext(p => ({ ...p, withdrawalPlanned: v }))}
                        />
                      </TaxQuestion>
                      <TaxQuestion label="Are there any tax-loss harvesting opportunities or carryforward losses?">
                        <TaxYesNo
                          value={taxContext.hasLossHarvesting}
                          onChange={v => setTaxContext(p => ({ ...p, hasLossHarvesting: v }))}
                        />
                      </TaxQuestion>
                      <TaxQuestion label="Are there any restricted holdings, employer stock, or concentrated positions?">
                        <TaxYesNo
                          value={taxContext.hasRestrictions}
                          onChange={v => setTaxContext(p => ({ ...p, hasRestrictions: v }))}
                        />
                      </TaxQuestion>

                      <div className="flex gap-2 pt-1">
                        <Button
                          size="sm"
                          onClick={() => setTaxCompleted(true)}
                          className="text-xs bg-violet-600 hover:bg-violet-700 text-white"
                        >
                          <Scale className="w-3 h-3 mr-1" />
                          Apply Tax Context
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => { setShowTaxQ(false); }}
                          className="text-xs text-[var(--dash-text-4)]"
                        >
                          Skip
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {taxCompleted && (
                <div className="rounded-xl border p-3 border-violet-500/20 flex items-center justify-between" style={{ backgroundColor: 'var(--dash-bg-card)' }}>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-violet-500" />
                    <span className="text-xs text-[var(--dash-text-2)]">
                      Tax context applied — {taxContext.accountType ? taxContext.accountType.replace('-', ' ').replace('ira', 'IRA') : 'account type unspecified'}
                      {taxContext.taxBracket && taxContext.taxBracket !== 'unsure' ? `, ${taxContext.taxBracket}% bracket` : ''}
                      {taxContext.state ? `, ${taxContext.state}` : ''}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => { setTaxCompleted(false); setShowTaxQ(true); }}
                    className="text-xs text-violet-600 dark:text-violet-400"
                  >
                    Edit
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Empty State */}
      {!analyzed && holdings.length === 0 && (
        <div className="text-center py-8 text-sm text-[var(--dash-text-4)]">
          Add your portfolio tickers above to see how your holdings align with the report's market insights, sector trends, and risk signals.
        </div>
      )}
    </div>
  );
}

function TaxQuestion({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3">
      <label className="text-xs text-[var(--dash-text-2)] sm:w-80 flex-shrink-0">{label}</label>
      {children}
    </div>
  );
}

function TaxSelect({ value, onChange, options }: {
  value: string;
  onChange: (v: string) => void;
  options: Array<{ value: string; label: string }>;
}) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className="px-2 py-1.5 rounded-lg border text-xs bg-transparent text-[var(--dash-text-1)] min-w-[180px]"
      style={{ borderColor: 'var(--dash-border)' }}
    >
      {options.map(o => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  );
}

function TaxYesNo({ value, onChange }: { value: boolean | null; onChange: (v: boolean) => void }) {
  return (
    <div className="flex gap-2">
      <button
        onClick={() => onChange(true)}
        className={`px-3 py-1 rounded-lg border text-xs transition-colors ${value === true ? 'bg-violet-500/10 border-violet-500/30 text-violet-600 dark:text-violet-400 font-medium' : 'border-[var(--dash-border)] text-[var(--dash-text-4)] hover:text-[var(--dash-text-2)]'}`}
      >
        Yes
      </button>
      <button
        onClick={() => onChange(false)}
        className={`px-3 py-1 rounded-lg border text-xs transition-colors ${value === false ? 'bg-violet-500/10 border-violet-500/30 text-violet-600 dark:text-violet-400 font-medium' : 'border-[var(--dash-border)] text-[var(--dash-text-4)] hover:text-[var(--dash-text-2)]'}`}
      >
        No
      </button>
    </div>
  );
}
