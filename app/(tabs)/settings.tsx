import { Palette } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
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
        <Text style={styles.rowLabel}>{label}</Text>
      </View>
      {right ??
        (onPress && (
          <Ionicons name="chevron-forward" size={18} color="#C0C0C0" />
        ))}
    </TouchableOpacity>
  );
}

type SettingsSectionProps = {
  title: string;
  children: React.ReactNode;
};

function SettingsSection({ title, children }: SettingsSectionProps) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionCard}>{children}</View>
    </View>
  );
}

function Separator() {
  return <View style={styles.separator} />;
}

export default function SettingsScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [currency, setCurrency] = useState("IDR");

  const currencies = ["IDR", "USD", "SGD", "EUR"];

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
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
            <Text style={styles.avatarText}>U</Text>
          </View>
          <Text style={styles.username}>Username</Text>
          <Text style={styles.userSubtitle}>Personal Finance & Wellbeing</Text>
        </LinearGradient>

        {/* Account */}
        <SettingsSection title="Account">
          <SettingRow
            icon="person-outline"
            label="Edit Profile"
            onPress={() => {}}
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
                      currency === c && styles.currencyOptionSelected,
                    ]}
                  >
                    <Text
                      style={[
                        styles.currencyText,
                        currency === c && styles.currencyTextSelected,
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
                trackColor={{ false: "#D3D3D3", true: Palette.EmeraldGreen }}
                thumbColor="#FFFFFF"
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
                onValueChange={setDarkMode}
                trackColor={{ false: "#D3D3D3", true: Palette.EmeraldGreen }}
                thumbColor="#FFFFFF"
              />
            }
          />
        </SettingsSection>

        {/* About */}
        <SettingsSection title="About">
          <SettingRow
            icon="information-circle-outline"
            label="Version"
            right={<Text style={styles.versionText}>{APP_VERSION}</Text>}
          />
          <Separator />
          <SettingRow
            icon="document-text-outline"
            label="Privacy Policy"
            onPress={() => {}}
          />
          <Separator />
          <SettingRow
            icon="mail-outline"
            label="Contact Us"
            onPress={() => {}}
          />
        </SettingsSection>

        {/* Danger Zone */}
        <View style={styles.sectionCard}>
          <TouchableOpacity style={styles.row} activeOpacity={0.7}>
            <View style={styles.rowLeft}>
              <View style={[styles.iconBox, { backgroundColor: "#FFF0F0" }]}>
                <Ionicons name="log-out-outline" size={18} color="#E53935" />
              </View>
              <Text style={[styles.rowLabel, { color: "#E53935" }]}>
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
  safeArea: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  scroll: {
    flex: 1,
  },
  container: {
    padding: 20,
    gap: 20,
  },
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
  avatarText: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "700",
  },
  username: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 1,
  },
  userSubtitle: {
    color: "rgba(255,255,255,0.75)",
    fontSize: 12,
  },
  section: {
    gap: 8,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "600",
    color: "#9E9E9E",
    textTransform: "uppercase",
    letterSpacing: 1,
    paddingHorizontal: 4,
  },
  sectionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: `${Palette.EmeraldGreen}18`,
    alignItems: "center",
    justifyContent: "center",
  },
  rowLabel: {
    fontSize: 15,
    fontWeight: "500",
    color: "#000",
  },
  separator: {
    height: 1,
    backgroundColor: "#F0F0F0",
    marginLeft: 60,
  },
  currencyPicker: {
    flexDirection: "row",
    gap: 6,
  },
  currencyOption: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  currencyOptionSelected: {
    backgroundColor: Palette.EmeraldGreen,
    borderColor: Palette.EmeraldGreen,
  },
  currencyText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#9E9E9E",
  },
  currencyTextSelected: {
    color: "#FFFFFF",
  },
  versionText: {
    fontSize: 14,
    color: "#9E9E9E",
  },
});
