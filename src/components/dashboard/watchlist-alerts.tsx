'use client';

import { useMemo } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  useWatchlistStore, useFilteredAlerts, useFilteredEntries, useKPIs, useTimeline,
} from '@/lib/watchlist-store';
import {
  watchedEntities, watchlistEntries, fmtCompact,
  EXPOSURE_TYPE_LABELS, ALERT_TYPE_LABELS, computeAlertScore,
} from '@/lib/watchlist-engine';
import { WatchlistAlert, AlertSeverity, AlertStatus, ExposureType } from '@/types/watchlist';
import {
  Eye, Bell, BellOff, Shield, TrendingUp, TrendingDown, Plus, Minus, X,
  AlertTriangle, CheckCircle2, Clock, ExternalLink, ChevronRight, Filter,
  Download, BarChart3, Activity, Zap, ArrowUpRight, ArrowDownRight,
  Bitcoin, Building2, Briefcase, Globe, FileText, RefreshCw, Search,
} from 'lucide-react';

// ── Severity styling ──

const sevStyles: Record<AlertSeverity, { border: string; bg: string; text: string; badge: string; dot: string }> = {
  high: {
    border: 'border-red-500/30',
    bg: 'bg-red-500/5',
    text: 'text-red-600 dark:text-red-400',
    badge: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20',
    dot: 'bg-red-500',
  },
  medium: {
    border: 'border-amber-500/30',
    bg: 'bg-amber-500/5',
    text: 'text-amber-600 dark:text-amber-400',
    badge: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    dot: 'bg-amber-500',
  },
  low: {
    border: 'border-[var(--dash-border)]',
    bg: '',
    text: 'text-[var(--dash-text-4)]',
    badge: 'bg-[var(--dash-bg-muted)] text-[var(--dash-text-4)] border-[var(--dash-border)]',
    dot: 'bg-gray-400',
  },
};

const statusStyles: Record<AlertStatus, { label: string; color: string }> = {
  active: { label: 'Active', color: 'text-blue-500' },
  reviewed: { label: 'Reviewed', color: 'text-green-600 dark:text-green-400' },
  snoozed: { label: 'Snoozed', color: 'text-amber-500' },
  dismissed: { label: 'Dismissed', color: 'text-[var(--dash-text-4)]' },
};

const exposureIcons: Partial<Record<ExposureType, typeof Bitcoin>> = {
  crypto: Bitcoin,
  'real-estate': Building2,
  'private-equity': Briefcase,
  'venture-capital': Briefcase,
  'public-equity': BarChart3,
  fund: Globe,
};

function timeAgo(ts: string): string {
  const ms = Date.now() - new Date(ts).getTime();
  const h = Math.floor(ms / 3600000);
  if (h < 1) return `${Math.floor(ms / 60000)}m ago`;
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d === 1) return '1 day ago';
  return `${d} days ago`;
}

