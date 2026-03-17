import React from "react";
import {
    KeyboardTypeOptions,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

interface StealthFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
  isError?: boolean;
  trailingContent?: React.ReactNode;
}

export default function StealthField({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = "default",
  secureTextEntry = false,
  isError = false,
  trailingContent,
}: StealthFieldProps) {
  const labelColor = isError ? "#D95858" : "#5A8A6A";
  const borderColor = isError ? "#D95858" : "#D6EDE0";

  return (
    <View style={styles.container}>
      <Text style={[styles.fieldLabel, { color: labelColor }]}>{label}</Text>
      <View style={[styles.inputContainer, { borderColor }]}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#5A8A6A80"
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          autoCapitalize="none"
        />
        {trailingContent && (
          <View style={styles.trailingIcon}>{trailingContent}</View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 0 },
  fieldLabel: {
    fontSize: 10,
    fontWeight: "bold",
    letterSpacing: 2,
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F7F2",
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 16,
    height: 48,
  },
  input: { flex: 1, color: "#0D2118", fontSize: 15 },
  trailingIcon: { marginLeft: 10 },
});
