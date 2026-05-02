import { GoalInterval, GoalType } from "@/types/goal";
import { parseFormattedDate } from "./formatter";

export type GoalFormFields = {
    name: string;
    currentAmount: string;
    targetAmount: string;
    intervalType: GoalInterval;
    goalType: GoalType;
    targetDate: string;
};

export type GoalFormErrors = Partial<Record<keyof Omit<GoalFormFields, "intervalType" | "goalType">, string>>;

export function validateGoalForm(fields: GoalFormFields): GoalFormErrors {
    const errors: GoalFormErrors = {};
    const { name, currentAmount, targetAmount, targetDate } = fields;

    if (!name.trim()) {
        errors.name = "Goal name is required.";
    }

    // currentAmount is optional (defaults to 0), but must be valid if provided
    if (currentAmount.trim()) {
        const parsedCurrent = parseFloat(currentAmount.replace(/,/g, "."));
        if (isNaN(parsedCurrent) || parsedCurrent < 0) {
            errors.currentAmount = "Current amount must be a non-negative number.";
        }
    }

    if (!targetAmount.trim()) {
        errors.targetAmount = "Target amount is required.";
    } else {
        const parsedTarget = parseFloat(targetAmount.replace(/,/g, "."));
        if (isNaN(parsedTarget) || parsedTarget <= 0) {
            errors.targetAmount = "Target amount must be a positive number.";
        } else if (currentAmount.trim()) {
            const parsedCurrent = parseFloat(currentAmount.replace(/,/g, "."));
            if (!isNaN(parsedCurrent) && parsedCurrent >= parsedTarget) {
                errors.currentAmount =
                    "Current amount must be less than the target amount.";
            }
        }
    }

    if (!targetDate.trim()) {
        errors.targetDate = "Target date is required.";
    } else {
        const parsed = parseFormattedDate(targetDate);
        if (!parsed) {
            errors.targetDate = "Please enter a valid date.";
        } else if (parsed <= new Date()) {
            errors.targetDate = "Target date must be in the future.";
        }
    }

    return errors;
}

export function hasGoalErrors(errors: GoalFormErrors): boolean {
    return Object.keys(errors).length > 0;
}