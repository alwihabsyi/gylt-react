import { Palette } from "@/constants/theme";
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

export default function EditProfileScreen() {
    const colors = useSemanticColors();
    const router = useRouter();
    const { email, fullName } = useAppSelector((state) => state.auth);

    const [name, setName] = useState(fullName ?? "");
    const [newEmail, setNewEmail] = useState(email ?? "");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [saving, setSaving] = useState(false);

    const avatarLetter = (name || email || "U").charAt(0).toUpperCase();

    const handleSave = async () => {
        if (newPassword && newPassword !== confirmPassword) {
            Alert.alert("Error", "Passwords do not match.");
            return;
        }
        if (newPassword && !currentPassword) {
            Alert.alert("Error", "Please enter your current password to set a new one.");
            return;
        }
        setSaving(true);
        // TODO: wire up your update logic here
        // e.g. await authService.updateProfile({ name, email: newEmail, currentPassword, newPassword })
        setSaving(false);
        Alert.alert("Success", "Profile updated.", [{ text: "OK", onPress: () => router.back() }]);
    };

    return (
        <SafeAreaView style={[styles.safe, { backgroundColor: colors.screenGrey }]} edges={["top"]}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : undefined}
            >
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity
                        style={[styles.backBtn, { backgroundColor: colors.surface, shadowColor: colors.shadow }]}
                        onPress={() => router.back()}
                    >
                        <Ionicons name="arrow-back" size={22} color={colors.textPrimary} />
                    </TouchableOpacity>
                    <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>Edit Profile</Text>
                    <View style={{ width: 40 }} />
                </View>

                <ScrollView
                    contentContainerStyle={styles.content}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    {/* Avatar */}
                    <View style={styles.avatarSection}>
                        <View style={styles.avatar}>
                            <Text style={styles.avatarText}>{avatarLetter}</Text>
                        </View>
                        <Text style={[styles.avatarHint, { color: colors.textMuted }]}>
                            Your profile initial
                        </Text>
                    </View>

                    {/* Personal Info */}
                    <View style={[styles.card, { backgroundColor: colors.surface }]}>
                        <Text style={[styles.cardTitle, { color: colors.textPrimary }]}>Personal Info</Text>

                        <View style={styles.field}>
                            <Text style={[styles.fieldLabel, { color: colors.textMuted }]}>Full Name</Text>
                            <TextInput
                                style={[styles.input, { color: colors.textPrimary }]}
                                value={name}
                                onChangeText={setName}
                                placeholder="Enter your name"
                                placeholderTextColor={colors.textPlaceholderAlt}
                                autoCapitalize="words"
                            />
                        </View>

                        <View style={[styles.divider, { backgroundColor: colors.divider }]} />

                        <View style={styles.field}>
                            <Text style={[styles.fieldLabel, { color: colors.textMuted }]}>Email</Text>
                            <TextInput
                                style={[styles.input, { color: colors.textPrimary }]}
                                value={newEmail}
                                onChangeText={setNewEmail}
                                placeholder="Enter your email"
                                placeholderTextColor={colors.textPlaceholderAlt}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>
                    </View>

                    {/* Change Password */}
                    <View style={[styles.card, { backgroundColor: colors.surface }]}>
                        <Text style={[styles.cardTitle, { color: colors.textPrimary }]}>Change Password</Text>
                        <Text style={[styles.cardSubtitle, { color: colors.textMuted }]}>
                            Leave blank to keep your current password
                        </Text>

                        <View style={styles.field}>
                            <Text style={[styles.fieldLabel, { color: colors.textMuted }]}>Current Password</Text>
                            <TextInput
                                style={[styles.input, { color: colors.textPrimary }]}
                                value={currentPassword}
                                onChangeText={setCurrentPassword}
                                placeholder="Enter current password"
                                placeholderTextColor={colors.textPlaceholderAlt}
                                secureTextEntry
                            />
                        </View>

                        <View style={[styles.divider, { backgroundColor: colors.divider }]} />

                        <View style={styles.field}>
                            <Text style={[styles.fieldLabel, { color: colors.textMuted }]}>New Password</Text>
                            <TextInput
                                style={[styles.input, { color: colors.textPrimary }]}
                                value={newPassword}
                                onChangeText={setNewPassword}
                                placeholder="Enter new password"
                                placeholderTextColor={colors.textPlaceholderAlt}
                                secureTextEntry
                            />
                        </View>

                        <View style={[styles.divider, { backgroundColor: colors.divider }]} />

                        <View style={styles.field}>
                            <Text style={[styles.fieldLabel, { color: colors.textMuted }]}>
                                Confirm New Password
                            </Text>
                            <TextInput
                                style={[styles.input, { color: colors.textPrimary }]}
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                                placeholder="Repeat new password"
                                placeholderTextColor={colors.textPlaceholderAlt}
                                secureTextEntry
                            />
                        </View>
                    </View>

                    {/* Save Button */}
                    <TouchableOpacity
                        style={[styles.saveBtn, saving && { opacity: 0.6 }]}
                        onPress={handleSave}
                        activeOpacity={0.85}
                        disabled={saving}
                    >
                        <Text style={[styles.saveBtnText, { color: colors.inverseOnAccent }]}>
                            {saving ? "Saving…" : "Save Changes"}
                        </Text>
                    </TouchableOpacity>

                    <View style={{ height: 32 }} />
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
    avatarSection: { alignItems: "center", paddingVertical: 8, gap: 8 },
    avatar: {
        width: 72,
        height: 72,
        borderRadius: 36,
        backgroundColor: Palette.EmeraldGreen,
        alignItems: "center",
        justifyContent: "center",
    },
    avatarText: { color: "#FFFFFF", fontSize: 30, fontWeight: "700" },
    avatarHint: { fontSize: 13 },
    card: {
        borderRadius: 16,
        padding: 16,
        gap: 12,
    },
    cardTitle: { fontSize: 14, fontWeight: "700" },
    cardSubtitle: { fontSize: 12, marginTop: -6 },
    field: { gap: 6 },
    fieldLabel: { fontSize: 12, fontWeight: "600" },
    input: {
        fontSize: 15,
        fontWeight: "500",
        paddingVertical: 8,
    },
    divider: { height: 1 },
    saveBtn: {
        height: 52,
        borderRadius: 16,
        backgroundColor: Palette.EmeraldGreen,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 4,
    },
    saveBtnText: { fontSize: 16, fontWeight: "700" },
});