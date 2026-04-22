// components/finance/FinanceCard.tsx
import { Palette } from "@/constants/theme";
import { Activity, ActivityType } from "@/types/activity";
import { formatDateTime, toRupiah } from "@/utils/formatter";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface FinanceCardProps {
  activity: Activity;
}

export default function FinanceCard({ activity }: FinanceCardProps) {
  const isIncome = activity.type === ActivityType.Income;
  const symbol = isIncome ? "+" : "-";
  const amountColor = isIncome ? Palette.EmeraldGreen : Palette.PoppyRed;

  return (
    <View style={styles.card}>
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
        <Text style={styles.title} numberOfLines={1}>
          {activity.name}
        </Text>
        <Text style={styles.category}>{activity.category.title}</Text>
      </View>

      {/* Amount & Date */}
      <View style={styles.amounts}>
        <Text style={[styles.amountText, { color: amountColor }]}>
          {symbol}
          {toRupiah(activity.amount)}
        </Text>
        <Text style={styles.date}>{formatDateTime(activity.createdAt)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 15,
    minHeight: 50,
    alignItems: "center",
    marginBottom: 10,
    // iOS Shadow
    shadowColor: "#000",
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
    color: Palette.InkDark,
    marginBottom: 4,
  },
  category: { fontSize: 12, fontWeight: "300", color: "gray" },
  amounts: { alignItems: "flex-end", justifyContent: "center" },
  amountText: { fontSize: 16, fontWeight: "600", marginBottom: 4 },
  date: { fontSize: 12, fontWeight: "300", color: "gray" },
});
