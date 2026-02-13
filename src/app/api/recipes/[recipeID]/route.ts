import { getRecipe } from "@/src/data/getRecipeById";
import { NextResponse } from "next/dist/server/web/spec-extension/response";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ recipeID: number }>}
) {
    
    const recipeID = (await params).recipeID;
    const recipe = await getRecipe(recipeID);
    return NextResponse.json(recipe);
}

