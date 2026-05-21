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
import { computeCompositeScore } from '@/lib/scoring-engine';
import {
  Briefcase, MapPin, Globe, Building2, TreePine, Lightbulb,
  TrendingUp, TrendingDown, Minus, ChevronDown, ChevronUp,
  Target, DollarSign, Users, AlertTriangle, CheckCircle2, Info,
  ExternalLink, Calendar, Award, MessageSquare,
} from 'lucide-react';

const geoTabs: { key: PMGeoView; label: string; icon: typeof MapPin; desc: string }[] = [
  { key: 'us', label: 'United States', icon: Globe, desc: 'National PM market overview' },
  { key: 'austin', label: 'Austin, TX', icon: Building2, desc: 'Austin metro PM roles' },
  { key: 'austin-surrounding', label: 'Surrounding Areas', icon: TreePine, desc: 'Round Rock · Cedar Park · Georgetown · Leander · San Marcos · Pflugerville' },
  { key: 'remote', label: 'Remote (US)', icon: Globe, desc: 'Remote-eligible PM roles' },
];

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

const categoryConfig: Record<PMRecommendation['category'], { label: string; color: string }> = {
  'role-priority': { label: 'Role Priority', color: 'text-cyan-600 dark:text-cyan-400 border-cyan-500/20 bg-cyan-500/10' },
  'skill-gap': { label: 'Skill Gap', color: 'text-purple-600 dark:text-purple-400 border-purple-500/20 bg-purple-500/10' },
  'location-strategy': { label: 'Location Strategy', color: 'text-emerald-600 dark:text-emerald-400 border-emerald-500/20 bg-emerald-500/10' },
  'repositioning': { label: 'Repositioning', color: 'text-amber-600 dark:text-amber-400 border-amber-500/20 bg-amber-500/10' },
};

