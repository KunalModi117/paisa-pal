"use client";

import { useMemo } from "react";
import { useGetBudgets } from "../budget/useGetBudgets";
import {
  Transaction,
  useGetTransactions,
} from "../transactions/useGetTransactions";
// import { Card, CardContent } from "@pal/components/ui/card";
// import { Progress } from "@pal/components/ui/progress";
import { unicodeToEmoji } from "@pal/utils/util";
import { ExpensesPieChart } from "./ExpensePieChart";
import { IncomeExpenseBarChart } from "./IncomeExpenseBarChart";

const groupExpensesByCategory = (transactions: Transaction[]) => {
  const grouped: Record<
    string,
    { name: string; value: number; color: string }
  > = {};
  transactions
    .filter((tx) => tx.type === "expense")
    .forEach((tx) => {
      const { categoryId } = tx;
      if (!grouped[categoryId._id]) {
        grouped[categoryId._id] = {
          name: `${unicodeToEmoji(categoryId.emoji)} ${categoryId.name}`,
          value: 0,
          color: categoryId.color,
        };
      }
      grouped[categoryId._id].value += tx.amount;
    });
  return Object.values(grouped);
};

export const Dashboard = () => {
  const { transactions } = useGetTransactions();
  const { budgets } = useGetBudgets();
  console.log(budgets, "budgets");
  const incomeVsExpense = useMemo(() => {
    let income = 0;
    let expense = 0;

    transactions?.forEach((tx) => {
      if (tx.type === "income") income += tx.amount;
      else expense += tx.amount;
    });

    return [
      { name: "Income", amount: income },
      { name: "Expense", amount: expense },
    ];
  }, [transactions]);

  const categoryData = useMemo(
    () => groupExpensesByCategory(transactions),
    [transactions]
  );

  return (
    <div className="grid gap-4 grid-col-1 md:grid-cols-2 p-4 w-full h-full">
      <IncomeExpenseBarChart incomeVsExpense={incomeVsExpense} />
      <ExpensesPieChart categoryData={categoryData} />

      {/* {budgets.weekly.length || budgets.monthly.length ? (
        <Card className="md:col-span-2 lg:col-span-1">
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold mb-2">Budget Progress</h2>
            <div className="space-y-4 max-h-[250px] overflow-auto pr-2">
              {[...budgets.weekly, ...budgets.monthly].map((budget) => {
                const percent = (budget.spent / budget.amount) * 100;
                return (
                  <div key={budget._id}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>
                        {unicodeToEmoji(budget.categoryId.emoji)}&nbsp;
                        {budget.categoryId.name}
                      </span>
                      <span className="text-muted-foreground">
                        ₹{budget.spent} / ₹{budget.amount}
                      </span>
                    </div>
                    <Progress value={percent} />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      ) : null} */}
    </div>
  );
};
