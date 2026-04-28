import AuthBackground from "@/components/layout/auth-background";
import GradientButton from "@/components/ui/gradient-button";
import SocialButton from "@/components/ui/social-button";
import StealthField from "@/components/ui/stealth-field";
import { AppRoutes } from "@/constants/routes";
import { Palette } from "@/constants/theme";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { signIn } from "@/store/slices/authSlice";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Redirect, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function SignInScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { loading, error, userId } = useAppSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  if (userId) return <Redirect href={AppRoutes.Home} />;

  const handleSignIn = async () => {
    const result = await dispatch(signIn({ email, password }));
    if (signIn.fulfilled.match(result)) {
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

        {/* Brand mark */}
        <View style={styles.brandRow}>
          <LinearGradient
            colors={[Palette.EmeraldGreen, Palette.BrightGreen]}
            style={styles.logoCircle}
          >
            <Text style={styles.logoText}>G</Text>
          </LinearGradient>
          <Text style={styles.brandName}>GYLT</Text>
        </View>

        <View style={styles.spacer52} />

        {/* Editorial headline */}
        <Text style={styles.headline}>Welcome{"\n"}back.</Text>
        <Text style={styles.subHeadline}>
          Sign in to pick up where you left off.
        </Text>

        <View style={styles.spacer44} />

        {/* Form card */}
        <View style={styles.card}>
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

          <View style={styles.spacer8} />

          <TouchableOpacity style={styles.forgotPasswordWrap}>
            <Text style={styles.forgotPasswordText}>Forgot password?</Text>
          </TouchableOpacity>

          <View style={styles.spacer28} />

          {/* Gradient CTA button */}
          {error && <Text style={styles.errorText}>{error}</Text>}

          <GradientButton
            title={loading ? "Signing in..." : "Sign In"}
            onPress={handleSignIn}
            disabled={loading}
          />
        </View>

        <View style={styles.spacer24} />

        {/* Divider */}
        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}> or </Text>
          <View style={styles.dividerLine} />
        </View>

        <View style={styles.spacer20} />

        {/* Google button */}
        <SocialButton
          onPress={() => console.log("Logging in with Google...")}
        />

        <View style={styles.spacer36} />

        {/* Sign Up link */}
        <View style={styles.signUpRow}>
          <Text style={styles.newHereText}>New here? </Text>
          <TouchableOpacity onPress={() => router.push(AppRoutes.SignUp)}>
            <Text style={styles.signUpText}>Create account →</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.spacer48} />
      </ScrollView>
    </AuthBackground>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: 28,
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  logoText: {
    color: "#FFF",
    fontWeight: "900",
    fontSize: 18,
  },
  brandName: {
    color: Palette.InkDark,
    fontWeight: "900",
    letterSpacing: 4,
    fontSize: 14,
  },
  headline: {
    color: Palette.InkDark,
    fontWeight: "bold",
    fontSize: 48,
    lineHeight: 52,
    letterSpacing: -1.5,
    marginBottom: 6,
  },
  subHeadline: {
    color: Palette.InkMuted,
    fontSize: 15,
    fontStyle: "italic",
  },
  card: {
    width: "100%",
    backgroundColor: Palette.CardSurface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Palette.CardBorder,
    padding: 24,
  },
  forgotPasswordWrap: {
    alignSelf: "flex-start",
  },
  forgotPasswordText: {
    color: Palette.TealGreen,
    fontSize: 12,
    fontWeight: "600",
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Palette.CardBorder,
  },
  dividerText: {
    color: Palette.InkMuted,
    fontSize: 11,
    letterSpacing: 2,
  },
  signUpRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  newHereText: {
    color: Palette.InkMuted,
    fontSize: 14,
  },
  signUpText: {
    color: Palette.EmeraldGreen,
    fontSize: 14,
    fontWeight: "600",
  },
  errorText: {
    color: Palette.RedErrorLight,
    fontSize: 13,
    marginBottom: 8,
    textAlign: "center",
  },
  // Spacers
  spacer8: { height: 8 },
  spacer20: { height: 20 },
  spacer24: { height: 24 },
  spacer28: { height: 28 },
  spacer36: { height: 36 },
  spacer44: { height: 44 },
  spacer48: { height: 48 },
  spacer52: { height: 52 },
  spacer72: { height: 72 },
});
