
import { ingredientsSchema } from "../schemas/ingredientSchema";
import { connectionDB } from "./conectionDB";

export async function getIngredients() {
    try {
        const connection = await connectionDB();
        const [rows] = await connection.query("SELECT * FROM ingredients");
        return ingredientsSchema.parse(rows);
    } catch (err) {
        console.error("DB query failed:", err);
        return null;
    }
}