import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { en } from './en';
import { es } from './es';

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
