import { FormNewRecipe } from "@/src/components/FormNewRecipe";
import Header from "@/src/components/Header";
import { getCategories } from "@/src/data/getCategories";
import { getIngredients } from "@/src/data/getIngredients";


export default async function CreateRecipePage() {

    const categories= await getCategories();
    const ingredients = await getIngredients();
    
    return (
        <main className="min-h-screen bg-gray-100">
            <Header />
            <h1 className="text-3xl font-bold text-center py-10">Create a New Recipe</h1>
            {categories && ingredients ? (
                <FormNewRecipe categories={categories} ingredients = {ingredients} />
            ) : (
                <p className="text-center text-red-500">Failed to load categories or ingredients. Please try again later.</p>
            )}
        </main>
    );
}