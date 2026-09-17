import { z } from 'zod'

export const formNewRecipeSchema = z.object({
    name: z
        .string()
        .min(1, { message: 'Name fehlt' })
        .max(50, {
            message: 'Name darf nicht mehr als 50 Charktere enthalten',
        }),
    photo_url: z.string()
        .min(1, { message: "Foto URL fehlt" }) 
        .url({ message: "Es muss eine gültige URL angegeben werden" }),
    category_id: z.coerce.number().min(1, {
        message: 'Gib eine Kategorie an',
    }),
    description: z.string().min(13, { message: 'Beschreibung ist zu kurz' })
        .max(500, {
            message: 'Beschreibung darf nicht mehr als 50 Charktere enthalten',
        }),
    ingredients: z.array(z.coerce.number()).min(1, {
        message: 'Wähle mindestens ein Zutat aus',
    })
})
