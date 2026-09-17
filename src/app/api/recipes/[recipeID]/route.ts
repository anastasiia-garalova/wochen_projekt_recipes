import { getRecipe } from "@/src/data/getRecipeById";
import { NextResponse } from "next/dist/server/web/spec-extension/response";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ recipeID: string }> }
) {
    const recipeIDStr = (await params).recipeID;
    const recipeIDNum = Number(recipeIDStr);
    const recipe = await getRecipe(recipeIDNum);
    return NextResponse.json(recipe);
}

