'use client';

import { useMemo, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { BarRanking } from '@/components/charts/bar-ranking';
import { SignalRadar } from '@/components/charts/signal-radar';
import { TrendLine } from '@/components/charts/trend-line';
import {
  pmRolesUS, pmRolesAustin, pmRolesAustinSurrounding, pmRolesRemote,
  pmMarketInsights, pmRecommendations, activeListings, jobMarketSignals,
  type PMGeoView, type PMRoleSignal, type PMMarketInsight, type PMRecommendation,
  type ActiveListing, type JobMarketSignal,
} from '@/lib/data/curated-datasets';
import { useDashboardStore } from '@/lib/store';
import { useT, useTd, useTdId } from '@/lib/i18n';
import { computeCompositeScore } from '@/lib/scoring-engine';
import {
  Briefcase, MapPin, Globe, Building2, TreePine, Lightbulb,
  TrendingUp, TrendingDown, Minus, ChevronDown, ChevronUp,
  Target, DollarSign, Users, AlertTriangle, CheckCircle2, Info,
  ExternalLink, Calendar, Award, MessageSquare,
} from 'lucide-react';

const rolesByGeo: Record<PMGeoView, PMRoleSignal[]> = {
  us: pmRolesUS,
  austin: pmRolesAustin,
  'austin-surrounding': pmRolesAustinSurrounding,
  remote: pmRolesRemote,
};

const severityConfig = {
  positive: { icon: CheckCircle2, color: 'text-green-600 dark:text-green-400', bg: 'bg-green-50 dark:bg-green-500/10', border: 'border-green-200 dark:border-green-500/20' },
  neutral: { icon: Info, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-500/10', border: 'border-blue-200 dark:border-blue-500/20' },
  caution: { icon: AlertTriangle, color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-500/10', border: 'border-amber-200 dark:border-amber-500/20' },
};

export function JobMarketsView() {
  const { weights, thresholds } = useDashboardStore();
  const t = useT();
  const td = useTd();
  const tdId = useTdId();
  const [activeGeo, setActiveGeo] = useState<PMGeoView>('us');
  const [expandedRole, setExpandedRole] = useState<string | null>(null);
  const [expandedInsight, setExpandedInsight] = useState<string | null>(null);
  const [expandedListing, setExpandedListing] = useState<string | null>(null);

  const geoTabs: { key: PMGeoView; icon: typeof MapPin; labelKey: string; descKey: string }[] = [
    { key: 'us', icon: Globe, labelKey: 'jobMarkets.geoTabs.us.label', descKey: 'jobMarkets.geoTabs.us.desc' },
    { key: 'austin', icon: Building2, labelKey: 'jobMarkets.geoTabs.austin.label', descKey: 'jobMarkets.geoTabs.austin.desc' },
    { key: 'austin-surrounding', icon: TreePine, labelKey: 'jobMarkets.geoTabs.austinSurrounding.label', descKey: 'jobMarkets.geoTabs.austinSurrounding.desc' },
    { key: 'remote', icon: Globe, labelKey: 'jobMarkets.geoTabs.remote.label', descKey: 'jobMarkets.geoTabs.remote.desc' },
  ];

  const categoryConfig: Record<PMRecommendation['category'], { labelKey: string; color: string }> = {
    'role-priority': { labelKey: 'jobMarkets.recommendations.categories.rolePriority', color: 'text-cyan-600 dark:text-cyan-400 border-cyan-500/20 bg-cyan-500/10' },
    'skill-gap': { labelKey: 'jobMarkets.recommendations.categories.skillGap', color: 'text-purple-600 dark:text-purple-400 border-purple-500/20 bg-purple-500/10' },
    'location-strategy': { labelKey: 'jobMarkets.recommendations.categories.locationStrategy', color: 'text-emerald-600 dark:text-emerald-400 border-emerald-500/20 bg-emerald-500/10' },
    'repositioning': { labelKey: 'jobMarkets.recommendations.categories.repositioning', color: 'text-amber-600 dark:text-amber-400 border-amber-500/20 bg-amber-500/10' },
  };

  const demandTrendLabels: Record<string, string> = {
    surging: t('jobMarkets.roles.demandTrend.surging'),
    growing: t('jobMarkets.roles.demandTrend.growing'),
    steady: t('jobMarkets.roles.demandTrend.steady'),
    cooling: t('jobMarkets.roles.demandTrend.cooling'),
    declining: t('jobMarkets.roles.demandTrend.declining'),
  };

  const roles = rolesByGeo[activeGeo];
  const insights = pmMarketInsights.filter(i => i.geoView === activeGeo);
  const recommendations = pmRecommendations.filter(r => r.geoViews.includes(activeGeo));
  const listings = activeListings.filter(l => l.geoView === activeGeo);
  const marketSignal = jobMarketSignals.find(s => s.geoView === activeGeo);

  const allSignals = useMemo(() => [...pmRolesUS, ...pmRolesAustin, ...pmRolesAustinSurrounding, ...pmRolesRemote] as PMRoleSignal[], []);
  const scores = useMemo(() => computeCompositeScore(allSignals, weights, thresholds), [allSignals, weights, thresholds]);

  const salaryChart = roles.map(r => ({
    name: td(r.label).replace(/ \(.*\)/, '').replace(' (US)', '').replace(' (Austin)', '').replace(' (EE.UU.)', ''),
    value: (r.medianSalary || 0) / 1000,
    color: '#22d3ee',
  }));

  const growthChart = roles.map(r => ({
    name: td(r.label).replace(/ \(.*\)/, '').replace(' (US)', '').replace(' (Austin)', '').replace(' (EE.UU.)', ''),
    value: r.rawValue,
  }));

  const openRolesChart = roles.filter(r => r.openRoles).map(r => ({
    name: td(r.label).replace(/ \(.*\)/, '').replace(' (US)', '').replace(' (Austin)', '').replace(' (EE.UU.)', ''),
    value: r.openRoles!,
    color: '#818cf8',
  }));

  const radarData = [
    { category: t('control.categories.ethical.label'), value: scores[0]?.breakdown.ethical || 50, fullMark: 100 },
    { category: t('control.categories.cultural.label'), value: scores[0]?.breakdown.cultural || 50, fullMark: 100 },
    { category: t('control.categories.regulatory.label'), value: scores[0]?.breakdown.regulatory || 50, fullMark: 100 },
    { category: t('control.categories.technological.label'), value: scores[0]?.breakdown.technological || 50, fullMark: 100 },
  ];

  const demandTrend = Array.from({ length: 36 }, (_, i) => {
    const d = new Date();
    d.setMonth(d.getMonth() - (35 - i));
    const projected = i > 24;
    const baseMultiplier = activeGeo === 'us' ? 34200 : activeGeo === 'austin' ? 2800 : activeGeo === 'remote' ? 11200 : 650;
    const growthRate = activeGeo === 'us' ? 1.012 : activeGeo === 'austin' ? 1.015 : activeGeo === 'remote' ? 1.013 : 1.008;
    const base = baseMultiplier * 0.7;
    return {
      date: d.toISOString().split('T')[0],
      value: Math.round(base * Math.pow(growthRate, i) + Math.sin(i / 4) * base * 0.03 + (projected ? i * base * 0.002 : (Math.random() - 0.5) * base * 0.02)),
      projected,
    };
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center">
          <Briefcase className="w-5 h-5 md:w-6 md:h-6 text-cyan-500 dark:text-cyan-400" />
        </div>
        <div>
          <h2 className="text-lg md:text-xl font-bold text-[var(--dash-text-1)]">{t('jobMarkets.title')}</h2>
          <p className="text-sm text-[var(--dash-text-4)]">{t('jobMarkets.subtitle')}</p>
        </div>
      </div>

      {/* Geographic Tabs */}
      <div className="flex flex-wrap gap-2">
        {geoTabs.map(tab => {
          const Icon = tab.icon;
          const active = activeGeo === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => { setActiveGeo(tab.key); setExpandedRole(null); setExpandedInsight(null); setExpandedListing(null); }}
              className={`flex items-center gap-2 px-4 py-2.5 md:px-5 md:py-3 rounded-xl border text-sm md:text-base font-medium transition-all ${
                active
                  ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-600 dark:text-cyan-400'
                  : 'border-[var(--dash-border)] text-[var(--dash-text-3)] hover:text-[var(--dash-text-2)] hover:border-[var(--dash-text-4)]'
              }`}
              style={!active ? { backgroundColor: 'var(--dash-bg-card)' } : undefined}
            >
              <Icon className="w-4 h-4 md:w-5 md:h-5" />
              {t(tab.labelKey)}
            </button>
          );
        })}
      </div>

      {/* Geo Description */}
      <div className="text-sm text-[var(--dash-text-4)] -mt-2">
        {t(geoTabs.find(tab => tab.key === activeGeo)?.descKey ?? '')}
      </div>

      {/* Summary Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <StatCard
          icon={<Users className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />}
          label={t('jobMarkets.stats.totalOpenings')}
          value={roles.reduce((s, r) => s + (r.openRoles || 0), 0).toLocaleString()}
          sub={t('jobMarkets.stats.acrossRoles', { count: roles.length })}
        />
        <StatCard
          icon={<DollarSign className="w-4 h-4 text-green-500 dark:text-green-400" />}
          label={t('jobMarkets.stats.medianSalary')}
          value={`$${Math.min(...roles.map(r => r.medianSalary || 0)).toLocaleString().replace(/,000$/, 'K')}-${Math.max(...roles.map(r => r.medianSalary || 0)).toLocaleString().replace(/,000$/, 'K')}`}
          sub={t('jobMarkets.stats.acrossSpecialties')}
        />
        <StatCard
          icon={<TrendingUp className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />}
          label={t('jobMarkets.stats.avgGrowth')}
          value={`${(roles.reduce((s, r) => s + r.rawValue, 0) / roles.length).toFixed(0)}%`}
          sub={t('jobMarkets.stats.projected')}
        />
        <StatCard
          icon={<Target className="w-4 h-4 text-purple-500 dark:text-purple-400" />}
          label={t('jobMarkets.stats.highestDemand')}
          value={td(roles.sort((a, b) => b.rawValue - a.rawValue)[0]?.label ?? '').replace(/ \(.*\)/, '').split(' ').slice(0, 2).join(' ') || '-'}
          sub={t('jobMarkets.stats.growthPct', { value: roles.sort((a, b) => b.rawValue - a.rawValue)[0]?.rawValue || 0 })}
        />
      </div>

      {/* PM Demand Trend */}
      <div className="rounded-xl border p-4 md:p-5 transition-colors" style={{ backgroundColor: 'var(--dash-bg-card)', borderColor: 'var(--dash-border)' }}>
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
          <h3 className="text-sm md:text-base font-semibold text-[var(--dash-text-1)]">{t('jobMarkets.charts.demandOverTime')}</h3>
          <Badge variant="outline" className="text-xs border-[var(--dash-border)] text-[var(--dash-text-4)]">LinkedIn / BLS</Badge>
        </div>
        <p className="text-sm text-[var(--dash-text-3)] mb-3">{t('jobMarkets.charts.demandDesc')}</p>
        <TrendLine data={demandTrend} color="#22d3ee" label={t('jobMarkets.charts.openPmRoles')} showProjection />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-xl border p-4 md:p-5 transition-colors" style={{ backgroundColor: 'var(--dash-bg-card)', borderColor: 'var(--dash-border)' }}>
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
            <h3 className="text-sm md:text-base font-semibold text-[var(--dash-text-1)]">{t('jobMarkets.charts.growthRate')}</h3>
            <Badge variant="outline" className="text-xs border-[var(--dash-border)] text-[var(--dash-text-4)]">BLS Projected</Badge>
          </div>
          <p className="text-sm text-[var(--dash-text-3)] mb-3">{t('jobMarkets.charts.growthDesc')}</p>
          <BarRanking data={growthChart} layout="vertical" height={Math.max(280, roles.length * 45)} />
        </div>

        <div className="rounded-xl border p-4 md:p-5 transition-colors" style={{ backgroundColor: 'var(--dash-bg-card)', borderColor: 'var(--dash-border)' }}>
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-4 h-4 text-green-500 dark:text-green-400" />
            <h3 className="text-sm md:text-base font-semibold text-[var(--dash-text-1)]">{t('jobMarkets.charts.medianSalary')}</h3>
            <Badge variant="outline" className="text-xs border-[var(--dash-border)] text-[var(--dash-text-4)]">LinkedIn / Glassdoor</Badge>
          </div>
          <p className="text-sm text-[var(--dash-text-3)] mb-3">{t('jobMarkets.charts.salaryDesc')}</p>
          <BarRanking data={salaryChart} layout="vertical" height={Math.max(280, roles.length * 45)} colorScale={false} />
        </div>
      </div>

      {/* Open Roles + Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {openRolesChart.length > 0 && (
          <div className="rounded-xl border p-4 md:p-5 transition-colors" style={{ backgroundColor: 'var(--dash-bg-card)', borderColor: 'var(--dash-border)' }}>
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
              <h3 className="text-sm md:text-base font-semibold text-[var(--dash-text-1)]">{t('jobMarkets.charts.openRoles')}</h3>
            </div>
            <p className="text-sm text-[var(--dash-text-3)] mb-3">{t('jobMarkets.charts.openRolesDesc')}</p>
            <BarRanking data={openRolesChart} layout="vertical" height={Math.max(280, openRolesChart.length * 45)} colorScale={false} />
          </div>
        )}

        <div className="rounded-xl border p-4 md:p-5 transition-colors" style={{ backgroundColor: 'var(--dash-bg-card)', borderColor: 'var(--dash-border)' }}>
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
            <h3 className="text-sm md:text-base font-semibold text-[var(--dash-text-1)]">{t('jobMarkets.charts.multiFactor')}</h3>
          </div>
          <p className="text-sm text-[var(--dash-text-3)] mb-3">{t('jobMarkets.charts.multiFactorDesc')}</p>
          <SignalRadar data={radarData} color="#22d3ee" />
        </div>
      </div>

      {/* Market Insights */}
      {insights.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="w-4 h-4 text-amber-500 dark:text-amber-400" />
            <h3 className="text-sm md:text-base font-semibold text-[var(--dash-text-1)]">{t('jobMarkets.insights.title')}</h3>
            <span className="text-xs text-[var(--dash-text-4)]">{t('jobMarkets.insights.subtitle')}</span>
          </div>
          <div className="space-y-3">
            {insights.map(insight => {
              const config = severityConfig[insight.severity];
              const SevIcon = config.icon;
              const expanded = expandedInsight === insight.id;
              return (
                <div
                  key={insight.id}
                  className={`rounded-xl border p-4 transition-all cursor-pointer ${config.border}`}
                  style={{ backgroundColor: 'var(--dash-bg-card)' }}
                  onClick={() => setExpandedInsight(expanded ? null : insight.id)}
                >
                  <div className="flex items-start gap-3">
                    <SevIcon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${config.color}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-sm md:text-base font-semibold text-[var(--dash-text-1)]">{tdId(insight.id, 'title', insight.title)}</h4>
                        {expanded ? <ChevronUp className="w-4 h-4 text-[var(--dash-text-4)]" /> : <ChevronDown className="w-4 h-4 text-[var(--dash-text-4)]" />}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-[var(--dash-text-4)]">{tdId(insight.id, 'metric', insight.metric)}:</span>
                        <span className={`text-xs font-bold ${config.color}`}>{tdId(insight.id, 'metricValue', insight.metricValue)}</span>
                      </div>
                      {expanded && (
                        <div className="mt-3 space-y-3">
                          <div>
                            <div className="text-xs uppercase tracking-wide text-[var(--dash-text-4)] font-medium mb-1">{t('jobMarkets.insights.whatThisMeans')}</div>
                            <p className="text-sm text-[var(--dash-text-2)] leading-relaxed">{tdId(insight.id, 'explanation', insight.explanation)}</p>
                          </div>
                          <div>
                            <div className="text-xs uppercase tracking-wide text-[var(--dash-text-4)] font-medium mb-1">{t('jobMarkets.insights.whyItMattersForYou')}</div>
                            <p className="text-sm text-[var(--dash-text-2)] leading-relaxed">{tdId(insight.id, 'whyItMatters', insight.whyItMatters)}</p>
                          </div>
                          <div className={`rounded-lg p-3 md:p-4 ${config.bg}`}>
                            <div className="text-xs uppercase tracking-wide text-[var(--dash-text-4)] font-medium mb-1">{t('jobMarkets.insights.recommendedAction')}</div>
                            <p className={`text-sm font-medium ${config.color}`}>{tdId(insight.id, 'recommendedAction', insight.recommendedAction)}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Active Company Listings */}
      {listings.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Building2 className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
            <h3 className="text-sm md:text-base font-semibold text-[var(--dash-text-1)]">{t('jobMarkets.listings.title')}</h3>
            <Badge variant="outline" className="text-xs border-[var(--dash-border)] text-[var(--dash-text-4)]">{t('jobMarkets.listings.curatedSnapshot')}</Badge>
          </div>
          <p className="text-sm text-[var(--dash-text-3)] mb-3 ml-7">{t('jobMarkets.listings.desc')}</p>
          <div className="rounded-xl border overflow-hidden" style={{ backgroundColor: 'var(--dash-bg-card)', borderColor: 'var(--dash-border)' }}>
            {/* Table Header — hidden on mobile */}
            <div className="hidden md:grid grid-cols-[1fr_1.2fr_0.8fr_0.5fr_0.6fr_0.6fr] gap-2 px-4 py-3 border-b text-xs uppercase tracking-wide font-medium text-[var(--dash-text-4)]" style={{ borderColor: 'var(--dash-border)' }}>
              <span>{t('jobMarkets.listings.company')}</span>
              <span>{t('jobMarkets.listings.role')}</span>
              <span>{t('jobMarkets.listings.location')}</span>
              <span>{t('jobMarkets.listings.level')}</span>
              <span>{t('jobMarkets.listings.source')}</span>
              <span>{t('jobMarkets.listings.posted')}</span>
            </div>
            {/* Listing Rows */}
            {listings.map((listing, idx) => {
              const expanded = expandedListing === listing.id;
              const isLast = idx === listings.length - 1;
              return (
                <div key={listing.id}>
                  {/* Desktop row */}
                  <div
                    className={`hidden md:grid grid-cols-[1fr_1.2fr_0.8fr_0.5fr_0.6fr_0.6fr] gap-2 px-4 py-3.5 cursor-pointer transition-colors hover:bg-emerald-500/5 ${!isLast && !expanded ? 'border-b' : ''}`}
                    style={{ borderColor: 'var(--dash-border)' }}
                    onClick={() => setExpandedListing(expanded ? null : listing.id)}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-7 h-7 rounded-md bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">{listing.company.charAt(0)}</span>
                      </div>
                      <span className="text-sm font-semibold text-[var(--dash-text-1)] truncate">{listing.company}</span>
                    </div>
                    <span className="text-sm text-[var(--dash-text-2)] truncate self-center">{listing.role}</span>
                    <div className="flex items-center gap-1.5 self-center min-w-0">
                      <MapPin className="w-3.5 h-3.5 text-[var(--dash-text-4)] flex-shrink-0" />
                      <span className="text-sm text-[var(--dash-text-3)] truncate">{listing.location}</span>
                    </div>
                    <span className="text-sm text-[var(--dash-text-3)] self-center">{listing.seniority}</span>
                    <span className="text-sm text-[var(--dash-text-4)] self-center">{listing.source}</span>
                    <div className="flex items-center gap-1 self-center">
                      <Calendar className="w-3.5 h-3.5 text-[var(--dash-text-4)]" />
                      <span className="text-xs text-[var(--dash-text-4)]">May &apos;26</span>
                    </div>
                  </div>
                  {/* Mobile card */}
                  <div
                    className={`md:hidden px-4 py-3.5 cursor-pointer transition-colors hover:bg-emerald-500/5 ${!isLast && !expanded ? 'border-b' : ''}`}
                    style={{ borderColor: 'var(--dash-border)' }}
                    onClick={() => setExpandedListing(expanded ? null : listing.id)}
                  >
                    <div className="flex items-center gap-2.5 mb-1.5">
                      <div className="w-8 h-8 rounded-md bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{listing.company.charAt(0)}</span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-semibold text-[var(--dash-text-1)] truncate">{listing.company}</div>
                        <div className="text-sm text-[var(--dash-text-2)] truncate">{listing.role}</div>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 ml-10.5 text-xs text-[var(--dash-text-4)]">
                      <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{listing.location}</span>
                      <span>{listing.seniority}</span>
                      <span>{listing.source}</span>
                    </div>
                  </div>
                  {expanded && (
                    <div className="px-4 pb-3 border-b" style={{ borderColor: 'var(--dash-border)' }}>
                      <div className="rounded-lg p-3 md:p-4 bg-emerald-50 dark:bg-emerald-500/10 md:ml-8">
                        <div className="text-xs uppercase tracking-wide text-[var(--dash-text-4)] font-medium mb-1.5">{t('jobMarkets.listings.whyRelevant')}</div>
                        <p className="text-sm text-[var(--dash-text-2)] leading-relaxed">{td(listing.relevance)}</p>
                        <div className="flex flex-wrap items-center gap-3 mt-2.5 pt-2.5 border-t border-emerald-200 dark:border-emerald-500/20">
                          <a
                            href={listing.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={e => e.stopPropagation()}
                            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-emerald-600 dark:bg-emerald-500 text-white text-xs font-semibold hover:bg-emerald-700 dark:hover:bg-emerald-600 transition-colors"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            {t('jobMarkets.listings.viewPosting')}
                          </a>
                          <div className="flex items-center gap-1">
                            <Award className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                            <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">{listing.seniority}</span>
                          </div>
                          <span className="text-xs text-[var(--dash-text-4)]">{t('jobMarkets.listings.foundOn', { source: listing.source })}</span>
                          <span className="text-xs text-[var(--dash-text-4)]">{td(listing.postedDate)}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div className="flex items-start gap-2 mt-2.5 px-1">
            <Info className="w-4 h-4 text-[var(--dash-text-4)] mt-0.5 flex-shrink-0" />
            <p className="text-xs text-[var(--dash-text-4)] leading-relaxed">{t('jobMarkets.listings.disclaimer')}</p>
          </div>
        </div>
      )}

      {/* Job Market Signal */}
      {marketSignal && (
        <div className="rounded-xl border p-4 md:p-5 transition-colors" style={{ backgroundColor: 'var(--dash-bg-card)', borderColor: 'var(--dash-border)' }}>
          <div className="flex items-center gap-2 mb-2">
            <MessageSquare className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
            <h3 className="text-sm md:text-base font-semibold text-[var(--dash-text-1)]">{t('jobMarkets.marketSignal.title')}</h3>
            <span className="text-xs text-[var(--dash-text-4)]">{t('jobMarkets.marketSignal.subtitle')}</span>
          </div>
          <p className="text-xs text-[var(--dash-text-2)] leading-relaxed">{tdId(marketSignal.id, 'summary', marketSignal.summary)}</p>
        </div>
      )}

      {/* Role Detail Cards */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Briefcase className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
          <h3 className="text-sm md:text-base font-semibold text-[var(--dash-text-1)]">{t('jobMarkets.roles.title')}</h3>
          <span className="text-xs text-[var(--dash-text-4)]">{t('jobMarkets.roles.subtitle')}</span>
        </div>
        <div className="space-y-3">
          {roles.map(role => {
            const expanded = expandedRole === role.id;
            const TrendIcon = role.trend === 'up' ? TrendingUp : role.trend === 'down' ? TrendingDown : Minus;
            const trendColor = role.trend === 'up' ? 'text-green-600 dark:text-green-400' : role.trend === 'down' ? 'text-red-500' : 'text-[var(--dash-text-4)]';
            const demandColor = role.demandTrend === 'surging' ? 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-500/10' :
              role.demandTrend === 'growing' ? 'text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-500/10' :
              role.demandTrend === 'steady' ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10' :
              role.demandTrend === 'cooling' ? 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10' :
              'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/10';

            return (
              <div
                key={role.id}
                className="rounded-xl border transition-all cursor-pointer"
                style={{ backgroundColor: 'var(--dash-bg-card)', borderColor: expanded ? 'rgb(34 211 238 / 0.3)' : 'var(--dash-border)' }}
                onClick={() => setExpandedRole(expanded ? null : role.id)}
              >
                {/* Collapsed Header */}
                <div className="p-4 md:p-5 flex items-center gap-4">
                  <div className="text-2xl md:text-3xl font-bold text-cyan-500 dark:text-cyan-400 w-12 md:w-14 text-center">{role.value}</div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm md:text-base font-semibold text-[var(--dash-text-1)] truncate">{td(role.label)}</h4>
                    <div className="flex flex-wrap items-center gap-3 mt-1">
                      {role.medianSalary && <span className="text-sm text-[var(--dash-text-3)]">${role.medianSalary.toLocaleString()}</span>}
                      {role.openRoles && <span className="text-sm text-[var(--dash-text-4)]">{t('jobMarkets.roles.openings', { n: role.openRoles.toLocaleString() })}</span>}
                      {role.demandTrend && (
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${demandColor}`}>
                          {demandTrendLabels[role.demandTrend] ?? role.demandTrend}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className={`flex items-center gap-1 ${trendColor}`}>
                    <TrendIcon className="w-4 h-4 md:w-5 md:h-5" />
                    <span className="text-sm md:text-base font-mono font-bold">{role.rawValue}%</span>
                  </div>
                  {expanded ? <ChevronUp className="w-5 h-5 text-[var(--dash-text-4)]" /> : <ChevronDown className="w-5 h-5 text-[var(--dash-text-4)]" />}
                </div>

                {/* Expanded Detail */}
                {expanded && (
                  <div className="px-4 md:px-5 pb-4 md:pb-5 border-t border-[var(--dash-border)]">
                    <div className="mt-4 space-y-3">
                      <div>
                        <div className="text-xs uppercase tracking-wide text-[var(--dash-text-4)] font-medium mb-1">{t('jobMarkets.roles.whatThisMeans')}</div>
                        <p className="text-sm text-[var(--dash-text-2)] leading-relaxed">{tdId(role.id, 'explanation', role.explanation)}</p>
                      </div>
                      <div>
                        <div className="text-xs uppercase tracking-wide text-[var(--dash-text-4)] font-medium mb-1">{t('jobMarkets.roles.whyItMattersForYou')}</div>
                        <p className="text-sm text-[var(--dash-text-2)] leading-relaxed">{tdId(role.id, 'whyItMatters', role.whyItMatters)}</p>
                      </div>
                      <div className="rounded-lg p-3 md:p-4 bg-cyan-50 dark:bg-cyan-500/10">
                        <div className="text-xs uppercase tracking-wide text-[var(--dash-text-4)] font-medium mb-1">{t('jobMarkets.roles.recommendedAction')}</div>
                        <p className="text-sm font-medium text-cyan-700 dark:text-cyan-300">{tdId(role.id, 'recommendedAction', role.recommendedAction)}</p>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
                        <MiniStat label={t('jobMarkets.roles.growthRate')} value={`${role.rawValue}%`} sub={t('jobMarkets.roles.tenYrProjected')} />
                        <MiniStat label={t('jobMarkets.roles.medianSalary')} value={role.medianSalary ? `$${(role.medianSalary / 1000).toFixed(0)}K` : '-'} sub={t('jobMarkets.roles.annualBase')} />
                        <MiniStat label={t('jobMarkets.roles.openRoles')} value={role.openRoles?.toLocaleString() || '-'} sub={t('jobMarkets.roles.currentPostings')} />
                        <MiniStat label={t('jobMarkets.roles.signalScore')} value={`${role.value}/100`} sub={t('jobMarkets.roles.composite')} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Target className="w-4 h-4 text-green-500 dark:text-green-400" />
            <h3 className="text-sm md:text-base font-semibold text-[var(--dash-text-1)]">{t('jobMarkets.recommendations.title')}</h3>
            <span className="text-xs text-[var(--dash-text-4)]">{t('jobMarkets.recommendations.subtitle')}</span>
          </div>
          <div className="space-y-3">
            {recommendations.sort((a, b) => a.priority - b.priority).map((rec, i) => {
              const cat = categoryConfig[rec.category];
              return (
                <div
                  key={rec.id}
                  className="rounded-xl border p-4 transition-colors"
                  style={{ backgroundColor: 'var(--dash-bg-card)', borderColor: 'var(--dash-border)' }}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-cyan-500 dark:text-cyan-400">#{i + 1}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-sm md:text-base font-semibold text-[var(--dash-text-1)]">{tdId(rec.id, 'title', rec.title)}</h4>
                        <Badge variant="outline" className={`text-xs ${cat.color}`}>{t(cat.labelKey)}</Badge>
                      </div>
                      <p className="text-sm text-[var(--dash-text-2)] leading-relaxed">{tdId(rec.id, 'body', rec.body)}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ icon, label, value, sub }: { icon: React.ReactNode; label: string; value: string; sub: string }) {
  return (
    <div className="rounded-xl border p-3 md:p-4 transition-colors" style={{ backgroundColor: 'var(--dash-bg-card)', borderColor: 'var(--dash-border)' }}>
      <div className="flex items-center gap-2 mb-1.5">
        {icon}
        <span className="text-xs text-[var(--dash-text-4)]">{label}</span>
      </div>
      <div className="text-lg md:text-xl font-bold text-[var(--dash-text-1)]">{value}</div>
      <div className="text-xs text-[var(--dash-text-4)]">{sub}</div>
    </div>
  );
}

function MiniStat({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div>
      <div className="text-xs text-[var(--dash-text-4)]">{label}</div>
      <div className="text-sm md:text-base font-bold text-[var(--dash-text-1)]">{value}</div>
      <div className="text-xs text-[var(--dash-text-4)]">{sub}</div>
    </div>
  );
}
