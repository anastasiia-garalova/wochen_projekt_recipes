import Breadcrumbs from "@/src/components/Breadcrumbs";
import Header from "@/src/components/Header";
import Recipe from "@/src/components/Recipe";

export default async function RecipePage({
    params,
}: {
    params: { id: string }
}) {
    
    const recipeID = Number((await params).id);

return (
  <main className="min-h-screen bg-gray-100">

    <Header />

    <div className="max-w-7xl mx-auto px-6 py-10 animate-fade-in">
      <Breadcrumbs />
      <Recipe recipeID={recipeID} />
    </div>

  </main>
);

}