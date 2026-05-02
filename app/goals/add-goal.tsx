import { LabeledTextField } from "@/components/ui/labeled-text-field";
import { RoundedItemCard } from "@/components/ui/rounded-item-card";
import { SimpleGrid } from "@/components/ui/simple-grid";
import { Palette } from "@/constants/theme";
import { Goals } from "@/domain/Goals";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addGoal, clearError } from "@/store/slices/goalSlice";
import {
  ALL_GOAL_INTERVALS,
  GoalInterval,
  GoalType
} from "@/types/goal";
import { formatDateTime } from "@/utils/formatter";
import { GoalFormErrors, hasGoalErrors, validateGoalForm } from "@/utils/goal-validation";
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
  const dispatch = useAppDispatch();

  const { loading, error } = useAppSelector((state) => state.goals);
  const userId = useAppSelector((state) => state.auth.userId);

  const [selectedType, setSelectedType] = useState<GoalType>(GoalType.Financial);
  const [selectedInterval, setSelectedInterval] = useState<GoalInterval>(GoalInterval.Monthly);

  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [target, setTarget] = useState("");
  const [date, setDate] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<GoalFormErrors>({});

  const revalidate = (overrides: Partial<typeof fields>) => {
    if (!submitted) return;
    setErrors(validateGoalForm({ ...fields, ...overrides }));
  };

  const fields = {
    name,
    currentAmount: amount,
    targetAmount: target,
    intervalType: selectedInterval,
    goalType: selectedType,
    targetDate: date
  };

  const handleTypeChange = (type: GoalType) => {
    setSelectedType(type);
    revalidate({ goalType: selectedType });
  };

  const handleIntervalChange = (interval: GoalInterval) => {
    setSelectedInterval(interval);
    revalidate({ intervalType: interval });
  };

  const handleAmountChange = (value: string) => {
    setAmount(value);
    revalidate({ currentAmount: value });
  };

  const handleTargetChange = (value: string) => {
    setTarget(value);
    revalidate({ targetAmount: value });
  };

  const handleNameChange = (value: string) => {
    setName(value);
    revalidate({ name: value });
  };

  const handleDateChange = (value: string) => {
    setDate(value);
    revalidate({ targetDate: value });
  };

  const handleAddGoal = async () => {
    setSubmitted(true);
    dispatch(clearError());
    const validationErrors = validateGoalForm(fields);
    if (hasGoalErrors(validationErrors) || userId === null) {
      setErrors(validationErrors);
      return;
    }

    const payload: Omit<Goals, "id"> = {
      userId: userId,
      name,
      currentAmount: selectedType === GoalType.Financial ? parseFloat(amount) : parseInt(amount),
      targetAmount: selectedType === GoalType.Financial ? parseFloat(target) : parseInt(target),
      intervalType: selectedInterval,
      goalType: selectedType,
      targetDate: date,
      createdAt: formatDateTime(new Date()),
    };

    const result = await dispatch(addGoal(payload));
    if (addGoal.fulfilled.match(result)) {
      router.back();
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Goal Type Toggle */}
        {/* <View style={styles.typeRow}>
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
                onPress={() => handleTypeChange(type)}
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
        </View> */}

        {/* Form Card */}
        <View style={styles.card}>
          <LabeledTextField
            fieldType={{ kind: "text" }}
            label="Name"
            value={name}
            onValueChange={handleNameChange}
            placeHolder="Enter the name of your goal.."
            error={errors.name}
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
                  onClick={() => handleIntervalChange(interval)}
                />
              )}
            />
          </View>

          <LabeledTextField
            fieldType={{ kind: "number" }}
            label="Current Progress (amount, session, etc.)"
            value={amount}
            onValueChange={handleAmountChange}
            placeHolder="Current progress if any.."
            error={errors.currentAmount}
          />

          <LabeledTextField
            fieldType={{ kind: "number" }}
            label="Target"
            value={target}
            onValueChange={handleTargetChange}
            placeHolder="Your target.."
            error={errors.targetAmount}
          />

          <LabeledTextField
            fieldType={{ kind: "date" }}
            label="Target Date"
            value={date}
            onValueChange={handleDateChange}
            placeHolder="Your goal deadline.."
            error={errors.targetDate}
          />

          {!!error && (
            <View style={styles.backendError}>
              <Text style={styles.backendErrorText}>{error}</Text>
            </View>
            )
          }

          <TouchableOpacity
            style={[styles.submitButton, loading && styles.submitButtonDisabled]}
            onPress={handleAddGoal}
            activeOpacity={0.85}
            disabled={loading}
          >
            <Text style={styles.submitButtonText}>
              {loading ? "Saving…" : "Start tracking!"}</Text>
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
  submitButtonDisabled: {
    opacity: 0.6,
  },
  backendError: {
    backgroundColor: `${Palette.PoppyRed}15`,
    borderRadius: 10,
    padding: 12,
  },
  backendErrorText: {
    color: Palette.PoppyRed,
    fontSize: 13,
    fontWeight: "500",
    textAlign: "center",
  },
});
