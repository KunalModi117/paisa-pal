"use client";

import { PageTitle } from "@pal/components/PageTitle/PageTitle";
import { Button } from "@pal/components/ui/button";
import { useState } from "react";
import { Plus } from "lucide-react";
import { AddCategoryDrawer } from "./AddCategoryDrawer";
import { AddBudgetDrawer } from "./AddBudgetDrawer";

export interface CategoryFormFields {
  type: string;
  emoji: string;
  color: string;
  name: string;
}

export const Budgets = () => {
  const [open, setOpen] = useState(false);
  const [isBudgetDrawerOpen, setIsBudgetDrawerOpen] = useState(false);
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
