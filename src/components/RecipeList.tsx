"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
  categorySlug: string;
};

type Recipe = {
  id: number;
  name: string;
  photo_url: string;
  description: string;
  category_id: number;
};

export default function RecipeList({ categorySlug }: Props) {
  console.log("RecipeList categorySlug:", categorySlug);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const pathname = usePathname(); 

  useEffect(() => {
    if (!categorySlug) return; // ❌ не делаем запрос без slug

    fetch(`/api/categories/${categorySlug}`)
      .then(res => res.json())
      .then(data => {
        if (!Array.isArray(data)) {
          console.error("API вернуло ошибку:", data);
          return;
        }
        setRecipes(data);
      });
  }, [categorySlug]);
  
  return (
    <div className="px-4 md:px-8 lg:px-16 py-8">
      <h1 className="text-3xl font-bold mb-8">Recipe List von {categorySlug}</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {recipes.map(recipe => (
          <Link href={`${pathname}/${recipe.id}`} key={recipe.id}>
            <div key={recipe.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">

              <img src={recipe.photo_url} alt={recipe.name} className="w-full h-48 object-cover"/>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{recipe.name}</h3>
                <p className="text-gray-600">{recipe.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
    

  )
}