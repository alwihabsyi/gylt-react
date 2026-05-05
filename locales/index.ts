import { en, type TranslationKey } from "./en";
import { id } from "./id";

export type AppLocale = "en" | "id";

const dictionaries: Record<AppLocale, Record<TranslationKey, string>> = {
  en,
  id,
};

/**
 * Replace `{key}` placeholders with values from `params`.
 */
export function translate(
  locale: AppLocale,
  key: TranslationKey,
  params?: Record<string, string | number>,
): string {
  let s = dictionaries[locale][key] ?? dictionaries.en[key] ?? key;
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      s = s.replaceAll(`{${k}}`, String(v));
    }
  }
  return s;
}

export type { TranslationKey };
