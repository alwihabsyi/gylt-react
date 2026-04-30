import React, { useCallback, useEffect } from "react";
import { FlatList, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import FinanceCard from "@/components/finance/finance-card";
import HomeHeader from "@/components/home/home-header";
import GlobalEmptyState from "@/components/ui/global-empty-state";
import GlobalError from "@/components/ui/global-error";
import GlobalLoading from "@/components/ui/global-loading";
import { AppRoutes } from "@/constants/routes";
import { Palette } from "@/constants/theme";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchActivities } from "@/store/slices/activitySlice";
import { Activity } from "@/types/activity";
import { getTotals } from "@/utils/activity";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();
  const userId = useAppSelector((state) => state.auth.userId);
  const dispatch = useAppDispatch();
  const { loading, error, items } = useAppSelector((state) => state.transactions);
  const { income, expense } = getTotals(items);

  useEffect(() => {
    if (userId) dispatch(fetchActivities(userId));
  }, [dispatch, userId]);

  const renderHeader = useCallback(
    () => <HomeHeader income={income} expense={expense} />,
    [income, expense]
  );

  const renderItem = useCallback(
    ({ item }: { item: Activity }) => <FinanceCard activity={item} />,
    []
  );

  const keyExtractor = useCallback((item: Activity) => item.id, []);

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
          keyExtractor={keyExtractor}
          renderItem={renderItem}
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Palette.Canvas },
  listContent: { paddingHorizontal: 20, paddingBottom: 20 },
  scrollGrow: { flexGrow: 1 },
});