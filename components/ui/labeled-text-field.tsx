import { Palette } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useSemanticColors } from "@/hooks/use-semantic-colors";
import { formatDateTime, formatNumber, unformatNumber } from "@/utils/formatter";
import React, { useState } from "react";
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import DateTimePickerModal from "./date-time-picker";

export type FieldType =
  | { kind: "number" }
  | { kind: "text" }
  | { kind: "date" }
  | { kind: "options"; options: string[] };

type LabeledTextFieldProps = {
  fieldType: FieldType;
  label: string;
  value: string;
  onValueChange: (val: string) => void;
  prefix?: string;
  placeHolder?: string;
  error?: string;
};

function isValueValid(fieldType: FieldType, value: string): boolean {
  if (fieldType.kind === "number") return /^\d*$/.test(value);
  return true;
}

export function LabeledTextField({
  fieldType,
  label,
  value,
  onValueChange,
  prefix,
  placeHolder,
  error
}: LabeledTextFieldProps) {
  const scheme = useColorScheme() ?? "light";
  const colors = useSemanticColors();
  const inputFill =
    scheme === "dark" ? colors.surfaceMuted : colors.surface;
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [tempDate, setTempDate] = useState<Date>(new Date());

  const isReadOnly = fieldType.kind === "date" || fieldType.kind === "options";

  // Error takes priority over focus color
  const borderColor = error
    ? Palette.PoppyRed
    : isFocused
      ? Palette.EmeraldGreen
      : colors.borderLight;

  const handlePress = () => {
    if (fieldType.kind === 'date') {
      setTempDate(value ? new Date(value) : new Date());
      setShowDatePicker(true);
    }
    if (fieldType.kind === "options") setShowDropdown(true);
  };

  const TrailingIcon = () => {
    const ti = [styles.trailingIcon, { color: colors.textPlaceholder }];
    if (fieldType.kind === "date")
      return <Text style={ti}>📅</Text>;
    if (fieldType.kind === "options")
      return <Text style={ti}>▾</Text>;
    return null;
  };

  return (
    <View style={styles.wrapper}>
      <Text style={[styles.label, { color: colors.textPrimary }]}>{label}</Text>

      <TouchableOpacity
        onPress={isReadOnly ? handlePress : undefined}
        activeOpacity={isReadOnly ? 0.7 : 1}
        style={[
          styles.inputContainer,
          { borderColor, backgroundColor: inputFill },
        ]}
      >
        {prefix ? (
          <Text style={[styles.prefix, { color: colors.textPlaceholder }]}>
            {prefix}
          </Text>
        ) : null}

        <TextInput
          style={[styles.input, { color: colors.textPrimary }]}
          value={fieldType.kind === 'number' ? formatNumber(value) : value}
          editable={!isReadOnly}
          placeholder={placeHolder}
          placeholderTextColor={colors.textPlaceholder}
          keyboardType={fieldType.kind === 'number' ? 'numeric' : 'default'}
          keyboardAppearance={scheme === "dark" ? "dark" : "light"}
          onChangeText={(text) => {
            const raw = fieldType.kind === 'number' ? unformatNumber(text) : text;
            if (!isReadOnly && isValueValid(fieldType, raw)) {
              onValueChange(raw);
            }
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          pointerEvents={isReadOnly ? 'none' : 'auto'}
        />

        <TrailingIcon />
      </TouchableOpacity>

      {!!error && (
        <Text style={styles.errorText}>{error}</Text>
      )}

      {showDatePicker && (
        <DateTimePickerModal
          value={tempDate}
          onChange={(date) => onValueChange(formatDateTime(date))}
          onClose={() => setShowDatePicker(false)}
        />
      )}

      {/* Dropdown Modal */}
      {fieldType.kind === "options" && (
        <Modal
          visible={showDropdown}
          transparent
          animationType="fade"
          onRequestClose={() => setShowDropdown(false)}
        >
          <TouchableOpacity
            style={[styles.modalOverlay, { backgroundColor: colors.overlayScrim }]}
            onPress={() => setShowDropdown(false)}
            activeOpacity={1}
          >
            <View style={[styles.dropdown, { backgroundColor: colors.surface, shadowColor: colors.shadow }]}>
              <FlatList
                data={fieldType.options}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[styles.dropdownItem, { borderBottomColor: colors.divider }]}
                    onPress={() => {
                      onValueChange(item);
                      setShowDropdown(false);
                    }}
                  >
                    <Text style={[styles.dropdownItemText, { color: colors.textPrimary }]}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </TouchableOpacity>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: 5,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 56,
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 14,
  },
  prefix: {
    fontSize: 14,
    marginRight: 4,
  },
  input: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
  },
  trailingIcon: {
    fontSize: 16,
    marginLeft: 8,
  },
  errorText: {
    fontSize: 12,
    color: Palette.PoppyRed,
    marginTop: 2,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  dropdown: {
    borderRadius: 12,
    width: 220,
    maxHeight: 240,
    overflow: "hidden",
    elevation: 6,
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  dropdownItem: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  dropdownItemText: {
    fontSize: 14,
  },
});