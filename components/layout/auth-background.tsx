import { Palette } from "@/constants/theme";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

interface AuthBackgroundProps {
  children: React.ReactNode;
}

export default function AuthBackground({ children }: AuthBackgroundProps) {
  const glowAnim = useRef(new Animated.Value(0.18)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 0.36,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 0.18,
          duration: 3000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [glowAnim]);

  return (
    <View style={styles.container}>
      {/* Ambient glow — top-left */}
      <Animated.View
        style={[
          styles.ambientTopLeft,
          { backgroundColor: Palette.EmeraldGreen, opacity: glowAnim },
        ]}
      />

      {/* Ambient glow — bottom-right */}
      <Animated.View
        style={[
          styles.ambientBottomRight,
          { backgroundColor: Palette.TealGreen, opacity: glowAnim },
        ]}
      />

      {/* Top edge gradient rule */}
      <LinearGradient
        colors={[
          "transparent",
          Palette.EmeraldGreen,
          Palette.BrightGreen,
          Palette.TealGreen,
          "transparent",
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.topEdgeGradient}
      />

      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Palette.Canvas,
  },
  topEdgeGradient: {
    width: "100%",
    height: 2,
  },
  ambientTopLeft: {
    position: "absolute",
    width: 420,
    height: 420,
    borderRadius: 210,
    top: -120,
    left: -100,
    transform: [{ scale: 1.5 }],
  },
  ambientBottomRight: {
    position: "absolute",
    width: 320,
    height: 320,
    borderRadius: 160,
    bottom: -80,
    right: -80,
    transform: [{ scale: 1.5 }],
  },
});
