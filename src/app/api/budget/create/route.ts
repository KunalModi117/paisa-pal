import { authOptions } from "@pal/lib/authOptions";
import { connectDB } from "@pal/lib/mongodb";
import Budget from "@pal/models/budget";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const body = await req.json();
    const { categoryId, amount, frequency, startDate } = body;

    if (!categoryId || !amount || !frequency || !startDate) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const newBudget = await Budget.create({
      userId: session.user.id,
      categoryId,
      amount,
      frequency,
      startDate: new Date(startDate), // ensure it's a valid Date
    });

    return NextResponse.json(newBudget, { status: 201 });
  } catch (error) {
    console.error("[CREATE_BUDGET_ERROR]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
