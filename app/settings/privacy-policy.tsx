import { Palette } from "@/constants/theme";
import { useSemanticColors } from "@/hooks/use-semantic-colors";
import { useTranslation } from "@/hooks/useTranslation";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const LAST_UPDATED = "May 5, 2026";
const APP_NAME = "Gylt";
const CONTACT_EMAIL = "alwihbsyi.ah@gmail.com";

type SectionProps = { title: string; children: React.ReactNode };
function Section({ title, children }: SectionProps) {
    const colors = useSemanticColors();
    return (
        <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>{title}</Text>
            {children}
        </View>
    );
}

function Body({ children }: { children: React.ReactNode }) {
    const colors = useSemanticColors();
    return <Text style={[styles.body, { color: colors.textSecondary }]}>{children}</Text>;
}

function Bullet({ children }: { children: string }) {
    const colors = useSemanticColors();
    return (
        <View style={styles.bulletRow}>
            <Text style={styles.bulletDot}>•</Text>
            <Text style={[styles.bulletText, { color: colors.textSecondary }]}>{children}</Text>
        </View>
    );
}

export default function PrivacyPolicyScreen() {
    const colors = useSemanticColors();
    const { t } = useTranslation();
    const router = useRouter();

    return (
        <SafeAreaView style={[styles.safe, { backgroundColor: colors.screenGrey }]} edges={["top"]}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={[styles.backBtn, { backgroundColor: colors.surface, shadowColor: colors.shadow }]}
                    onPress={() => router.back()}
                >
                    <Ionicons name="arrow-back" size={22} color={colors.textPrimary} />
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>
                    {t("privacy.title")}
                </Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                <Text style={[styles.lastUpdated, { color: colors.textMuted }]}>
                    {t("privacy.lastUpdated", { date: LAST_UPDATED })}
                </Text>

                <Body>{t("privacy.intro", { app: APP_NAME })}</Body>

                <Section title={t("privacy.s1.title")}>
                    <Body>{t("privacy.s1.body")}</Body>
                    <Bullet>{t("privacy.s1.bullet1")}</Bullet>
                    <Bullet>{t("privacy.s1.bullet2")}</Bullet>
                    <Bullet>{t("privacy.s1.bullet3")}</Bullet>
                    <Body>{"\n"}{t("privacy.s1.footer")}</Body>
                </Section>

                <Section title={t("privacy.s2.title")}>
                    <Body>{t("privacy.s2.body")}</Body>
                    <Bullet>{t("privacy.s2.bullet1")}</Bullet>
                    <Bullet>{t("privacy.s2.bullet2")}</Bullet>
                    <Bullet>{t("privacy.s2.bullet3")}</Bullet>
                    <Bullet>{t("privacy.s2.bullet4")}</Bullet>
                    <Bullet>{t("privacy.s2.bullet5")}</Bullet>
                </Section>

                <Section title={t("privacy.s3.title")}>
                    <Body>{t("privacy.s3.body")}</Body>
                </Section>

                <Section title={t("privacy.s4.title")}>
                    <Body>{t("privacy.s4.body")}</Body>
                    <Bullet>{t("privacy.s4.bullet1")}</Bullet>
                    <Bullet>{t("privacy.s4.bullet2")}</Bullet>
                    <Bullet>{t("privacy.s4.bullet3")}</Bullet>
                </Section>

                <Section title={t("privacy.s5.title")}>
                    <Body>{t("privacy.s5.body")}</Body>
                </Section>

                <Section title={t("privacy.s6.title")}>
                    <Body>{t("privacy.s6.body")}</Body>
                    <Bullet>{t("privacy.s6.bullet1")}</Bullet>
                    <Bullet>{t("privacy.s6.bullet2")}</Bullet>
                    <Bullet>{t("privacy.s6.bullet3")}</Bullet>
                    <Bullet>{t("privacy.s6.bullet4")}</Bullet>
                    <Bullet>{t("privacy.s6.bullet5")}</Bullet>
                    <Body>{"\n"}{t("privacy.s6.footer", { email: CONTACT_EMAIL })}</Body>
                </Section>

                <Section title={t("privacy.s7.title")}>
                    <Body>{t("privacy.s7.body", { app: APP_NAME })}</Body>
                </Section>

                <Section title={t("privacy.s8.title")}>
                    <Body>{t("privacy.s8.body")}</Body>
                </Section>

                <Section title={t("privacy.s9.title")}>
                    <Body>{t("privacy.s9.body")}</Body>
                </Section>

                <Section title={t("privacy.s10.title")}>
                    <Body>{t("privacy.s10.body", { email: CONTACT_EMAIL })}</Body>
                </Section>

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
    content: { padding: 20, gap: 20 },
    lastUpdated: { fontSize: 12, marginBottom: -8 },
    section: { gap: 8 },
    sectionTitle: { fontSize: 15, fontWeight: "700" },
    body: { fontSize: 14, lineHeight: 22 },
    bulletRow: { flexDirection: "row", gap: 8, paddingLeft: 4 },
    bulletDot: { fontSize: 14, color: Palette.EmeraldGreen, marginTop: 2 },
    bulletText: { flex: 1, fontSize: 14, lineHeight: 22 },
});