import { Palette } from "@/constants/theme";
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
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => onItemSelected(optionName)}
      style={[
        styles.pill,
        {
          backgroundColor: isSelected
            ? Palette.EmeraldGreen
            : Palette.CardSurface,
          borderColor: isSelected ? Palette.EmeraldGreen : "lightgray",
        },
      ]}
    >
      <Text style={[styles.text, { color: isSelected ? "#FFF" : "#000" }]}>
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
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2, // iOS shadow
  },
  text: { fontSize: 14, fontWeight: "500" },
});
