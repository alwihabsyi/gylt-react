import { Palette } from "@/constants/theme";
import { StyleSheet, View } from "react-native";

type Props = {
    progress: number; // 0–100
};

export function GoalProgressBar({ progress }: Props) {
    const clamped = Math.max(0, Math.min(progress, 100));
    return (
        <View style={styles.track}>
            <View style={[styles.fill, { width: `${clamped}%` }]} />
        </View>
    );
}

const styles = StyleSheet.create({
    track: {
        height: 10,
        borderRadius: 10,
        backgroundColor: "rgba(158,158,158,0.35)",
        overflow: "hidden",
    },
    fill: {
        height: "100%",
        borderRadius: 10,
        backgroundColor: Palette.EmeraldGreen,
    },
});