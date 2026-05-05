import { Palette } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useSemanticColors } from "@/hooks/use-semantic-colors";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface SocialButtonProps {
  onPress: () => void;
}

export default function SocialButton({ onPress }: SocialButtonProps) {
  const scheme = useColorScheme() ?? "light";
  const colors = useSemanticColors();
  return (
    <TouchableOpacity
      style={[
        styles.googleButton,
        {
          backgroundColor: colors.surface,
          borderColor: scheme === "light" ? Palette.CardBorder : colors.border,
        },
      ]}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <Text style={[styles.googleIcon, { color: Palette.EmeraldGreen }]}>G</Text>
      <Text style={[styles.googleText, { color: colors.textPrimary }]}>
        Continue with Google
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  googleButton: {
    flexDirection: "row",
    width: "100%",
    height: 54,
    borderRadius: 12,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  googleIcon: {
    fontWeight: "900",
    fontSize: 17,
    marginRight: 12,
  },
  googleText: {
    fontSize: 14,
    fontWeight: "500",
  },
});
