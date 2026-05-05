import React, { useCallback, useEffect, useState } from "react";
import { FlatList, RefreshControl, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import FinanceCard from "@/components/finance/finance-card";
import HomeHeader from "@/components/home/home-header";
import GlobalEmptyState from "@/components/ui/global-empty-state";
import GlobalError from "@/components/ui/global-error";
import GlobalLoading from "@/components/ui/global-loading";
import { AppRoutes } from "@/constants/routes";
import { Palette } from "@/constants/theme";
import { useSemanticColors } from "@/hooks/use-semantic-colors";
import { useTranslation } from "@/hooks/useTranslation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchActivities } from "@/store/slices/activitySlice";
import { Activity } from "@/types/activity";
import { getTotals } from "@/utils/activity";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const colors = useSemanticColors();
  const { t } = useTranslation();
  const router = useRouter();
  const { userId, fullName } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const { loading, error, items } = useAppSelector((state) => state.transactions);
  const { income, expense } = getTotals(items);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(() => {
    if (userId) dispatch(fetchActivities(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    load();
  }, [load]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    if (userId) await dispatch(fetchActivities(userId));
    setRefreshing(false);
  }, [dispatch, userId]);

  const renderHeader = useCallback(
    () =>
      <HomeHeader
        username={fullName ?? "User"}
        income={income}
        expense={expense}
        onPress={(cat) => router.push({ pathname: AppRoutes.CategoryTransactions, params: { category: cat } })}
      />,
    [fullName, income, expense, router],
  );

  const renderItem = useCallback(
    ({ item }: { item: Activity }) => <FinanceCard activity={item} />,
    [],
  );

  const keyExtractor = useCallback((item: Activity) => item.id, []);

  const refreshControl = (
    <RefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
      tintColor={Palette.EmeraldGreen}
      colors={[Palette.EmeraldGreen]}
    />
  );

  const bodyContent = loading && !refreshing ? (
    <GlobalLoading label={t("finance.loadingTransactions")} />
  ) : error ? (
    <GlobalError title={t("common.errorTitle")} message={error} />
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
      {items.length > 0 ? (
        <FlatList
          data={items}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
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
          {bodyContent}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  listContent: { paddingHorizontal: 20, paddingBottom: 20 },
  scrollGrow: { flexGrow: 1 },
});