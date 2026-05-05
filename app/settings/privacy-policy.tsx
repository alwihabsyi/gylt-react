import { Palette } from "@/constants/theme";
import { useSemanticColors } from "@/hooks/use-semantic-colors";
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
                <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>Privacy Policy</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                <Text style={[styles.lastUpdated, { color: colors.textMuted }]}>
                    Last updated: {LAST_UPDATED}
                </Text>

                <Body>
                    {`Welcome to ${APP_NAME}. We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains what information we collect, how we use it, and what rights you have in relation to it.`}
                </Body>

                <Section title="1. Information We Collect">
                    <Body>We collect information you provide directly to us when you:</Body>
                    <Bullet>Create an account (name, email address, password)</Bullet>
                    <Bullet>Enter financial transactions, goals, or budget data</Bullet>
                    <Bullet>Contact us for support</Bullet>
                    <Body>{"\n"}We do not collect sensitive financial data such as bank account numbers or credit card details.</Body>
                </Section>

                <Section title="2. How We Use Your Information">
                    <Body>We use the information we collect to:</Body>
                    <Bullet>Provide, operate, and maintain the app</Bullet>
                    <Bullet>Personalize your experience</Bullet>
                    <Bullet>Send transactional notifications you have requested</Bullet>
                    <Bullet>Improve the app based on aggregate usage patterns</Bullet>
                    <Bullet>Respond to your comments and questions</Bullet>
                </Section>

                <Section title="3. Data Storage and Security">
                    <Body>
                        {`Your data is stored securely using Google Firebase infrastructure. We implement industry-standard security measures including encryption in transit (TLS) and at rest. However, no method of electronic storage is 100% secure, and we cannot guarantee absolute security.`}
                    </Body>
                </Section>

                <Section title="4. Data Sharing and Disclosure">
                    <Body>We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following limited circumstances:</Body>
                    <Bullet>With service providers who help us operate the app (e.g., Firebase)</Bullet>
                    <Bullet>When required by law or to protect our legal rights</Bullet>
                    <Bullet>With your explicit consent</Bullet>
                </Section>

                <Section title="5. Data Retention">
                    <Body>
                        {`We retain your personal data for as long as your account is active. If you delete your account, we will delete your personal data within 30 days, except where retention is required by law.`}
                    </Body>
                </Section>

                <Section title="6. Your Rights">
                    <Body>Depending on your location, you may have the right to:</Body>
                    <Bullet>Access the personal data we hold about you</Bullet>
                    <Bullet>Request correction of inaccurate data</Bullet>
                    <Bullet>{"Request deletion of your data (\"right to be forgotten\")"}</Bullet>
                    <Bullet>Object to or restrict how we process your data</Bullet>
                    <Bullet>Data portability</Bullet>
                    <Body>{"\n"}To exercise any of these rights, please contact us at {CONTACT_EMAIL}.</Body>
                </Section>

                <Section title="7. Children's Privacy">
                    <Body>
                        {`${APP_NAME} is not directed to individuals under the age of 13. We do not knowingly collect personal information from children. If we become aware that a child under 13 has provided us with personal information, we will take steps to delete such information.`}
                    </Body>
                </Section>

                <Section title="8. Third-Party Services">
                    <Body>
                        {`Our app uses Google Firebase for authentication and data storage. These third-party services have their own privacy policies, and we encourage you to review them. We are not responsible for the privacy practices of these services.`}
                    </Body>
                </Section>

                <Section title="9. Changes to This Policy">
                    <Body>
                        {`We may update this Privacy Policy from time to time. We will notify you of any significant changes by updating the "Last updated" date at the top of this page. Your continued use of the app after changes constitutes acceptance of the revised policy.`}
                    </Body>
                </Section>

                <Section title="10. Contact Us">
                    <Body>{`If you have any questions or concerns about this Privacy Policy, please contact us at:\n\nEmail: ${CONTACT_EMAIL}\n\nWe aim to respond to all inquiries as fast as possible.`}</Body>
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
