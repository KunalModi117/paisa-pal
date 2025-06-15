"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@pal/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@pal/components/ui/chart";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

type IncomeVsExpense = {
  name: string;
  amount: number;
  color?: string; // Optional if you want to color individual bars
};

type Props = {
  incomeVsExpense: IncomeVsExpense[];
};

export function IncomeExpenseBarChart({ incomeVsExpense }: Props) {
  const chartConfig = {
    amount: {
      label: "Amount",
      color: "var(--chart-1)",
    },
  };

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>Income vs Expense</CardTitle>
        <CardDescription>This month</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer>
            <BarChart data={incomeVsExpense}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="name"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <YAxis />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar
                dataKey="amount"
                fill="var(--chart-1)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
