import { Palette } from "@/constants/theme";
import { useSemanticColors } from "@/hooks/use-semantic-colors";
import { useTranslation } from "@/hooks/useTranslation";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
    Linking,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SAWERIA_URL = "https://saweria.co/alwidev";   // replace with yours
// const TRAKTEER_URL = "https://trakteer.id/yourusername"; // replace with yours

type SupportButtonProps = {
    label: string;
    subtitle: string;
    emoji: string;
    color: string;
    onPress: () => void;
};

function SupportButton({ label, subtitle, emoji, color, onPress }: SupportButtonProps) {
    return (
        <TouchableOpacity
            style={[styles.supportBtn, { backgroundColor: color }]}
            onPress={onPress}
            activeOpacity={0.85}
        >
            <Text style={styles.supportEmoji}>{emoji}</Text>
            <View style={styles.supportBtnText}>
                <Text style={styles.supportBtnLabel}>{label}</Text>
                <Text style={styles.supportBtnSub}>{subtitle}</Text>
            </View>
            <Ionicons name="arrow-forward" size={18} color="#fff" />
        </TouchableOpacity>
    );
}

export default function SupportCreatorScreen() {
    const colors = useSemanticColors();
    const { t } = useTranslation();
    const router = useRouter();

    return (
        <SafeAreaView style={[styles.safe, { backgroundColor: colors.screenGrey }]} edges={["top"]}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={[styles.backBtn, { backgroundColor: colors.surface, shadowColor: colors.shadow }]}
                    onPress={() => router.back()}
                >
                    <Ionicons name="arrow-back" size={22} color={colors.textPrimary} />
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>
                    {t("support.title")}
                </Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                {/* Hero */}
                <View style={[styles.heroCard, { backgroundColor: colors.surface }]}>
                    <Text style={styles.heroEmoji}>🧑‍💻</Text>
                    <Text style={[styles.heroTitle, { color: colors.textPrimary }]}>
                        {t("support.heroTitle")}
                    </Text>
                    <Text style={[styles.heroBody, { color: colors.textSecondary }]}>
                        {t("support.heroBody")}
                    </Text>
                </View>

                {/* What your support does */}
                <View style={[styles.card, { backgroundColor: colors.surface }]}>
                    <Text style={[styles.cardTitle, { color: colors.textPrimary }]}>
                        {t("support.whatTitle")}
                    </Text>
                    {[
                        { icon: "rocket-outline", key: "support.what1" },
                        { icon: "bug-outline", key: "support.what2" },
                        { icon: "language-outline", key: "support.what3" },
                        { icon: "heart-outline", key: "support.what4" },
                    ].map(({ icon, key }) => (
                        <View key={key} style={styles.featureRow}>
                            <View style={styles.featureIcon}>
                                <Ionicons
                                    name={icon as any}
                                    size={18}
                                    color={Palette.EmeraldGreen}
                                />
                            </View>
                            <Text style={[styles.featureText, { color: colors.textSecondary }]}>
                                {t(key as any)}
                            </Text>
                        </View>
                    ))}
                </View>

                {/* Support buttons */}
                <Text style={[styles.sectionLabel, { color: colors.textMuted }]}>
                    {t("support.sectionLabel")}
                </Text>

                <SupportButton
                    label="Saweria"
                    subtitle={t("support.saweriaSub")}
                    emoji="☕"
                    color="#F97316"
                    onPress={() => Linking.openURL(SAWERIA_URL)}
                />

                {/* <SupportButton
                    label="Trakteer"
                    subtitle={t("support.trakteerSub")}
                    emoji="🍵"
                    color="#EF4444"
                    onPress={() => Linking.openURL(TRAKTEER_URL)}
                /> */}

                {/* Note */}
                <View style={styles.noteRow}>
                    <Ionicons name="information-circle-outline" size={14} color={colors.textMuted} />
                    <Text style={[styles.noteText, { color: colors.textMuted }]}>
                        {t("support.note")}
                    </Text>
                </View>

                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: { flex: 1 },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingVertical: 12,
    },
    backBtn: {
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
    headerTitle: { fontSize: 18, fontWeight: "700" },
    content: { padding: 20, gap: 14 },
    heroCard: {
        borderRadius: 20,
        padding: 24,
        alignItems: "center",
        gap: 10,
        marginBottom: 4,
    },
    heroEmoji: { fontSize: 48 },
    heroTitle: { fontSize: 20, fontWeight: "800", textAlign: "center" },
    heroBody: { fontSize: 14, lineHeight: 22, textAlign: "center" },
    card: { borderRadius: 16, padding: 16, gap: 14 },
    cardTitle: { fontSize: 14, fontWeight: "700" },
    featureRow: { flexDirection: "row", alignItems: "center", gap: 12 },
    featureIcon: {
        width: 34,
        height: 34,
        borderRadius: 10,
        backgroundColor: `${Palette.EmeraldGreen}15`,
        alignItems: "center",
        justifyContent: "center",
    },
    featureText: { flex: 1, fontSize: 14, lineHeight: 20 },
    sectionLabel: {
        fontSize: 11,
        fontWeight: "600",
        letterSpacing: 1,
        textTransform: "uppercase",
        paddingHorizontal: 4,
        marginBottom: -4,
    },
    supportBtn: {
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 16,
        padding: 18,
        gap: 14,
    },
    supportEmoji: { fontSize: 28 },
    supportBtnText: { flex: 1 },
    supportBtnLabel: { color: "#fff", fontSize: 16, fontWeight: "700" },
    supportBtnSub: { color: "rgba(255,255,255,0.75)", fontSize: 12, marginTop: 2 },
    noteRow: {
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 6,
        paddingHorizontal: 4,
    },
    noteText: { flex: 1, fontSize: 12, lineHeight: 18 },
});