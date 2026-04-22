import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import FinanceCard from "@/components/finance/finance-card";
import { Palette } from "@/constants/theme";
import { Activity, ActivityType } from "@/types/activity";
import { Category } from "@/types/category";
import { getWeekRangeString } from "@/utils/formatter";

const dummyActivities: Activity[] = [
  {
    name: "Makan kantin",
    type: ActivityType.Expense,
    category: Category.Food,
    amount: 10000.0,
    createdAt: new Date(),
  },
  {
    name: "Belanja",
    type: ActivityType.Expense,
    category: Category.Shopping,
    amount: 150000.0,
    createdAt: new Date(),
  },
  {
    name: "Monthly salary",
    type: ActivityType.Income,
    category: Category.Bills,
    amount: 200000.0,
    createdAt: new Date(),
  },
];

export default function HomeScreen() {
  // This acts like Compose `item { ... }` blocks above the list
  const ListHeader = () => (
    <View style={styles.headerContainer}>
      {/* Hello User */}
      <View style={styles.greetingSection}>
        <Text style={styles.helloText}>Hello,</Text>
        <Text style={styles.userText}>User</Text>
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
              {/* Rotating standard arrows by 45deg just like your Compose code */}
              <Ionicons
                name="arrow-down-outline"
                size={16}
                color={Palette.EmeraldGreen}
                style={{ transform: [{ rotate: "45deg" }] }}
              />
            </View>
            <Text style={styles.summaryLabel}>Income</Text>
            <Text style={styles.summaryAmount}>Rp10.000,00</Text>
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
            <Text style={styles.summaryAmount}>Rp10.000,00</Text>
          </View>
        </View>
      </View>

      {/* Categories (LazyRow equivalent) */}
      <Text style={styles.sectionTitle}>Categories</Text>
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
      </ScrollView>

      <Text style={styles.sectionTitle}>Recent Transactions</Text>
    </View>
  );

  return (
    // SafeAreaView respects notches/dynamic islands on iOS
    <SafeAreaView style={styles.container} edges={["top"]}>
      <FlatList
        data={dummyActivities}
        keyExtractor={(item, index) => item.name + index} // Use a real ID in production!
        renderItem={({ item }) => <FinanceCard activity={item} />}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={ListHeader}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

// ── Styles ────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Palette.Canvas },
  listContent: { paddingHorizontal: 20, paddingBottom: 20 },
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
    // Shadows
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 1,
  },
  categoryTitle: { fontSize: 12, color: Palette.InkDark },
});
