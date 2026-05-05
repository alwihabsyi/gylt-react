import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AnalyticsActivity from "@/components/analytics/analytics-activity";
import AnalyticsBarChart from "@/components/analytics/analytics-bar-chart";
import AnalyticsCategories from "@/components/analytics/analytics-categories";
import AnalyticsHero from "@/components/analytics/analytics-hero";
import AnalyticsStatRow from "@/components/analytics/analytics-stat-row";
import MonthFilterChip, { MonthFilter } from "@/components/finance/month-filter-chip";
import { Palette } from "@/constants/theme";
import { useSemanticColors } from "@/hooks/use-semantic-colors";
import { useAppSelector } from "@/store/hooks";
import { ActivityType } from "@/types/activity";
import { ALL_CATEGORIES } from "@/types/category";
import { getTotals } from "@/utils/activity";
import { matchesDateFilter } from "@/utils/analytics-util";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const CATEGORY_COLORS = [
  Palette.EmeraldGreen,
  Palette.OceanBlue,
  Palette.MangoOrange,
  Palette.WatermelonRed,
  Palette.MustardYellow,
];

function getLastMonth(m: number, y: number): { month: number; year: number } {
  if (m === 0) return { month: 11, year: y - 1 };
  return { month: m - 1, year: y };
}

export default function AnalyticsScreen() {
  const colors = useSemanticColors();
  const router = useRouter();
  const { items } = useAppSelector((state) => state.transactions);

  const [dateFilter, setDateFilter] = useState<MonthFilter>({
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
  });

  const thisPeriod = useMemo(() => {
    return items.filter((it) => matchesDateFilter(it, dateFilter));
  }, [items, dateFilter]);

  const lastPeriod = useMemo(() => {
    if (dateFilter.month === null) {
      const lastYearFilter: MonthFilter = { year: dateFilter.year - 1, month: null };
      return items.filter((it) => matchesDateFilter(it, lastYearFilter));
    }

    const { month: lastM, year: lastY } = getLastMonth(dateFilter.month, dateFilter.year);
    const lastMonthFilter: MonthFilter = { year: lastY, month: lastM };
    return items.filter((it) => matchesDateFilter(it, lastMonthFilter));
  }, [items, dateFilter]);

  const { income, expense } = getTotals(thisPeriod);
  const { income: lastIncome, expense: lastExpense } = getTotals(lastPeriod);

  const net = income - expense;
  const savingsRate = income > 0 ? ((net / income) * 100).toFixed(1) : "0.0";

  const delta = (curr: number, prev: number) => (prev > 0 ? (((curr - prev) / prev) * 100).toFixed(1) : null);

  const topCategory = useMemo(() => {
    const expenses = thisPeriod.filter((it) => it.type === ActivityType.Expense);
    const best = ALL_CATEGORIES.map((cat, i) => ({
      title: cat.title,
      icon: cat.iconName,
      color: CATEGORY_COLORS[i],
      amount: expenses
        .filter((it) => it.category.title === cat.title)
        .reduce((s: number, it) => s + it.amount, 0),
    }))
      .sort((a, b) => b.amount - a.amount)[0];

    return best?.amount > 0 ? best : undefined;
  }, [thisPeriod]);

  const periodLabel =
    dateFilter.month === null ? `All of ${dateFilter.year}` : `${MONTHS[dateFilter.month]} ${dateFilter.year}`;

  return (
    <SafeAreaView style={[s.container, { backgroundColor: colors.canvas }]} edges={["top"]}>
      <View style={s.header}>
        <TouchableOpacity
          style={[s.back, { backgroundColor: colors.surface, shadowColor: colors.shadow }]}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={22} color={colors.textPrimary} />
        </TouchableOpacity>

        <View style={s.headerText}>
          <Text style={[s.title, { color: colors.textPrimary }]}>Analytics</Text>
          <View style={s.subRow}>
            <Text style={[s.sub, { color: colors.textMuted }]}>{periodLabel}</Text>
            <MonthFilterChip value={dateFilter} onChange={setDateFilter} />
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
        <AnalyticsHero net={net} savingsRate={savingsRate} topCategory={topCategory} />
        <AnalyticsStatRow
          income={income}
          expense={expense}
          incomeDelta={delta(income, lastIncome)}
          expenseDelta={delta(expense, lastExpense)}
        />
        <AnalyticsBarChart items={items} anchor={dateFilter} />
        <AnalyticsCategories items={thisPeriod} />
        <AnalyticsActivity
          thisMonth={thisPeriod.length}
          lastMonth={lastPeriod.length}
          allTime={items.length}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 14,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  back: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  headerText: { flex: 1 },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 4 },
  subRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 12 },
  sub: { fontSize: 13 },
  scroll: { paddingHorizontal: 20, paddingBottom: 40, gap: 16 },
});
