import { Palette } from "@/constants/theme";
import { useSemanticColors } from "@/hooks/use-semantic-colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onSearch: (query: string) => void;
}

export default function SearchBar({
  placeholder = "Search...",
  value,
  onSearch,
}: SearchBarProps) {
  const colors = useSemanticColors();
  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: colors.surface,
            borderColor: colors.borderHairline,
            color: colors.textPrimary,
          },
        ]}
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        value={value}
        onChangeText={onSearch}
        returnKeyType="search"
      />
      <View style={styles.button}>
        <Ionicons name="search" size={24} color={colors.inverseOnAccent} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: "row", alignItems: "center", gap: 12 },
  input: {
    flex: 1,
    height: 56,
    borderRadius: 15,
    borderWidth: 1,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  button: {
    width: 52,
    height: 52,
    backgroundColor: Palette.EmeraldGreen,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
});
