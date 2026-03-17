import { Palette } from "@/constants/theme";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableOpacityProps,
} from "react-native";

interface GradientButtonProps extends TouchableOpacityProps {
  title: string;
  onPress: () => void;
}

export default function GradientButton({
  title,
  onPress,
  ...rest
}: GradientButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} {...rest}>
      <LinearGradient
        colors={[Palette.EmeraldGreen, Palette.TealGreen, Palette.BrightGreen]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.ctaButton}
      >
        <Text style={styles.ctaText}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  ctaButton: {
    width: "100%",
    height: 54,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  ctaText: {
    color: "#FFF",
    fontWeight: "900",
    fontSize: 15,
    letterSpacing: 1,
  },
});
