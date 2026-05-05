import { useSemanticColors } from "@/hooks/use-semantic-colors";
import { StyleSheet, Text, View } from "react-native";

type Props = {
    label: string;
    value: string;
};

export function GoalDetailRow({ label, value }: Props) {
    const colors = useSemanticColors();
    return (
        <View style={[styles.row, { borderTopColor: colors.hairlineDivider }]}>
            <Text style={[styles.label, { color: colors.textMuted }]}>{label}</Text>
            <Text style={[styles.value, { color: colors.textPrimary }]}>{value}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: 12,
        paddingVertical: 8,
        borderTopWidth: 1,
    },
    label: { flex: 1, fontSize: 12, fontWeight: "700" },
    value: {
        flex: 1.2,
        fontSize: 12,
        fontWeight: "800",
        textAlign: "right",
    },
});