function fmtDate(ts: string): string {
  return new Date(ts).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

// ── Main Component ──

export function WatchlistAlerts() {
  const { filters, setFilter, resetFilters, drawerAlertId, openDrawer, closeDrawer, setAlertStatus, activeTab, setActiveTab } = useWatchlistStore();
  const alerts = useFilteredAlerts();
  const entries = useFilteredEntries();
  const kpis = useKPIs();
  const timeline = useTimeline();

  const drawerAlert = useMemo(() =>
    drawerAlertId ? alerts.find(a => a.id === drawerAlertId) ?? null : null,
    [drawerAlertId, alerts]
  );
  const drawerEntry = useMemo(() =>
    drawerAlert ? watchlistEntries.find(e => e.id === drawerAlert.entryId) ?? null : null,
    [drawerAlert]
  );

  const activeAlerts = alerts.filter(a => a.status === 'active');
  const highAlerts = activeAlerts.filter(a => a.severity === 'high');

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
            <Eye className="w-5 h-5 text-red-500 dark:text-red-400" />
          </div>
          <div>
            <h3 className="text-sm md:text-base font-semibold text-[var(--dash-text-1)]">Watchlist Alerts</h3>
            <p className="text-xs text-[var(--dash-text-4)]">Portfolio & exposure movements — Trump family & Kushner</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-[var(--dash-text-4)]">
          <Clock className="w-3 h-3" />
          <span>Updated {timeAgo(kpis.lastUpdated)}</span>
          {(Date.now() - new Date(kpis.lastUpdated).getTime()) > 86400000 && (
            <Badge variant="outline" className="text-xs text-amber-500 border-amber-500/30 ml-1">Stale</Badge>
          )}
        </div>
      </div>

      {/* KPI Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <KPICard label="Active Alerts" value={kpis.activeAlerts} icon={Bell} highlight={kpis.activeAlerts > 0} />
        <KPICard label="High Priority" value={kpis.highPriorityCount} icon={AlertTriangle} highlight={kpis.highPriorityCount > 0} highlightColor="red" />
        <KPICard label="Exposure Tracked" value={fmtCompact(kpis.totalExposureTracked)} icon={BarChart3} />
        <KPICard label="Crypto Exposure" value={fmtCompact(kpis.cryptoExposure)} icon={Bitcoin} highlight={kpis.cryptoExposure > 50000000} highlightColor="amber" />
      </div>

      {/* Filters */}
      <div className="rounded-xl border p-3 transition-colors" style={{ backgroundColor: 'var(--dash-bg-card)', borderColor: 'var(--dash-border)' }}>
        <div className="flex flex-wrap items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-[var(--dash-text-4)]" />
          <FilterSelect
            label="Person"
            value={filters.person}
            onChange={v => setFilter('person', v)}
            options={[
              { value: 'all', label: 'All People' },
              ...watchedEntities.map(e => ({ value: e.id, label: e.name })),
            ]}
          />
          <FilterSelect
            label="Asset Type"
            value={filters.assetType}
            onChange={v => setFilter('assetType', v as any)}
            options={[
              { value: 'all', label: 'All Types' },
              ...Object.entries(EXPOSURE_TYPE_LABELS).map(([k, v]) => ({ value: k, label: v })),
            ]}
          />
          <FilterSelect
            label="Severity"
            value={filters.severity}
            onChange={v => setFilter('severity', v as any)}
            options={[
              { value: 'all', label: 'All Severities' },
              { value: 'high', label: 'High' },
              { value: 'medium', label: 'Medium' },
              { value: 'low', label: 'Low' },
            ]}
          />
          <FilterSelect
            label="Date Range"
            value={filters.dateRange}
            onChange={v => setFilter('dateRange', v as any)}
            options={[
              { value: 'all', label: 'All Time' },
              { value: '24h', label: 'Last 24h' },
              { value: '7d', label: 'Last 7 days' },
              { value: '30d', label: 'Last 30 days' },
              { value: '90d', label: 'Last 90 days' },
            ]}
          />
          {(filters.person !== 'all' || filters.assetType !== 'all' || filters.severity !== 'all' || filters.dateRange !== 'all') && (
            <button onClick={resetFilters} className="text-xs text-indigo-500 hover:underline ml-1">Reset</button>
          )}
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-1 border-b border-[var(--dash-border)]">
        {(['alerts', 'watchlist', 'timeline'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px ${
              activeTab === tab
                ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-[var(--dash-text-4)] hover:text-[var(--dash-text-2)]'
            }`}
          >
            {tab === 'alerts' && <span className="flex items-center gap-1.5"><Bell className="w-3.5 h-3.5" />Alerts{activeAlerts.length > 0 && <span className="text-xs bg-red-500/10 text-red-500 px-1.5 rounded-full">{activeAlerts.length}</span>}</span>}
            {tab === 'watchlist' && <span className="flex items-center gap-1.5"><Search className="w-3.5 h-3.5" />Watchlist</span>}
            {tab === 'timeline' && <span className="flex items-center gap-1.5"><Activity className="w-3.5 h-3.5" />Timeline</span>}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="relative">
        {activeTab === 'alerts' && (
          <AlertsPanel alerts={alerts} onOpen={openDrawer} onStatusChange={setAlertStatus} />
        )}
        {activeTab === 'watchlist' && (
          <WatchlistTable entries={entries} alerts={alerts} onAlertOpen={openDrawer} />
        )}
        {activeTab === 'timeline' && (
          <TimelineView timeline={timeline} onOpen={(id) => {
            const alert = alerts.find(a => a.entryId === id);
            if (alert) openDrawer(alert.id);
          }} />
        )}

        {/* Detail Drawer */}
        {drawerAlert && drawerEntry && (
          <DetailDrawer
            alert={drawerAlert}
            entry={drawerEntry}
            onClose={closeDrawer}
            onStatusChange={setAlertStatus}
          />
        )}
      </div>

      {/* Empty state */}
      {alerts.length === 0 && entries.length === 0 && (
        <div className="text-center py-10 text-sm text-[var(--dash-text-4)]">
          No movements match the current filters.
        </div>
      )}
    </div>
  );
}

// ── KPI Card ──

function KPICard({ label, value, icon: Icon, highlight, highlightColor }: {
  label: string;
  value: string | number;
  icon: typeof Bell;
  highlight?: boolean;
  highlightColor?: 'red' | 'amber';
}) {
  const hc = highlightColor === 'red' ? 'text-red-500' : highlightColor === 'amber' ? 'text-amber-500' : 'text-indigo-500 dark:text-indigo-400';
  return (
    <div className="rounded-xl border p-3 transition-colors" style={{ backgroundColor: 'var(--dash-bg-card)', borderColor: 'var(--dash-border)' }}>
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-[var(--dash-text-4)]">{label}</span>
        <Icon className={`w-3.5 h-3.5 ${highlight ? hc : 'text-[var(--dash-text-4)]'}`} />
      </div>
      <div className={`text-lg font-bold tabular-nums ${highlight ? hc : 'text-[var(--dash-text-1)]'}`}>{value}</div>
    </div>
  );
}

// ── Filter Select ──

function FilterSelect({ label, value, onChange, options }: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: Array<{ value: string; label: string }>;
}) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className="px-2 py-1.5 rounded-lg border text-xs bg-transparent text-[var(--dash-text-1)]"
      style={{ borderColor: 'var(--dash-border)' }}
      aria-label={label}
    >
      {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  );
}

// ── Alerts Panel ──

function AlertsPanel({ alerts, onOpen, onStatusChange }: {
  alerts: WatchlistAlert[];
  onOpen: (id: string) => void;
  onStatusChange: (id: string, status: AlertStatus) => void;
}) {
  const active = alerts.filter(a => a.status === 'active');
  const reviewed = alerts.filter(a => a.status === 'reviewed');
  const dismissed = alerts.filter(a => a.status === 'dismissed' || a.status === 'snoozed');

  return (
    <div className="space-y-4">
      {active.length === 0 && (
        <div className="rounded-xl border border-green-500/20 p-6 text-center" style={{ backgroundColor: 'var(--dash-bg-card)' }}>
          <CheckCircle2 className="w-8 h-8 text-green-500 mx-auto mb-2" />
          <div className="text-sm font-medium text-[var(--dash-text-1)]">All clear</div>
          <div className="text-xs text-[var(--dash-text-4)]">No active alerts match the current filters.</div>
        </div>
      )}

      {active.length > 0 && (
        <div className="space-y-2">
          {active.map(a => (
            <AlertCard key={a.id} alert={a} onOpen={onOpen} onStatusChange={onStatusChange} />
          ))}
        </div>
      )}

      {reviewed.length > 0 && (
        <div>
          <div className="text-xs text-[var(--dash-text-4)] font-medium uppercase tracking-wide mb-2">Reviewed ({reviewed.length})</div>
          <div className="space-y-1.5">
            {reviewed.slice(0, 5).map(a => (
              <AlertCardCompact key={a.id} alert={a} onOpen={onOpen} />
            ))}
          </div>
        </div>
      )}

      {dismissed.length > 0 && (
        <div>
          <div className="text-xs text-[var(--dash-text-4)] font-medium uppercase tracking-wide mb-2">Dismissed ({dismissed.length})</div>
          <div className="space-y-1.5">
            {dismissed.slice(0, 3).map(a => (
              <AlertCardCompact key={a.id} alert={a} onOpen={onOpen} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Alert Card (full) ──

function AlertCard({ alert, onOpen, onStatusChange }: {
  alert: WatchlistAlert;
  onOpen: (id: string) => void;
  onStatusChange: (id: string, status: AlertStatus) => void;
}) {
  const entity = watchedEntities.find(e => e.id === alert.entityId);
  const sev = sevStyles[alert.severity];

  return (
    <div
      className={`rounded-xl border p-3.5 cursor-pointer transition-all hover:shadow-sm ${sev.border} ${sev.bg}`}
      style={{ backgroundColor: alert.severity === 'low' ? 'var(--dash-bg-card)' : undefined }}
      onClick={() => onOpen(alert.id)}
    >
      <div className="flex items-start gap-3">
        {/* Score pill */}
        <div className={`w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0 ${
          alert.severity === 'high' ? 'bg-red-500/10' :
          alert.severity === 'medium' ? 'bg-amber-500/10' : 'bg-[var(--dash-bg-muted)]'
        }`}>
          <span className={`text-base font-bold tabular-nums ${sev.text}`}>{alert.score}</span>
        </div>

        <div className="flex-1 min-w-0">
          {/* Top row: severity + type + entity */}
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <Badge variant="outline" className={`text-xs capitalize ${sev.badge}`}>
              {alert.severity}
            </Badge>
            <Badge variant="outline" className="text-xs border-[var(--dash-border)] text-[var(--dash-text-4)]">
              {ALERT_TYPE_LABELS[alert.alertType]}
            </Badge>
            <span className="text-xs text-[var(--dash-text-4)]">{timeAgo(alert.timestamp)}</span>
          </div>

          {/* Asset + Entity */}
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-sm font-semibold text-[var(--dash-text-1)] truncate">{alert.asset}</span>
            <span className="text-xs text-[var(--dash-text-4)] flex-shrink-0">— {entity?.name}</span>
          </div>

          {/* Why it matters */}
          <p className="text-xs text-[var(--dash-text-2)] leading-relaxed mb-2">{alert.whyItMatters}</p>

          {/* Actions */}
          <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
            <Badge variant="outline" className={`text-xs font-medium ${sev.badge}`}>{alert.actionLabel}</Badge>
            <button
              onClick={() => onStatusChange(alert.id, 'reviewed')}
              className="text-xs text-[var(--dash-text-4)] hover:text-green-500 flex items-center gap-0.5"
              title="Mark as reviewed"
            >
              <CheckCircle2 className="w-3 h-3" /> Review
            </button>
            <button
              onClick={() => onStatusChange(alert.id, 'snoozed')}
              className="text-xs text-[var(--dash-text-4)] hover:text-amber-500 flex items-center gap-0.5"
              title="Snooze"
            >
              <BellOff className="w-3 h-3" /> Snooze
            </button>
            <button
              onClick={() => onStatusChange(alert.id, 'dismissed')}
              className="text-xs text-[var(--dash-text-4)] hover:text-red-500 flex items-center gap-0.5"
              title="Dismiss"
            >
              <X className="w-3 h-3" /> Dismiss
            </button>
          </div>
        </div>

        <ChevronRight className="w-4 h-4 text-[var(--dash-text-4)] flex-shrink-0 mt-1" />
      </div>
    </div>
  );
}

// ── Alert Card (compact, for reviewed/dismissed) ──

function AlertCardCompact({ alert, onOpen }: {
  alert: WatchlistAlert;
  onOpen: (id: string) => void;
}) {
  const entity = watchedEntities.find(e => e.id === alert.entityId);
  const sev = sevStyles[alert.severity];
  const st = statusStyles[alert.status];

  return (
    <div
      className="rounded-lg border p-2.5 cursor-pointer transition-all hover:shadow-sm flex items-center gap-3 opacity-70 hover:opacity-100"
      style={{ backgroundColor: 'var(--dash-bg-card)', borderColor: 'var(--dash-border)' }}
      onClick={() => onOpen(alert.id)}
    >
      <span className={`text-xs font-bold tabular-nums w-7 text-center ${sev.text}`}>{alert.score}</span>
      <div className={`w-1.5 h-1.5 rounded-full ${sev.dot}`} />
      <span className="text-xs font-medium text-[var(--dash-text-1)] truncate flex-1">{alert.asset}</span>
      <span className="text-xs text-[var(--dash-text-4)]">{entity?.avatar}</span>
      <span className={`text-xs ${st.color}`}>{st.label}</span>
      <span className="text-xs text-[var(--dash-text-4)]">{timeAgo(alert.timestamp)}</span>
    </div>
  );
}

// ── Watchlist Table ──

function WatchlistTable({ entries, alerts, onAlertOpen }: {
  entries: typeof watchlistEntries;
  alerts: WatchlistAlert[];
  onAlertOpen: (id: string) => void;
}) {
  return (
    <div className="space-y-2">
      {/* Desktop header */}
      <div className="hidden lg:grid grid-cols-[1fr_1.2fr_0.7fr_0.7fr_0.7fr_0.5fr_0.6fr_0.5fr_0.4fr] gap-2 px-3 text-xs text-[var(--dash-text-4)] font-medium uppercase tracking-wide">
        <div>Entity</div>
        <div>Asset / Holding</div>
        <div>Type</div>
        <div className="text-right">Previous</div>
        <div className="text-right">Latest</div>
        <div className="text-right">Change</div>
        <div>Source</div>
        <div>Confidence</div>
        <div>Status</div>
      </div>

      {entries.length === 0 && (
        <div className="rounded-xl border p-8 text-center text-sm text-[var(--dash-text-4)]" style={{ backgroundColor: 'var(--dash-bg-card)', borderColor: 'var(--dash-border)' }}>
          No watchlist entries match the current filters.
        </div>
      )}

      {entries.map(e => {
        const entity = watchedEntities.find(ent => ent.id === e.entityId);
        const alert = alerts.find(a => a.entryId === e.id);
        const ExpIcon = exposureIcons[e.exposureType] ?? Globe;
        const isUp = e.pctChange > 0;

        return (
          <div key={e.id}>
            {/* Desktop row */}
            <div
              className={`hidden lg:grid grid-cols-[1fr_1.2fr_0.7fr_0.7fr_0.7fr_0.5fr_0.6fr_0.5fr_0.4fr] gap-2 items-center rounded-lg border p-2.5 cursor-pointer transition-all hover:shadow-sm ${
                alert && alert.severity === 'high' ? 'border-red-500/20' : ''
              }`}
              style={{ backgroundColor: 'var(--dash-bg-card)', borderColor: alert?.severity === 'high' ? undefined : 'var(--dash-border)' }}
              onClick={() => alert && onAlertOpen(alert.id)}
            >
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[var(--dash-bg-muted)] flex items-center justify-center text-xs font-bold text-[var(--dash-text-2)]">
                  {entity?.avatar}
                </div>
                <span className="text-xs text-[var(--dash-text-1)] truncate">{entity?.name}</span>
              </div>
              <div className="text-xs font-medium text-[var(--dash-text-1)] truncate">{e.asset}</div>
              <div className="flex items-center gap-1 text-xs text-[var(--dash-text-3)]">
                <ExpIcon className="w-3 h-3" />
                <span className="truncate">{EXPOSURE_TYPE_LABELS[e.exposureType]}</span>
              </div>
              <div className="text-xs text-[var(--dash-text-3)] text-right tabular-nums">{e.previousValue > 0 ? fmtCompact(e.previousValue) : '—'}</div>
              <div className="text-xs text-[var(--dash-text-1)] text-right tabular-nums font-medium">{fmtCompact(e.latestValue)}</div>
              <div className={`text-xs text-right tabular-nums font-medium ${isUp ? 'text-green-600 dark:text-green-400' : e.pctChange < 0 ? 'text-red-500' : 'text-[var(--dash-text-4)]'}`}>
                {isUp ? '+' : ''}{e.pctChange.toFixed(1)}%
              </div>
              <div className="text-xs text-[var(--dash-text-4)] truncate" title={e.source}>{e.source.split('/')[0].trim()}</div>
              <ConfidenceBadge confidence={e.confidence} />
              <StatusDot status={e.status} />
            </div>

            {/* Mobile card */}
            <div
              className="lg:hidden rounded-xl border p-3 cursor-pointer transition-all"
              style={{ backgroundColor: 'var(--dash-bg-card)', borderColor: alert?.severity === 'high' ? 'rgb(239 68 68 / 0.2)' : 'var(--dash-border)' }}
              onClick={() => alert && onAlertOpen(alert.id)}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[var(--dash-bg-muted)] flex items-center justify-center text-xs font-bold text-[var(--dash-text-2)]">{entity?.avatar}</div>
                  <span className="text-xs text-[var(--dash-text-3)]">{entity?.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ConfidenceBadge confidence={e.confidence} />
                  <StatusDot status={e.status} />
                </div>
              </div>
              <div className="text-sm font-medium text-[var(--dash-text-1)] mb-1">{e.asset}</div>
              <div className="flex items-center gap-3 text-xs">
                <span className="text-[var(--dash-text-4)]">{EXPOSURE_TYPE_LABELS[e.exposureType]}</span>
                <span className="text-[var(--dash-text-3)] tabular-nums">{fmtCompact(e.latestValue)}</span>
                <span className={`tabular-nums font-medium ${isUp ? 'text-green-600 dark:text-green-400' : e.pctChange < 0 ? 'text-red-500' : 'text-[var(--dash-text-4)]'}`}>
                  {isUp ? '+' : ''}{e.pctChange.toFixed(1)}%
                </span>
                <span className="text-[var(--dash-text-4)] ml-auto">{timeAgo(e.timestamp)}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── Timeline View ──

function TimelineView({ timeline, onOpen }: {
  timeline: ReturnType<typeof useTimeline>;
  onOpen: (entryId: string) => void;
}) {
  if (timeline.length === 0) {
    return (
      <div className="rounded-xl border p-8 text-center text-sm text-[var(--dash-text-4)]" style={{ backgroundColor: 'var(--dash-bg-card)', borderColor: 'var(--dash-border)' }}>
        No movements match the current filters.
      </div>
    );
  }

  return (
    <div className="relative pl-6">
      <div className="absolute left-2.5 top-0 bottom-0 w-px bg-[var(--dash-border)]" />
      <div className="space-y-3">
        {timeline.map(t => {
          const isUp = t.pctChange > 0;
          const sevDot = t.alertSeverity === 'high' ? 'bg-red-500' : t.alertSeverity === 'medium' ? 'bg-amber-500' : 'bg-[var(--dash-border)]';
          return (
            <div
              key={t.id}
              className="relative cursor-pointer group"
              onClick={() => onOpen(t.id)}
            >
              <div className={`absolute -left-3.5 top-3 w-3 h-3 rounded-full border-2 border-[var(--dash-bg-card)] ${sevDot}`} style={{ borderColor: 'var(--dash-bg-card-solid, var(--dash-bg-card))' }} />
              <div className="rounded-lg border p-3 transition-all group-hover:shadow-sm" style={{ backgroundColor: 'var(--dash-bg-card)', borderColor: 'var(--dash-border)' }}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[var(--dash-text-2)]">{t.entityAvatar}</span>
                    <span className="text-xs text-[var(--dash-text-4)]">{t.entityName}</span>
                  </div>
                  <span className="text-xs text-[var(--dash-text-4)]">{timeAgo(t.timestamp)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-[var(--dash-text-1)] truncate">{t.asset}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[var(--dash-text-3)] tabular-nums">{fmtCompact(t.latestValue)}</span>
                    <span className={`text-xs tabular-nums font-medium ${isUp ? 'text-green-600 dark:text-green-400' : t.pctChange < 0 ? 'text-red-500' : 'text-[var(--dash-text-4)]'}`}>
                      {isUp ? '+' : ''}{t.pctChange.toFixed(1)}%
                    </span>
                    {t.alertScore != null && (
                      <span className={`text-xs tabular-nums font-bold ${
                        t.alertSeverity === 'high' ? 'text-red-500' : t.alertSeverity === 'medium' ? 'text-amber-500' : 'text-[var(--dash-text-4)]'
                      }`}>{t.alertScore}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Detail Drawer ──

function DetailDrawer({ alert, entry, onClose, onStatusChange }: {
  alert: WatchlistAlert;
  entry: typeof watchlistEntries[0];
  onClose: () => void;
  onStatusChange: (id: string, status: AlertStatus) => void;
}) {
  const entity = watchedEntities.find(e => e.id === alert.entityId);
  const sev = sevStyles[alert.severity];
  const { score, factors } = computeAlertScore(entry);

  const relatedEntries = watchlistEntries.filter(e =>
    e.asset === entry.asset && e.id !== entry.id
  );

  return (
    <>
      <div className="fixed inset-0 bg-black/30 z-40" onClick={onClose} />
      <div className="fixed right-0 top-0 bottom-0 w-full sm:w-[440px] md:w-[480px] z-50 overflow-y-auto border-l shadow-xl"
        style={{ backgroundColor: 'var(--dash-bg-card-solid, var(--dash-bg-card))', borderColor: 'var(--dash-border)' }}
      >
        <div className="p-5 space-y-5">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="outline" className={`text-xs capitalize ${sev.badge}`}>{alert.severity}</Badge>
                <Badge variant="outline" className="text-xs border-[var(--dash-border)] text-[var(--dash-text-4)]">{ALERT_TYPE_LABELS[alert.alertType]}</Badge>
              </div>
              <h4 className="text-base font-bold text-[var(--dash-text-1)]">{entry.asset}</h4>
              <div className="text-xs text-[var(--dash-text-4)]">{entity?.name} · {entity?.role}</div>
            </div>
            <button onClick={onClose} className="text-[var(--dash-text-4)] hover:text-[var(--dash-text-2)] p-1">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Score breakdown */}
          <div className="rounded-lg border p-3" style={{ borderColor: 'var(--dash-border)' }}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-[var(--dash-text-4)] font-medium uppercase tracking-wide">Alert Score</span>
              <span className={`text-2xl font-bold tabular-nums ${sev.text}`}>{score}</span>
            </div>
            <div className="space-y-1.5">
              <ScoreBar label="Magnitude" value={factors.magnitudeScore} />
              <ScoreBar label="Speed" value={factors.speedScore} />
              <ScoreBar label="Novelty" value={factors.noveltyScore} />
              <ScoreBar label="Source Quality" value={factors.sourceScore} />
              <ScoreBar label="Sector Volatility" value={factors.sectorVolatilityScore} />
              <ScoreBar label="Freshness" value={factors.freshnessScore} />
            </div>
          </div>

          {/* Why it matters */}
          <div className="rounded-lg border p-3" style={{ borderColor: 'var(--dash-border)' }}>
            <div className="text-xs text-[var(--dash-text-4)] font-medium uppercase tracking-wide mb-1.5">Why This Matters</div>
            <p className="text-sm text-[var(--dash-text-2)] leading-relaxed">{alert.whyItMatters}</p>
          </div>

          {/* Position details */}
          <div className="rounded-lg border p-3" style={{ borderColor: 'var(--dash-border)' }}>
            <div className="text-xs text-[var(--dash-text-4)] font-medium uppercase tracking-wide mb-2">Position Details</div>
            <div className="grid grid-cols-2 gap-3">
              <DetailItem label="Previous Value" value={entry.previousValue > 0 ? fmtCompact(entry.previousValue) : 'N/A (new)'} />
              <DetailItem label="Latest Value" value={fmtCompact(entry.latestValue)} />
              <DetailItem label="Change" value={`${entry.pctChange > 0 ? '+' : ''}${entry.pctChange.toFixed(1)}%`} valueColor={entry.pctChange > 0 ? 'text-green-600 dark:text-green-400' : entry.pctChange < 0 ? 'text-red-500' : undefined} />
              <DetailItem label="Exposure Type" value={EXPOSURE_TYPE_LABELS[entry.exposureType]} />
              <DetailItem label="Confidence" value={entry.confidence} />
              <DetailItem label="Last Updated" value={fmtDate(entry.timestamp)} />
            </div>
          </div>

          {/* Source */}
          <div className="rounded-lg border p-3" style={{ borderColor: 'var(--dash-border)' }}>
            <div className="text-xs text-[var(--dash-text-4)] font-medium uppercase tracking-wide mb-1.5">Source</div>
            <div className="flex items-center gap-2">
              <FileText className="w-3.5 h-3.5 text-[var(--dash-text-4)]" />
              <span className="text-sm text-[var(--dash-text-2)]">{entry.source}</span>
              {entry.sourceUrl !== '#' && (
                <a href={entry.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-500 hover:text-indigo-400">
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>

          {/* Related entities with same asset */}
          {relatedEntries.length > 0 && (
            <div className="rounded-lg border p-3" style={{ borderColor: 'var(--dash-border)' }}>
              <div className="text-xs text-[var(--dash-text-4)] font-medium uppercase tracking-wide mb-2">Related Entities — Same Asset</div>
              <div className="space-y-2">
                {relatedEntries.map(re => {
                  const reEntity = watchedEntities.find(e => e.id === re.entityId);
                  return (
                    <div key={re.id} className="flex items-center justify-between text-xs">
                      <span className="text-[var(--dash-text-2)]">{reEntity?.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-[var(--dash-text-3)] tabular-nums">{fmtCompact(re.latestValue)}</span>
                        <span className={`tabular-nums font-medium ${re.pctChange > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-500'}`}>
                          {re.pctChange > 0 ? '+' : ''}{re.pctChange.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2">
            <Button size="sm" onClick={() => { onStatusChange(alert.id, 'reviewed'); onClose(); }} className="text-xs bg-green-600 hover:bg-green-700 text-white flex-1">
              <CheckCircle2 className="w-3 h-3 mr-1" /> Mark Reviewed
            </Button>
            <Button size="sm" variant="outline" onClick={() => { onStatusChange(alert.id, 'snoozed'); onClose(); }} className="text-xs flex-1">
              <BellOff className="w-3 h-3 mr-1" /> Snooze
            </Button>
            <Button size="sm" variant="outline" onClick={() => { onStatusChange(alert.id, 'dismissed'); onClose(); }} className="text-xs text-red-500 border-red-500/30 hover:bg-red-500/10">
              <X className="w-3 h-3 mr-1" /> Dismiss
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

// ── Small Components ──

function ConfidenceBadge({ confidence }: { confidence: 'high' | 'medium' | 'low' }) {
  const colors = {
    high: 'bg-green-500/10 text-green-600 dark:text-green-400',
    medium: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
    low: 'bg-gray-500/10 text-[var(--dash-text-4)]',
  };
  return <span className={`text-xs px-1.5 py-0.5 rounded capitalize ${colors[confidence]}`}>{confidence}</span>;
}

function StatusDot({ status }: { status: string }) {
  const colors: Record<string, string> = { new: 'bg-blue-500', reviewed: 'bg-green-500', dismissed: 'bg-gray-400' };
  return <div className={`w-2 h-2 rounded-full ${colors[status] ?? 'bg-gray-400'}`} title={status} />;
}

function ScoreBar({ label, value }: { label: string; value: number }) {
  const color = value >= 80 ? 'bg-red-500' : value >= 60 ? 'bg-amber-500' : value >= 40 ? 'bg-cyan-500' : 'bg-gray-400';
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-[var(--dash-text-4)] w-28 flex-shrink-0">{label}</span>
      <div className="flex-1 h-1.5 rounded-full bg-[var(--dash-border)]">
        <div className={`h-full rounded-full transition-all ${color}`} style={{ width: `${value}%` }} />
      </div>
      <span className="text-xs text-[var(--dash-text-3)] tabular-nums w-7 text-right">{Math.round(value)}</span>
    </div>
  );
}

function DetailItem({ label, value, valueColor }: { label: string; value: string; valueColor?: string }) {
  return (
    <div>
      <div className="text-xs text-[var(--dash-text-4)]">{label}</div>
      <div className={`text-sm font-medium capitalize ${valueColor ?? 'text-[var(--dash-text-1)]'}`}>{value}</div>
    </div>
  );
}
