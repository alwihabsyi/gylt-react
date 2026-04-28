import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import FinanceCard from "@/components/finance/finance-card";
import OptionPill from "@/components/ui/option-pill";
import SearchBar from "@/components/ui/search-bar";
import SpeedDialFab from "@/components/ui/speed-dial-fab";
import { AppRoutes } from "@/constants/routes";
import { Palette } from "@/constants/theme";
import { Activity, ActivityType } from "@/types/activity";
import { Category } from "@/types/category";
import { getCurrentMonthYear, toRupiah } from "@/utils/formatter";

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

export default function FinanceScreen() {
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState("All");

  const filterOptions = ["All", ...Object.values(Category).map((c) => c.title)];

  const currMonthExpense = dummyActivities
    .filter((a) => a.type === ActivityType.Expense)
    .reduce((sum, a) => sum + a.amount, 0);
  const currMonthIncome = dummyActivities
    .filter((a) => a.type === ActivityType.Income)
    .reduce((sum, a) => sum + a.amount, 0);

  const ListHeader = () => (
    <View style={styles.headerContainer}>
      <SearchBar onSearch={(q) => console.log("Searching:", q)} />

      <View style={styles.spacer20} />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.pillsRow}
      >
        {filterOptions.map((option) => (
          <OptionPill
            key={option}
            optionName={option}
            isSelected={selectedFilter === option}
            onItemSelected={setSelectedFilter}
          />
        ))}
      </ScrollView>

      <View style={styles.spacer20} />

      <Text style={styles.monthText}>{getCurrentMonthYear()}</Text>

      <View style={styles.summaryRow}>
        <View style={styles.summaryItem}>
          <Ionicons name="arrow-down" size={16} color={Palette.EmeraldGreen} />
          <Text style={[styles.summaryAmount, { color: Palette.EmeraldGreen }]}>
            {toRupiah(currMonthIncome)}
          </Text>
        </View>

        <View style={styles.summaryItem}>
          <Ionicons name="arrow-up" size={16} color={Palette.RedErrorLight} />
          <Text
            style={[styles.summaryAmount, { color: Palette.RedErrorLight }]}
          >
            {toRupiah(currMonthExpense)}
          </Text>
        </View>
      </View>

      <View style={styles.spacer10} />
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <FlatList
        data={dummyActivities}
        keyExtractor={(item, index) => item.name + index}
        renderItem={({ item }) => <FinanceCard activity={item} />}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={ListHeader}
        showsVerticalScrollIndicator={false}
      />

      {/* FAB sits absolutely positioned over the list */}
      <SpeedDialFab
        onAddTransactionClick={() => router.push(AppRoutes.AddTransaction)}
        onViewStatsClick={() => console.log("Navigate to Stats")}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Palette.Canvas, paddingTop: 10 },
  listContent: { paddingHorizontal: 20, paddingBottom: 100 }, // Extra bottom padding for the FAB
  headerContainer: { paddingBottom: 10 },

  pillsRow: { gap: 8, paddingRight: 20 },

  monthText: {
    fontSize: 18,
    fontWeight: "600",
    color: Palette.InkDark,
    marginBottom: 10,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  summaryItem: { flexDirection: "row", alignItems: "center", gap: 5 },
  summaryAmount: { fontSize: 14, fontWeight: "500" },

  spacer10: { height: 10 },
  spacer20: { height: 20 },
});
