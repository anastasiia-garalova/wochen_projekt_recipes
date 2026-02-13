"use client"
import { z } from "zod";
import { categoriesSchema } from "../schemas/categorySchema";
import { useEffect, useState } from "react";
import { ingredientsSchema } from "../schemas/ingredientSchema";
import { createNewRecipe } from "../actions/createNewRecipe";
import { useActionState } from "react";


type Props = {
  categories: z.infer<typeof categoriesSchema>; // Category[]
  ingredients: z.infer<typeof ingredientsSchema>; // Ingredient[]
};

const firstParametr = {
    ok: false,
    message: "",        
    error: null,
    fieldErrors: null,
    formData: new FormData()    
}

export function FormNewRecipe({ categories, ingredients }: Props) {

    const [actionState, formAction, isPending] = useActionState(createNewRecipe, firstParametr);


    console.log("Action State:", actionState.fieldErrors?.name);
    

    const selectedIngredients = actionState.formData
        .getAll("ingredients")
        .map(String);
    const ingredientsList = ingredients;

    const [selectedCategory, setSelectedCategory] = useState("");
    
    // HTML `required` не даёт отправить форму вообще. Поэтому валидация на стороне сервера, а ошибки отображаем в компоненте.
    return (
        <div className="max-w-4xl mx-auto px-4 py-10">
            <div className="bg-white shadow-2xl rounded-3xl p-10">

                {/* FORM */}
                <form action={formAction}  className="space-y-6">

                {/* Name */}
                <div>
                    <label className="block mb-2 font-medium">
                        <b>Recipe Name</b>
                    </label>
                    <input
                    type="text"
                    name="name"
                    defaultValue={actionState.formData.get("name")?.toString() || ""}
                    className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-green-400 outline-none"/>
                </div>
                { actionState.fieldErrors?.name && (
                    <div className="text-red-600">
                        {actionState.fieldErrors.name.map((msg, index) => (
                            <p key={index}><b>Name:</b> {msg}</p>
                        ))}
                    </div>
                ) }

                {/* Photo URL */}
                <div>
                    <label className="block mb-2 font-medium">
                        <b>Photo URL</b>
                    </label>
                    <input
                    type="url"
                    name="photo_url"
                    defaultValue={actionState.formData.get("photo_url")?.toString() || ""}
                    className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-green-400 outline-none"/>
                </div>
                { actionState.fieldErrors?.photo_url && (
                    <div className="text-red-600">
                        {actionState.fieldErrors.photo_url.map((msg, index) => (
                            <p key={index}><b>Photo URL:</b> {msg}</p>
                        ))}
                    </div>
                ) }

                {/* Category */}
                <div>
                    <label className="block mb-2 font-medium">
                        <b>Category</b>
                    </label>
                    <select
                        name="category_id"
                        defaultValue={actionState.formData.get("category_id")?.toString() ?? ""}
                        key={actionState.formData.get("category_id")?.toString() ?? ""}
                        className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-green-400 outline-none"
                        >
                        <option>Select category</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id.toString()}>
                            {category.name}
                            </option>
                        ))}
                    </select>
                </div>
                { actionState.fieldErrors?.category_id && (
                    <div className="text-red-600">
                        {actionState.fieldErrors.category_id.map((msg, index) => (
                            <p key={index}><b>Category:</b> {msg}</p>
                        ))}
                    </div>
                ) }

                {/* Description */}
                <div>
                    <label className="block mb-2 font-medium"><b>Description</b></label>
                    <textarea
                    name="description"
                    rows={4}
                    defaultValue={actionState.formData.get("description")?.toString() || ""}
                    className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-green-400 outline-none"/>
                </div>
                { actionState.fieldErrors?.description && (
                    <div className="text-red-600">
                        {actionState.fieldErrors.description.map((msg, index) => (
                            <p key={index}><b>Description:</b> {msg}</p>
                        ))}
                    </div>
                ) }

                {/* Ingredients */}
                <div>
                    <label className="block mb-4 font-medium"><b>Ingredients</b></label>

                    <div className="grid grid-cols-3 gap-4">
                    {ingredientsList.map((ingredient) => (
                        <div key={ingredient.id} className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            id={`ingredient-${ingredient.id}`}
                            name="ingredients"
                            value={ingredient.id}
                            defaultChecked={selectedIngredients.includes(
                                ingredient.id.toString()
                            )}
                        />
                        <label htmlFor={`ingredient-${ingredient.id}`}>{ingredient.name}</label>
                        </div>
                    ))}
                    </div>
                </div>
                { actionState.fieldErrors?.ingredients && (
                    <div className="text-red-600">
                        {actionState.fieldErrors.ingredients.map((msg, index) => (
                            <p key={index}><b>Ingredients:</b> {msg}</p>
                        ))}
                    </div>
                ) }

                {/* Submit */}
                <button
                    type="submit"
                    className="w-full py-3 bg-black text-white rounded-2xl font-semibold hover:opacity-90 transition"
                    disabled={isPending}>
                    Create Recipe
                </button>

                </form>
            </div>
        </div>
    )  
}