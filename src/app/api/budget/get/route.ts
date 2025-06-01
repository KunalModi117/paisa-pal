import { getServerSession } from "next-auth";
import { connectDB } from "@pal/lib/mongodb";
import "@pal/models/category";
import Budget from "@pal/models/budget";
import Transaction from "@pal/models/transaction";
import { NextResponse } from "next/server";
import { startOfWeek, endOfWeek, startOfMonth, endOfMonth } from "date-fns";
import { authOptions } from "../../auth/[...nextauth]/route";

function isBudgetActive(startDate: Date, frequency: "weekly" | "monthly") {
  const now = new Date();
  const expiryDate = new Date(startDate);

  if (frequency === "weekly") {
    expiryDate.setDate(expiryDate.getDate() + 7);
  } else {
    expiryDate.setMonth(expiryDate.getMonth() + 1);
  }

  return now <= expiryDate;
}

export async function GET() {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const budgets = await Budget.find({ userId: session.user.id })
      .populate("categoryId")
      .lean();

    const activeBudgets = budgets.filter((budget) =>
      isBudgetActive(budget.startDate, budget.frequency)
    );

    const budgetData = await Promise.all(
      activeBudgets.map(async (budget) => {
        let dateRangeStart, dateRangeEnd;

        if (budget.frequency === "weekly") {
          dateRangeStart = startOfWeek(new Date());
          dateRangeEnd = endOfWeek(new Date());
        } else {
          dateRangeStart = startOfMonth(new Date());
          dateRangeEnd = endOfMonth(new Date());
        }

        const transactions = await Transaction.find({
          userId: session.user.id,
          categoryId: budget.categoryId,
          createdAt: { $gte: dateRangeStart, $lte: dateRangeEnd },
        });

        const spent = transactions.reduce((acc, tx) => acc + tx.amount, 0);
        const left = budget.amount - spent;

        return {
          ...budget,
          spent,
          left,
        };
      })
    );

    return NextResponse.json(budgetData);
  } catch (error) {
    console.error("[GET_BUDGETS_WITH_SPENT_ERROR]", error);
    return NextResponse.json(
      { error: "Failed to fetch budgets" },
      { status: 500 }
    );
  }
}
