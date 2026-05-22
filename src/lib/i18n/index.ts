import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { en } from './en';
import { es } from './es';
import { dataEs } from './data-es';

type Language = 'en' | 'es';

export const useLanguageStore = create<{
  lang: Language;
  setLang: (l: Language) => void;
}>()(
  persist(
    (set) => ({
      lang: 'en',
      setLang: (lang) => set({ lang }),
    }),
    { name: 'lang' }
  )
);

function interpolate(template: string, vars: Record<string, string | number>): string {
  return template.replace(/{(\w+)}/g, (_, key) => String(vars[key] ?? `{${key}}`));
}

export function useT() {
  const { lang } = useLanguageStore();
  const dict = lang === 'es' ? es : en;
  return (path: string, vars?: Record<string, string | number>): string => {
    const keys = path.split('.');
    let val: unknown = dict;
    for (const k of keys) val = (val as Record<string, unknown>)?.[k];
    if (typeof val !== 'string') return path;
    return vars ? interpolate(val, vars) : val;
  };
}

/**
 * Translate data-level strings (signal labels, sector names, regions, etc.)
 * Returns a function that maps English strings to the current language.
 * If no translation is found, returns the original string unchanged.
 */
export function useTd() {
  const { lang } = useLanguageStore();
  return (str: string): string => {
    if (lang !== 'es') return str;
    return dataEs[str] ?? str;
  };
}

/**
 * Translate data-level strings by ID key (for long texts keyed by data ID).
 * Usage: tdId('pm-us-1', 'explanation', originalText)
 * Falls back to the original text if no translation found.
 */
export function useTdId() {
  const { lang } = useLanguageStore();
  return (id: string, field: string, original: string): string => {
    if (lang !== 'es') return original;
    return dataEs[`${id}.${field}`] ?? dataEs[original] ?? original;
  };
}
