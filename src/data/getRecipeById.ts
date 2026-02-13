import { connectionDB } from "./conectionDB";
import { RowDataPacket } from "mysql2";

export type Recipe = {
  id: number;
  name: string;
  photo_url: string;
  description: string;
  category_name: string;
  ingredients: string[];
  erroInfo: string; 
};

type RecipeRow = Recipe & RowDataPacket;

export async function getRecipe( recipeID: number) {
  const connection = await connectionDB();
  const [rows] = await connection.execute<RecipeRow[]>(`
    SELECT 
    r.id,
    r.name,
    r.photo_url,
    r.description,
    c.name AS category_name,
    i.id AS ingredient_id,
    i.name AS ingredient_name
    FROM recipes r
    JOIN category c ON r.category_id = c.id
    JOIN recipe_ingredients ri ON r.id = ri.recipe_id
    JOIN ingredients i ON ri.ingredient_id = i.id
    WHERE r.id = ?;`, [recipeID]);
    console.log("DB query result for recipeID", recipeID, rows);
  
    const recipe = {
    id: rows[0].id,
    name: rows[0].name,
    photo_url: rows[0].photo_url,
    description: rows[0].description,
    category_name: rows[0].category_name,
    ingredients: rows.map(row => row.ingredient_name),
  };

  return recipe;
}