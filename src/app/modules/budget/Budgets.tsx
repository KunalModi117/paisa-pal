"use client";

import { Drawer } from "@pal/components/Drawer/Drawer";
import { PageTitle } from "@pal/components/PageTitle/PageTitle";
import { SelectField } from "@pal/components/SelectField";
import { Button } from "@pal/components/ui/button";
import { useReactHookForm } from "@pal/hooks/useReactHookForm";
import { useState } from "react";
import { InputField } from "@pal/components/InputField";
import { ColorSwatchField } from "@pal/components/ColorSwatchField";
import { toast } from "sonner";
import { addCategorySchema } from "./addCategorySchema";
import { usePostCategory } from "./usePostCategory";
import { unicodeToEmoji } from "@pal/utils/util";

export const emojiOptions = [
  { label: "🍽️", value: "U+1F37D U+FE0F" }, // Food & Dining
  { label: "🛒", value: "U+1F6D2" }, // Groceries
  { label: "🏠", value: "U+1F3E0" }, // Rent
  { label: "🧾", value: "U+1F9FE" }, // EMI / Loans
  { label: "🚗", value: "U+1F697" }, // Transport
  { label: "💡", value: "U+1F4A1" }, // Utilities
  { label: "📱", value: "U+1F4F1" }, // Mobile & Internet
  { label: "🎮", value: "U+1F3AE" }, // Entertainment
  { label: "☕", value: "U+2615" }, // Cafes / Snacks
  { label: "🧍‍♂️", value: "U+1F9CD" }, // Personal Care
  { label: "💊", value: "U+1F48A" }, // Health / Medicine
  { label: "🎁", value: "U+1F381" }, // Gifts & Donations
  { label: "🛠️", value: "U+1F6E0 U+FE0F" }, // Repairs & Maintenance
  { label: "✈️", value: "U+2708 U+FE0F" }, // Travel
  { label: "🎓", value: "U+1F393" }, // Education
  { label: "🐶", value: "U+1F436" }, // Pets
  { label: "💼", value: "U+1F4BC" }, // Work / Business
  { label: "🧳", value: "U+1F9F3" }, // Luggage / Trips
  { label: "🏥", value: "U+1F3E5" }, // Emergency / Hospital
];

const budgetTypeOptions = [
  { label: "Income", value: "income" },
  { label: "Expense", value: "expense" },
];

export interface CategoryFormFields {
  type: string;
  emoji: string;
  color: string;
  name: string;
}

export const Budgets = () => {
  const [open, setOpen] = useState(false);
  const { control, handleSubmit, values, errors } =
    useReactHookForm(addCategorySchema);
  const { postCategoryData, isLoading } = usePostCategory();
  const handleDrawerOpen = () => {
    setOpen(!open);
  };
  const handleCategoryDrawer = () => {
    setOpen(true);
  };

  const onFormSubmit = (data: CategoryFormFields) => {
    postCategoryData(data).then(() => {
      toast.success("Category created successfully");
      setOpen(false);
    });
  };
  const color = values.color;
  const emoji = values.emoji;

  return (
    <div className="flex flex-col w-full px-4">
      <PageTitle
        title="Budget"
        subtitle="Set monthly limits and take control of your spending."
      />
      <Button
        variant="mutedDashed"
        className="w-full"
        onClick={handleCategoryDrawer}
      >
        Add new category
      </Button>
      <Drawer open={open} onOpenChange={handleDrawerOpen} title="Add Category">
        <form
          className="flex flex-col gap-4 max-w-sm mx-auto"
          onSubmit={handleSubmit(onFormSubmit)}
        >
          {color && emoji ? (
            <div className="flex justify-center">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-medium shadow"
                style={{ backgroundColor: color }}
              >
                {unicodeToEmoji(emoji)}
              </div>
            </div>
          ) : null}
          <SelectField
            name="emoji"
            control={control}
            options={emojiOptions}
            message={errors.emoji?.message}
            placeholder="Select an emoji"
          />
          <ColorSwatchField
            control={control}
            name="color"
            message={errors.color?.message}
          />
          <InputField
            name="name"
            control={control}
            message={errors.name?.message}
            placeholder="Enter category name"
          />
          <SelectField
            name="type"
            control={control}
            options={budgetTypeOptions}
            message={errors.type?.message}
            placeholder="Select type of category (Income/Expense)"
          />
          <Button variant="default" isLoading={isLoading}>
            Submit
          </Button>
        </form>
      </Drawer>
    </div>
  );
};
