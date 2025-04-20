import { useState } from "react";
import { BudgetFormFields } from "./AddBudgetDrawer";

export const usePostBudget = () => {
  const [isLoading, setIsLoading] = useState(false);

  const postBudget = async (data: BudgetFormFields) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/budget/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result?.error || "Something went wrong");
      }

      return result;
    } catch (err) {
      console.error("[POST_BUDGET_ERROR]", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    postBudget,
  };
};