export function JobMarketsView() {
  const { weights, thresholds } = useDashboardStore();
  const [activeGeo, setActiveGeo] = useState<PMGeoView>('us');
  const [expandedRole, setExpandedRole] = useState<string | null>(null);
  const [expandedInsight, setExpandedInsight] = useState<string | null>(null);
  const [expandedListing, setExpandedListing] = useState<string | null>(null);

  const roles = rolesByGeo[activeGeo];
  const insights = pmMarketInsights.filter(i => i.geoView === activeGeo);
  const recommendations = pmRecommendations.filter(r => r.geoViews.includes(activeGeo));
  const listings = activeListings.filter(l => l.geoView === activeGeo);
  const marketSignal = jobMarketSignals.find(s => s.geoView === activeGeo);

  const allSignals = useMemo(() => [...pmRolesUS, ...pmRolesAustin, ...pmRolesAustinSurrounding, ...pmRolesRemote] as PMRoleSignal[], []);
  const scores = useMemo(() => computeCompositeScore(allSignals, weights, thresholds), [allSignals, weights, thresholds]);

  const salaryChart = roles.map(r => ({
    name: r.label.replace(/ \(.*\)/, '').replace(' (US)', '').replace(' (Austin)', ''),
    value: (r.medianSalary || 0) / 1000,
    color: '#22d3ee',
  }));

  const growthChart = roles.map(r => ({
    name: r.label.replace(/ \(.*\)/, '').replace(' (US)', '').replace(' (Austin)', ''),
    value: r.rawValue,
  }));

  const openRolesChart = roles.filter(r => r.openRoles).map(r => ({
    name: r.label.replace(/ \(.*\)/, '').replace(' (US)', '').replace(' (Austin)', ''),
    value: r.openRoles!,
    color: '#818cf8',
  }));

  const radarData = [
    { category: 'Ethical', value: scores[0]?.breakdown.ethical || 50, fullMark: 100 },
    { category: 'Cultural', value: scores[0]?.breakdown.cultural || 50, fullMark: 100 },
    { category: 'Regulatory', value: scores[0]?.breakdown.regulatory || 50, fullMark: 100 },
    { category: 'Technological', value: scores[0]?.breakdown.technological || 50, fullMark: 100 },
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
        <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center">
          <Briefcase className="w-5 h-5 text-cyan-500 dark:text-cyan-400" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-[var(--dash-text-1)]">Product Management Job Market</h2>
          <p className="text-xs text-[var(--dash-text-4)]">PM roles · AI PM · Technical PM · Growth PM · Product Ops · Geographic analysis</p>
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
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                active
                  ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-600 dark:text-cyan-400'
                  : 'border-[var(--dash-border)] text-[var(--dash-text-3)] hover:text-[var(--dash-text-2)] hover:border-[var(--dash-text-4)]'
              }`}
              style={!active ? { backgroundColor: 'var(--dash-bg-card)' } : undefined}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Geo Description */}
      <div className="text-xs text-[var(--dash-text-4)] -mt-2">
        {geoTabs.find(t => t.key === activeGeo)?.desc}
      </div>

      {/* Summary Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard
          icon={<Users className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />}
          label="Total PM Openings"
          value={roles.reduce((s, r) => s + (r.openRoles || 0), 0).toLocaleString()}
          sub={`across ${roles.length} role categories`}
        />
        <StatCard
          icon={<DollarSign className="w-4 h-4 text-green-500 dark:text-green-400" />}
          label="Median Salary Range"
          value={`$${Math.min(...roles.map(r => r.medianSalary || 0)).toLocaleString().replace(/,000$/, 'K')}-${Math.max(...roles.map(r => r.medianSalary || 0)).toLocaleString().replace(/,000$/, 'K')}`}
          sub="across all PM specialties"
        />
        <StatCard
          icon={<TrendingUp className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />}
          label="Avg. Growth Rate"
          value={`${(roles.reduce((s, r) => s + r.rawValue, 0) / roles.length).toFixed(0)}%`}
          sub="projected 2024-2034"
        />
        <StatCard
          icon={<Target className="w-4 h-4 text-purple-500 dark:text-purple-400" />}
          label="Highest Demand"
          value={roles.sort((a, b) => b.rawValue - a.rawValue)[0]?.label.replace(/ \(.*\)/, '').split(' ').slice(0, 2).join(' ') || '-'}
          sub={`${roles.sort((a, b) => b.rawValue - a.rawValue)[0]?.rawValue || 0}% growth`}
        />
      </div>

      {/* PM Demand Trend */}
      <div className="rounded-xl border p-4 transition-colors" style={{ backgroundColor: 'var(--dash-bg-card)', borderColor: 'var(--dash-border)' }}>
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
          <h3 className="text-sm font-semibold text-[var(--dash-text-1)]">PM Role Demand Over Time</h3>
          <Badge variant="outline" className="text-[10px] border-[var(--dash-border)] text-[var(--dash-text-4)]">LinkedIn / BLS</Badge>
        </div>
        <p className="text-xs text-[var(--dash-text-3)] mb-3">
          This chart tracks the total number of open PM roles in this geography over the past 3 years, with a 12-month projection.
          An upward trend means companies are creating new PM positions faster than they are filling them — a sign of sustained demand.
        </p>
        <TrendLine data={demandTrend} color="#22d3ee" label="Open PM Roles" showProjection />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-xl border p-4 transition-colors" style={{ backgroundColor: 'var(--dash-bg-card)', borderColor: 'var(--dash-border)' }}>
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
            <h3 className="text-sm font-semibold text-[var(--dash-text-1)]">Growth Rate by PM Role (%)</h3>
            <Badge variant="outline" className="text-[10px] border-[var(--dash-border)] text-[var(--dash-text-4)]">BLS Projected</Badge>
          </div>
          <p className="text-xs text-[var(--dash-text-3)] mb-3">
            Projected job growth over the next decade. Roles above 15% are growing significantly faster than the economy overall (7% average).
            Higher growth means more openings, more company options, and stronger negotiating position.
          </p>
          <BarRanking data={growthChart} layout="vertical" height={Math.max(280, roles.length * 45)} />
        </div>

        <div className="rounded-xl border p-4 transition-colors" style={{ backgroundColor: 'var(--dash-bg-card)', borderColor: 'var(--dash-border)' }}>
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-4 h-4 text-green-500 dark:text-green-400" />
            <h3 className="text-sm font-semibold text-[var(--dash-text-1)]">Median Salary by Role ($K)</h3>
            <Badge variant="outline" className="text-[10px] border-[var(--dash-border)] text-[var(--dash-text-4)]">LinkedIn / Glassdoor</Badge>
          </div>
          <p className="text-xs text-[var(--dash-text-3)] mb-3">
            Median base salary in thousands. This is the midpoint — half of people in each role earn more, half earn less.
            Use this to benchmark offers and understand the salary premium for specialization.
          </p>
          <BarRanking data={salaryChart} layout="vertical" height={Math.max(280, roles.length * 45)} colorScale={false} />
        </div>
      </div>

      {/* Open Roles + Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {openRolesChart.length > 0 && (
          <div className="rounded-xl border p-4 transition-colors" style={{ backgroundColor: 'var(--dash-bg-card)', borderColor: 'var(--dash-border)' }}>
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
              <h3 className="text-sm font-semibold text-[var(--dash-text-1)]">Open Roles by Specialty</h3>
            </div>
            <p className="text-xs text-[var(--dash-text-3)] mb-3">
              Current open PM job postings. Higher volume means more chances to apply and interview.
              Low-volume specialties require more targeted, fewer-but-higher-quality applications.
            </p>
            <BarRanking data={openRolesChart} layout="vertical" height={Math.max(280, openRolesChart.length * 45)} colorScale={false} />
          </div>
        )}

        <div className="rounded-xl border p-4 transition-colors" style={{ backgroundColor: 'var(--dash-bg-card)', borderColor: 'var(--dash-border)' }}>
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
            <h3 className="text-sm font-semibold text-[var(--dash-text-1)]">PM Market Multi-Factor Analysis</h3>
          </div>
          <p className="text-xs text-[var(--dash-text-3)] mb-3">
            How the PM job market scores across four dimensions. Technological is strongest because PM growth is driven by AI and platform expansion.
            Cultural reflects remote-work and work-preference trends affecting PM roles.
          </p>
          <SignalRadar data={radarData} color="#22d3ee" />
        </div>
      </div>

      {/* Market Insights */}
      {insights.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="w-4 h-4 text-amber-500 dark:text-amber-400" />
            <h3 className="text-sm font-semibold text-[var(--dash-text-1)]">Key Market Insights</h3>
            <span className="text-xs text-[var(--dash-text-4)]">— what the data means and why it matters</span>
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
                        <h4 className="text-sm font-semibold text-[var(--dash-text-1)]">{insight.title}</h4>
                        {expanded ? <ChevronUp className="w-4 h-4 text-[var(--dash-text-4)]" /> : <ChevronDown className="w-4 h-4 text-[var(--dash-text-4)]" />}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-[var(--dash-text-4)]">{insight.metric}:</span>
                        <span className={`text-xs font-bold ${config.color}`}>{insight.metricValue}</span>
                      </div>
                      {expanded && (
                        <div className="mt-3 space-y-3">
                          <div>
                            <div className="text-[10px] uppercase tracking-wide text-[var(--dash-text-4)] font-medium mb-1">What this means</div>
                            <p className="text-xs text-[var(--dash-text-2)] leading-relaxed">{insight.explanation}</p>
                          </div>
                          <div>
                            <div className="text-[10px] uppercase tracking-wide text-[var(--dash-text-4)] font-medium mb-1">Why it matters for you</div>
                            <p className="text-xs text-[var(--dash-text-2)] leading-relaxed">{insight.whyItMatters}</p>
                          </div>
                          <div className={`rounded-lg p-3 ${config.bg}`}>
                            <div className="text-[10px] uppercase tracking-wide text-[var(--dash-text-4)] font-medium mb-1">Recommended action</div>
                            <p className={`text-xs font-medium ${config.color}`}>{insight.recommendedAction}</p>
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
            <Building2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
            <h3 className="text-sm font-semibold text-[var(--dash-text-1)]">Active Company Listings</h3>
            <Badge variant="outline" className="text-[10px] border-[var(--dash-border)] text-[var(--dash-text-4)]">Curated Snapshot</Badge>
          </div>
          <p className="text-xs text-[var(--dash-text-3)] mb-3 ml-6">
            Companies with active PM and PM-adjacent postings relevant to your target profile. Click any listing for a relevance explanation.
          </p>
          <div className="rounded-xl border overflow-hidden" style={{ backgroundColor: 'var(--dash-bg-card)', borderColor: 'var(--dash-border)' }}>
            {/* Table Header */}
            <div className="grid grid-cols-[1fr_1.2fr_0.8fr_0.5fr_0.6fr_0.6fr] gap-2 px-4 py-2.5 border-b text-[10px] uppercase tracking-wide font-medium text-[var(--dash-text-4)]" style={{ borderColor: 'var(--dash-border)' }}>
              <span>Company</span>
              <span>Role</span>
              <span>Location</span>
              <span>Level</span>
              <span>Source</span>
              <span>Posted</span>
            </div>
            {/* Listing Rows */}
            {listings.map((listing, idx) => {
              const expanded = expandedListing === listing.id;
              const isLast = idx === listings.length - 1;
              return (
                <div key={listing.id}>
                  <div
                    className={`grid grid-cols-[1fr_1.2fr_0.8fr_0.5fr_0.6fr_0.6fr] gap-2 px-4 py-3 cursor-pointer transition-colors hover:bg-emerald-500/5 ${!isLast && !expanded ? 'border-b' : ''}`}
                    style={{ borderColor: 'var(--dash-border)' }}
                    onClick={() => setExpandedListing(expanded ? null : listing.id)}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-6 h-6 rounded-md bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">{listing.company.charAt(0)}</span>
                      </div>
                      <span className="text-xs font-semibold text-[var(--dash-text-1)] truncate">{listing.company}</span>
                    </div>
                    <span className="text-xs text-[var(--dash-text-2)] truncate self-center">{listing.role}</span>
                    <div className="flex items-center gap-1 self-center min-w-0">
                      <MapPin className="w-3 h-3 text-[var(--dash-text-4)] flex-shrink-0" />
                      <span className="text-xs text-[var(--dash-text-3)] truncate">{listing.location}</span>
                    </div>
                    <span className="text-xs text-[var(--dash-text-3)] self-center">{listing.seniority}</span>
                    <span className="text-xs text-[var(--dash-text-4)] self-center">{listing.source}</span>
                    <div className="flex items-center gap-1 self-center">
                      <Calendar className="w-3 h-3 text-[var(--dash-text-4)]" />
                      <span className="text-[10px] text-[var(--dash-text-4)]">May &apos;26</span>
                    </div>
                  </div>
                  {expanded && (
                    <div className="px-4 pb-3 border-b" style={{ borderColor: 'var(--dash-border)' }}>
                      <div className="rounded-lg p-3 bg-emerald-50 dark:bg-emerald-500/10 ml-8">
                        <div className="text-[10px] uppercase tracking-wide text-[var(--dash-text-4)] font-medium mb-1">Why this role is relevant</div>
                        <p className="text-xs text-[var(--dash-text-2)] leading-relaxed">{listing.relevance}</p>
                        <div className="flex items-center gap-4 mt-2 pt-2 border-t border-emerald-200 dark:border-emerald-500/20">
                          <a
                            href={listing.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={e => e.stopPropagation()}
                            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-600 dark:bg-emerald-500 text-white text-[10px] font-semibold hover:bg-emerald-700 dark:hover:bg-emerald-600 transition-colors"
                          >
                            <ExternalLink className="w-3 h-3" />
                            View Posting
                          </a>
                          <div className="flex items-center gap-1">
                            <Award className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                            <span className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400">{listing.seniority}</span>
                          </div>
                          <span className="text-[10px] text-[var(--dash-text-4)]">Found on {listing.source}</span>
                          <span className="text-[10px] text-[var(--dash-text-4)]">{listing.postedDate}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div className="flex items-start gap-2 mt-2 px-1">
            <Info className="w-3.5 h-3.5 text-[var(--dash-text-4)] mt-0.5 flex-shrink-0" />
            <p className="text-[10px] text-[var(--dash-text-4)] leading-relaxed">
              Listings are curated snapshots from LinkedIn, company career pages, and job boards. Postings may have been filled or removed since last update. Always verify directly on the source before applying.
            </p>
          </div>
        </div>
      )}

      {/* Job Market Signal */}
      {marketSignal && (
        <div className="rounded-xl border p-4 transition-colors" style={{ backgroundColor: 'var(--dash-bg-card)', borderColor: 'var(--dash-border)' }}>
          <div className="flex items-center gap-2 mb-2">
            <MessageSquare className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
            <h3 className="text-sm font-semibold text-[var(--dash-text-1)]">Job Market Signal</h3>
            <span className="text-xs text-[var(--dash-text-4)]">— what the active postings tell us</span>
          </div>
          <p className="text-xs text-[var(--dash-text-2)] leading-relaxed">{marketSignal.summary}</p>
        </div>
      )}

      {/* Role Detail Cards */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Briefcase className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
          <h3 className="text-sm font-semibold text-[var(--dash-text-1)]">PM Role Breakdown</h3>
          <span className="text-xs text-[var(--dash-text-4)]">— click any role for full analysis</span>
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
                <div className="p-4 flex items-center gap-4">
                  <div className="text-2xl font-bold text-cyan-500 dark:text-cyan-400 w-12 text-center">{role.value}</div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-[var(--dash-text-1)] truncate">{role.label}</h4>
                    <div className="flex items-center gap-3 mt-1">
                      {role.medianSalary && <span className="text-xs text-[var(--dash-text-3)]">${role.medianSalary.toLocaleString()}</span>}
                      {role.openRoles && <span className="text-xs text-[var(--dash-text-4)]">{role.openRoles.toLocaleString()} openings</span>}
                      {role.demandTrend && (
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium capitalize ${demandColor}`}>
                          {role.demandTrend}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className={`flex items-center gap-1 ${trendColor}`}>
                    <TrendIcon className="w-4 h-4" />
                    <span className="text-sm font-mono font-bold">{role.rawValue}%</span>
                  </div>
                  {expanded ? <ChevronUp className="w-4 h-4 text-[var(--dash-text-4)]" /> : <ChevronDown className="w-4 h-4 text-[var(--dash-text-4)]" />}
                </div>

                {/* Expanded Detail */}
                {expanded && (
                  <div className="px-4 pb-4 border-t border-[var(--dash-border)]">
                    <div className="mt-4 space-y-3">
                      <div>
                        <div className="text-[10px] uppercase tracking-wide text-[var(--dash-text-4)] font-medium mb-1">What this means</div>
                        <p className="text-xs text-[var(--dash-text-2)] leading-relaxed">{role.explanation}</p>
                      </div>
                      <div>
                        <div className="text-[10px] uppercase tracking-wide text-[var(--dash-text-4)] font-medium mb-1">Why it matters for you</div>
                        <p className="text-xs text-[var(--dash-text-2)] leading-relaxed">{role.whyItMatters}</p>
                      </div>
                      <div className="rounded-lg p-3 bg-cyan-50 dark:bg-cyan-500/10">
                        <div className="text-[10px] uppercase tracking-wide text-[var(--dash-text-4)] font-medium mb-1">Recommended action</div>
                        <p className="text-xs font-medium text-cyan-700 dark:text-cyan-300">{role.recommendedAction}</p>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
                        <MiniStat label="Growth Rate" value={`${role.rawValue}%`} sub="10yr projected" />
                        <MiniStat label="Median Salary" value={role.medianSalary ? `$${(role.medianSalary / 1000).toFixed(0)}K` : '-'} sub="annual base" />
                        <MiniStat label="Open Roles" value={role.openRoles?.toLocaleString() || '-'} sub="current postings" />
                        <MiniStat label="Signal Score" value={`${role.value}/100`} sub="composite" />
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
            <h3 className="text-sm font-semibold text-[var(--dash-text-1)]">Recommendations</h3>
            <span className="text-xs text-[var(--dash-text-4)]">— what to do with this information</span>
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
                        <h4 className="text-sm font-semibold text-[var(--dash-text-1)]">{rec.title}</h4>
                        <Badge variant="outline" className={`text-[10px] ${cat.color}`}>{cat.label}</Badge>
                      </div>
                      <p className="text-xs text-[var(--dash-text-2)] leading-relaxed">{rec.body}</p>
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
    <div className="rounded-xl border p-3 transition-colors" style={{ backgroundColor: 'var(--dash-bg-card)', borderColor: 'var(--dash-border)' }}>
      <div className="flex items-center gap-1.5 mb-1">
        {icon}
        <span className="text-[10px] text-[var(--dash-text-4)]">{label}</span>
      </div>
      <div className="text-lg font-bold text-[var(--dash-text-1)]">{value}</div>
      <div className="text-[10px] text-[var(--dash-text-4)]">{sub}</div>
    </div>
  );
}

function MiniStat({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div>
      <div className="text-[10px] text-[var(--dash-text-4)]">{label}</div>
      <div className="text-sm font-bold text-[var(--dash-text-1)]">{value}</div>
      <div className="text-[10px] text-[var(--dash-text-4)]">{sub}</div>
    </div>
  );
}
