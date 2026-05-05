import { Palette } from "@/constants/theme";
import { useSemanticColors } from "@/hooks/use-semantic-colors";
import { Activity, ActivityType } from "@/types/activity";
import { parseFormattedDate } from "@/utils/formatter";
import { StyleSheet, Text, View } from "react-native";

import { MonthFilter } from "@/components/finance/month-filter-chip";
import { useTranslation } from "@/hooks/useTranslation";
import type { TranslationKey } from "@/locales";

const BAR_H = 110;

function totals(items: Activity[]) {
  return {
    income: items
      .filter((i) => i.type === ActivityType.Income)
      .reduce((s, i) => s + i.amount, 0),
    expense: items
      .filter((i) => i.type === ActivityType.Expense)
      .reduce((s, i) => s + i.amount, 0),
  };
}

type Props = {
  items: Activity[];
  anchor: MonthFilter;
};

export default function AnalyticsBarChart({ items, anchor }: Props) {
  const colors = useSemanticColors();
  const { t } = useTranslation();
  const baseMonth = anchor.month ?? 11; // default "All months" to December of the selected year
  const baseYear = anchor.year;

  const months = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(baseYear, baseMonth - 5 + i, 1);
    const mi = d.getMonth();
    return {
      month: mi,
      year: d.getFullYear(),
      label: t(`months.short.${mi}` as TranslationKey),
    };
  });

  const data = months.map(({ month, year, label }) => {
    const slice = items.filter((it) => {
      const d = parseFormattedDate(it.createdAt);
      return d !== null && d.getMonth() === month && d.getFullYear() === year;
    });
    return { label, ...totals(slice) };
  });

  const max = Math.max(...data.flatMap((d) => [d.income, d.expense]), 1);

  return (
    <View style={[s.card, { backgroundColor: colors.surface, shadowColor: colors.shadow }]}>
      <Text style={[s.title, { color: colors.textPrimary }]}>{t("analytics.chartTitle")}</Text>

      <View style={s.legend}>
        <View style={s.legendItem}>
          <View style={[s.dot, { backgroundColor: Palette.EmeraldGreen }]} />
          <Text style={[s.legendText, { color: colors.textMuted }]}>
            {t("analytics.legendIncome")}
          </Text>
        </View>

        <View style={s.legendItem}>
          <View style={[s.dot, { backgroundColor: Palette.PoppyRed }]} />
          <Text style={[s.legendText, { color: colors.textMuted }]}>
            {t("analytics.legendExpense")}
          </Text>
        </View>
      </View>

      <View style={s.barsRow}>
        {data.map((d, i) => (
          <View key={i} style={s.group}>
            <View style={[s.barArea, { height: BAR_H }]}>
              <View
                style={[
                  s.bar,
                  {
                    height: Math.max((d.income / max) * BAR_H, d.income > 0 ? 4 : 0),
                    backgroundColor: Palette.EmeraldGreen,
                    marginRight: 2,
                  },
                ]}
              />
              <View
                style={[
                  s.bar,
                  {
                    height: Math.max((d.expense / max) * BAR_H, d.expense > 0 ? 4 : 0),
                    backgroundColor: Palette.PoppyRed,
                  },
                ]}
              />
            </View>
            <Text style={[s.monthLabel, { color: colors.textMuted }]}>{d.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: 18,
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  title: { fontSize: 16, fontWeight: "700", marginBottom: 12 },
  legend: { flexDirection: "row", gap: 16, marginBottom: 14 },
  legendItem: { flexDirection: "row", alignItems: "center", gap: 6 },
  dot: { width: 8, height: 8, borderRadius: 4 },
  legendText: { fontSize: 12 },
  barsRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end" },
  group: { alignItems: "center", flex: 1 },
  barArea: { flexDirection: "row", alignItems: "flex-end", justifyContent: "center" },
  bar: { width: 10, borderRadius: 4 },
  monthLabel: { fontSize: 11, marginTop: 6 },
});
