import { useRouter } from "expo-router";
import React, { useCallback, useMemo, useState } from "react";
import { FlatList, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import FinanceCard from "@/components/finance/finance-card";
import FinanceHeader from "@/components/home/finance-header";
import GlobalEmptyState from "@/components/ui/global-empty-state";
import GlobalError from "@/components/ui/global-error";
import GlobalLoading from "@/components/ui/global-loading";
import SpeedDialFab from "@/components/ui/speed-dial-fab";
import { AppRoutes } from "@/constants/routes";
import { Palette } from "@/constants/theme";
import { useAppSelector } from "@/store/hooks";
import { Category } from "@/types/category";
import { getTotals } from "@/utils/activity";

export default function FinanceScreen() {
  const router = useRouter();
  const { loading, error, items } = useAppSelector((state) => state.transactions);
  const { income, expense } = getTotals(items);
  const [selectedFilter, setSelectedFilter] = useState("All");

  const filterOptions = useMemo(
    () => ["All", ...Object.values(Category).map((c) => c.title)],
    []
  );

  const renderHeader = useCallback(
    () => <FinanceHeader
      income={income}
      expense={expense}
      filterOptions={filterOptions}
      selectedFilter={selectedFilter}
      setSelectedFilter={setSelectedFilter}
    />,
    [income, expense, filterOptions, selectedFilter, setSelectedFilter]
  );

  const bodyContent = loading ? (
    <GlobalLoading label="Loading your transactions…" />
  ) : error ? (
    <GlobalError title="Something went wrong" message={error} />
  ) : (
    <GlobalEmptyState
      icon="🧾"
      title="No transactions yet"
      message="Add your first transaction to see your summary here."
      actionLabel="Add transaction"
      onAction={() => router.push(AppRoutes.AddTransaction)}
    />
  );

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {items.length > 0 ? (
        <FlatList
          data={items}
          keyExtractor={(item, index) => item.name + index}
          renderItem={({ item }) => <FinanceCard activity={item} />}
          contentContainerStyle={styles.listContent}
          ListHeaderComponent={renderHeader}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <ScrollView
          contentContainerStyle={[styles.listContent, styles.scrollGrow]}
          showsVerticalScrollIndicator={false}
        >
          {renderHeader()}
          {bodyContent}
        </ScrollView>
      )}

      {/* FAB sits absolutely positioned over the list */}
      <SpeedDialFab
        onAddTransactionClick={() => router.push(AppRoutes.AddTransaction)}
        onViewStatsClick={() => console.log("Navigate to Stats")}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Palette.Canvas, paddingTop: 10 },
  listContent: { paddingHorizontal: 20, paddingBottom: 100 }, // Extra bottom padding for the FAB
  headerContainer: { paddingBottom: 10 },

  pillsRow: { gap: 8, paddingRight: 20 },

  monthText: {
    fontSize: 18,
    fontWeight: "600",
    color: Palette.InkDark,
    marginBottom: 10,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  summaryItem: { flexDirection: "row", alignItems: "center", gap: 5 },
  summaryAmount: { fontSize: 14, fontWeight: "500" },

  spacer10: { height: 10 },
  spacer20: { height: 20 },
  scrollGrow: { flexGrow: 1 },
});
