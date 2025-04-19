import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { connectDB } from "@pal/lib/mongodb";
import transaction from "@pal/models/transaction";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = 10;
    const skip = (page - 1) * limit;

    const userId = session.user.id;

    const totalTransactions = await transaction.countDocuments({ userId });
    const transactions = await transaction
      .find({ userId })
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit)
      .populate("categoryId", "name emoji color type");

    const totalPages = Math.ceil(totalTransactions / limit);
    const hasNextPage = page < totalPages;

    return NextResponse.json({
      data: transactions,
      page,
      limit,
      hasNextPage,
      totalPages,
    });
  } catch (error) {
    console.error("[GET_TRANSACTIONS_ERROR]", error);
    return NextResponse.json(
      { error: "Failed to fetch transactions" },
      { status: 500 }
    );
  }
}
