import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { connectDB } from "@pal/lib/mongodb";
import Category from "@pal/models/category";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { name, emoji, color, type } = body;

    // basic validation
    if (!name || !emoji || !color || !type) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await connectDB();

    const category = await Category.create({
      userId: session.user.id,
      name,
      emoji,
      color,
      type,
    });

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error("Category create error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
