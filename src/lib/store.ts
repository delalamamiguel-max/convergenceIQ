import { create } from 'zustand';
import { WeightConfig, ThresholdConfig, Domain } from '@/types/dashboard';
import { thresholdPresets } from './data/curated-datasets';

interface DashboardState {
  activePreset: string;
  weights: WeightConfig;
  thresholds: ThresholdConfig;
  activeDomain: Domain | 'overview';
  scenarioOverrides: Record<string, number>;
  selectedRegions: string[];
  selectedSectors: string[];

  setActivePreset: (id: string) => void;
  setWeights: (weights: WeightConfig) => void;
  setThresholds: (thresholds: ThresholdConfig) => void;
  setActiveDomain: (domain: Domain | 'overview') => void;
  setScenarioOverride: (variableId: string, value: number) => void;
  resetScenarios: () => void;
  toggleRegion: (region: string) => void;
  toggleSector: (sector: string) => void;
  clearFilters: () => void;
}

const defaultPreset = thresholdPresets.find(p => p.id === 'balanced')!;

export const useDashboardStore = create<DashboardState>((set) => ({
  activePreset: 'balanced',
  weights: defaultPreset.weights,
  thresholds: defaultPreset.thresholds,
  activeDomain: 'overview',
  scenarioOverrides: {},
  selectedRegions: [],
  selectedSectors: [],

  setActivePreset: (id) => {
    const preset = thresholdPresets.find(p => p.id === id);
    if (preset) {
      set({
        activePreset: id,
        weights: { ...preset.weights },
        thresholds: { ...preset.thresholds },
      });
    }
  },

  setWeights: (weights) => set({ weights, activePreset: 'custom' }),
  setThresholds: (thresholds) => set({ thresholds, activePreset: 'custom' }),
  setActiveDomain: (activeDomain) => set({ activeDomain }),

  setScenarioOverride: (variableId, value) =>
    set((state) => ({
      scenarioOverrides: { ...state.scenarioOverrides, [variableId]: value },
    })),

  resetScenarios: () => set({ scenarioOverrides: {} }),

  toggleRegion: (region) =>
    set((state) => ({
      selectedRegions: state.selectedRegions.includes(region)
        ? state.selectedRegions.filter(r => r !== region)
        : [...state.selectedRegions, region],
    })),

  toggleSector: (sector) =>
    set((state) => ({
      selectedSectors: state.selectedSectors.includes(sector)
        ? state.selectedSectors.filter(s => s !== sector)
        : [...state.selectedSectors, sector],
    })),

  clearFilters: () => set({ selectedRegions: [], selectedSectors: [] }),
}));
