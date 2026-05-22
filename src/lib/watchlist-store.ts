import { create } from 'zustand';
import { WatchlistFilters, AlertStatus, WatchlistAlert } from '@/types/watchlist';
import {
  watchlistEntries, generateAlerts, computeKPIs, buildTimeline,
} from './watchlist-engine';

interface WatchlistState {
  filters: WatchlistFilters;
  alertStatuses: Record<string, AlertStatus>;
  drawerAlertId: string | null;
  activeTab: 'alerts' | 'watchlist' | 'timeline';

  setFilter: <K extends keyof WatchlistFilters>(key: K, value: WatchlistFilters[K]) => void;
  resetFilters: () => void;
  setAlertStatus: (alertId: string, status: AlertStatus) => void;
  openDrawer: (alertId: string) => void;
  closeDrawer: () => void;
  setActiveTab: (tab: 'alerts' | 'watchlist' | 'timeline') => void;
}

const defaultFilters: WatchlistFilters = {
  person: 'all',
  assetType: 'all',
  severity: 'all',
  dateRange: 'all',
};

export const useWatchlistStore = create<WatchlistState>((set) => ({
  filters: { ...defaultFilters },
  alertStatuses: {},
  drawerAlertId: null,
  activeTab: 'alerts',

  setFilter: (key, value) =>
    set((state) => ({ filters: { ...state.filters, [key]: value } })),

  resetFilters: () => set({ filters: { ...defaultFilters } }),

  setAlertStatus: (alertId, status) =>
    set((state) => ({
      alertStatuses: { ...state.alertStatuses, [alertId]: status },
    })),

  openDrawer: (alertId) => set({ drawerAlertId: alertId }),
  closeDrawer: () => set({ drawerAlertId: null }),
  setActiveTab: (tab) => set({ activeTab: tab }),
}));

export function useFilteredAlerts() {
  const { filters, alertStatuses } = useWatchlistStore();

  const allAlerts = generateAlerts(watchlistEntries);

  const withStatuses = allAlerts.map(a => ({
    ...a,
    status: alertStatuses[a.id] ?? a.status,
  }));

  return withStatuses.filter(a => {
    if (filters.person !== 'all' && a.entityId !== filters.person) return false;
    if (filters.severity !== 'all' && a.severity !== filters.severity) return false;

    if (filters.assetType !== 'all') {
      const entry = watchlistEntries.find(e => e.id === a.entryId);
      if (entry && entry.exposureType !== filters.assetType) return false;
    }

    if (filters.dateRange !== 'all') {
      const ageMs = Date.now() - new Date(a.timestamp).getTime();
      const maxMs = {
        '24h': 86400000,
        '7d': 7 * 86400000,
        '30d': 30 * 86400000,
        '90d': 90 * 86400000,
      }[filters.dateRange];
      if (ageMs > maxMs) return false;
    }

    return true;
  });
}

export function useFilteredEntries() {
  const { filters } = useWatchlistStore();

  return watchlistEntries.filter(e => {
    if (filters.person !== 'all' && e.entityId !== filters.person) return false;
    if (filters.assetType !== 'all' && e.exposureType !== filters.assetType) return false;

    if (filters.dateRange !== 'all') {
      const ageMs = Date.now() - new Date(e.timestamp).getTime();
      const maxMs = {
        '24h': 86400000,
        '7d': 7 * 86400000,
        '30d': 30 * 86400000,
        '90d': 90 * 86400000,
      }[filters.dateRange];
      if (ageMs > maxMs) return false;
    }

    return true;
  });
}

export function useKPIs() {
  const alerts = useFilteredAlerts();
  const entries = useFilteredEntries();
  return computeKPIs(alerts, entries);
}

export function useTimeline() {
  const entries = useFilteredEntries();
  const alerts = generateAlerts(watchlistEntries);
  return buildTimeline(entries, alerts);
}
