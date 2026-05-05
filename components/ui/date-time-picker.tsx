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

// Converts a Date to "YYYY-MM-DDTHH:mm" in LOCAL time — what datetime-local expects.
function toLocalDatetimeString(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}` +
    `T${pad(date.getHours())}:${pad(date.getMinutes())}`
  );
}

// Parses a "YYYY-MM-DDTHH:mm" string as LOCAL time (avoids the UTC-midnight offset bug).
function fromLocalDatetimeString(s: string): Date {
  const [datePart, timePart] = s.split("T");
  const [year, month, day] = datePart.split("-").map(Number);
  const [hours, minutes] = (timePart ?? "00:00").split(":").map(Number);
  return new Date(year, month - 1, day, hours, minutes);
}

// Minimum datetime string for the input (now, rounded to the minute).
function minDatetimeString(): string {
  const now = new Date();
  now.setSeconds(0, 0);
  return toLocalDatetimeString(now);
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

  // ─── Web ──────────────────────────────────────────────────────────────────
  if (Platform.OS === "web") {
    const isDark = scheme === "dark";

    return (
      <Modal visible transparent animationType="fade" onRequestClose={onClose}>
        <TouchableOpacity
          style={[styles.overlay, { backgroundColor: colors.overlayScrim }]}
          activeOpacity={1}
          onPress={onClose}
        >
          <TouchableOpacity activeOpacity={1} style={[styles.card, { backgroundColor: colors.surface }]}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={[styles.headerLabel, { color: colors.textMuted }]}>SCHEDULE FOR</Text>
              <Text style={[styles.headerValue, { color: colors.textPrimary }]}>
                {tempDate.toLocaleString(undefined, {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
            </View>

            <View style={[styles.divider, { backgroundColor: colors.divider }]} />

            {/* Single datetime-local input — no two-step dance needed on web */}
            <View style={styles.inputWrapper}>
              <style>{`
                .dtp-input {
                  width: 100%;
                  padding: 14px 16px;
                  border-radius: 12px;
                  border: 1.5px solid ${colors.divider};
                  font-size: 16px;
                  font-family: inherit;
                  background: ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.03)"};
                  color: ${colors.textPrimary};
                  outline: none;
                  box-sizing: border-box;
                  cursor: pointer;
                  transition: border-color 0.15s ease;
                  color-scheme: ${isDark ? "dark" : "light"};
                }
                .dtp-input:focus {
                  border-color: ${colors.iosBlue};
                }
              `}</style>
              <input
                className="dtp-input"
                type="datetime-local"
                value={toLocalDatetimeString(tempDate)}
                min={minDatetimeString()}
                onChange={(e) => {
                  if (!e.target.value) return;
                  setTempDate(fromLocalDatetimeString(e.target.value));
                }}
              />
            </View>

            {/* Actions */}
            <View style={[styles.actions, { borderTopColor: colors.divider }]}>
              <TouchableOpacity onPress={onClose} style={styles.actionBtn}>
                <Text style={[styles.cancel, { color: colors.textMuted }]}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => { onChange(tempDate); onClose(); }}
                style={[styles.actionBtn, styles.confirmBtn, { backgroundColor: colors.iosBlue }]}
              >
                <Text style={styles.confirmText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    );
  }

  // ─── Android ──────────────────────────────────────────────────────────────
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
          else {
            onChange(date);
            onClose();
          }
        }}
      />
    );
  }

  // ─── iOS ──────────────────────────────────────────────────────────────────
  return (
    <Modal visible transparent animationType="fade" onRequestClose={onClose}>
      <TouchableOpacity
        style={[styles.overlay, { backgroundColor: colors.overlayScrim }]}
        activeOpacity={1}
        onPress={onClose}
      >
        <TouchableOpacity activeOpacity={1} style={[styles.card, { backgroundColor: colors.surface }]}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
            {step === "date" ? "Select Date" : "Select Time"}
          </Text>
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
            <TouchableOpacity onPress={onClose} style={styles.actionBtn}>
              <Text style={[styles.cancel, { color: colors.textMuted }]}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleConfirm} style={styles.actionBtn}>
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
    borderRadius: 20,
    padding: 20,
    width: "85%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 12,
  },
  header: {
    marginBottom: 16,
  },
  headerLabel: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.8,
    marginBottom: 4,
    textTransform: "uppercase",
  },
  headerValue: {
    fontSize: 18,
    fontWeight: "600",
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    marginBottom: 16,
  },
  inputWrapper: {
    marginBottom: 20,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 10,
    paddingTop: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  actionBtn: {
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  confirmBtn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  confirmText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#fff",
  },
  cancel: {
    fontSize: 15,
  },
  confirm: {
    fontSize: 15,
    fontWeight: "600",
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 8,
  },
});