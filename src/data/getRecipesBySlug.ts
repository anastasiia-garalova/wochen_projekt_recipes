import { connectionDB } from "./conectionDB";

export async function getRecipesBySlug(slug: string) {
    const connection = await connectionDB();
    const [rows] = await connection.execute(
        "SELECT r.id, r.name, r.photo_url,r.description, c.name AS category_name FROM recipes r JOIN category c ON r.category_id = c.id WHERE c.slug = ?",
        [slug]
    );
    return rows;
}
