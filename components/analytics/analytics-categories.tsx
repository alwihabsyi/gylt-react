import { Palette } from "@/constants/theme";
import { useSemanticColors } from "@/hooks/use-semantic-colors";
import { Activity, ActivityType } from "@/types/activity";
import { ALL_CATEGORIES } from "@/types/category";
import { formatCurrency } from "@/utils/formatter";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const COLORS = [Palette.EmeraldGreen, Palette.OceanBlue, Palette.MangoOrange, Palette.WatermelonRed, Palette.MustardYellow];

export default function AnalyticsCategories({ items }: { items: Activity[] }) {
    const colors = useSemanticColors();
    const [tab, setTab] = useState<"expense" | "income">("expense");

    const tabItems = items.filter(
        (it) => it.type === (tab === "expense" ? ActivityType.Expense : ActivityType.Income),
    );
    const total = tabItems.reduce((s, it) => s + it.amount, 0);

    const cats = ALL_CATEGORIES
        .map((cat, i) => ({
            ...cat,
            color: COLORS[i % COLORS.length],
            amount: tabItems.filter((it) => it.category.title === cat.title).reduce((s, it) => s + it.amount, 0),
        }))
        .filter((c) => c.amount > 0)
        .sort((a, b) => b.amount - a.amount);

    return (
        <View style={[s.card, { backgroundColor: colors.surface, shadowColor: colors.shadow }]}>
            <View style={s.titleRow}>
                <Text style={[s.title, { color: colors.textPrimary }]}>By Category</Text>
                <View style={[s.tabs, { backgroundColor: colors.surfaceMuted }]}>
                    {(["expense", "income"] as const).map((t) => (
                        <TouchableOpacity
                            key={t}
                            style={[
                                s.tab,
                                tab === t && [
                                    s.tabOn,
                                    { backgroundColor: colors.surface, shadowColor: colors.shadow },
                                ],
                            ]}
                            onPress={() => setTab(t)}
                        >
                            <Text
                                style={[
                                    s.tabText,
                                    { color: colors.textMuted },
                                    tab === t && [s.tabTextOn, { color: colors.textPrimary }],
                                ]}
                            >
                                {t === "expense" ? "Expenses" : "Income"}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            {cats.length === 0 ? (
                <Text style={[s.empty, { color: colors.textMuted }]}>
                    No {tab} data this month.
                </Text>
            ) : cats.map((c) => (
                <View key={c.title} style={s.row}>
                    <View style={[s.icon, { backgroundColor: `${c.color}18` }]}>
                        <Ionicons name={c.iconName} size={16} color={c.color} />
                    </View>
                    <View style={s.right}>
                        <View style={s.topRow}>
                            <Text style={[s.catTitle, { color: colors.textPrimary }]}>{c.title}</Text>
                            <Text style={[s.amount, { color: colors.textPrimary }]}>
                                {formatCurrency(c.amount)}
                            </Text>
                        </View>
                        <View style={[s.track, { backgroundColor: colors.divider }]}>
                            <View style={[s.fill, { width: `${total > 0 ? (c.amount / total) * 100 : 0}%`, backgroundColor: c.color }]} />
                        </View>
                        <Text style={[s.pct, { color: colors.textMuted }]}>
                            {total > 0 ? ((c.amount / total) * 100).toFixed(1) : "0.0"}%
                        </Text>
                    </View>
                </View>
            ))}
        </View>
    );
}

const s = StyleSheet.create({
    card: { borderRadius: 20, padding: 18, shadowOpacity: 0.05, shadowOffset: { width: 0, height: 2 }, shadowRadius: 8, elevation: 2 },
    titleRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 },
    title: { fontSize: 16, fontWeight: "700" },
    tabs: { flexDirection: "row", borderRadius: 10, padding: 3 },
    tab: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8 },
    tabOn: { shadowOpacity: 0.08, shadowRadius: 4, elevation: 1 },
    tabText: { fontSize: 12, fontWeight: "500" },
    tabTextOn: { fontWeight: "700" },
    empty: { fontSize: 14, textAlign: "center", paddingVertical: 20 },
    row: { flexDirection: "row", alignItems: "center", marginBottom: 16, gap: 12 },
    icon: { width: 36, height: 36, borderRadius: 10, justifyContent: "center", alignItems: "center" },
    right: { flex: 1 },
    topRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 6 },
    catTitle: { fontSize: 13, fontWeight: "600" },
    amount: { fontSize: 13, fontWeight: "600" },
    track: { height: 6, borderRadius: 4, overflow: "hidden" },
    fill: { height: 6, borderRadius: 4 },
    pct: { fontSize: 10, marginTop: 3 },
});