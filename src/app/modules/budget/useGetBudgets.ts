import { useEffect, useState } from "react";

type Budget = {
  _id: string;
  amount: number;
  frequency: "weekly" | "monthly";
  startDate: string;
  categoryId: {
    _id: string;
    name: string;
    emoji: string;
    color: string;
    type: string;
  };
  spent: number;
  left: number;
};

type GroupedBudgets = {
  weekly: Budget[];
  monthly: Budget[];
};

export const useGetBudgets = () => {
  const [budgets, setBudgets] = useState<GroupedBudgets>({
    weekly: [],
    monthly: [],
  });
  const [isLoading, setIsLoading] = useState(false);

  const getBudgets = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/budget/get");
      const data = await res.json();

      const grouped: GroupedBudgets = {
        weekly: [],
        monthly: [],
      };

      data.forEach((budget: Budget) => {
        grouped[budget.frequency].push(budget);
      });

      setBudgets(grouped);
    } catch (err) {
      console.error("Failed to fetch budgets", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getBudgets();
  }, []);

  return {
    budgets,
    isLoading,
    refetch: getBudgets,
  };
};
