import { GoalDetailHeader } from "@/components/goals/goal-detail-header";
import { GoalDetailRow } from "@/components/goals/goal-detail-row";
import { GoalProgressCard } from "@/components/goals/goal-progress-card";
import { GoalStatBox } from "@/components/goals/goal-stat-box";
import { UpdateProgressSheet } from "@/components/goals/update-progress-sheet";
import GlobalEmptyState from "@/components/ui/global-empty-state";
import GlobalError from "@/components/ui/global-error";
import GlobalLoading from "@/components/ui/global-loading";
import { Palette } from "@/constants/theme";
import { useSemanticColors } from "@/hooks/use-semantic-colors";
import { useTranslation } from "@/hooks/useTranslation";
import type { TranslationKey } from "@/locales";
import { Goals, formattedIntervalTarget, goalProgress } from "@/domain/Goals";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { deleteGoal, fetchGoals, updateGoal } from "@/store/slices/goalSlice";
import { GoalInterval, GoalType } from "@/types/goal";
import { formatCurrency, getGoalDuration, parseFormattedDate } from "@/utils/formatter";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Alert,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const INTERVAL_LABEL: Record<GoalInterval, TranslationKey> = {
  [GoalInterval.Weekly]: "interval.weekly",
  [GoalInterval.Monthly]: "interval.monthly",
  [GoalInterval.Annually]: "interval.annually",
};

