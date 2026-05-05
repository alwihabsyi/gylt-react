import { useColorScheme } from "@/hooks/use-color-scheme";
import { useSemanticColors } from "@/hooks/use-semantic-colors";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Modal, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Props {
  value: Date;
  onChange: (date: Date) => void;
  onClose: () => void;
}

export default function DateTimePickerModal({ value, onChange, onClose }: Props) {
  const scheme = useColorScheme() ?? "light";
  const colors = useSemanticColors();
  const [tempDate, setTempDate] = useState(value);
  const [step, setStep] = useState<"date" | "time">("date");

  const handleConfirm = () => {
    if (step === "date") return setStep("time");
    onChange(tempDate);
    onClose();
  };

  if (Platform.OS === "android") {
    return (
      <DateTimePicker
        value={tempDate}
        mode={step}
        minimumDate={step === "date" ? new Date() : undefined}
        onChange={(_, date) => {
          if (!date) return onClose();
          setTempDate(date);
          if (step === "date") setStep("time");
          else { onChange(date); onClose(); }
        }}
      />
    );
  }

  return (
    <Modal visible transparent animationType="fade" onRequestClose={onClose}>
      <TouchableOpacity
        style={[styles.overlay, { backgroundColor: colors.overlayScrim }]}
        activeOpacity={1}
        onPress={onClose}
      >
        <TouchableOpacity
          activeOpacity={1}
          style={[styles.card, { backgroundColor: colors.surface }]}
        >
          <DateTimePicker
            value={tempDate}
            mode={step}
            display="spinner"
            themeVariant={scheme === "dark" ? "dark" : "light"}
            minimumDate={step === "date" ? new Date() : undefined}
            onChange={(_, date) => {
              if (date) setTempDate(date);
            }}
          />
          <View style={[styles.actions, { borderTopColor: colors.divider }]}>
            <TouchableOpacity onPress={onClose}>
              <Text style={[styles.cancel, { color: colors.textMuted }]}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleConfirm}>
              <Text style={[styles.confirm, { color: colors.iosBlue }]}>
                {step === "date" ? "Next" : "OK"}
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    borderRadius: 16,
    padding: 16,
    width: "85%",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 24,
    paddingTop: 8,
    borderTopWidth: StyleSheet.hairlineWidth,
    marginTop: 8,
  },
  cancel: {
    fontSize: 16,
  },
  confirm: {
    fontSize: 16,
    fontWeight: "600",
  },
});