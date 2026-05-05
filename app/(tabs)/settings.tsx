import { AppRoutes } from "@/constants/routes";
import { Palette } from "@/constants/theme";
import { useSemanticColors } from "@/hooks/use-semantic-colors";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleDarkMode } from "@/store/slices/themeSlice";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const APP_VERSION = "1.0.0";

type SettingRowProps = {
  icon: React.ComponentProps<typeof Ionicons>["name"];
  label: string;
  onPress?: () => void;
  right?: React.ReactNode;
};

function SettingRow({ icon, label, onPress, right }: SettingRowProps) {
  const colors = useSemanticColors();
  return (
    <TouchableOpacity
      style={styles.row}
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      <View style={styles.rowLeft}>
        <View style={styles.iconBox}>
          <Ionicons name={icon} size={18} color={Palette.EmeraldGreen} />
        </View>
        <Text style={[styles.rowLabel, { color: colors.textPrimary }]}>{label}</Text>
      </View>
      {right ??
        (onPress && (
          <Ionicons name="chevron-forward" size={18} color={colors.chevron} />
        ))}
    </TouchableOpacity>
  );
}

type SettingsSectionProps = {
  title: string;
  children: React.ReactNode;
};

function SettingsSection({ title, children }: SettingsSectionProps) {
  const colors = useSemanticColors();
  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: colors.textMuted }]}>{title}</Text>
      <View style={[styles.sectionCard, { backgroundColor: colors.surface }]}>
        {children}
      </View>
    </View>
  );
}

function Separator() {
  const colors = useSemanticColors();
  return (
    <View style={[styles.separator, { backgroundColor: colors.divider }]} />
  );
}

export default function SettingsScreen() {
  const colors = useSemanticColors();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const darkMode = useAppSelector((state) => state.theme.darkMode);
  const { email, fullName } = useAppSelector((state) => state.auth);

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [currency, setCurrency] = useState("IDR");
  const currencies = ["IDR", "USD", "SGD", "EUR"];

  const displayName = fullName ?? email?.split("@")[0] ?? "User";
  const avatarLetter = displayName.charAt(0).toUpperCase();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.screenGrey }]} edges={["top"]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Card */}
        <LinearGradient
          colors={[Palette.EmeraldGreen, Palette.BrightGreen]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.profileCard}
        >
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{avatarLetter}</Text>
          </View>
          <Text style={styles.username}>{displayName}</Text>
          <Text style={styles.userSubtitle}>Personal Finance & Wellbeing</Text>
        </LinearGradient>

        {/* Account */}
        <SettingsSection title="Account">
          <SettingRow
            icon="person-outline"
            label="Edit Profile"
            onPress={() => router.push(AppRoutes.EditProfile)}
          />
          <Separator />
          <SettingRow
            icon="cash-outline"
            label="Currency"
            right={
              <View style={styles.currencyPicker}>
                {currencies.map((c) => (
                  <TouchableOpacity
                    key={c}
                    onPress={() => setCurrency(c)}
                    style={[
                      styles.currencyOption,
                      { borderColor: colors.border },
                      currency === c && styles.currencyOptionSelected,
                    ]}
                  >
                    <Text
                      style={[
                        styles.currencyText,
                        { color: colors.textMuted },
                        currency === c && [
                          styles.currencyTextSelected,
                          { color: colors.inverseOnAccent },
                        ],
                      ]}
                    >
                      {c}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            }
          />
        </SettingsSection>

        {/* Preferences */}
        <SettingsSection title="Preferences">
          <SettingRow
            icon="notifications-outline"
            label="Notifications"
            right={
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{
                  false: colors.switchTrackOff,
                  true: Palette.EmeraldGreen,
                }}
                thumbColor={colors.switchThumb}
              />
            }
          />
          <Separator />
          <SettingRow
            icon="moon-outline"
            label="Dark Mode"
            right={
              <Switch
                value={darkMode}
                onValueChange={() => {
                  dispatch(toggleDarkMode());
                }}
                trackColor={{
                  false: colors.switchTrackOff,
                  true: Palette.EmeraldGreen,
                }}
                thumbColor={colors.switchThumb}
              />
            }
          />
        </SettingsSection>

        {/* About */}
        <SettingsSection title="About">
          <SettingRow
            icon="information-circle-outline"
            label="Version"
            right={
              <Text style={[styles.versionText, { color: colors.textMuted }]}>
                {APP_VERSION}
              </Text>
            }
          />
          <Separator />
          <SettingRow
            icon="document-text-outline"
            label="Privacy Policy"
            onPress={() => router.push(AppRoutes.PrivacyPolicy)}
          />
          <Separator />
          <SettingRow
            icon="mail-outline"
            label="Contact Us"
            onPress={() => router.push(AppRoutes.ContactUs)}
          />
        </SettingsSection>

        {/* Danger Zone */}
        <View style={[styles.sectionCard, { backgroundColor: colors.surface }]}>
          <TouchableOpacity
            style={styles.row}
            activeOpacity={0.7}
            onPress={() => router.push(AppRoutes.DeleteAccount)}
          >
            <View style={styles.rowLeft}>
              <View
                style={[
                  styles.iconBox,
                  { backgroundColor: colors.surfaceDangerTint },
                ]}
              >
                <Ionicons name="trash-outline" size={18} color={colors.danger} />
              </View>
              <Text style={[styles.rowLabel, { color: colors.danger }]}>
                Delete Account
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.danger} />
          </TouchableOpacity>
          <Separator />
          <TouchableOpacity style={styles.row} activeOpacity={0.7}>
            <View style={styles.rowLeft}>
              <View
                style={[
                  styles.iconBox,
                  { backgroundColor: colors.surfaceDangerTint },
                ]}
              >
                <Ionicons name="log-out-outline" size={18} color={colors.danger} />
              </View>
              <Text style={[styles.rowLabel, { color: colors.danger }]}>
                Sign Out
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  scroll: { flex: 1 },
  container: { padding: 20, gap: 20 },
  profileCard: {
    height: 160,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "rgba(255,255,255,0.3)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  avatarText: { color: "#FFFFFF", fontSize: 22, fontWeight: "700" },
  username: { color: "#FFFFFF", fontSize: 18, fontWeight: "700", letterSpacing: 1 },
  userSubtitle: { color: "rgba(255,255,255,0.75)", fontSize: 12 },
  section: { gap: 8 },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 1,
    paddingHorizontal: 4,
  },
  sectionCard: { borderRadius: 15, overflow: "hidden" },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  rowLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
  iconBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: `${Palette.EmeraldGreen}18`,
    alignItems: "center",
    justifyContent: "center",
  },
  rowLabel: { fontSize: 15, fontWeight: "500" },
  separator: { height: 1, marginLeft: 60 },
  currencyPicker: { flexDirection: "row", gap: 6 },
  currencyOption: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
  },
  currencyOptionSelected: {
    backgroundColor: Palette.EmeraldGreen,
    borderColor: Palette.EmeraldGreen,
  },
  currencyText: { fontSize: 12, fontWeight: "600" },
  currencyTextSelected: {},
  versionText: { fontSize: 14 },
});