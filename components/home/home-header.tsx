import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Palette } from "@/constants/theme";
import { useSemanticColors } from "@/hooks/use-semantic-colors";
import { useTranslation } from "@/hooks/useTranslation";
import { Category } from "@/types/category";
import { formatCurrency, getWeekRangeString } from "@/utils/formatter";

type Props = {
  income: number;
  expense: number;
  username?: string;
  onPress: (s: string) => void; 
};

export default function HomeHeader({ income, expense, username, onPress }: Props) {
  const colors = useSemanticColors();
  const { t } = useTranslation();
  const displayName = username ?? t("common.user");

  return (
    <View style={styles.headerContainer}>
      {/* Greeting */}
      <View style={styles.greetingSection}>
        <Text style={[styles.helloText, { color: colors.textPrimary }]}>{t("home.hello")}</Text>
        <Text style={[styles.userText, { color: colors.textPrimary }]}>{displayName}</Text>
      </View>

      {/* Summary Card */}
      <View style={styles.summaryCard}>
        <View style={styles.summaryHeader}>
          <Text style={styles.summaryHeaderText}>{t("home.thisWeek")}</Text>
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
            <Text style={styles.summaryLabel}>{t("home.income")}</Text>
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
            <Text style={styles.summaryLabel}>{t("home.expense")}</Text>
            <Text style={styles.summaryAmount}>{formatCurrency(expense)}</Text>
          </View>
        </View>
      </View>

      {/* Categories || Currently inactive */}
      <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>{t("home.categories")}</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryRow}
      >
        {Object.values(Category).map((cat) => (
          <TouchableOpacity
            key={cat.title}
            style={styles.categoryItem}
            onPress={() => onPress(cat.title)}
            activeOpacity={0.7}
          >
            <View style={[styles.categoryIconWrap, { backgroundColor: colors.surface }]}>
              <Ionicons
                name={cat.iconName}
                size={24}
                color={Palette.EmeraldGreen}
              />
            </View>
            <Text style={[styles.categoryTitle, { color: colors.textPrimary }]} numberOfLines={1}>
              {cat.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
        {t("home.recentTransactions")}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: { paddingBottom: 10 },

  // Greeting
  greetingSection: { marginVertical: 10 },
  helloText: { fontSize: 24, fontWeight: "300" },
  userText: { fontSize: 32, fontWeight: "bold" },

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
    marginBottom: 10,
  },
  categoryRow: { paddingBottom: 20, paddingRight: 5 },
  categoryItem: { width: 80, alignItems: "center" },
  categoryIconWrap: {
    borderRadius: 10,
    padding: 15,
    marginBottom: 5,
  },
  categoryTitle: { fontSize: 12 },
});