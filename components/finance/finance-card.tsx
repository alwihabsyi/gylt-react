// components/finance/FinanceCard.tsx
import { Palette } from "@/constants/theme";
import { useSemanticColors } from "@/hooks/use-semantic-colors";
import { Activity, ActivityType } from "@/types/activity";
import { formatCurrency } from "@/utils/formatter";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface FinanceCardProps {
  activity: Activity;
}

export default function FinanceCard({ activity }: FinanceCardProps) {
  const colors = useSemanticColors();
  const isIncome = activity.type === ActivityType.Income;
  const symbol = isIncome ? "+" : "-";
  const amountColor = isIncome ? Palette.EmeraldGreen : Palette.PoppyRed;

  return (
    <View style={[styles.card, { backgroundColor: colors.surface, shadowColor: colors.shadow }]}>
      {/* Icon */}
      <View style={styles.iconContainer}>
        <Ionicons
          name={activity.category.iconName}
          size={24}
          color={Palette.EmeraldGreen}
        />
      </View>

      {/* Title & Category */}
      <View style={styles.details}>
        <Text style={[styles.title, { color: colors.textPrimary }]} numberOfLines={1}>
          {activity.name}
        </Text>
        <Text style={[styles.category, { color: colors.textMuted }]}>{activity.category.title}</Text>
      </View>

      {/* Amount & Date */}
      <View style={styles.amounts}>
        <Text style={[styles.amountText, { color: amountColor }]}>
          {symbol}
          {formatCurrency(activity.amount)}
        </Text>
        <Text style={[styles.date, { color: colors.textMuted }]}>{activity.createdAt}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    borderRadius: 20,
    padding: 15,
    minHeight: 50,
    alignItems: "center",
    marginBottom: 10,
    // iOS Shadow
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    // Android Shadow
    elevation: 2,
  },
  iconContainer: {
    backgroundColor: `${Palette.EmeraldGreen}1A`, // 1A is ~10% opacity
    padding: 10,
    borderRadius: 10,
    marginRight: 15,
  },
  details: { flex: 1, justifyContent: "center" },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  category: { fontSize: 12, fontWeight: "300" },
  amounts: { alignItems: "flex-end", justifyContent: "center" },
  amountText: { fontSize: 16, fontWeight: "600", marginBottom: 4 },
  date: { fontSize: 12, fontWeight: "300" },
});