export default function GoalDetailScreen() {
  const colors = useSemanticColors();
  const { t } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { id } = useLocalSearchParams<{ id: string }>();

  const userId = useAppSelector((state) => state.auth.userId);
  const { loading, error, items } = useAppSelector((state) => state.goals);

  const goal = useMemo<Goals | null>(
    () => items.find((g) => g.id === id) ?? null,
    [id, items],
  );

  useEffect(() => {
    if (userId) dispatch(fetchGoals(userId));
  }, [dispatch, userId]);

  const [isDeleting, setIsDeleting] = useState(false);
  const [showUpdateSheet, setShowUpdateSheet] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    if (userId) await dispatch(fetchGoals(userId));
    setRefreshing(false);
  }, [dispatch, userId]);

  const progress = goal ? goalProgress(goal) : 0;

  const timeLeft = useMemo(() => {
    if (!goal) return null;
    const created = parseFormattedDate(goal.createdAt);
    const target = parseFormattedDate(goal.targetDate);
    if (!created || !target) return null;
    try {
      return getGoalDuration(created, target, goal.intervalType);
    } catch {
      return null;
    }
  }, [goal]);

  const handleUpdateProgress = async (amount: number) => {
    if (!goal) return;
    setIsSaving(true);
    await dispatch(updateGoal({ id: goal.id, data: { currentAmount: amount } }));
    setIsSaving(false);
    setShowUpdateSheet(false);
  };

  const handleDelete = () => {
    if (!goal?.id) return;
    Alert.alert(
      t("goalDetail.deleteAlertTitle"),
      t("goalDetail.deleteAlertMessage"),
      [
        { text: t("goalDetail.cancel"), style: "cancel" },
        {
          text: isDeleting ? t("goalDetail.deleting") : t("goalDetail.deleteConfirm"),
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

  const safeAreaStyle = [styles.safeArea, { backgroundColor: colors.screenGrey }];

  if (!id)
    return (
      <SafeAreaView style={safeAreaStyle} edges={["top"]}>
        <GlobalError title={t("goalDetail.invalidTitle")} message={t("goalDetail.invalidMessage")} />
      </SafeAreaView>
    );

  if (loading && items.length === 0)
    return (
      <SafeAreaView style={safeAreaStyle} edges={["top"]}>
        <GlobalLoading label={t("goalDetail.loading")} />
      </SafeAreaView>
    );

  if (error)
    return (
      <SafeAreaView style={safeAreaStyle} edges={["top"]}>
        <GlobalError title={t("common.errorTitle")} message={error} />
      </SafeAreaView>
    );

  if (!goal)
    return (
      <SafeAreaView style={safeAreaStyle} edges={["top"]}>
        <GlobalEmptyState
          icon="🎯"
          title={t("goalDetail.notFoundTitle")}
          message={t("goalDetail.notFoundMessage")}
          actionLabel={t("goalDetail.backToGoals")}
          onAction={() => router.back()}
          variant="inline"
          style={{ paddingHorizontal: 18 }}
        />
      </SafeAreaView>
    );

  return (
    <SafeAreaView style={safeAreaStyle} edges={["top"]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={Palette.EmeraldGreen}
            colors={[Palette.EmeraldGreen]}
          />
        }
      >
        <View style={[styles.topCard, { backgroundColor: colors.surface }]}>
          <GoalDetailHeader
            name={goal.name}
            goalType={goal.goalType}
            onBack={() => router.back()}
          />
          <GoalProgressCard
            current={goal.currentAmount}
            target={goal.targetAmount}
            progress={progress}
            formatCurrency={formatCurrency}
          />
          <View style={styles.statsRow}>
            <GoalStatBox label={t("goalDetail.progressPct")} value={`${progress.toFixed(2)}%`} />
            <GoalStatBox label={t("goalDetail.timeLeft")} value={timeLeft ?? "-"} />
          </View>
        </View>

        <TouchableOpacity
          style={styles.updateButton}
          onPress={() => setShowUpdateSheet(true)}
          activeOpacity={0.85}
        >
          <Ionicons name="trending-up-outline" size={18} color={colors.inverseOnAccent} />
          <Text style={[styles.updateButtonText, { color: colors.inverseOnAccent }]}>
            {t("goalDetail.updateProgress")}
          </Text>
        </TouchableOpacity>

        <View style={[styles.sectionCard, { backgroundColor: colors.surface }]}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
            {t("goalDetail.goalDetails")}
          </Text>
          <GoalDetailRow
            label={t("goalDetail.goalType")}
            value={
              goal.goalType === GoalType.Financial
                ? t("goalDetail.financial")
                : t("goalDetail.wellBeing")
            }
          />
          <GoalDetailRow
            label={t("goalDetail.interval")}
            value={t(INTERVAL_LABEL[goal.intervalType])}
          />
          <GoalDetailRow label={t("goalDetail.target")} value={formattedIntervalTarget(goal)} />
          <GoalDetailRow label={t("goalDetail.targetDate")} value={goal.targetDate} />
          <GoalDetailRow label={t("goalDetail.started")} value={goal.createdAt} />

          <TouchableOpacity
            style={[styles.deleteButton, isDeleting && styles.deleteButtonDisabled]}
            onPress={handleDelete}
            activeOpacity={0.85}
            disabled={isDeleting}
          >
            <Ionicons name="trash-outline" size={18} color={Palette.PoppyRed} />
            <Text style={styles.deleteButtonText}>
              {isDeleting ? t("goalDetail.deleting") : t("goalDetail.stopTracking")}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 24 }} />
      </ScrollView>

      <UpdateProgressSheet
        goal={goal}
        visible={showUpdateSheet}
        onClose={() => setShowUpdateSheet(false)}
        onSave={handleUpdateProgress}
        saving={isSaving}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  scrollContent: { padding: 20, gap: 16, paddingBottom: 140 },
  topCard: {
    borderRadius: 18,
    padding: 16,
    gap: 12,
  },
  statsRow: { flexDirection: "row", gap: 10 },
  updateButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    height: 52,
    borderRadius: 16,
    backgroundColor: Palette.EmeraldGreen,
  },
  updateButtonText: { fontWeight: "900", fontSize: 15 },
  sectionCard: {
    borderRadius: 18,
    padding: 16,
    gap: 12,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "900",
    marginBottom: 2,
  },
  deleteButton: {
    marginTop: 8,
    height: 52,
    borderRadius: 14,
    backgroundColor: `${Palette.PoppyRed}12`,
    borderWidth: 1,
    borderColor: `${Palette.PoppyRed}55`,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  deleteButtonDisabled: { opacity: 0.6 },
  deleteButtonText: { color: Palette.PoppyRed, fontWeight: "900", fontSize: 15 },
});