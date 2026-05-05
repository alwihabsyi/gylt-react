import { useSemanticColors } from "@/hooks/use-semantic-colors";
import { useAppSelector } from "@/store/hooks";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CONFIRM_PHRASE = "DELETE";

export default function DeleteAccountScreen() {
    const colors = useSemanticColors();
    const router = useRouter();
    const { email } = useAppSelector((state) => state.auth);

    const [password, setPassword] = useState("");
    const [confirmText, setConfirmText] = useState("");
    const [deleting, setDeleting] = useState(false);

    const canDelete = confirmText === CONFIRM_PHRASE && password.length > 0;

    const handleDelete = () => {
        if (!canDelete) return;
        Alert.alert(
            "Final Confirmation",
            "This action is permanent and cannot be undone. All your data will be deleted immediately.",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete My Account",
                    style: "destructive",
                    onPress: async () => {
                        setDeleting(true);
                        setDeleting(false);
                    },
                },
            ],
        );
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
                    <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>Delete Account</Text>
                    <View style={{ width: 40 }} />
                </View>

                <ScrollView
                    contentContainerStyle={styles.content}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    <View
                        style={[
                            styles.warningBanner,
                            {
                                backgroundColor: colors.surfaceWarning,
                                borderColor: colors.dangerBorder,
                            },
                        ]}
                    >
                        <Ionicons name="warning-outline" size={32} color={colors.danger} />
                        <Text style={[styles.warningTitle, { color: colors.danger }]}>
                            This cannot be undone
                        </Text>
                        <Text style={[styles.warningBody, { color: colors.textSecondary }]}>
                            Deleting your account will permanently erase all your transactions, goals, and personal data from our servers.
                        </Text>
                    </View>

                    <View style={[styles.card, { backgroundColor: colors.surface }]}>
                        <Text style={[styles.cardTitle, { color: colors.textPrimary }]}>
                            What will be deleted
                        </Text>
                        {[
                            "Your profile and account credentials",
                            "All financial transactions and history",
                            "All goals and progress data",
                            "Your preferences and settings",
                        ].map((item) => (
                            <View key={item} style={styles.deleteItem}>
                                <Ionicons name="close-circle-outline" size={18} color={colors.danger} />
                                <Text style={[styles.deleteItemText, { color: colors.textSecondary }]}>
                                    {item}
                                </Text>
                            </View>
                        ))}
                    </View>

                    <View style={[styles.card, { backgroundColor: colors.surface }]}>
                        <Text style={[styles.cardTitle, { color: colors.textPrimary }]}>
                            Confirm deletion
                        </Text>

                        <View style={styles.field}>
                            <Text style={[styles.fieldLabel, { color: colors.textMuted }]}>Your password</Text>
                            <TextInput
                                style={[styles.input, { color: colors.textPrimary }]}
                                value={password}
                                onChangeText={setPassword}
                                placeholder="Enter your current password"
                                placeholderTextColor={colors.textPlaceholderAlt}
                                secureTextEntry
                            />
                        </View>

                        <View style={[styles.divider, { backgroundColor: colors.divider }]} />

                        <View style={styles.field}>
                            <Text style={[styles.fieldLabel, { color: colors.textMuted }]}>
                                Type <Text style={[styles.confirmPhrase, { color: colors.danger }]}>{CONFIRM_PHRASE}</Text> to confirm
                            </Text>
                            <TextInput
                                style={[styles.input, { color: colors.textPrimary }]}
                                value={confirmText}
                                onChangeText={setConfirmText}
                                placeholder={`Type ${CONFIRM_PHRASE} here`}
                                placeholderTextColor={colors.textPlaceholderAlt}
                                autoCapitalize="characters"
                            />
                        </View>
                    </View>

                    {email && (
                        <View style={styles.emailRow}>
                            <Ionicons name="person-outline" size={14} color={colors.textMuted} />
                            <Text style={[styles.emailText, { color: colors.textMuted }]}>
                                Logged in as {email}
                            </Text>
                        </View>
                    )}

                    <TouchableOpacity
                        style={[
                            styles.deleteBtn,
                            { backgroundColor: colors.danger },
                            (!canDelete || deleting) && styles.deleteBtnDisabled,
                        ]}
                        onPress={handleDelete}
                        activeOpacity={0.85}
                        disabled={!canDelete || deleting}
                    >
                        <Ionicons name="trash-outline" size={18} color={colors.inverseOnAccent} />
                        <Text style={[styles.deleteBtnText, { color: colors.inverseOnAccent }]}>
                            {deleting ? "Deleting…" : "Delete My Account"}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.cancelBtn, { backgroundColor: colors.surface }]}
                        onPress={() => router.back()}
                        activeOpacity={0.75}
                    >
                        <Text style={[styles.cancelBtnText, { color: colors.textPrimary }]}>
                            Keep My Account
                        </Text>
                    </TouchableOpacity>

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
    content: { padding: 20, gap: 16 },
    warningBanner: {
        borderRadius: 16,
        borderWidth: 1,
        padding: 20,
        alignItems: "center",
        gap: 8,
    },
    warningTitle: { fontSize: 17, fontWeight: "700" },
    warningBody: { fontSize: 13, textAlign: "center", lineHeight: 20 },
    card: { borderRadius: 16, padding: 16, gap: 12 },
    cardTitle: { fontSize: 14, fontWeight: "700" },
    deleteItem: { flexDirection: "row", alignItems: "flex-start", gap: 10 },
    deleteItemText: { flex: 1, fontSize: 14, lineHeight: 20 },
    field: { gap: 6 },
    fieldLabel: { fontSize: 12, fontWeight: "600" },
    confirmPhrase: { fontWeight: "700" },
    input: { fontSize: 15, paddingVertical: 8 },
    divider: { height: 1 },
    emailRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
    },
    emailText: { fontSize: 12 },
    deleteBtn: {
        height: 52,
        borderRadius: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        marginTop: 4,
    },
    deleteBtnDisabled: { opacity: 0.4 },
    deleteBtnText: { fontSize: 16, fontWeight: "700" },
    cancelBtn: {
        height: 52,
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center",
    },
    cancelBtnText: { fontSize: 16, fontWeight: "600" },
});
