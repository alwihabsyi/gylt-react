import { AppTabLayout } from "@/components/ui/app-tab-layout";
import { GoalCard } from "@/components/ui/goal-card";
import { AppRoutes } from "@/constants/routes";
import { Palette } from "@/constants/theme";
import { Goals } from "@/domain/Goals";
import { GoalInterval, GoalType } from "@/types/goal";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function previewGoals(): Goals[] {
  const today = new Date();
  const monthsAgo = (n: number) => {
    const d = new Date(today);
    d.setMonth(d.getMonth() - n);
    return d;
  };
  const monthsAhead = (n: number) => {
    const d = new Date(today);
    d.setMonth(d.getMonth() + n);
    return d;
  };
  const weeksAgo = (n: number) => {
    const d = new Date(today);
    d.setDate(d.getDate() - n * 7);
    return d;
  };
  const weeksAhead = (n: number) => {
    const d = new Date(today);
    d.setDate(d.getDate() + n * 7);
    return d;
  };
  const yearsAgo = (n: number) => {
    const d = new Date(today);
    d.setFullYear(d.getFullYear() - n);
    return d;
  };
  const yearsAhead = (n: number) => {
    const d = new Date(today);
    d.setFullYear(d.getFullYear() + n);
    return d;
  };

  return [
    {
      name: "Emergency Fund",
      intervalType: GoalInterval.Monthly,
      goalType: GoalType.Financial,
      targetAmount: 12_000_000,
      currentAmount: 4_000_000,
      createdAt: monthsAgo(3),
      targetDate: monthsAhead(9),
    },
    {
      name: "Japan Trip 🇯🇵",
      intervalType: GoalInterval.Monthly,
      goalType: GoalType.Financial,
      targetAmount: 25_000_000,
      currentAmount: 10_000_000,
      createdAt: monthsAgo(2),
      targetDate: monthsAhead(10),
    },
    {
      name: "Buy a Car 🚗",
      intervalType: GoalInterval.Annually,
      goalType: GoalType.Financial,
      targetAmount: 150_000_000,
      currentAmount: 40_000_000,
      createdAt: yearsAgo(1),
      targetDate: yearsAhead(2),
    },
    {
      name: "Gym Consistency 💪",
      intervalType: GoalInterval.Weekly,
      goalType: GoalType.WellBeing,
      targetAmount: 52,
      currentAmount: 18,
      createdAt: weeksAgo(4),
      targetDate: weeksAhead(12),
    },
    {
      name: "Read 24 Books 📚",
      intervalType: GoalInterval.Monthly,
      goalType: GoalType.WellBeing,
      targetAmount: 24,
      currentAmount: 6,
      createdAt: monthsAgo(2),
      targetDate: monthsAhead(10),
    },
    {
      name: "Meditation Habit 🧘",
      intervalType: GoalInterval.Weekly,
      goalType: GoalType.WellBeing,
      targetAmount: 100,
      currentAmount: 35,
      createdAt: weeksAgo(6),
      targetDate: weeksAhead(20),
    },
  ];
}

type GoalsContentProps = { goals: Goals[] };

function GoalsContent({ goals }: GoalsContentProps) {
  return (
    <ScrollView
      contentContainerStyle={styles.list}
      showsVerticalScrollIndicator={false}
    >
      {goals.map((goal, index) => (
        <GoalCard key={index} goals={goal} />
      ))}
    </ScrollView>
  );
}

export default function GoalsScreen() {
  const router = useRouter();
  const goals = previewGoals();

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <AppTabLayout
        tabNames={[GoalType.Financial, GoalType.WellBeing]}
        renderContent={(index) => (
          <GoalsContent
            goals={goals.filter((g) =>
              index === 0
                ? g.goalType === GoalType.Financial
                : g.goalType === GoalType.WellBeing,
            )}
          />
        )}
      />

      {/* FAB */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push(AppRoutes.AddGoal)}
        activeOpacity={0.85}
      >
        <Ionicons name="add" size={28} color="#FFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  list: {
    padding: 20,
    gap: 16,
  },
  fab: {
    position: "absolute",
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: Palette.EmeraldGreen,
    alignItems: "center",
    justifyContent: "center",
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
});
