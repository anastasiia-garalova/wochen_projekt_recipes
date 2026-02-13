import { NextResponse } from "next/server";
import { getRecipesBySlug } from "@/src/data/getRecipesBySlug";


export async function GET(
  request: Request,
  { params }: { params: Promise<{ categorySlug: string }> }
) {

  const categorySlug = (await params).categorySlug;
  const recipes = await getRecipesBySlug(categorySlug);
  console.log("Recipes for categorySlug:", categorySlug, recipes);
  return NextResponse.json(recipes);
}
