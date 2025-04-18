import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { connectDB } from "@pal/lib/mongodb";
import transaction from "@pal/models/transaction";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { amount, categoryId, createdAt, title, type } = body;

    if (!amount || !categoryId || !createdAt || !type) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    await connectDB();

    const newTransaction = await transaction.create({
      userId: session.user.id,
      amount,
      categoryId,
      createdAt: new Date(createdAt),
      title,
      type,
    });

    return NextResponse.json(newTransaction, { status: 201 });
  } catch (err) {
    console.error("[TRANSACTION_POST_ERROR]", err);
    return NextResponse.json(
      { error: "Failed to add transaction" },
      { status: 500 }
    );
  }
}
