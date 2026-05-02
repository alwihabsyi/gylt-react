import GlobalEmptyState from "@/components/ui/global-empty-state";
import GlobalError from "@/components/ui/global-error";
import GlobalLoading from "@/components/ui/global-loading";
import { GoalCard } from "@/components/ui/goal-card";
import { AppRoutes } from "@/constants/routes";
import { Palette } from "@/constants/theme";
import { Goals } from "@/domain/Goals";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchGoals } from "@/store/slices/goalSlice";
import { GoalType } from "@/types/goal";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type GoalsContentProps = {
  goals: Goals[];
  loading: boolean;
  error: string | null;
};

function GoalsContent({ goals, loading, error }: GoalsContentProps) {
  const router = useRouter();

  if (loading) {
    return <GlobalLoading label="Loading your goals…" />;
  }

  if (error) {
    return <GlobalError title="Something went wrong" message={error} />;
  }

  if (goals.length === 0) {
    return (
      <GlobalEmptyState
        icon="🧾"
        title="No goals yet"
        message="Add your first goal to see it here."
        actionLabel="Add a goal"
        onAction={() => router.push(AppRoutes.AddGoal)}
      />
    );
  }

  return (
    <ScrollView
      contentContainerStyle={styles.list}
      showsVerticalScrollIndicator={false}
    >
      {goals.map((goal) => (
          <GoalCard
            key={goal.id}
            goals={goal}
            onPress={() =>
              router.push({
                pathname: "/goals/[id]",
                params: { id: goal.id },
              })
            }
          />
      ))}
    </ScrollView>
  );
}

export default function GoalsScreen() {
  const router = useRouter();
  const userId = useAppSelector((state) => state.auth.userId);
  const dispatch = useAppDispatch();
  const { loading, error, items } = useAppSelector((state) => state.goals);

  useEffect(() => {
    if (userId) dispatch(fetchGoals(userId));
  }, [dispatch, userId]);

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      {/* <AppTabLayout
        tabNames={[GoalType.Financial, GoalType.WellBeing]}
        renderContent={(index) => (
          <GoalsContent
            loading={loading}
            error={error}
            goals={items.filter((g) =>
              index === 0
                ? g.goalType === GoalType.Financial
                : g.goalType === GoalType.WellBeing,
            )}
          />
        )}
      /> */}

      <GoalsContent
        loading={loading}
        error={error}
        goals={items.filter((g) => g.goalType === GoalType.Financial)}
      />

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
