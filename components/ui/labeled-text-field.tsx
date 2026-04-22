import { Palette } from "@/constants/theme";
import DateTimePicker from "@react-native-community/datetimepicker";
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
};

function isValueValid(fieldType: FieldType, value: string): boolean {
  if (fieldType.kind === "number") return /^\d*$/.test(value);
  return true;
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

const formatNumber = (val: string) => {
  const digits = val.replace(/\D/g, '');
  if (!digits) return '';
  return parseInt(digits, 10).toLocaleString('id-ID');
};

const unformatNumber = (val: string) => val.replace(/\D/g, '');

export function LabeledTextField({
  fieldType,
  label,
  value,
  onValueChange,
  prefix,
  placeHolder,
}: LabeledTextFieldProps) {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [tempDate, setTempDate] = useState<Date>(new Date());

  const isReadOnly = fieldType.kind === "date" || fieldType.kind === "options";

  const borderColor = isFocused ? Palette.EmeraldGreen : "#D3D3D3";

  const handlePress = () => {
    if (fieldType.kind === 'date') {
      setTempDate(value ? new Date(value) : new Date());
      setShowDatePicker(true);
    }
    if (fieldType.kind === "options") setShowDropdown(true);
  };

  const TrailingIcon = () => {
    if (fieldType.kind === "date")
      return <Text style={styles.trailingIcon}>📅</Text>;
    if (fieldType.kind === "options")
      return <Text style={styles.trailingIcon}>▾</Text>;
    return null;
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>

      <TouchableOpacity
        onPress={isReadOnly ? handlePress : undefined}
        activeOpacity={isReadOnly ? 0.7 : 1}
        style={[styles.inputContainer, { borderColor }]}
      >
        {prefix ? <Text style={styles.prefix}>{prefix}</Text> : null}

        <TextInput
          style={styles.input}
          value={fieldType.kind === 'number' ? formatNumber(value) : value}
          editable={!isReadOnly}
          placeholder={placeHolder}
          placeholderTextColor="#A0A0A0"
          keyboardType={fieldType.kind === 'number' ? 'numeric' : 'default'}
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

      {/* Date Picker */}
      {showDatePicker && (
        <Modal visible transparent animationType="fade" onRequestClose={() => setShowDatePicker(false)}>
          <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setShowDatePicker(false)}>
            <TouchableOpacity activeOpacity={1} style={styles.datePickerCard}>

              <DateTimePicker
                minimumDate={new Date(2000, 0, 1)}
                value={tempDate}
                mode="date"
                display="spinner"
                themeVariant="light"
                onChange={(_, selectedDate) => {
                  if (selectedDate) setTempDate(selectedDate);
                }}
              />

              <View style={styles.datePickerActions}>
                <TouchableOpacity onPress={() => setShowDatePicker(false)}>
                  <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                  onValueChange(formatDate(tempDate));
                  setShowDatePicker(false);
                }}>
                  <Text style={styles.confirmText}>OK</Text>
                </TouchableOpacity>
              </View>

            </TouchableOpacity>
          </TouchableOpacity>
        </Modal>
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
            style={styles.modalOverlay}
            onPress={() => setShowDropdown(false)}
            activeOpacity={1}
          >
            <View style={styles.dropdown}>
              <FlatList
                data={fieldType.options}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.dropdownItem}
                    onPress={() => {
                      onValueChange(item);
                      setShowDropdown(false);
                    }}
                  >
                    <Text style={styles.dropdownItemText}>{item}</Text>
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
    color: "#000",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 56,
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 14,
    backgroundColor: "#FFFFFF",
  },
  prefix: {
    color: "#A0A0A0",
    fontSize: 14,
    marginRight: 4,
  },
  input: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },
  trailingIcon: {
    fontSize: 16,
    color: "#A0A0A0",
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  dropdown: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    width: 220,
    maxHeight: 240,
    overflow: "hidden",
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  dropdownItem: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  dropdownItemText: {
    fontSize: 14,
    color: "#000",
  },
  datePickerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    marginHorizontal: 20,
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  datePickerActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 24,
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  cancelText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#A0A0A0',
  },
  confirmText: {
    fontSize: 14,
    fontWeight: '600',
    color: Palette.EmeraldGreen,
  },
});
