import { Palette } from "@/constants/theme";
import { useSemanticColors } from "@/hooks/use-semantic-colors";
import { useTranslation } from "@/hooks/useTranslation";
import { formatCurrency } from "@/utils/formatter";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

type StatProps = {
    label: string;
    value: number;
    delta?: string | null;
    color: string;
    icon: React.ComponentProps<typeof Ionicons>["name"];
};

function StatCard({ label, value, delta, color, icon }: StatProps) {
    const colors = useSemanticColors();
    return (
        <View
            style={[
                s.card,
                {
                    borderLeftColor: color,
                    backgroundColor: colors.surface,
                    shadowColor: colors.shadow,
                },
            ]}
        >
            <View style={[s.iconWrap, { backgroundColor: `${color}18` }]}>
                <Ionicons name={icon} size={18} color={color} />
            </View>
            <Text style={[s.label, { color: colors.textMuted }]}>{label}</Text>
            <Text style={[s.value, { color }]}>{formatCurrency(value)}</Text>
            {delta && <Text style={[s.delta, { color: colors.textMuted }]}>{delta}</Text>}
        </View>
    );
}

type Props = {
    income: number;
    expense: number;
    incomeDelta?: string | null;
    expenseDelta?: string | null;
};

export default function AnalyticsStatRow({ income, expense, incomeDelta, expenseDelta }: Props) {
    const { t } = useTranslation();

    const formatDeltaPct = (delta: string | null | undefined) => {
        if (!delta) return null;
        const value = `${Number(delta) >= 0 ? "+" : ""}${delta}`;
        return t("analytics.statDelta", { value });
    };

    return (
        <View style={s.row}>
            <StatCard
                label={t("analytics.statIncome")}
                value={income}
                delta={formatDeltaPct(incomeDelta)}
                color={Palette.EmeraldGreen}
                icon="arrow-down-circle-outline"
            />
            <View style={{ width: 12 }} />
            <StatCard
                label={t("analytics.statExpenses")}
                value={expense}
                delta={formatDeltaPct(expenseDelta)}
                color={Palette.PoppyRed}
                icon="arrow-up-circle-outline"
            />
        </View>
    );
}

const s = StyleSheet.create({
    row: { flexDirection: "row" },
    card: {
        flex: 1, borderRadius: 16, padding: 14, borderLeftWidth: 3,
        shadowOpacity: 0.05, shadowOffset: { width: 0, height: 2 }, shadowRadius: 6, elevation: 2,
    },
    iconWrap: { width: 32, height: 32, borderRadius: 10, justifyContent: "center", alignItems: "center", marginBottom: 10 },
    label: { fontSize: 11, fontWeight: "500", textTransform: "uppercase", letterSpacing: 0.4, marginBottom: 4 },
    value: { fontSize: 16, fontWeight: "700" },
    delta: { fontSize: 11, marginTop: 2 },
});