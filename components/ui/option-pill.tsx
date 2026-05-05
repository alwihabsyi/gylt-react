import { Palette } from "@/constants/theme";
import { useSemanticColors } from "@/hooks/use-semantic-colors";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface OptionPillProps {
  optionName: string;
  isSelected: boolean;
  onItemSelected: (name: string) => void;
}

export default function OptionPill({
  optionName,
  isSelected,
  onItemSelected,
}: OptionPillProps) {
  const colors = useSemanticColors();
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => onItemSelected(optionName)}
      style={[
        styles.pill,
        {
          backgroundColor: isSelected
            ? Palette.EmeraldGreen
            : colors.surface,
          borderColor: isSelected ? Palette.EmeraldGreen : colors.borderHairline,
          shadowColor: colors.shadow,
        },
      ]}
    >
      <Text
        style={[
          styles.text,
          { color: isSelected ? colors.inverseOnAccent : colors.textPrimary },
        ]}
      >
        {optionName}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  pill: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    elevation: 1, // Android shadow
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2, // iOS shadow
  },
  text: { fontSize: 14, fontWeight: "500" },
});
