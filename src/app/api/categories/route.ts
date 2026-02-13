import { NextResponse } from "next/server";
import { getCategories } from "../../../data/getCategories";

export async function GET() {
  try {
    const categories = await getCategories();
    return NextResponse.json(categories ?? []);
  } catch (err) {
    console.error("API categories error:", err);
    return NextResponse.json([], { status: 500 });
  }
}
