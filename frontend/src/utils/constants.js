import {
  Utensils,
  Home,
  Wallet,
  Gamepad2,
  ShoppingBag,
  Plane,
  Stethoscope,
  MoreHorizontal,
  Zap,
  GraduationCap,
} from "lucide-react";

export const CATEGORIES = {
  Food: {
    id: "Food",
    label: "Food & Dining",
    color: "#EF4444",
    icon: Utensils,
  }, // Red
  Rent: { id: "Rent", label: "Rent & Housing", color: "#F97316", icon: Home }, // Orange
  Salary: {
    id: "Salary",
    label: "Salary & Income",
    color: "#10B981",
    icon: Wallet,
  }, // Green
  Entertainment: {
    id: "Entertainment",
    label: "Entertainment",
    color: "#8B5CF6",
    icon: Gamepad2,
  }, // Purple
  Shopping: {
    id: "Shopping",
    label: "Shopping",
    color: "#EC4899",
    icon: ShoppingBag,
  }, // Pink
  Travel: { id: "Travel", label: "Travel", color: "#06B6D4", icon: Plane }, // Cyan
  Utilities: {
    id: "Utilities",
    label: "Utilities",
    color: "#EAB308",
    icon: Zap,
  }, // Yellow
  Health: {
    id: "Health",
    label: "Health & Fitness",
    color: "#14B8A6",
    icon: Stethoscope,
  }, // Teal
  Education: {
    id: "Education",
    label: "Education",
    color: "#6366F1",
    icon: GraduationCap,
  }, // Indigo
  Other: {
    id: "Other",
    label: "Other",
    color: "#64748B",
    icon: MoreHorizontal,
  }, // Slate
};

export const getCategoryColor = (categoryName) => {
  return CATEGORIES[categoryName]?.color || CATEGORIES.Other.color;
};

export const getCategoryIcon = (categoryName) => {
  return CATEGORIES[categoryName]?.icon || CATEGORIES.Other.icon;
};

export const getCategoryLabel = (categoryName) => {
  return CATEGORIES[categoryName]?.label || categoryName;
};
