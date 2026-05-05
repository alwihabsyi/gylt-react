import { Palette } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import {
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

type Props = {
  visible: boolean;
  icon?: React.ComponentProps<typeof Ionicons>["name"];
  title: string;
  message: string;
  confirmLabel: string;
  cancelLabel: string;
  destructive?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmSheet({
  visible,
  icon,
  title,
  message,
  confirmLabel,
  cancelLabel,
  destructive = false,
  onConfirm,
  onCancel,
}: Props) {
  const confirmColor = destructive ? Palette.PoppyRed : Palette.EmeraldGreen;
  const confirmBg = destructive ? `${Palette.PoppyRed}12` : Palette.EmeraldGreen;
  const confirmTextColor = destructive ? Palette.PoppyRed : "#fff";

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onCancel}
    >
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={onCancel}
      />
      <View style={styles.sheet}>
        <View style={styles.handle} />

        {icon && (
          <View style={[styles.iconWrap, { backgroundColor: `${confirmColor}15` }]}>
            <Ionicons name={icon} size={28} color={confirmColor} />
          </View>
        )}

        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>

        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={onCancel}
            activeOpacity={0.8}
          >
            <Text style={styles.cancelText}>{cancelLabel}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.confirmButton,
              destructive
                ? { backgroundColor: confirmBg, borderWidth: 1, borderColor: `${Palette.PoppyRed}55` }
                : { backgroundColor: confirmBg },
            ]}
            onPress={onConfirm}
            activeOpacity={0.85}
          >
            <Text style={[styles.confirmText, { color: confirmTextColor }]}>
              {confirmLabel}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.3)" },
  sheet: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 40,
    gap: 10,
    alignItems: "center",
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: "rgba(0,0,0,0.15)",
    alignSelf: "center",
    marginBottom: 8,
  },
  iconWrap: {
    width: 60,
    height: 60,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  title: { fontSize: 18, fontWeight: "900", color: "#000", textAlign: "center" },
  message: {
    fontSize: 13,
    fontWeight: "500",
    color: "#9E9E9E",
    textAlign: "center",
    lineHeight: 20,
  },
  actions: { flexDirection: "row", gap: 10, marginTop: 8, width: "100%" },
  cancelButton: {
    flex: 1,
    height: 52,
    borderRadius: 16,
    backgroundColor: "rgba(158,158,158,0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  cancelText: { fontWeight: "800", fontSize: 15, color: "#9E9E9E" },
  confirmButton: {
    flex: 1,
    height: 52,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  confirmText: { fontWeight: "900", fontSize: 15 },
});