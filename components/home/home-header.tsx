import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { Palette } from "@/constants/theme";
import { formatCurrency, getWeekRangeString } from "@/utils/formatter";

type Props = {
  income: number;
  expense: number;
  username?: string;
};

export default function HomeHeader({ income, expense, username = "User" }: Props) {
  return (
    <View style={styles.headerContainer}>
      {/* Greeting */}
      <View style={styles.greetingSection}>
        <Text style={styles.helloText}>Hello,</Text>
        <Text style={styles.userText}>{username}</Text>
      </View>

      {/* Summary Card */}
      <View style={styles.summaryCard}>
        <View style={styles.summaryHeader}>
          <Text style={styles.summaryHeaderText}>This Week</Text>
          <Text style={styles.summaryHeaderText}>{getWeekRangeString()}</Text>
        </View>

        <View style={styles.summaryBody}>
          {/* Income Column */}
          <View style={styles.summaryCol}>
            <View style={styles.arrowIconWrap}>
              <Ionicons
                name="arrow-down-outline"
                size={16}
                color={Palette.EmeraldGreen}
                style={{ transform: [{ rotate: "45deg" }] }}
              />
            </View>
            <Text style={styles.summaryLabel}>Income</Text>
            <Text style={styles.summaryAmount}>{formatCurrency(income)}</Text>
          </View>

          {/* Expense Column */}
          <View style={[styles.summaryCol, { alignItems: "flex-end" }]}>
            <View style={styles.arrowIconWrap}>
              <Ionicons
                name="arrow-up-outline"
                size={16}
                color={Palette.PoppyRed}
                style={{ transform: [{ rotate: "45deg" }] }}
              />
            </View>
            <Text style={styles.summaryLabel}>Expense</Text>
            <Text style={styles.summaryAmount}>{formatCurrency(expense)}</Text>
          </View>
        </View>
      </View>

      {/* Categories || Currently inactive */}
      {/* <Text style={styles.sectionTitle}>Categories</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryRow}
      >
        {Object.values(Category).map((cat) => (
          <View key={cat.title} style={styles.categoryItem}>
            <View style={styles.categoryIconWrap}>
              <Ionicons
                name={cat.iconName}
                size={24}
                color={Palette.EmeraldGreen}
              />
            </View>
            <Text style={styles.categoryTitle} numberOfLines={1}>
              {cat.title}
            </Text>
          </View>
        ))}
      </ScrollView> */}

      <Text style={styles.sectionTitle}>Recent Transactions</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: { paddingBottom: 10 },

  // Greeting
  greetingSection: { marginVertical: 10 },
  helloText: { fontSize: 24, fontWeight: "300", color: Palette.InkDark },
  userText: { fontSize: 32, fontWeight: "bold", color: Palette.InkDark },

  // Summary Card
  summaryCard: {
    backgroundColor: Palette.EmeraldGreen,
    borderRadius: 15,
    overflow: "hidden",
    marginTop: 10,
    marginBottom: 20,
  },
  summaryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: Palette.Black2,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  summaryHeaderText: { color: "white", fontSize: 12 },
  summaryBody: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
  },
  summaryCol: { justifyContent: "space-between", alignItems: "flex-start" },
  arrowIconWrap: {
    backgroundColor: Palette.StarkWhite,
    borderRadius: 10,
    padding: 5,
    marginBottom: 10,
  },
  summaryLabel: {
    color: Palette.StarkWhite,
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 5,
  },
  summaryAmount: { color: Palette.StarkWhite, fontSize: 18, fontWeight: "600" },

  // Categories
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: Palette.InkDark,
    marginBottom: 10,
  },
  categoryRow: { paddingBottom: 20, paddingRight: 5 },
  categoryItem: { width: 80, alignItems: "center" },
  categoryIconWrap: {
    backgroundColor: Palette.StarkWhite,
    borderRadius: 10,
    padding: 15,
    marginBottom: 5,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 1,
  },
  categoryTitle: { fontSize: 12, color: Palette.InkDark },
});