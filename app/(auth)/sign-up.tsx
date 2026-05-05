import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import AuthBackground from "@/components/layout/auth-background";
import GradientButton from "@/components/ui/gradient-button";
import StealthField from "@/components/ui/stealth-field";
import { AppRoutes } from "@/constants/routes";
import { Palette } from "@/constants/theme";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { signUp } from "@/store/slices/authSlice";

export default function SignUpScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { loading, error } = useAppSelector((state) => state.auth);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);

  const passwordsMatch =
    confirmPassword.length === 0 || password === confirmPassword;

  const handleSignUp = async () => {
    if (!passwordsMatch || password.length <= 0 || fullName.length <= 0) return;

    const result = await dispatch(signUp({ email, password, fullName }));
    if (signUp.fulfilled.match(result)) {
      router.replace(AppRoutes.Home);
    }
  };

  return (
    <AuthBackground>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.spacer72} />

        {/* Brand Header */}
        <View style={styles.header}>
          <Text style={styles.headline}>Create your{"\n"}account.</Text>
          <Text style={styles.subHeadline}>
            Join GYLT and start your journey today.
          </Text>
        </View>

        <View style={styles.spacer44} />

        {/* Form Card */}
        <View style={styles.card}>
          <StealthField
            label="FULL NAME"
            placeholder="John Doe"
            value={fullName}
            onChangeText={setFullName}
            enabled={!loading}
          />

          <View style={styles.spacer20} />

          <StealthField
            label="EMAIL"
            placeholder="your@email.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            enabled={!loading}
          />

          <View style={styles.spacer20} />

          <StealthField
            label="PASSWORD"
            placeholder="••••••••"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!passwordVisible}
            enabled={!loading}
            trailingContent={
              <TouchableOpacity
                onPress={() => setPasswordVisible(!passwordVisible)}
              >
                <Ionicons
                  name={passwordVisible ? "eye-outline" : "eye-off-outline"}
                  size={20}
                  color={Palette.InkMuted}
                />
              </TouchableOpacity>
            }
          />

          <View style={styles.spacer20} />

          <StealthField
            label="CONFIRM PASSWORD"
            placeholder="••••••••"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!confirmVisible}
            isError={!passwordsMatch}
            trailingContent={
              <TouchableOpacity
                onPress={() => setConfirmVisible(!confirmVisible)}
              >
                <Ionicons
                  name={confirmVisible ? "eye-outline" : "eye-off-outline"}
                  size={20}
                  color={!passwordsMatch ? "#D95858" : Palette.InkMuted}
                />
              </TouchableOpacity>
            }
          />

          {!passwordsMatch && (
            <Text style={styles.errorText}>Passwords don&apos;t match</Text>
          )}

          <View style={styles.spacer28} />

          {error && <Text style={styles.errorText}>{error}</Text>}

          <GradientButton
            title={loading ? "Creating..." : "Create Account"}
            onPress={handleSignUp}
            disabled={loading}
          />
        </View>

        <View style={styles.spacer24} />

        {/* Disable Google sign up for now */}
        {/* <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}> or </Text>
          <View style={styles.dividerLine} />
        </View>

        <View style={styles.spacer20} />

        <SocialButton onPress={() => console.log("Google Sign Up")} /> */}

        <View style={styles.spacer36} />

        <View style={styles.signInRow}>
          <Text style={styles.accountText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.signInText}>Sign In →</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.spacer48} />
      </ScrollView>
    </AuthBackground>
  );
}

const styles = StyleSheet.create({
  scrollContent: { paddingHorizontal: 28 },
  header: { marginBottom: 0 },
  headline: {
    color: Palette.InkDark,
    fontWeight: "bold",
    fontSize: 48,
    lineHeight: 52,
    letterSpacing: -1.5,
    marginBottom: 6,
  },
  subHeadline: { color: Palette.InkMuted, fontSize: 15, fontStyle: "italic" },
  card: {
    width: "100%",
    backgroundColor: Palette.CardSurface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Palette.CardBorder,
    padding: 24,
  },
  errorText: {
    color: Palette.RedErrorLight,
    fontSize: 13,
    marginBottom: 8,
    textAlign: "center",
  },
  dividerRow: { flexDirection: "row", alignItems: "center", width: "100%" },
  dividerLine: { flex: 1, height: 1, backgroundColor: Palette.CardBorder },
  dividerText: { color: Palette.InkMuted, fontSize: 11, letterSpacing: 2 },
  signInRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  accountText: { color: Palette.InkMuted, fontSize: 14 },
  signInText: { color: Palette.EmeraldGreen, fontSize: 14, fontWeight: "600" },

  // Spacers
  spacer20: { height: 20 },
  spacer24: { height: 24 },
  spacer28: { height: 28 },
  spacer36: { height: 36 },
  spacer44: { height: 44 },
  spacer48: { height: 48 },
  spacer72: { height: 72 },
});
