import { z } from "zod";

export const CategorySchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  photo_url: z.string(),
});

export const categoriesSchema = z.array(CategorySchema);
