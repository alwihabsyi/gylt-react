import GlobalEmptyState from "@/components/ui/global-empty-state";
import GlobalError from "@/components/ui/global-error";
import GlobalLoading from "@/components/ui/global-loading";
import { GoalCard } from "@/components/ui/goal-card";
import { AppRoutes } from "@/constants/routes";
import { Palette } from "@/constants/theme";
import { useSemanticColors } from "@/hooks/use-semantic-colors";
import { Goals } from "@/domain/Goals";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchGoals } from "@/store/slices/goalSlice";
import { GoalType } from "@/types/goal";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { RefreshControl, RefreshControlProps, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type GoalsContentProps = {
  goals: Goals[];
  loading: boolean;
  error: string | null;
  refreshControl?: React.ReactElement<RefreshControlProps>;
};

function GoalsContent({ goals, loading, error, refreshControl }: GoalsContentProps) {
  const router = useRouter();

  if (loading) return <GlobalLoading label="Loading your goals…" />;
  if (error) return <GlobalError title="Something went wrong" message={error} />;

  if (goals.length === 0) {
    return (
      <ScrollView
        contentContainerStyle={styles.emptyScroll}
        refreshControl={refreshControl}
        showsVerticalScrollIndicator={false}
      >
        <GlobalEmptyState
          icon="🧾"
          title="No goals yet"
          message="Add your first goal to see it here."
          actionLabel="Add a goal"
          onAction={() => router.push(AppRoutes.AddGoal)}
        />
      </ScrollView>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={styles.list}
      showsVerticalScrollIndicator={false}
      refreshControl={refreshControl}
    >
      {goals.map((goal) => (
        <GoalCard
          key={goal.id}
          goals={goal}
          onPress={() =>
            router.push({ pathname: "/goals/[id]", params: { id: goal.id } })
          }
        />
      ))}
    </ScrollView>
  );
}

export default function GoalsScreen() {
  const colors = useSemanticColors();
  const router = useRouter();
  const userId = useAppSelector((state) => state.auth.userId);
  const dispatch = useAppDispatch();
  const { loading, error, items } = useAppSelector((state) => state.goals);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (userId) dispatch(fetchGoals(userId));
  }, [dispatch, userId]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    if (userId) await dispatch(fetchGoals(userId));
    setRefreshing(false);
  }, [dispatch, userId]);

  const refreshControl = (
    <RefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
      tintColor={Palette.EmeraldGreen}
      colors={[Palette.EmeraldGreen]}
    />
  );

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.screenGrey }]} edges={["top"]}>
      <GoalsContent
        loading={loading && !refreshing}
        error={error}
        goals={items.filter((g) => g.goalType === GoalType.Financial)}
        refreshControl={refreshControl}
      />

      <TouchableOpacity
        style={[styles.fab, { shadowColor: colors.shadow }]}
        onPress={() => router.push(AppRoutes.AddGoal)}
        activeOpacity={0.85}
      >
        <Ionicons name="add" size={28} color={colors.inverseOnAccent} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  list: { padding: 20, gap: 16 },
  emptyScroll: { flexGrow: 1 },
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
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
});