"use server"

import { ResultSetHeader, RowDataPacket } from "mysql2/promise"
import { connectionDB } from "../data/conectionDB"
import { formNewRecipeSchema } from "../schemas/formNewRecipeSchema"
import { redirect } from "next/navigation"

export type NewRecipeData = {
    name: string;
    photo_url: string;  
    category_id: number;
    description: string;
    ingredients: number[]; // <- числа
}

export type ActionState = {
    ok: boolean;
    message: string;
    error: string | null;
    fieldErrors: Record<string, string[]> | null;
    formData: FormData;
}

export async function createNewRecipe( prev: ActionState, formData: FormData) {

    const actionState: ActionState = {
        ok: true,
        message: "Recipe successfully saved!",
        error: null,
        fieldErrors:  null,
        formData: formData
    }

    const data = {
        name: formData.get("name"),
        photo_url: formData.get("photo_url"),
        category_id: Number(formData.get("category_id") || 0),
        description: formData.get("description"),
        ingredients: formData.getAll("ingredients"),
    }

    const parsed = formNewRecipeSchema.safeParse(data)

    if (!parsed.success) {
        const errorMessages = parsed.error.flatten().fieldErrors;
        console.log("Validation Errors:", errorMessages);

        return {
            ...actionState,
            ok: false,
            error: "Invalid form data",
            fieldErrors: errorMessages 
        }
    }

    const validData = parsed.data
    let recipeId: number;
    let categorySlug = "unknown";

    //DB Connection
    const connection = await connectionDB()

    // recipes
    try {
        const [recipeResult] = await connection.execute<ResultSetHeader>(
            `INSERT INTO recipes (name, photo_url, description, category_id)
            VALUES (?, ?, ?, ?)`,
            [
                validData.name,
                validData.photo_url,
                validData.description,
                validData.category_id
            ]
        )

        recipeId = recipeResult.insertId

        // recipe_ingredients
        for (const ingredientId of validData.ingredients) {
            await connection.execute(
                    `INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
                    VALUES (?, ?)`,
                    [recipeId, ingredientId]
                )
        }

        type CategoryRow = RowDataPacket & { slug: string };

        const [categoryRows] = await connection.execute<CategoryRow[]>(
            `SELECT slug FROM category WHERE id = ?`,
            [validData.category_id]
        );

        categorySlug = categoryRows[0]?.slug ?? "unknown";

        console.log("Recipe successfully saved!")

    } catch (error) {
        console.error("DB Error:", error)

        const isMysqlError = (err: unknown): err is { code: string } => {
            return typeof err === "object" && err !== null && "code" in err;
        }

        if (isMysqlError(error) && error.code === "ER_DUP_ENTRY") {
            return {
                ...actionState,
                ok: false,
                error: null,
                fieldErrors: {
                    name: ["Ein Rezept mit diesem Namen existiert bereits"]
                }
            };
        }

        return {
            ...actionState,
            ok: false,
            error: error instanceof Error ? error.message : "An unknown error occurred"
        }
    } finally {
        await connection.end()
    }

    if (actionState.ok) {
       redirect(`/categories/${categorySlug}/${recipeId}`);
    }
    return actionState;
}