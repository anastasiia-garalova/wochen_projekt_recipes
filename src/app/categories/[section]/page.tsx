import Breadcrumbs from "../../../components/Breadcrumbs";
import Header from "../../../components/Header";
import RecipeList from "../../../components/RecipeList";

export default async function Page({
  params,
}: {
  params: Promise<{ section: string }> | { section: string };
}) {

  const { section } = await params;

return (
  <main className="min-h-screen bg-gray-100">
    
    <Header />

    <div className="max-w-7xl mx-auto px-6 py-10 animate-fade-in">
      <Breadcrumbs />
      <RecipeList categorySlug={section} />
    </div>

  </main>
)


}