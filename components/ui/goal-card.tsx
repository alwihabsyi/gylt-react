import { Palette } from "@/constants/theme";
import { useSemanticColors } from "@/hooks/use-semantic-colors";
import { useTranslation } from "@/hooks/useTranslation";
import type { TranslationKey } from "@/locales";
import { formattedIntervalTarget, goalProgress, Goals } from "@/domain/Goals";
import { GoalInterval } from "@/types/goal";
import { getGoalDuration, parseFormattedDate } from "@/utils/formatter";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const INTERVAL_LABEL: Record<GoalInterval, TranslationKey> = {
  [GoalInterval.Weekly]: "interval.weekly",
  [GoalInterval.Monthly]: "interval.monthly",
  [GoalInterval.Annually]: "interval.annually",
};

type GoalCardProps = {
  goals: Goals;
  onPress?: () => void;
};

export function GoalCard({ goals, onPress }: GoalCardProps) {
  const colors = useSemanticColors();
  const { t } = useTranslation();
  const progress = goalProgress(goals);
  const targetDate = parseFormattedDate(goals.targetDate);
  const createdAt = parseFormattedDate(goals.createdAt);

  const Container = onPress ? TouchableOpacity : View;

  return (
    <Container
      style={[styles.card, { backgroundColor: colors.surface }]}
      onPress={onPress}
      activeOpacity={onPress ? 0.9 : undefined}
      accessibilityRole={onPress ? "button" : undefined}
      accessibilityLabel={onPress ? `Open goal ${goals.name}` : undefined}
    >
      {/* Left accent bar */}
      <View style={styles.accentBar} />

      <View style={styles.content}>
        {/* Name + target date */}
        <View style={styles.header}>
          <Text style={[styles.name, { color: colors.textPrimary }]} numberOfLines={1} ellipsizeMode="tail">
            {goals.name}
          </Text>
          <Text style={[styles.targetDate, { color: colors.textSecondary }]}>
            {t("goalCard.targetLabel", { date: goals.targetDate })}
          </Text>
        </View>

        {/* Progress bar */}
        <View style={[styles.progressTrack, { backgroundColor: colors.progressTrack }]}>
          <View
            style={[styles.progressFill, { width: `${progress}%` }]}
          />
        </View>

        {/* Stats row */}
        <View style={styles.statsRow}>
          <View style={[styles.statBox, { backgroundColor: colors.surfaceInset }]}>
            <Text style={[styles.statLabel, { color: colors.textMuted }]} numberOfLines={1}>
              {t("goalCard.intervalTarget", {
                interval: t(INTERVAL_LABEL[goals.intervalType]),
              })}
            </Text>
            <Text style={[styles.statValue, { color: colors.textPrimary }]} numberOfLines={1}>
              {formattedIntervalTarget(goals)}
            </Text>
          </View>

          <View style={[styles.statBox, { backgroundColor: colors.surfaceInset }]}>
            <Text style={[styles.statLabel, { color: colors.textMuted }]}>
              {t("goalDetail.timeLeft")}
            </Text>
            <Text style={[styles.statValue, { color: colors.textPrimary }]} numberOfLines={1}>
              {createdAt && targetDate
                ? getGoalDuration(createdAt, targetDate, goals.intervalType)
                : "-"}
            </Text>
          </View>
        </View>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 200,
    borderRadius: 20,
    flexDirection: "row",
    overflow: "hidden",
  },
  accentBar: {
    width: 8,
    backgroundColor: Palette.EmeraldGreen,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 20,
    gap: 10,
  },
  header: {
    gap: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: "700",
  },
  targetDate: {
    fontSize: 12,
    fontWeight: "300",
  },
  progressTrack: {
    height: 10,
    borderRadius: 5,
    marginTop: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 5,
    backgroundColor: Palette.EmeraldGreen,
  },
  statsRow: {
    flex: 1,
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
  },
  statBox: {
    flex: 1,
    borderRadius: 15,
    padding: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },
  statLabel: {
    fontSize: 11,
    fontWeight: "600",
  },
  statValue: {
    fontSize: 16,
    fontWeight: "600",
  },
});
