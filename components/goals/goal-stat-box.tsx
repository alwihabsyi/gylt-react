import { useSemanticColors } from "@/hooks/use-semantic-colors";
import { StyleSheet, Text, View } from "react-native";

type Props = {
    label: string;
    value: string;
};

export function GoalStatBox({ label, value }: Props) {
    const colors = useSemanticColors();
    return (
        <View style={[styles.box, { backgroundColor: colors.surfaceInset }]}>
            <Text style={[styles.label, { color: colors.textMuted }]}>{label}</Text>
            <Text style={[styles.value, { color: colors.textPrimary }]} numberOfLines={1}>
                {value}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    box: {
        flex: 1,
        borderRadius: 16,
        padding: 12,
        gap: 6,
    },
    label: { fontSize: 12, fontWeight: "700" },
    value: { fontSize: 18, fontWeight: "900" },
});