import { useSemanticColors } from "@/hooks/use-semantic-colors";
import { StyleSheet, Text, View } from "react-native";

type Props = { thisMonth: number; lastMonth: number; allTime: number };

export default function AnalyticsActivity({ thisMonth, lastMonth, allTime }: Props) {
    const colors = useSemanticColors();
    return (
        <View style={[s.card, { backgroundColor: colors.surface, shadowColor: colors.shadow }]}>
            <Text style={[s.title, { color: colors.textPrimary }]}>Activity</Text>
            <View style={s.row}>
                {[
                    { n: thisMonth, label: "This month" },
                    { n: lastMonth, label: "Last month" },
                    { n: allTime, label: "All time" },
                ].map(({ n, label }, i) => (
                    <View key={label} style={{ flexDirection: "row", flex: 1 }}>
                        {i > 0 && (
                            <View style={[s.divider, { backgroundColor: colors.divider }]} />
                        )}
                        <View style={s.item}>
                            <Text style={[s.num, { color: colors.textPrimary }]}>{n}</Text>
                            <Text style={[s.label, { color: colors.textMuted }]}>{label}</Text>
                        </View>
                    </View>
                ))}
            </View>
        </View>
    );
}

const s = StyleSheet.create({
    card: { borderRadius: 20, padding: 18, shadowOpacity: 0.05, shadowOffset: { width: 0, height: 2 }, shadowRadius: 8, elevation: 2 },
    title: { fontSize: 16, fontWeight: "700", marginBottom: 14 },
    row: { flexDirection: "row" },
    item: { flex: 1, alignItems: "center" },
    num: { fontSize: 28, fontWeight: "800" },
    label: { fontSize: 12, marginTop: 4 },
    divider: { width: 1, marginVertical: 4 },
});