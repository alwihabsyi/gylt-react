import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import FinanceCard from "@/components/finance/finance-card";
import MonthFilterChip, { MonthFilter } from "@/components/finance/month-filter-chip";
import GlobalEmptyState from "@/components/ui/global-empty-state";
import { AppRoutes } from "@/constants/routes";
import { Palette } from "@/constants/theme";
import { useSemanticColors } from "@/hooks/use-semantic-colors";
import { useTranslation } from "@/hooks/useTranslation";
import { useAppSelector } from "@/store/hooks";
import { ALL_CATEGORIES } from "@/types/category";
import { getTotals } from "@/utils/activity";
import { matchesDateFilter } from "@/utils/analytics-util";
import { formatCurrency } from "@/utils/formatter";

export default function CategoryTransactionsScreen() {
    const colors = useSemanticColors();
    const { t } = useTranslation();
    const router = useRouter();
    const { category: categoryTitle } = useLocalSearchParams<{
        category: string;
    }>();

    const [dateFilter, setDateFilter] = useState<MonthFilter>({
        year: new Date().getFullYear(),
        month: new Date().getMonth(),
    });

    const { items } = useAppSelector((state) => state.transactions);

    const categoryDef = useMemo(
        () => ALL_CATEGORIES.find((c) => c.title === categoryTitle),
        [categoryTitle],
    );

    const filtered = useMemo(
        () => items.filter((item) => item.category.title === categoryTitle && matchesDateFilter(item, dateFilter)),
        [items, categoryTitle, dateFilter],
    );

    const { income, expense } = getTotals(filtered);

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.canvas }]} edges={["top"]}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={[styles.backButton, { backgroundColor: colors.surface, shadowColor: colors.shadow }]}
                    onPress={() => router.back()}
                >
                    <Ionicons name="arrow-back" size={22} color={colors.textPrimary} />
                </TouchableOpacity>

                <View style={styles.titleRow}>
                    <View style={styles.iconWrap}>
                        <Ionicons
                            name={categoryDef?.iconName ?? "grid-outline"}
                            size={22}
                            color={Palette.EmeraldGreen}
                        />
                    </View>
                    <Text style={[styles.title, { color: colors.textPrimary }]}>
                        {categoryTitle ?? t("category.titleFallback")}
                    </Text>
                </View>
            </View>

            {/* Summary card */}
            <View style={[styles.summaryCard, { backgroundColor: colors.surface, shadowColor: colors.shadow }]}>
                <View style={styles.summaryItem}>
                    <Ionicons name="arrow-down" size={14} color={Palette.EmeraldGreen} />
                    <View>
                        <Text style={[styles.summaryLabel, { color: colors.textMuted }]}>
                            {t("category.income")}
                        </Text>
                        <Text style={[styles.summaryAmount, { color: Palette.EmeraldGreen }]}>
                            {formatCurrency(income)}
                        </Text>
                    </View>
                </View>

                <View style={[styles.divider, { backgroundColor: colors.divider }]} />

                <View style={styles.summaryItem}>
                    <Ionicons name="arrow-up" size={14} color={Palette.PoppyRed} />
                    <View>
                        <Text style={[styles.summaryLabel, { color: colors.textMuted }]}>
                            {t("category.expenses")}
                        </Text>
                        <Text style={[styles.summaryAmount, { color: Palette.PoppyRed }]}>
                            {formatCurrency(expense)}
                        </Text>
                    </View>
                </View>

                <View style={[styles.divider, { backgroundColor: colors.divider }]} />

                <View style={styles.summaryItem}>
                    <Ionicons name="list-outline" size={14} color={Palette.InkMuted} />
                    <View>
                        <Text style={[styles.summaryLabel, { color: colors.textMuted }]}>
                            {t("category.transactions")}
                        </Text>
                        <Text style={[styles.summaryAmount, { color: colors.textPrimary }]}>
                            {filtered.length}
                        </Text>
                    </View>
                </View>
            </View>

            {/* Transaction list */}
            <FlatList
                data={filtered}
                keyExtractor={(item, index) => item.id + index}
                renderItem={({ item }) => <FinanceCard activity={item} />}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    <View style={styles.subRow}>
                        <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
                            {t("category.allTransactions")}
                        </Text>
                        <MonthFilterChip value={dateFilter} onChange={setDateFilter} />
                    </View>
                }
                ListEmptyComponent={
                    <GlobalEmptyState
                        icon={categoryDef ? undefined : "📂"}
                        title={t("category.noTransactionsTitle", {
                            name: categoryTitle ?? t("category.titleFallback"),
                        })}
                        message={t("category.noTransactionsMessage")}
                        actionLabel={t("finance.addTransaction")}
                        onAction={() => router.push(AppRoutes.AddTransaction)}
                    />
                }
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },

    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 12,
        gap: 12,
    },
    backButton: {
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
    titleRow: { flexDirection: "row", alignItems: "center", gap: 10 },
    iconWrap: {
        backgroundColor: `${Palette.EmeraldGreen}1A`,
        padding: 8,
        borderRadius: 10,
    },
    title: { fontSize: 22, fontWeight: "700" },

    summaryCard: {
        flexDirection: "row",
        borderRadius: 16,
        marginHorizontal: 20,
        marginBottom: 20,
        padding: 16,
        justifyContent: "space-between",
        alignItems: "center",
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 2,
    },
    summaryItem: { flexDirection: "row", alignItems: "center", gap: 8 },
    summaryLabel: { fontSize: 11, marginBottom: 2 },
    summaryAmount: { fontSize: 15, fontWeight: "600" },
    divider: { width: 1, height: 36 },

    sectionTitle: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 12,
    },
    listContent: { paddingHorizontal: 20, paddingBottom: 40 },
    subRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 10 },
    sub: { fontSize: 13, color: "gray" },
});
