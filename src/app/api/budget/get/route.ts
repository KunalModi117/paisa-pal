import { getServerSession } from "next-auth";
import { connectDB } from "@pal/lib/mongodb";
import Budget from "@pal/models/budget";
import Transaction from "@pal/models/transaction";
import { NextResponse } from "next/server";
import { startOfWeek, endOfWeek, startOfMonth, endOfMonth } from "date-fns";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET() {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const budgets = await Budget.find({ userId: session.user.id }).lean();

    const budgetData = await Promise.all(
      budgets.map(async (budget) => {
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
          date: { $gte: dateRangeStart, $lte: dateRangeEnd },
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
