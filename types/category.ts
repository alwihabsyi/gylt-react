import { Ionicons } from "@expo/vector-icons";

export const Category = {
  Bills: {
    title: "Bills",
    iconName: "receipt-outline" as React.ComponentProps<
      typeof Ionicons
    >["name"],
  },
  Shopping: {
    title: "Shopping",
    iconName: "bag-outline" as React.ComponentProps<typeof Ionicons>["name"],
  },
  Food: {
    title: "Food",
    iconName: "restaurant-outline" as React.ComponentProps<
      typeof Ionicons
    >["name"],
  },
  Entertainment: {
    title: "Entertainment",
    iconName: "musical-notes-outline" as React.ComponentProps<
      typeof Ionicons
    >["name"],
  },
  Others: {
    title: "Others",
    iconName: "grid-outline" as React.ComponentProps<typeof Ionicons>["name"],
  },
} as const;

export type CategoryType = (typeof Category)[keyof typeof Category];
export const ALL_CATEGORIES = Object.values(Category);
