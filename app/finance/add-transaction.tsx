import { LabeledTextField } from "@/components/ui/labeled-text-field";
import { RoundedItemCard } from "@/components/ui/rounded-item-card";
import { SimpleGrid } from "@/components/ui/simple-grid";
import { Palette } from "@/constants/theme";
import { useSemanticColors } from "@/hooks/use-semantic-colors";
import { useTranslation } from "@/hooks/useTranslation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addActivity, clearError } from "@/store/slices/activitySlice";
import { Activity, ActivityType, ALL_ACTIVITY_TYPES } from "@/types/activity";
import { ALL_CATEGORIES, Category, CategoryType } from "@/types/category";
import { ALL_PAYMENT_METHODS } from "@/types/payment-method";
import {
  FormErrors,
  hasErrors,
  validateActivityForm,
} from "@/utils/activity-validation";
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

type Props = {
  onBack: () => void;
};

export default function AddTransactionScreen({ onBack }: Props) {
  const colors = useSemanticColors();
  const { t } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.transactions);
  const userId = useAppSelector((state) => state.auth.userId);

  const [selectedType, setSelectedType] = useState<ActivityType>(
    ActivityType.Income,
  );
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>(
    Category.Bills,
  );
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const revalidate = (overrides: Partial<typeof fields>) => {
    if (!submitted) return;
    setErrors(validateActivityForm({ ...fields, ...overrides }));
  };

  const fields = { amount, name, date, paymentMethod, type: selectedType };

  const handleTypeChange = (type: ActivityType) => {
    setSelectedType(type);
    revalidate({ type });
  };

  const handleAmountChange = (value: string) => {
    setAmount(value);
    revalidate({ amount: value });
  };

  const handleNameChange = (value: string) => {
    setName(value);
    revalidate({ name: value });
  };

  const handleDateChange = (value: string) => {
    setDate(value);
    revalidate({ date: value });
  };

  const handlePaymentMethodChange = (value: string) => {
    setPaymentMethod(value);
    revalidate({ paymentMethod: value });
  };

  const handleTransaction = async () => {
    setSubmitted(true);
    dispatch(clearError());
    const validationErrors = validateActivityForm(fields);
    if (hasErrors(validationErrors) || userId === null) {
      setErrors(validationErrors);
      return;
    }

    const payload: Omit<Activity, "id"> = {
      userId: userId,
      name,
      type: selectedType,
      category: selectedType === ActivityType.Expense ? selectedCategory : Category.Bills,
      amount: parseFloat(amount),
      createdAt: date,
    };

    const result = await dispatch(addActivity(payload));
    if (addActivity.fulfilled.match(result)) {
      router.back();
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.screenGrey }]} edges={["top"]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Income / Expense Toggle */}
        <View style={styles.typeRow}>
          {ALL_ACTIVITY_TYPES.map((type) => {
            const selected = selectedType === type;
            return (
              <TouchableOpacity
                key={type}
                style={[
                  styles.typeButton,
                  {
                    backgroundColor: selected
                      ? Palette.EmeraldGreen
                      : colors.surface,
                  },
                ]}
                onPress={() => handleTypeChange(type)}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.typeButtonText,
                    {
                      color: selected
                        ? colors.inverseOnAccent
                        : colors.textPrimary,
                    },
                  ]}
                >
                  {type === ActivityType.Income ? t("home.income") : t("home.expense")}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Form Card */}
        <View style={[styles.card, { backgroundColor: colors.surface }]}>
          <LabeledTextField
            fieldType={{ kind: "number" }}
            label={t("addTx.amount")}
            value={amount}
            onValueChange={handleAmountChange}
            prefix="Rp "
            error={errors.amount}
          />

          {selectedType === ActivityType.Expense && (
            <View style={styles.categorySection}>
              <Text style={[styles.sectionLabel, { color: colors.textPrimary }]}>
                {t("addTx.category")}
              </Text>
              <SimpleGrid
                items={ALL_CATEGORIES}
                columns={3}
                horizontalSpacing={10}
                verticalSpacing={10}
                renderItem={(category) => (
                  <RoundedItemCard
                    text={category.title}
                    icon={category.iconName}
                    isSelected={selectedCategory === category}
                    onClick={() => setSelectedCategory(category)}
                  />
                )}
              />
            </View>
          )}

          <LabeledTextField
            fieldType={{ kind: "text" }}
            label={t("addTx.name")}
            value={name}
            onValueChange={handleNameChange}
            placeHolder={t("addTx.namePlaceholder")}
            error={errors.name}
          />

          <LabeledTextField
            fieldType={{ kind: "date" }}
            label={t("addTx.date")}
            value={date}
            onValueChange={handleDateChange}
            placeHolder={t("addTx.datePlaceholder")}
            error={errors.date}
          />

          {selectedType === ActivityType.Expense && (
            <LabeledTextField
              fieldType={{ kind: "options", options: ALL_PAYMENT_METHODS }}
              label={t("addTx.paymentMethod")}
              value={paymentMethod}
              onValueChange={handlePaymentMethodChange}
              placeHolder={t("addTx.paymentPlaceholder")}
              error={errors.paymentMethod}
            />
          )}

          {!!error && (
            <View style={styles.backendError}>
              <Text style={styles.backendErrorText}>{error}</Text>
            </View>
          )}

          <TouchableOpacity
            style={[styles.submitButton, loading && styles.submitButtonDisabled]}
            onPress={handleTransaction}
            activeOpacity={0.85}
            disabled={loading}
          >
            <Text style={[styles.submitButtonText, { color: colors.inverseOnAccent }]}>
              {loading
                ? t("addTx.saving")
                : selectedType === ActivityType.Income
                  ? t("addTx.submitIncome")
                  : t("addTx.submitExpense")}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
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
    borderRadius: 15,
    padding: 20,
    gap: 20,
  },
  categorySection: {
    gap: 5,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: "600",
  },
  submitButton: {
    marginTop: 10,
    height: 56,
    borderRadius: 15,
    backgroundColor: Palette.EmeraldGreen,
    alignItems: "center",
    justifyContent: "center",
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: "600",
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