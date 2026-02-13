import { z } from "zod";

export const IngredientSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const ingredientsSchema = z.array(IngredientSchema);