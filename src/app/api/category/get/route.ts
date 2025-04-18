import { connectDB } from "@pal/lib/mongodb";
import category from "@pal/models/category";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    await connectDB();

    const categories = await category.find();

    return NextResponse.json(categories);
  } catch (error) {
    console.error("[GET_CATEGORIES_ERROR]", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}
