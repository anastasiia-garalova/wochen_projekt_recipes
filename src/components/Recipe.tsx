"use client"

import { useEffect, useState } from "react";
import { type Recipe } from "../data/getRecipeById";


export default function Recipe({ recipeID}: {  recipeID: number }) {
    const [recipe, setRecipe] = useState<Recipe | null>(null);

        console.log("Recipe component props:", { recipeID });

    useEffect(() => {
        if (!recipeID) return; // защита от undefined

        fetch(`/api/recipes/${recipeID}`)
            .then(res => res.json())
            .then(data => setRecipe(data))
            .catch(err => console.error(err));
    }, [recipeID]);

    return (
      <div className="max-w-5xl mx-auto px-4 py-10">
        {recipe ? (
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">

            {/* Hero Section */}
            <div className="relative h-[400px] w-full">
              <img
                src={recipe.photo_url}
                alt={recipe.name}
                className="w-full h-full object-cover transition duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40" />

              <div className="absolute bottom-8 left-8 text-white">
                <h1 className="text-4xl md:text-5xl font-bold drop-shadow-lg">
                  {recipe.name}
                </h1>
                <p className="mt-2 text-lg opacity-90">
                  {recipe.category_name}
                </p>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-8 md:p-12 grid md:grid-cols-3 gap-10">

              {/* Description */}
              <div className="md:col-span-2">
                <h2 className="text-2xl font-semibold mb-4">
                  About this recipe
                </h2>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {recipe.description}
                </p>
              </div>

              {/* Ingredients Card */}
              <div className="bg-gray-50 rounded-2xl p-6 shadow-inner">
                <h3 className="text-xl font-semibold mb-4">
                  Ingredients
                </h3>

                <ul className="space-y-3">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-3 text-gray-700"
                    >
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      {ingredient}
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        ) : (
          <div className="text-center py-20 text-gray-500 text-lg">
            Loading recipe...
          </div>
        )}
      </div>
    );

}