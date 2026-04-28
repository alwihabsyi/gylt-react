import { LabeledTextField } from "@/components/ui/labeled-text-field";
import { RoundedItemCard } from "@/components/ui/rounded-item-card";
import { SimpleGrid } from "@/components/ui/simple-grid";
import { Palette } from "@/constants/theme";
import {
  ALL_GOAL_INTERVALS,
  ALL_GOAL_TYPES,
  GoalInterval,
  GoalType,
} from "@/types/goal";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AddGoalScreen() {
  const router = useRouter();

  const [selectedType, setSelectedType] = useState<GoalType>(
    GoalType.Financial,
  );
  const [selectedInterval, setSelectedInterval] = useState<GoalInterval>(
    GoalInterval.Monthly,
  );
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [target, setTarget] = useState("");
  const [date, setDate] = useState("");

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Goal Type Toggle */}
        <View style={styles.typeRow}>
          {ALL_GOAL_TYPES.map((type) => {
            const selected = selectedType === type;
            return (
              <TouchableOpacity
                key={type}
                style={[
                  styles.typeButton,
                  {
                    backgroundColor: selected
                      ? Palette.EmeraldGreen
                      : "#FFFFFF",
                  },
                ]}
                onPress={() => setSelectedType(type)}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.typeButtonText,
                    { color: selected ? "#FFFFFF" : "#000000" },
                  ]}
                >
                  {type}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Form Card */}
        <View style={styles.card}>
          <LabeledTextField
            fieldType={{ kind: "text" }}
            label="Name"
            value={name}
            onValueChange={setName}
            placeHolder="Enter the name of your goal.."
          />

          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Interval</Text>
            <SimpleGrid
              items={ALL_GOAL_INTERVALS}
              columns={3}
              horizontalSpacing={10}
              verticalSpacing={10}
              renderItem={(interval) => (
                <RoundedItemCard
                  text={interval.charAt(0).toUpperCase() + interval.slice(1)}
                  isSelected={selectedInterval === interval}
                  onClick={() => setSelectedInterval(interval)}
                />
              )}
            />
          </View>

          <LabeledTextField
            fieldType={{ kind: "number" }}
            label="Current Progress (amount, session, etc.)"
            value={amount}
            onValueChange={setAmount}
            placeHolder="Current progress if any.."
          />

          <LabeledTextField
            fieldType={{ kind: "number" }}
            label="Target"
            value={target}
            onValueChange={setTarget}
            placeHolder="Your target.."
          />

          <LabeledTextField
            fieldType={{ kind: "date" }}
            label="Target Date"
            value={date}
            onValueChange={setDate}
            placeHolder="Your goal deadline.."
          />

          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => router.back()}
            activeOpacity={0.85}
          >
            <Text style={styles.submitButtonText}>Start tracking!</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  scroll: {
    flex: 1,
  },
  container: {
    padding: 20,
    gap: 20,
  },
  typeRow: {
    flexDirection: "row",
    gap: 10,
  },
  typeButton: {
    flex: 1,
    height: 56,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  typeButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 20,
    gap: 20,
  },
  section: {
    gap: 5,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },
  submitButton: {
    marginTop: 10,
    height: 56,
    borderRadius: 15,
    backgroundColor: Palette.EmeraldGreen,
    alignItems: "center",
    justifyContent: "center",
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
