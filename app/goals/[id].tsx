import GlobalEmptyState from "@/components/ui/global-empty-state";
import GlobalError from "@/components/ui/global-error";
import GlobalLoading from "@/components/ui/global-loading";
import { Palette } from "@/constants/theme";
import { Goals, formattedIntervalTarget, goalProgress } from "@/domain/Goals";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { deleteGoal, fetchGoals } from "@/store/slices/goalSlice";
import { GoalType } from "@/types/goal";
import { getGoalDuration, parseFormattedDate } from "@/utils/formatter";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function ProgressBar({ progress }: { progress: number }) {
  const clamped = Math.max(0, Math.min(progress, 1));
  return (
    <View style={styles.progressTrack}>
      <View style={[styles.progressFill, { width: `${clamped * 100}%` }]} />
    </View>
  );
}

function GoalDetailHeader({
  name,
  onBack,
  goalType,
}: {
  name: string;
  onBack: () => void;
  goalType: GoalType;
}) {
  const typeLabel = goalType === GoalType.Financial ? "Financial" : "Well-Being";
  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={onBack}
        activeOpacity={0.8}
        accessibilityRole="button"
        accessibilityLabel="Go back"
      >
        <Ionicons name="chevron-back" size={20} color={Palette.AppColor} />
      </TouchableOpacity>

      <View style={styles.headerTextWrap}>
        <Text style={styles.headerTitle} numberOfLines={2}>
          {name}
        </Text>
        <Text style={styles.headerSubtitle}>{typeLabel} Goal</Text>
      </View>
    </View>
  );
}

export default function GoalDetailScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { id } = useLocalSearchParams<{ id: string }>();

  const userId = useAppSelector((state) => state.auth.userId);
  const { loading, error, items } = useAppSelector((state) => state.goals);

  const goal = useMemo<Goals | null>(() => {
    if (!id) return null;
    return items.find((g) => g.id === id) ?? null;
  }, [id, items]);

  useEffect(() => {
    if (userId) dispatch(fetchGoals(userId));
  }, [dispatch, userId]);

  const [isDeleting, setIsDeleting] = useState(false);

  const progress = goal ? goalProgress(goal) : 0;

  const timeLeft = useMemo(() => {
    if (!goal) return null;
    const created = parseFormattedDate(goal.createdAt);
    const target = parseFormattedDate(goal.targetDate);
    if (!created || !target || Number.isNaN(created.getTime()) || Number.isNaN(target.getTime())) return null;

    try {
      return getGoalDuration(created, target, goal.intervalType);
    } catch {
      return null;
    }
  }, [goal]);

  const handleDelete = () => {
    if (!goal?.id) return;

    Alert.alert(
      "Delete goal",
      "Are you sure you want to stop tracking this goal?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: isDeleting ? "Deleting…" : "Delete",
          style: "destructive",
          onPress: async () => {
            setIsDeleting(true);
            const result = await dispatch(deleteGoal(goal.id));
            if (deleteGoal.fulfilled.match(result)) router.back();
            setIsDeleting(false);
          },
        },
      ],
      { cancelable: true },
    );
  };

  if (!id) {
    return (
      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <GlobalError title="Invalid goal" message="Missing goal id." />
      </SafeAreaView>
    );
  }

  if (loading && items.length === 0) {
    return (
      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <GlobalLoading label="Loading goal…" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <GlobalError title="Something went wrong" message={error} />
      </SafeAreaView>
    );
  }

  if (!goal) {
    return (
      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <GlobalEmptyState
          icon="🎯"
          title="Goal not found"
          message="This goal may have been deleted."
          actionLabel="Back to goals"
          onAction={() => router.back()}
          variant="inline"
          style={{ paddingHorizontal: 18 }}
        />
      </SafeAreaView>
    );
  }

  const typeText =
    goal.goalType === GoalType.Financial ? "Financial" : "Well-Being";

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.topCard}>
          <GoalDetailHeader
            name={goal.name}
            goalType={goal.goalType}
            onBack={() => router.back()}
          />

          <ProgressBar progress={progress} />

          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Progress</Text>
              <Text style={styles.statValue}>{progress.toFixed(2)}%</Text>
            </View>

            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Time Left</Text>
              <Text style={styles.statValue} numberOfLines={1}>
                {timeLeft ?? "-"}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Goal details</Text>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Goal Type</Text>
            <Text style={styles.detailValue}>{typeText}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Interval</Text>
            <Text style={styles.detailValue}>
              {goal.intervalType.charAt(0).toUpperCase() + goal.intervalType.slice(1)}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Target</Text>
            <Text style={styles.detailValue}>{formattedIntervalTarget(goal)}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Target Date</Text>
            <Text style={styles.detailValue}>{goal.targetDate}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Started</Text>
            <Text style={styles.detailValue}>{goal.createdAt}</Text>
          </View>

          <TouchableOpacity
            style={[styles.deleteButton, isDeleting && styles.deleteButtonDisabled]}
            onPress={handleDelete}
            activeOpacity={0.85}
            disabled={isDeleting}
          >
            <View style={styles.deleteButtonInner}>
              <Ionicons name="trash-outline" size={18} color={Palette.PoppyRed} />
              <Text style={styles.deleteButtonText}>
                {isDeleting ? "Deleting…" : "Stop tracking"}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  scrollContent: {
    padding: 20,
    gap: 16,
    paddingBottom: 140,
  },
  topCard: {
    backgroundColor: Palette.SurfaceLight,
    borderRadius: 18,
    padding: 16,
    gap: 12,
  },
  header: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: `${Palette.EmeraldGreen}10`,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTextWrap: {
    flex: 1,
    gap: 2,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: Palette.AppColor,
  },
  headerSubtitle: {
    fontSize: 12,
    fontWeight: "600",
    color: "rgba(0,0,0,0.55)",
  },
  progressTrack: {
    height: 10,
    borderRadius: 10,
    backgroundColor: "rgba(158,158,158,0.35)",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 10,
    backgroundColor: Palette.EmeraldGreen,
  },
  statsRow: {
    flexDirection: "row",
    gap: 10,
  },
  statBox: {
    flex: 1,
    borderRadius: 16,
    backgroundColor: "rgba(158,158,158,0.1)",
    padding: 12,
    gap: 6,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#9E9E9E",
  },
  statValue: {
    fontSize: 18,
    fontWeight: "900",
    color: Palette.AppColor,
  },
  sectionCard: {
    backgroundColor: Palette.SurfaceLight,
    borderRadius: 18,
    padding: 16,
    gap: 12,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "900",
    color: Palette.AppColor,
    marginBottom: 2,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.06)",
  },
  detailLabel: {
    flex: 1,
    fontSize: 12,
    fontWeight: "700",
    color: "#9E9E9E",
  },
  detailValue: {
    flex: 1.2,
    fontSize: 12,
    fontWeight: "800",
    color: "#000",
    textAlign: "right",
  },
  deleteButton: {
    marginTop: 8,
    height: 52,
    borderRadius: 14,
    backgroundColor: `${Palette.PoppyRed}12`,
    borderWidth: 1,
    borderColor: `${Palette.PoppyRed}55`,
    alignItems: "center",
    justifyContent: "center",
  },
  deleteButtonDisabled: {
    opacity: 0.6,
  },
  deleteButtonInner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  deleteButtonText: {
    color: Palette.PoppyRed,
    fontWeight: "900",
    fontSize: 15,
  },
});
