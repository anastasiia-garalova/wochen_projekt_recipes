
import { categoriesSchema } from "../schemas/categorySchema";
import { connectionDB } from "./conectionDB";

export async function getCategories() {
    try {
        const connection = await connectionDB();
        const [rows] = await connection.query("SELECT * FROM category");
        return categoriesSchema.parse(rows);
    } catch (err) {
      console.error("DB query failed:", err);
      return null;
    }
}