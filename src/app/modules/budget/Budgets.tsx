"use client";

import { PageTitle } from "@pal/components/PageTitle/PageTitle";
import { Button } from "@pal/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { TransactionCardSkeleton } from "../transactions/TransactionCardSkeleton";
import { AddBudgetDrawer } from "./AddBudgetDrawer";
import { AddCategoryDrawer } from "./AddCategoryDrawer";
import { BudgetCard } from "./BudgetCard";
import { SectionTitle } from "./SectionTitle";
import { useGetBudgets } from "./useGetBudgets";

export interface CategoryFormFields {
  type: string;
  emoji: string;
  color: string;
  name: string;
}

export const Budgets = () => {
  const [open, setOpen] = useState(false);
  const [isBudgetDrawerOpen, setIsBudgetDrawerOpen] = useState(false);
  const { budgets, isLoading } = useGetBudgets();
  const handleCategoryDrawer = () => {
    setOpen(true);
  };
  const handleAddBudgetDrawerOpen = () => {
    setIsBudgetDrawerOpen(!isBudgetDrawerOpen);
  };
  const handleDrawerOpen = () => {
    setOpen(!open);
  };
  return (
    <div className="flex flex-col w-full px-4">
      <PageTitle
        title="Budget"
        subtitle="Set monthly limits and take control of your spending."
      />
      <div className="flex flex-col gap-1 mt-4">
        {budgets.weekly.length > 0 && (
          <SectionTitle title="Weekly" daysLeft={2} budgeted={193} left={115} />
        )}
        {budgets.weekly.map(
          ({ _id, left, amount, categoryId: { name, color, emoji } }) => (
            <BudgetCard
              budgeted={amount}
              color={color}
              left={left}
              emoji={emoji}
              label={name}
              key={_id}
            />
          )
        )}
        {budgets.monthly.length > 0 && (
          <SectionTitle
            title="Monthly"
            daysLeft={2}
            budgeted={193}
            left={115}
          />
        )}
        {budgets.monthly.map(
          ({ _id, left, amount, categoryId: { name, color, emoji } }) => (
            <BudgetCard
              budgeted={amount}
              color={color}
              left={left}
              emoji={emoji}
              label={name}
              key={_id}
            />
          )
        )}
        {isLoading && <TransactionCardSkeleton />}
      </div>
      <Button
        variant="mutedDashed"
        className="w-full"
        onClick={handleCategoryDrawer}
      >
        Add new category
      </Button>
      <Button
        onClick={handleAddBudgetDrawerOpen}
        variant="default"
        className="rounded-full !px-3 !py-3 h-fit fixed bottom-20 md:bottom-10 right-5"
      >
        <Plus className="!w-6 !h-6 text-white" />
      </Button>
      <AddCategoryDrawer handleDrawerOpen={handleDrawerOpen} open={open} />
      <AddBudgetDrawer
        open={isBudgetDrawerOpen}
        handleOpen={handleAddBudgetDrawerOpen}
      />
    </div>
  );
};
