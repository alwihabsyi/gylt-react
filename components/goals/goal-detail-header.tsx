import { Palette } from "@/constants/theme";
import { useSemanticColors } from "@/hooks/use-semantic-colors";
import { useTranslation } from "@/hooks/useTranslation";
import { GoalType } from "@/types/goal";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  name: string;
  goalType: GoalType;
  onBack: () => void;
};

export function GoalDetailHeader({ name, goalType, onBack }: Props) {
  const colors = useSemanticColors();
  const { t } = useTranslation();
  const subtitle =
    goalType === GoalType.Financial
      ? t("goalDetail.financialGoalDisplay")
      : t("goalDetail.wellbeingGoalDisplay");
  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={onBack}
        activeOpacity={0.8}
        accessibilityRole="button"
        accessibilityLabel="Go back"
      >
        <Ionicons name="chevron-back" size={20} color={colors.textPrimary} />
      </TouchableOpacity>
      <View style={styles.textWrap}>
        <Text style={[styles.title, { color: colors.textPrimary }]} numberOfLines={2}>
          {name}
        </Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          {subtitle}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: "row", gap: 12, alignItems: "center" },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: `${Palette.EmeraldGreen}10`,
    alignItems: "center",
    justifyContent: "center",
  },
  textWrap: { flex: 1, gap: 2 },
  title: { fontSize: 18, fontWeight: "800" },
  subtitle: { fontSize: 12, fontWeight: "600" },
});