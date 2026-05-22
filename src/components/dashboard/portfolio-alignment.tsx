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
import { useT } from '@/lib/i18n';

const actionConfig: Record<string, { icon: typeof TrendingUp; color: string; labelKey: string; bg: string }> = {
  hold: { icon: Minus, color: 'text-[var(--dash-text-4)]', labelKey: 'portfolio.actions.hold', bg: 'bg-gray-50 dark:bg-gray-500/10 border-gray-200 dark:border-gray-500/20' },
  'buy more': { icon: TrendingUp, color: 'text-green-600 dark:text-green-400', labelKey: 'portfolio.actions.buyMore', bg: 'bg-green-50 dark:bg-green-500/10 border-green-200 dark:border-green-500/20' },
  reduce: { icon: TrendingDown, color: 'text-amber-600 dark:text-amber-400', labelKey: 'portfolio.actions.reduce', bg: 'bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/20' },
  exit: { icon: X, color: 'text-red-600 dark:text-red-400', labelKey: 'portfolio.actions.exit', bg: 'bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/20' },
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
  const t = useT();
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
      .filter(sym => !holdings.find(h => h.ticker === sym))
      .map(sym => ({ ticker: sym, shares: 0 }));
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
          <h3 className="text-sm md:text-base font-semibold text-[var(--dash-text-1)]">{t('portfolio.title')}</h3>
          <p className="text-xs text-[var(--dash-text-4)]">{t('portfolio.subtitle')}</p>
        </div>
      </div>

      {/* Ticker Input */}
      <div className="rounded-xl border p-4 md:p-5 transition-colors" style={{ backgroundColor: 'var(--dash-bg-card)', borderColor: 'var(--dash-border)' }}>
        <div className="text-xs text-[var(--dash-text-2)] mb-3">
          {t('portfolio.inputDesc')}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={tickerInput}
            onChange={e => setTickerInput(e.target.value.toUpperCase())}
            onKeyDown={e => { if (e.key === 'Enter') addTicker(); }}
            placeholder={t('portfolio.placeholder')}
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
            {t('portfolio.add')}
          </Button>
        </div>

        {/* Holdings Input Table */}
        {holdings.length > 0 && (
          <div className="mt-4 space-y-1.5">
            {/* Desktop / Tablet Header */}
            <div className="hidden md:grid grid-cols-[minmax(160px,1.5fr)_minmax(110px,0.8fr)_minmax(130px,0.9fr)_minmax(110px,0.7fr)_40px] gap-4 px-3 text-xs text-[var(--dash-text-4)] font-medium uppercase tracking-wide">
              <div>{t('portfolio.table.tickerCompany')}</div>
              <div className="text-right">{t('portfolio.table.shares')}</div>
              <div className="text-right">{t('portfolio.table.costBasis')}</div>
              <div className="text-right">{t('portfolio.table.currentPrice')}</div>
              <div />
            </div>

            {holdings.map(h => {
              const profile = lookupTicker(h.ticker);
              const price = getTickerPrice(h.ticker);
              return (
                <div
                  key={h.ticker}
                  className="rounded-lg border p-3 transition-colors"
                  style={{ backgroundColor: 'var(--dash-bg-muted)', borderColor: 'var(--dash-border)' }}
                >
                  {/* Desktop / Tablet row */}
                  <div className="hidden md:grid grid-cols-[minmax(160px,1.5fr)_minmax(110px,0.8fr)_minmax(130px,0.9fr)_minmax(110px,0.7fr)_40px] gap-4 items-center">
                    {/* Ticker + Company */}
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="font-mono font-bold text-sm text-[var(--dash-text-1)] flex-shrink-0">{h.ticker}</span>
                      {profile && <span className="text-xs text-[var(--dash-text-4)] truncate">{profile.name}</span>}
                      {!profile && <span className="text-xs text-amber-500 flex-shrink-0">{t('portfolio.unknownTicker')}</span>}
                    </div>

                    {/* Shares */}
                    <input
                      type="number"
                      min={0}
                      step={1}
                      value={h.shares || ''}
                      onChange={e => updateShares(h.ticker, parseFloat(e.target.value) || 0)}
                      placeholder="0"
                      className="w-full min-w-[90px] px-3 py-2 rounded-lg border text-sm bg-transparent text-[var(--dash-text-1)] text-right tabular-nums"
                      style={{ borderColor: 'var(--dash-border)' }}
                    />

                    {/* Cost Basis */}
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-[var(--dash-text-4)]">$</span>
                      <input
                        type="number"
                        min={0}
                        step={0.01}
                        value={h.costBasis ?? ''}
                        onChange={e => updateCostBasis(h.ticker, e.target.value ? parseFloat(e.target.value) : undefined)}
                        placeholder="optional"
                        className="w-full min-w-[100px] pl-6 pr-3 py-2 rounded-lg border text-sm bg-transparent text-[var(--dash-text-1)] text-right tabular-nums"
                        style={{ borderColor: 'var(--dash-border)' }}
                      />
                    </div>

                    {/* Current Price (read-only) */}
                    <div className="flex items-center justify-end px-3 py-2 rounded-lg border border-transparent" style={{ backgroundColor: 'var(--dash-bg-card)' }}>
                      <span className="text-sm font-medium text-[var(--dash-text-2)] tabular-nums">{price ? fmtPrice(price) : '—'}</span>
                    </div>

                    {/* Remove */}
                    <div className="flex items-center justify-center">
                      <button onClick={() => removeTicker(h.ticker)} className="text-[var(--dash-text-4)] hover:text-red-500 p-1.5 rounded-md hover:bg-red-500/10 transition-colors">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Mobile layout */}
                  <div className="md:hidden space-y-3">
                    {/* Ticker row with remove button */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="font-mono font-bold text-sm text-[var(--dash-text-1)] flex-shrink-0">{h.ticker}</span>
                        {profile && <span className="text-xs text-[var(--dash-text-4)] truncate">{profile.name}</span>}
                        {!profile && <span className="text-xs text-amber-500 flex-shrink-0">{t('portfolio.unknownTicker')}</span>}
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        {price && <span className="text-sm font-medium text-[var(--dash-text-2)] tabular-nums">{fmtPrice(price)}</span>}
                        <button onClick={() => removeTicker(h.ticker)} className="text-[var(--dash-text-4)] hover:text-red-500 p-1 rounded-md hover:bg-red-500/10 transition-colors">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Shares + Cost Basis side by side */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs text-[var(--dash-text-4)] mb-1 block">{t('portfolio.table.shares')}</label>
                        <input
                          type="number"
                          min={0}
                          step={1}
                          value={h.shares || ''}
                          onChange={e => updateShares(h.ticker, parseFloat(e.target.value) || 0)}
                          placeholder="0"
                          className="w-full px-3 py-2 rounded-lg border text-sm bg-transparent text-[var(--dash-text-1)] text-right tabular-nums"
                          style={{ borderColor: 'var(--dash-border)' }}
                        />
                      </div>
                      <div>
                        <label className="text-xs text-[var(--dash-text-4)] mb-1 block">{t('portfolio.table.avgCost')}</label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-[var(--dash-text-4)]">$</span>
                          <input
                            type="number"
                            min={0}
                            step={0.01}
                            value={h.costBasis ?? ''}
                            onChange={e => updateCostBasis(h.ticker, e.target.value ? parseFloat(e.target.value) : undefined)}
                            placeholder="optional"
                            className="w-full pl-6 pr-3 py-2 rounded-lg border text-sm bg-transparent text-[var(--dash-text-1)] text-right tabular-nums"
                            style={{ borderColor: 'var(--dash-border)' }}
                          />
                        </div>
                      </div>
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
                <div className="text-xs text-[var(--dash-text-4)]">{t('portfolio.summary.totalValue')}</div>
                <div className="text-base font-bold text-[var(--dash-text-1)]">{fmtUsd(valuation.totalValue)}</div>
              </div>
              <div>
                <div className="text-xs text-[var(--dash-text-4)]">{t('portfolio.summary.holdings')}</div>
                <div className="text-base font-bold text-[var(--dash-text-1)]">{valuation.holdings.length}</div>
              </div>
              <div>
                <div className="text-xs text-[var(--dash-text-4)]">{t('portfolio.summary.topHolding')}</div>
                <div className="text-base font-bold text-[var(--dash-text-1)]">{valuation.topHoldingPct.toFixed(1)}%</div>
              </div>
              <div>
                <div className="text-xs text-[var(--dash-text-4)]">{t('portfolio.summary.concentration')}</div>
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
              {t('portfolio.analyzePortfolio')}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className="text-xs text-[var(--dash-text-4)] hover:text-[var(--dash-text-2)]"
            >
              <Trash2 className="w-3 h-3 mr-1" />
              {t('portfolio.clearAll')}
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
                {t('portfolio.summary.portfolioSummary')} <span className="capitalize">{summary.overallAlignment}</span>
              </h4>
              <div className="text-xs text-[var(--dash-text-4)]">
                {t('portfolio.summary.weightedScore')} <span className={`font-bold ${scoreColor(summary.score)}`}>{summary.score}/10</span>
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
                  {valuation.concentrationRisk === 'high'
                    ? t('portfolio.summary.concHigh', { pct: valuation.topHoldingPct.toFixed(1), hhi: Math.round(valuation.concentrationHHI) })
                    : t('portfolio.summary.concModerate', { pct: valuation.topHoldingPct.toFixed(1), hhi: Math.round(valuation.concentrationHHI) })}
                </span>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {summary.strengths.length > 0 && (
              <div className="rounded-lg p-3 bg-green-50 dark:bg-green-500/5 border border-green-200 dark:border-green-500/10">
                <div className="text-xs uppercase tracking-wide text-green-700 dark:text-green-400 font-medium mb-1.5">{t('portfolio.summary.strengths')}</div>
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
                <div className="text-xs uppercase tracking-wide text-amber-700 dark:text-amber-400 font-medium mb-1.5">{t('portfolio.summary.gaps')}</div>
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
            <h4 className="text-sm md:text-base font-semibold text-[var(--dash-text-1)]">{t('portfolio.analysis.title')}</h4>
            <span className="text-xs text-[var(--dash-text-4)]">{t('portfolio.analysis.subtitle')}</span>
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
                    <Badge variant="outline" className={`text-xs ${recColors[a.recommendation]}`}>
                      {actionConfig[a.recommendation] ? t(actionConfig[a.recommendation].labelKey) : a.recommendation}
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
                              <div className="text-xs text-[var(--dash-text-4)]">{t('portfolio.table.shares')}</div>
                              <div className="text-sm font-bold text-[var(--dash-text-1)]">{hv.shares}</div>
                            </div>
                            <div>
                              <div className="text-xs text-[var(--dash-text-4)]">{t('portfolio.analysis.marketValue')}</div>
                              <div className="text-sm font-bold text-[var(--dash-text-1)]">{fmtUsd(hv.marketValue)}</div>
                            </div>
                            <div>
                              <div className="text-xs text-[var(--dash-text-4)]">{t('portfolio.analysis.allocation')}</div>
                              <div className="text-sm font-bold text-[var(--dash-text-1)]">{hv.allocationPct.toFixed(1)}%</div>
                            </div>
                            {hv.gainLoss != null && (
                              <div>
                                <div className="text-xs text-[var(--dash-text-4)]">{t('portfolio.analysis.gainLoss')}</div>
                                <div className={`text-sm font-bold ${hv.gainLoss >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-500'}`}>
                                  {hv.gainLoss >= 0 ? '+' : ''}{fmtUsd(Math.abs(hv.gainLoss))} ({hv.gainLossPct!.toFixed(1)}%)
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                        <div>
                          <div className="text-xs uppercase tracking-wide text-[var(--dash-text-4)] font-medium mb-1">{t('portfolio.analysis.alignmentExplanation')}</div>
                          <p className="text-xs text-[var(--dash-text-2)] leading-relaxed">{a.explanation}</p>
                        </div>
                        <div>
                          <div className="text-xs uppercase tracking-wide text-[var(--dash-text-4)] font-medium mb-1">{t('portfolio.analysis.risksWatchouts')}</div>
                          <p className="text-xs text-[var(--dash-text-2)] leading-relaxed">{a.risks}</p>
                        </div>
                        <div className={`rounded-lg p-3 border ${recColors[a.recommendation]}`}>
                          <div className="text-xs uppercase tracking-wide font-medium mb-1">{t('portfolio.analysis.recommendation')}</div>
                          <p className="text-xs font-medium">{actionConfig[a.recommendation] ? t(actionConfig[a.recommendation].labelKey) : a.recommendation}</p>
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
            <span><span className="inline-block w-2 h-2 rounded-full bg-red-500 mr-1" />{t('portfolio.analysis.legend.low')}</span>
            <span><span className="inline-block w-2 h-2 rounded-full bg-amber-500 mr-1" />{t('portfolio.analysis.legend.moderate')}</span>
            <span><span className="inline-block w-2 h-2 rounded-full bg-cyan-500 mr-1" />{t('portfolio.analysis.legend.strong')}</span>
            <span><span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-1" />{t('portfolio.analysis.legend.veryStrong')}</span>
          </div>
        </div>
      )}

      {/* Revised Portfolio View */}
      {alignments.length > 0 && hasShares && valuation && valuation.totalValue > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <RefreshCw className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
            <h4 className="text-sm md:text-base font-semibold text-[var(--dash-text-1)]">{t('portfolio.revised.title')}</h4>
            {!showRevised && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowRevised(true)}
                className="ml-2 text-xs border-indigo-500/30 text-indigo-600 dark:text-indigo-400"
              >
                {t('portfolio.revised.generateBtn')}
              </Button>
            )}
          </div>

          {!showRevised && (
            <div className="text-xs text-[var(--dash-text-3)] rounded-xl border p-4" style={{ backgroundColor: 'var(--dash-bg-card)', borderColor: 'var(--dash-border)' }}>
              {t('portfolio.revised.previewDesc')}
            </div>
          )}

          {showRevised && revisedAllocations.length > 0 && (
            <div className="space-y-3">
              <div className="rounded-xl border p-4" style={{ backgroundColor: 'var(--dash-bg-card)', borderColor: 'var(--dash-border)' }}>
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="w-4 h-4 text-amber-500" />
                  <span className="text-xs text-amber-600 dark:text-amber-400 font-medium uppercase tracking-wide">{t('portfolio.revised.disclaimer')}</span>
                </div>
                <p className="text-xs text-[var(--dash-text-2)] leading-relaxed mb-1">
                  {t('portfolio.revised.disclaimerDesc')}
                </p>
                <p className="text-xs text-[var(--dash-text-4)]">
                  {t('portfolio.revised.disclaimerNote')}
                </p>
              </div>

              <div className="space-y-2">
                {revisedAllocations.map(r => {
                  const ac = actionConfig[r.action];
                  const ActionIcon = ac.icon;
                  const shareDiff = r.targetShares - r.currentShares;
                  const taxInfo = taxImplications.find(ti => ti.ticker === r.ticker);
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
                        <Badge variant="outline" className={`text-xs border ${ac.bg} ${ac.color}`}>
                          <ActionIcon className="w-3 h-3 mr-1" />
                          {t(ac.labelKey)}
                        </Badge>
                      </div>

                      {/* Current → Target grid */}
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <div className="rounded-lg border p-2.5" style={{ borderColor: 'var(--dash-border)' }}>
                          <div className="text-xs text-[var(--dash-text-4)] mb-1">{t('portfolio.revised.currentPosition')}</div>
                          <div className="text-sm font-bold text-[var(--dash-text-1)]">{r.currentShares} {t('portfolio.revised.shares')}</div>
                          <div className="text-xs text-[var(--dash-text-3)]">{fmtUsd(r.currentValue)} · {r.currentPct}%</div>
                        </div>
                        <div className={`rounded-lg border p-2.5 ${r.action !== 'hold' ? ac.bg : ''}`} style={r.action === 'hold' ? { borderColor: 'var(--dash-border)' } : {}}>
                          <div className="text-xs text-[var(--dash-text-4)] mb-1">{t('portfolio.revised.targetPosition')}</div>
                          <div className={`text-sm font-bold ${r.action !== 'hold' ? ac.color : 'text-[var(--dash-text-1)]'}`}>
                            {r.targetShares} {t('portfolio.revised.shares')}
                          </div>
                          <div className="text-xs text-[var(--dash-text-3)]">{fmtUsd(r.targetValue)} · {r.targetPct}%</div>
                        </div>
                      </div>

                      {/* Share difference callout */}
                      {shareDiff !== 0 && (
                        <div className={`flex items-center gap-1.5 text-xs font-medium mb-2 ${ac.color}`}>
                          <ActionIcon className="w-3 h-3" />
                          {r.action === 'exit' ? (
                            <span>{t('portfolio.revised.sellAll', { shares: r.currentShares, value: fmtUsd(r.currentValue) })}</span>
                          ) : r.action === 'buy more' ? (
                            <span>{t('portfolio.revised.buyMore', { shares: shareDiff, value: fmtUsd(Math.abs(shareDiff) * (r.targetValue / Math.max(r.targetShares, 1))) })}</span>
                          ) : (
                            <span>{t('portfolio.revised.sellShares', { shares: Math.abs(shareDiff), value: fmtUsd(Math.abs(shareDiff) * (r.currentValue / Math.max(r.currentShares, 1))) })}</span>
                          )}
                        </div>
                      )}

                      <div className="text-xs text-[var(--dash-text-2)] leading-relaxed">{r.reason}</div>
                      <div className="text-xs text-[var(--dash-text-4)] mt-1 italic">{r.supportingInsight}</div>

                      {taxInfo && (
                        <div className="mt-3 border-t border-[var(--dash-border)] pt-3 space-y-2">
                          <div className="flex items-center gap-1.5 mb-1">
                            <Scale className="w-3 h-3 text-violet-500" />
                            <span className="text-xs uppercase tracking-wide text-violet-600 dark:text-violet-400 font-medium">{t('portfolio.tax.taxContext')}</span>
                          </div>
                          {r.action !== 'hold' && (
                            <div>
                              <div className="text-xs text-[var(--dash-text-4)] font-medium">{t('portfolio.tax.investmentRationale')}</div>
                              <p className="text-sm text-[var(--dash-text-2)] leading-relaxed">{taxInfo.investmentRationale}</p>
                            </div>
                          )}
                          <div>
                            <div className="text-xs text-[var(--dash-text-4)] font-medium">{t('portfolio.tax.taxConsiderations')}</div>
                            <p className="text-sm text-[var(--dash-text-2)] leading-relaxed">{taxInfo.taxConsiderations}</p>
                          </div>
                          <div>
                            <div className="text-xs text-[var(--dash-text-4)] font-medium">{t('portfolio.tax.accountGuidance')}</div>
                            <p className="text-sm text-[var(--dash-text-2)] leading-relaxed">{taxInfo.accountGuidance}</p>
                          </div>
                          {taxInfo.assumptions.length > 0 && (
                            <div className="rounded-lg p-2 bg-violet-50 dark:bg-violet-500/5 border border-violet-200 dark:border-violet-500/10">
                              <div className="text-xs text-violet-700 dark:text-violet-400 font-medium mb-0.5">{t('portfolio.tax.assumptionsCaveats')}</div>
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
                    <h4 className="text-sm md:text-base font-semibold text-[var(--dash-text-1)]">{t('portfolio.tax.title')}</h4>
                  </div>
                  <p className="text-xs text-[var(--dash-text-4)] mb-4">
                    {t('portfolio.tax.subtitle')}
                  </p>

                  {!showTaxQ ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowTaxQ(true)}
                      className="text-xs border-violet-500/30 text-violet-600 dark:text-violet-400"
                    >
                      <Scale className="w-3 h-3 mr-1" />
                      {t('portfolio.tax.addTaxContext')}
                    </Button>
                  ) : (
                    <div className="space-y-4">
                      <TaxQuestion label={t('portfolio.tax.questions.accountType')}>
                        <TaxSelect
                          value={taxContext.accountType}
                          onChange={v => setTaxContext(p => ({ ...p, accountType: v as AccountType }))}
                          options={[
                            { value: '', label: t('portfolio.tax.options.select') },
                            { value: 'taxable', label: t('portfolio.tax.options.taxable') },
                            { value: 'traditional-ira', label: t('portfolio.tax.options.traditionalIra') },
                            { value: 'roth-ira', label: t('portfolio.tax.options.rothIra') },
                            { value: '401k', label: t('portfolio.tax.options.retirement401k') },
                            { value: 'hsa', label: t('portfolio.tax.options.hsa') },
                            { value: 'multiple', label: t('portfolio.tax.options.multiple') },
                          ]}
                        />
                      </TaxQuestion>
                      <TaxQuestion label={t('portfolio.tax.questions.taxBracket')}>
                        <TaxSelect
                          value={taxContext.taxBracket}
                          onChange={v => setTaxContext(p => ({ ...p, taxBracket: v as TaxBracket }))}
                          options={[
                            { value: '', label: t('portfolio.tax.options.select') },
                            { value: '10-12', label: t('portfolio.tax.options.bracket1012') },
                            { value: '22-24', label: t('portfolio.tax.options.bracket2224') },
                            { value: '32-35', label: t('portfolio.tax.options.bracket3235') },
                            { value: '37', label: t('portfolio.tax.options.bracket37') },
                            { value: 'unsure', label: t('portfolio.tax.options.unsure') },
                          ]}
                        />
                      </TaxQuestion>
                      <TaxQuestion label={t('portfolio.tax.questions.state')}>
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
                      <TaxQuestion label={t('portfolio.tax.questions.gainStatus')}>
                        <TaxSelect
                          value={taxContext.gainStatus}
                          onChange={v => setTaxContext(p => ({ ...p, gainStatus: v as GainStatus }))}
                          options={[
                            { value: '', label: t('portfolio.tax.options.select') },
                            { value: 'mostly-gains', label: t('portfolio.tax.options.mostlyGains') },
                            { value: 'mostly-losses', label: t('portfolio.tax.options.mostlyLosses') },
                            { value: 'mixed', label: t('portfolio.tax.options.mixed') },
                            { value: 'unsure', label: t('portfolio.tax.options.unsure') },
                          ]}
                        />
                      </TaxQuestion>
                      <TaxQuestion label={t('portfolio.tax.questions.gainTerm')}>
                        <TaxSelect
                          value={taxContext.gainTerm}
                          onChange={v => setTaxContext(p => ({ ...p, gainTerm: v as GainTerm }))}
                          options={[
                            { value: '', label: t('portfolio.tax.options.select') },
                            { value: 'short-term', label: t('portfolio.tax.options.shortTerm') },
                            { value: 'long-term', label: t('portfolio.tax.options.longTerm') },
                            { value: 'both', label: t('portfolio.tax.options.both') },
                            { value: 'unsure', label: t('portfolio.tax.options.unsure') },
                          ]}
                        />
                      </TaxQuestion>
                      <TaxQuestion label={t('portfolio.tax.questions.withdrawal')}>
                        <TaxYesNo
                          value={taxContext.withdrawalPlanned}
                          onChange={v => setTaxContext(p => ({ ...p, withdrawalPlanned: v }))}
                        />
                      </TaxQuestion>
                      <TaxQuestion label={t('portfolio.tax.questions.lossHarvesting')}>
                        <TaxYesNo
                          value={taxContext.hasLossHarvesting}
                          onChange={v => setTaxContext(p => ({ ...p, hasLossHarvesting: v }))}
                        />
                      </TaxQuestion>
                      <TaxQuestion label={t('portfolio.tax.questions.restrictions')}>
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
                          {t('portfolio.tax.applyTaxContext')}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => { setShowTaxQ(false); }}
                          className="text-xs text-[var(--dash-text-4)]"
                        >
                          {t('portfolio.tax.skip')}
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
                      {t('portfolio.tax.applied')} — {taxContext.accountType ? taxContext.accountType.replace('-', ' ').replace('ira', 'IRA') : 'account type unspecified'}
                      {taxContext.taxBracket && taxContext.taxBracket !== 'unsure' ? `, ${taxContext.taxBracket}%` : ''}
                      {taxContext.state ? `, ${taxContext.state}` : ''}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => { setTaxCompleted(false); setShowTaxQ(true); }}
                    className="text-xs text-violet-600 dark:text-violet-400"
                  >
                    {t('portfolio.tax.edit')}
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
          {t('portfolio.emptyState')}
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
  const t = useT();
  return (
    <div className="flex gap-2">
      <button
        onClick={() => onChange(true)}
        className={`px-3 py-1 rounded-lg border text-xs transition-colors ${value === true ? 'bg-violet-500/10 border-violet-500/30 text-violet-600 dark:text-violet-400 font-medium' : 'border-[var(--dash-border)] text-[var(--dash-text-4)] hover:text-[var(--dash-text-2)]'}`}
      >
        {t('portfolio.tax.yesNo.yes')}
      </button>
      <button
        onClick={() => onChange(false)}
        className={`px-3 py-1 rounded-lg border text-xs transition-colors ${value === false ? 'bg-violet-500/10 border-violet-500/30 text-violet-600 dark:text-violet-400 font-medium' : 'border-[var(--dash-border)] text-[var(--dash-text-4)] hover:text-[var(--dash-text-2)]'}`}
      >
        {t('portfolio.tax.yesNo.no')}
      </button>
    </div>
  );
}
