import React from "react";
import { ActivityIndicator, StyleSheet, View, type ViewStyle } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { useSemanticColors } from "@/hooks/use-semantic-colors";
import { useThemeColor } from "@/hooks/use-theme-color";

export type GlobalLoadingProps = {
  label?: string;
  /**
   * Defaults to a full-screen centered state.
   * Set to "inline" to render within an existing layout.
   */
  variant?: "full" | "inline";
  /**
   * ActivityIndicator size.
   */
  size?: number | "small" | "large";
  style?: ViewStyle;
};

export default function GlobalLoading({
  label = "Loading…",
  variant = "full",
  size = "large",
  style,
}: GlobalLoadingProps) {
  const tint = useThemeColor({}, "tint");
  const colors = useSemanticColors();

  const containerStyle = [
    styles.container,
    variant === "inline" ? styles.inlineContainer : styles.fullContainer,
    style,
  ];

  return (
    <View style={containerStyle}>
      <View
        style={[
          styles.card,
          { backgroundColor: colors.surface, shadowColor: colors.shadow },
        ]}
      >
        <ActivityIndicator size={size} color={tint} />
        <ThemedText style={styles.label} type="defaultSemiBold">
          {label}
        </ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  fullContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  inlineContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
  },
  card: {
    width: "100%",
    maxWidth: 380,
    borderRadius: 16,
    paddingVertical: 22,
    paddingHorizontal: 18,
    alignItems: "center",
    justifyContent: "center",

    // subtle elevation/shadow
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 20,
    elevation: 3,
  },
  label: {
    marginTop: 12,
    textAlign: "center",
  },
});
