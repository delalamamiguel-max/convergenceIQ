'use client';

import { useDashboardStore } from '@/lib/store';
import { useTheme } from '@/components/theme-provider';
import { ControlPanel } from './control-panel';
import { Overview } from './overview';
import { InvestingView } from './investing-view';
import { EntrepreneurshipView } from './entrepreneurship-view';
import { JobMarketsView } from './job-markets-view';
import { Badge } from '@/components/ui/badge';
import { Activity, TrendingUp, Rocket, Briefcase, ChevronLeft, Sun, Moon } from 'lucide-react';

const navItems = [
  { id: 'overview' as const, label: 'Overview', icon: Activity, color: 'text-gray-500 dark:text-gray-300' },
  { id: 'investing' as const, label: 'Investing', icon: TrendingUp, color: 'text-indigo-500 dark:text-indigo-400' },
  { id: 'entrepreneurship' as const, label: 'Entrepreneurship', icon: Rocket, color: 'text-emerald-500 dark:text-emerald-400' },
  { id: 'jobMarkets' as const, label: 'Job Markets', icon: Briefcase, color: 'text-cyan-500 dark:text-cyan-400' },
];

export function MainDashboard() {
  const { activeDomain, setActiveDomain } = useDashboardStore();
  const { theme, toggleTheme } = useTheme();

  const renderView = () => {
    switch (activeDomain) {
      case 'investing': return <InvestingView />;
      case 'entrepreneurship': return <EntrepreneurshipView />;
      case 'jobMarkets': return <JobMarketsView />;
      default: return <Overview />;
    }
  };

  return (
    <div className="min-h-screen bg-[var(--dash-bg)] text-[var(--dash-text-1)] transition-colors duration-200">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 backdrop-blur-xl border-b transition-colors duration-200"
        style={{ backgroundColor: 'var(--dash-header)', borderColor: 'var(--dash-border)' }}>
        <div className="max-w-[1600px] mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                  <Activity className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h1 className="text-sm font-bold tracking-tight text-[var(--dash-text-1)]">ConvergenceIQ</h1>
                  <p className="text-[10px] text-[var(--dash-text-4)]">Investing · Entrepreneurship · Job Markets</p>
                </div>
              </div>

              <div className="hidden md:flex items-center gap-1 ml-6">
                {navItems.map(item => {
                  const Icon = item.icon;
                  const active = activeDomain === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveDomain(item.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all focus-visible:outline-2 focus-visible:outline-indigo-500 ${
                        active
                          ? 'bg-[var(--dash-bg-muted)] text-[var(--dash-text-1)] shadow-sm border border-[var(--dash-border)]'
                          : 'text-[var(--dash-text-3)] hover:text-[var(--dash-text-2)] hover:bg-[var(--dash-bg-muted)]'
                      }`}
                    >
                      <Icon className={`w-3.5 h-3.5 ${active ? item.color : ''}`} />
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Badge variant="outline" className="text-[10px] border-[var(--dash-border)] text-[var(--dash-text-4)] hidden sm:flex">
                Live Data + Curated Sources
              </Badge>
              <div className="text-[10px] text-[var(--dash-text-4)] hidden sm:block">
                {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </div>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all border border-[var(--dash-border)] bg-[var(--dash-bg-card)] text-[var(--dash-text-3)] hover:text-[var(--dash-text-1)] hover:border-indigo-500/50 focus-visible:outline-2 focus-visible:outline-indigo-500"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile nav */}
        <div className="md:hidden flex items-center gap-1 px-4 pb-2 overflow-x-auto">
          {navItems.map(item => {
            const Icon = item.icon;
            const active = activeDomain === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveDomain(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  active
                    ? 'bg-[var(--dash-bg-muted)] text-[var(--dash-text-1)]'
                    : 'text-[var(--dash-text-4)]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${active ? item.color : ''}`} />
                {item.label}
              </button>
            );
          })}
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-[1600px] mx-auto px-4 py-6">
        {activeDomain !== 'overview' && (
          <button
            onClick={() => setActiveDomain('overview')}
            className="flex items-center gap-1 text-xs text-[var(--dash-text-4)] hover:text-[var(--dash-text-2)] mb-4 transition-colors focus-visible:outline-2 focus-visible:outline-indigo-500 rounded"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            Back to Overview
          </button>
        )}

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Content Area */}
          <div className="flex-1 min-w-0">
            {renderView()}
          </div>

          {/* Control Panel Sidebar */}
          <div className="w-full lg:w-72 flex-shrink-0">
            <div className="sticky top-24">
              <ControlPanel />

              {/* Data Sources Legend */}
              <div className="mt-4 p-4 rounded-xl border transition-colors" style={{ backgroundColor: 'var(--dash-bg-card)', borderColor: 'var(--dash-border)' }}>
                <div className="text-[10px] text-[var(--dash-text-4)] font-medium mb-2 uppercase tracking-wide">Data Sources</div>
                <div className="space-y-1">
                  {[
                    { name: 'FRED (Federal Reserve)', type: 'live' },
                    { name: 'BLS (Bureau of Labor Statistics)', type: 'live' },
                    { name: 'SEC EDGAR', type: 'live' },
                    { name: 'Alpha Vantage', type: 'live' },
                    { name: 'GNews / News Aggregator', type: 'live' },
                    { name: 'ACLED (Conflict Data)', type: 'curated' },
                    { name: 'OpenSecrets (Lobbying)', type: 'curated' },
                    { name: 'Transparency Intl (CPI)', type: 'curated' },
                    { name: 'Pew Research (Cultural)', type: 'curated' },
                    { name: 'Crunchbase (Startups)', type: 'curated' },
                    { name: 'MIT (AI Disruption)', type: 'curated' },
                  ].map(source => (
                    <div key={source.name} className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${source.type === 'live' ? 'bg-green-500' : 'bg-amber-500'}`} />
                      <span className="text-[10px] text-[var(--dash-text-4)]">{source.name}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-3 mt-2 pt-2 border-t border-[var(--dash-border)]">
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    <span className="text-[10px] text-[var(--dash-text-4)]">Live API</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    <span className="text-[10px] text-[var(--dash-text-4)]">Curated Data</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
