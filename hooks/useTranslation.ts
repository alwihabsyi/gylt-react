import { translate, type TranslationKey } from "@/locales";
import { useAppSelector } from "@/store/hooks";
import { useCallback } from "react";

export function useTranslation() {
  const locale = useAppSelector((state) => state.locale.locale);

  const t = useCallback(
    (key: TranslationKey, params?: Record<string, string | number>) =>
      translate(locale, key, params),
    [locale],
  );

  return { t, locale };
}
