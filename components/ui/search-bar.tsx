import { Palette } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
}

export default function SearchBar({
  placeholder = "Search...",
  onSearch,
}: SearchBarProps) {
  const [query, setQuery] = useState("");

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="gray"
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={() => onSearch(query)} // Triggers on keyboard "enter"
      />
      <TouchableOpacity style={styles.button} onPress={() => onSearch(query)}>
        <Ionicons name="search" size={24} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: "row", alignItems: "center", gap: 12 },
  input: {
    flex: 1,
    height: 56,
    backgroundColor: "#FFF",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "lightgray",
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
