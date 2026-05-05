import { Palette } from "@/constants/theme";
import { useSemanticColors } from "@/hooks/use-semantic-colors";
import { StyleSheet, Text, View } from "react-native";

type Props = {
    current: number;
    target: number;
    progress: number; // 0–100
    formatCurrency: (n: number) => string;
};

export function GoalProgressCard({ current, target, progress, formatCurrency }: Props) {
    const colors = useSemanticColors();
    const clamped = Math.max(0, Math.min(progress, 100));

    return (
        <View style={[styles.container, { backgroundColor: colors.surfaceInset }]}>
            <View style={styles.row}>
                <View style={styles.left}>
                    <Text style={[styles.label, { color: colors.textMuted }]}>Current</Text>
                    <Text style={styles.current} numberOfLines={1} adjustsFontSizeToFit>
                        {formatCurrency(current)}
                    </Text>
                </View>
                <View style={styles.right}>
                    <Text style={[styles.label, { color: colors.textMuted }]}>Target</Text>
                    <Text style={[styles.target, { color: colors.textPrimary }]} numberOfLines={1} adjustsFontSizeToFit>
                        {formatCurrency(target)}
                    </Text>
                </View>
            </View>

            <View style={[styles.track, { backgroundColor: colors.progressTrack }]}>
                <View style={[styles.fill, { width: `${clamped}%` }]} />
            </View>

            <Text style={[styles.percent, { color: colors.textMuted }]}>
                {clamped.toFixed(1)}% reached
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 16,
        padding: 14,
        gap: 10,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
        gap: 8,
    },
    left: { flex: 1 },
    right: { flex: 1, alignItems: "flex-end" },
    label: { fontSize: 11, fontWeight: "700", marginBottom: 2 },
    current: { fontSize: 20, fontWeight: "900", color: Palette.EmeraldGreen },
    target: { fontSize: 16, fontWeight: "700" },
    track: {
        height: 10,
        borderRadius: 10,
        overflow: "hidden",
    },
    fill: {
        height: "100%",
        borderRadius: 10,
        backgroundColor: Palette.EmeraldGreen,
    },
    percent: { fontSize: 12, fontWeight: "700", textAlign: "right" },
});