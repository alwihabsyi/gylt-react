import { Palette } from "@/constants/theme";
import { useSemanticColors } from "@/hooks/use-semantic-colors";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    KeyboardAvoidingView,
    Linking,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CONTACT_EMAIL = "alwihbsyi.ah@gmail.com";

type ContactCardProps = {
    icon: React.ComponentProps<typeof Ionicons>["name"];
    title: string;
    subtitle: string;
    onPress: () => void;
};

function ContactCard({ icon, title, subtitle, onPress }: ContactCardProps) {
    const colors = useSemanticColors();
    return (
        <TouchableOpacity style={styles.contactCard} onPress={onPress} activeOpacity={0.75}>
            <View style={styles.contactIcon}>
                <Ionicons name={icon} size={22} color={Palette.EmeraldGreen} />
            </View>
            <View style={styles.contactInfo}>
                <Text style={[styles.contactTitle, { color: colors.textPrimary }]}>{title}</Text>
                <Text style={[styles.contactSubtitle, { color: colors.textMuted }]}>{subtitle}</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.chevron} />
        </TouchableOpacity>
    );
}

export default function ContactUsScreen() {
    const colors = useSemanticColors();
    const router = useRouter();
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [sending, setSending] = useState(false);

    const handleEmailPress = () => {
        Linking.openURL(`mailto:${CONTACT_EMAIL}`);
    };

    const handleSendMessage = async () => {
        if (!subject.trim() || !message.trim()) {
            Alert.alert("Missing fields", "Please fill in both subject and message.");
            return;
        }
        setSending(true);
        const mailUrl = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
        const supported = await Linking.canOpenURL(mailUrl);
        if (supported) {
            await Linking.openURL(mailUrl);
        } else {
            Alert.alert("No mail app", `Please email us directly at ${CONTACT_EMAIL}`);
        }
        setSending(false);
    };

    return (
        <SafeAreaView style={[styles.safe, { backgroundColor: colors.screenGrey }]} edges={["top"]}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : undefined}
            >
                <View style={styles.header}>
                    <TouchableOpacity
                        style={[styles.backBtn, { backgroundColor: colors.surface, shadowColor: colors.shadow }]}
                        onPress={() => router.back()}
                    >
                        <Ionicons name="arrow-back" size={22} color={colors.textPrimary} />
                    </TouchableOpacity>
                    <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>Contact Us</Text>
                    <View style={{ width: 40 }} />
                </View>

                <ScrollView
                    contentContainerStyle={styles.content}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={[styles.introCard, { backgroundColor: `${Palette.EmeraldGreen}10` }]}>
                        <Ionicons name="headset-outline" size={32} color={Palette.EmeraldGreen} />
                        <Text style={[styles.introTitle, { color: colors.textPrimary }]}>
                            {"We're here to help"}
                        </Text>
                        <Text style={[styles.introBody, { color: colors.textSecondary }]}>
                            {"Have a question or feedback? Reach out to us and we'll get back to you as fast as possible."}
                        </Text>
                    </View>

                    <Text style={[styles.sectionLabel, { color: colors.textMuted }]}>REACH OUT DIRECTLY</Text>
                    <View style={[styles.card, { backgroundColor: colors.surface }]}>
                        <ContactCard
                            icon="mail-outline"
                            title="Email Support"
                            subtitle={CONTACT_EMAIL}
                            onPress={handleEmailPress}
                        />
                    </View>

                    <Text style={[styles.sectionLabel, { color: colors.textMuted }]}>SEND A MESSAGE</Text>
                    <View style={[styles.card, { backgroundColor: colors.surface }]}>
                        <View style={styles.field}>
                            <Text style={[styles.fieldLabel, { color: colors.textMuted }]}>Subject</Text>
                            <TextInput
                                style={[styles.input, { color: colors.textPrimary }]}
                                value={subject}
                                onChangeText={setSubject}
                                placeholder="What's this about?"
                                placeholderTextColor={colors.textPlaceholderAlt}
                            />
                        </View>
                        <View style={[styles.divider, { backgroundColor: colors.divider }]} />
                        <View style={styles.field}>
                            <Text style={[styles.fieldLabel, { color: colors.textMuted }]}>Message</Text>
                            <TextInput
                                style={[styles.input, styles.messageInput, { color: colors.textPrimary }]}
                                value={message}
                                onChangeText={setMessage}
                                placeholder="Tell us how we can help…"
                                placeholderTextColor={colors.textPlaceholderAlt}
                                multiline
                                textAlignVertical="top"
                            />
                        </View>
                    </View>

                    <TouchableOpacity
                        style={[styles.sendBtn, sending && { opacity: 0.6 }]}
                        onPress={handleSendMessage}
                        activeOpacity={0.85}
                        disabled={sending}
                    >
                        <Ionicons name="send-outline" size={18} color={colors.inverseOnAccent} />
                        <Text style={[styles.sendBtnText, { color: colors.inverseOnAccent }]}>
                            {sending ? "Opening mail…" : "Send Message"}
                        </Text>
                    </TouchableOpacity>

                    <View style={styles.noticeRow}>
                        <Ionicons name="time-outline" size={14} color={colors.textMuted} />
                        <Text style={[styles.noticeText, { color: colors.textMuted }]}>
                            We typically respond within a few minutes or hours.
                        </Text>
                    </View>

                    <View style={{ height: 40 }} />
                </ScrollView>
            </KeyboardAvoidingView>
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
    introCard: {
        borderRadius: 16,
        padding: 20,
        alignItems: "center",
        gap: 8,
        marginBottom: 4,
    },
    introTitle: { fontSize: 17, fontWeight: "700" },
    introBody: { fontSize: 13, textAlign: "center", lineHeight: 20 },
    sectionLabel: {
        fontSize: 11,
        fontWeight: "600",
        letterSpacing: 1,
        paddingHorizontal: 4,
        marginBottom: -4,
    },
    card: { borderRadius: 16, overflow: "hidden" },
    contactCard: {
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
        gap: 14,
    },
    contactIcon: {
        width: 42,
        height: 42,
        borderRadius: 12,
        backgroundColor: `${Palette.EmeraldGreen}15`,
        alignItems: "center",
        justifyContent: "center",
    },
    contactInfo: { flex: 1 },
    contactTitle: { fontSize: 15, fontWeight: "600" },
    contactSubtitle: { fontSize: 13, marginTop: 2 },
    field: { padding: 16, gap: 6 },
    fieldLabel: { fontSize: 12, fontWeight: "600" },
    input: { fontSize: 15, paddingVertical: 4 },
    messageInput: { minHeight: 100 },
    divider: { height: 1, marginHorizontal: 16 },
    sendBtn: {
        height: 52,
        borderRadius: 16,
        backgroundColor: Palette.EmeraldGreen,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
    },
    sendBtnText: { fontSize: 16, fontWeight: "700" },
    noticeRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
    },
    noticeText: { fontSize: 12 },
});
