import { Palette } from "@/constants/theme";
import { useSemanticColors } from "@/hooks/use-semantic-colors";
import { formatCurrency } from "@/utils/formatter";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

type Props = {
    net: number;
    savingsRate: string;
    topCategory?: { title: string; icon: React.ComponentProps<typeof Ionicons>["name"] };
};

export default function AnalyticsHero({ net, savingsRate, topCategory }: Props) {
    const colors = useSemanticColors();
    const positive = net >= 0;
    const bg = positive ? Palette.EmeraldGreen : Palette.PoppyRed;
    return (
        <View style={[s.card, { backgroundColor: bg, shadowColor: colors.shadow }]}>
            <Text style={s.label}>Net this month</Text>
            <Text style={s.value}>{formatCurrency(Math.abs(net))}</Text>
            <Text style={s.sub}>
                {positive ? `Savings rate: ${savingsRate}%` : "You spent more than you earned"}
            </Text>
            {topCategory && (
                <View style={s.badge}>
                    <Ionicons name={topCategory.icon} size={12} color={colors.inverseOnAccent} />
                    <Text style={s.badgeText}>Top spend: {topCategory.title}</Text>
                </View>
            )}
        </View>
    );
}

const s = StyleSheet.create({
    card: {
        borderRadius: 20, padding: 22,
        shadowOpacity: 0.12, shadowOffset: { width: 0, height: 4 }, shadowRadius: 10, elevation: 4,
    },
    label: { fontSize: 11, color: "rgba(255,255,255,0.8)", fontWeight: "500", textTransform: "uppercase", letterSpacing: 0.5 },
    value: { fontSize: 32, fontWeight: "800", color: "#FFFFFF", marginVertical: 4 },
    sub: { fontSize: 13, color: "rgba(255,255,255,0.85)" },
    badge: {
        flexDirection: "row", alignItems: "center", gap: 5,
        marginTop: 12, alignSelf: "flex-start",
        backgroundColor: "rgba(255,255,255,0.2)",
        paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20,
    },
    badgeText: { fontSize: 11, color: "#FFFFFF", fontWeight: "600" },
});