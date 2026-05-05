import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import FinanceCard from "@/components/finance/finance-card";
import { MonthFilter } from "@/components/finance/month-filter-chip";
import FinanceHeader from "@/components/home/finance-header";
import GlobalEmptyState from "@/components/ui/global-empty-state";
import GlobalError from "@/components/ui/global-error";
import GlobalLoading from "@/components/ui/global-loading";
import SpeedDialFab from "@/components/ui/speed-dial-fab";
import { AppRoutes } from "@/constants/routes";
import { Palette } from "@/constants/theme";
import { useSemanticColors } from "@/hooks/use-semantic-colors";
import { useTranslation } from "@/hooks/useTranslation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchActivities } from "@/store/slices/activitySlice";
import { Category } from "@/types/category";
import { getTotals } from "@/utils/activity";
import { parseFormattedDate } from "@/utils/formatter";

export default function FinanceScreen() {
  const colors = useSemanticColors();
  const { t } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.auth.userId);
  const { loading, error, items } = useAppSelector((state) => state.transactions);

  const [selectedFilter, setSelectedFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [dateFilter, setDateFilter] = useState<MonthFilter>({
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
  });

  const load = useCallback(() => {
    if (userId) dispatch(fetchActivities(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    load();
  }, [load]);

  const filterOptions = useMemo(
    () => [
      { value: "All", label: t("common.all") },
      ...Object.values(Category).map((c) => ({
        value: c.title,
        label: c.title,
      })),
    ],
    [t],
  );

  const filteredItems = useMemo(() => {
    let result = items;

    result = result.filter((item) => {
      const d = parseFormattedDate(item.createdAt);
      if (!d) return false;
      if (d.getFullYear() !== dateFilter.year) return false;
      if (dateFilter.month !== null && d.getMonth() !== dateFilter.month) return false;
      return true;
    });

    if (selectedFilter !== "All") {
      result = result.filter((item) => item.category.title === selectedFilter);
    }

    const q = searchQuery.trim().toLowerCase();
    if (q) {
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.category.title.toLowerCase().includes(q),
      );
    }

    return result;
  }, [items, selectedFilter, searchQuery, dateFilter]);

  const { income, expense } = getTotals(filteredItems);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    if (userId) await dispatch(fetchActivities(userId));
    setRefreshing(false);
  }, [dispatch, userId]);

  const renderHeader = useCallback(
    () => (
      <FinanceHeader
        income={income}
        expense={expense}
        filterOptions={filterOptions}
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        dateFilter={dateFilter}
        onDateChange={setDateFilter}
      />
    ),
    [income, expense, filterOptions, selectedFilter, searchQuery, dateFilter],
  );

  const refreshControl = (
    <RefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
      tintColor={Palette.EmeraldGreen}
      colors={[Palette.EmeraldGreen]}
    />
  );

  const isEmpty = filteredItems.length === 0;

  const emptyContent =
    loading && !refreshing ? (
      <GlobalLoading label={t("finance.loadingTransactions")} />
    ) : error ? (
      <GlobalError title={t("common.errorTitle")} message={error} />
    ) : searchQuery || selectedFilter !== "All" ? (
      <GlobalEmptyState
        icon="🔍"
        title={t("finance.noResults")}
        message={t("finance.noResultsMessage")}
        actionLabel={t("finance.clearFilters")}
        onAction={() => {
          setSearchQuery("");
          setSelectedFilter("All");
        }}
      />
    ) : (
      <GlobalEmptyState
        icon="🧾"
        title={t("finance.noTransactionsTitle")}
        message={t("finance.noTransactionsMessage")}
        actionLabel={t("finance.addTransaction")}
        onAction={() => router.push(AppRoutes.AddTransaction)}
      />
    );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.canvas }]} edges={["top"]}>
      {!isEmpty ? (
        <FlatList
          data={filteredItems}
          keyExtractor={(item, index) => item.id + index}
          renderItem={({ item }) => <FinanceCard activity={item} />}
          contentContainerStyle={styles.listContent}
          ListHeaderComponent={renderHeader}
          showsVerticalScrollIndicator={false}
          refreshControl={refreshControl}
        />
      ) : (
        <ScrollView
          contentContainerStyle={[styles.listContent, styles.scrollGrow]}
          showsVerticalScrollIndicator={false}
          refreshControl={refreshControl}
        >
          {renderHeader()}
          {emptyContent}
        </ScrollView>
      )}

      <SpeedDialFab
        onAddTransactionClick={() => router.push(AppRoutes.AddTransaction)}
        onViewStatsClick={() => router.push(AppRoutes.Analytics)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 10 },
  listContent: { paddingHorizontal: 20, paddingBottom: 100 },
  scrollGrow: { flexGrow: 1 },
});