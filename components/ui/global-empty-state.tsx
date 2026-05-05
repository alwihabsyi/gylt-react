import React from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    type ViewStyle,
} from "react-native";

import { ThemedText } from "@/components/themed-text";
import { Palette } from "@/constants/theme";
import { useSemanticColors } from "@/hooks/use-semantic-colors";
import { useThemeColor } from "@/hooks/use-theme-color";

export type GlobalEmptyStateProps = {
  title?: string;
  message?: string | null;
  icon?: string;
  actionLabel?: string;
  onAction?: () => void;
  variant?: "full" | "inline";
  style?: ViewStyle;
};

export default function GlobalEmptyState({
  title = "Nothing here yet",
  message = null,
  icon = "📭",
  actionLabel = "Go",
  onAction,
  variant = "full",
  style,
}: GlobalEmptyStateProps) {
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
          {
            backgroundColor: colors.surface,
            shadowColor: colors.shadow,
          },
        ]}
      >
        <View
          style={[styles.iconWrap, { borderColor: `${tint}33` }]}
          accessibilityRole="image"
        >
          <Text style={[styles.icon, { color: tint }]}>{icon}</Text>
        </View>

        <ThemedText type="defaultSemiBold" style={styles.title}>
          {title}
        </ThemedText>

        {!!message && (
          <Text
            style={[styles.message, { color: colors.textSecondary }]}
            accessibilityLiveRegion="polite"
          >
            {message}
          </Text>
        )}

        {!!onAction && (
          <TouchableOpacity
            style={[
              styles.button,
              { borderColor: tint, backgroundColor: colors.surface },
            ]}
            onPress={onAction}
            activeOpacity={0.85}
          >
            <Text style={[styles.buttonText, { color: tint }]}>
              {actionLabel}
            </Text>
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
    maxWidth: 420,
    borderRadius: 16,
    paddingVertical: 24,
    paddingHorizontal: 18,
    alignItems: "center",
    justifyContent: "center",

    shadowOpacity: 0.07,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 18,
    elevation: 3,
  },
  iconWrap: {
    width: 56,
    height: 56,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    backgroundColor: `${Palette.EmeraldGreen}10`,
    marginBottom: 12,
  },
  icon: {
    fontSize: 22,
    fontWeight: "800",
    lineHeight: 22,
  },
  title: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 6,
  },
  message: {
    fontSize: 13,
    textAlign: "center",
    lineHeight: 18,
    paddingHorizontal: 10,
    marginBottom: 2,
  },
  button: {
    marginTop: 16,
    height: 44,
    minWidth: 160,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 14,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "800",
  },
});
