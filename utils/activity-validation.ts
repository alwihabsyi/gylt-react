import { ActivityType } from "@/types/activity";
import { parseFormattedDate } from "./formatter";

export type FormFields = {
  amount: string;
  name: string;
  date: string;
  paymentMethod: string;
  type: ActivityType;
};

export type FormErrors = Partial<Record<keyof Omit<FormFields, "type">, string>>;

export function validateActivityForm(fields: FormFields): FormErrors {
  const errors: FormErrors = {};
  const { amount, name, date, paymentMethod, type } = fields;

  if (!amount.trim()) {
    errors.amount = "Amount is required.";
  } else {
    const parsed = parseFloat(amount.replace(/,/g, "."));
    if (isNaN(parsed) || parsed <= 0) {
      errors.amount = "Amount must be a positive number.";
    }
  }

  if (!name.trim()) {
    errors.name = "Name is required.";
  }

  if (!date.trim()) {
    errors.date = "Date is required.";
  } else if (!parseFormattedDate(date)) {
    errors.date = "Please enter a valid date.";
  }

  // Payment method: only required for expenses
  if (type === ActivityType.Expense && !paymentMethod.trim()) {
    errors.paymentMethod = "Payment method is required for expenses.";
  }

  return errors;
}

export function hasErrors(errors: FormErrors): boolean {
  return Object.keys(errors).length > 0;
}