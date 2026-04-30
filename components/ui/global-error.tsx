import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, type ViewStyle } from "react-native";

import GlobalLoading from "@/components/ui/global-loading";
import { Palette } from "@/constants/theme";
import { useThemeColor } from "@/hooks/use-theme-color";

export type GlobalErrorProps = {
  title?: string;
  message?: string | null;
  /**
   * Optional action button (e.g. “Try again”).
   * If omitted, only the message is shown.
   */
  actionLabel?: string;
  onAction?: () => void;
  /**
   * If you’re doing a retry action, show spinner on the button.
   */
  actionLoading?: boolean;
  variant?: "full" | "inline";
  style?: ViewStyle;
};

export default function GlobalError({
  title = "Something went wrong",
  message = null,
  actionLabel = "Try again",
  onAction,
  actionLoading = false,
  variant = "full",
  style,
}: GlobalErrorProps) {
  const tint = useThemeColor({}, "tint");

  const containerStyle = [
    styles.container,
    variant === "inline" ? styles.inlineContainer : styles.fullContainer,
    style,
  ];

  return (
    <View style={containerStyle}>
      <View style={styles.card}>
        <View style={styles.iconWrap} accessibilityRole="image">
          <Text style={styles.icon}>!</Text>
        </View>

        <Text style={styles.title}>{title}</Text>

        {!!message && <Text style={styles.message}>{message}</Text>}

        {onAction && (
          <TouchableOpacity
            style={[styles.button, { borderColor: tint }]}
            onPress={onAction}
            activeOpacity={0.85}
            disabled={actionLoading}
          >
            {actionLoading ? (
              <View style={styles.buttonLoadingRow}>
                <GlobalLoading label="" variant="inline" size="small" />
              </View>
            ) : (
              <Text style={[styles.buttonText, { color: tint }]}>{actionLabel}</Text>
            )}
          </TouchableOpacity>
        )}
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
    backgroundColor: Palette.SurfaceLight,
    borderRadius: 16,
    paddingVertical: 22,
    paddingHorizontal: 18,
    alignItems: "center",
    justifyContent: "center",

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 20,
    elevation: 3,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: `${Palette.RedErrorLight}22`,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  icon: {
    color: Palette.RedErrorLight,
    fontSize: 22,
    fontWeight: "800",
    lineHeight: 22,
  },
  title: {
    fontSize: 16,
    fontWeight: "800",
    color: Palette.AppColor,
    textAlign: "center",
    marginBottom: 6,
  },
  message: {
    fontSize: 13,
    color: Palette.Black1,
    textAlign: "center",
    lineHeight: 18,
  },
  button: {
    marginTop: 14,
    height: 44,
    minWidth: 150,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Palette.SurfaceLight,
    paddingHorizontal: 14,
  },
  buttonLoadingRow: {
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "800",
  },
});
