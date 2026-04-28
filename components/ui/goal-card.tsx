import { Palette } from "@/constants/theme";
import { formattedIntervalTarget, goalProgress, Goals } from "@/domain/Goals";
import { formatDate, getGoalDuration } from "@/utils/formatter";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type GoalCardProps = {
  goals: Goals;
};

export function GoalCard({ goals }: GoalCardProps) {
  const progress = goalProgress(goals);

  return (
    <View style={styles.card}>
      {/* Left accent bar */}
      <View style={styles.accentBar} />

      <View style={styles.content}>
        {/* Name + target date */}
        <View style={styles.header}>
          <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
            {goals.name}
          </Text>
          <Text style={styles.targetDate}>
            Target: {formatDate(goals.targetDate)}
          </Text>
        </View>

        {/* Progress bar */}
        <View style={styles.progressTrack}>
          <View
            style={[styles.progressFill, { width: `${progress * 100}%` }]}
          />
        </View>

        {/* Stats row */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statLabel} numberOfLines={1}>
              {goals.intervalType.charAt(0).toUpperCase() +
                goals.intervalType.slice(1)}{" "}
              Target
            </Text>
            <Text style={styles.statValue} numberOfLines={1}>
              {formattedIntervalTarget(goals)}
            </Text>
          </View>

          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Time Left</Text>
            <Text style={styles.statValue} numberOfLines={1}>
              {getGoalDuration(
                goals.createdAt,
                goals.targetDate,
                goals.intervalType,
              )}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 200,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
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
    color: "#000",
  },
  targetDate: {
    fontSize: 12,
    fontWeight: "300",
    color: "rgba(0,0,0,0.6)",
  },
  progressTrack: {
    height: 10,
    borderRadius: 5,
    backgroundColor: "rgba(158,158,158,0.4)",
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
    backgroundColor: "rgba(158,158,158,0.1)",
    padding: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },
  statLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: "#9E9E9E",
  },
  statValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
});
