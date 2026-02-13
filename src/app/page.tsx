"use client";

import { useEffect, useState } from "react";
import Header from "../components/Header";

type Category = {
  id: number;
  name: string;
  slug: string;
  photo_url: string; // новое поле
};

export default function HomePage() {
  const [sections, setSections] = useState<Category[]>([]);

  useEffect(() => {
    fetch("/api/categories")
      .then(res => res.json())
      .then((data) => {
        if (!Array.isArray(data)) {
          console.error("API вернуло ошибку:", data);
          return;
        }
        const mapped = data.map((cat: Category) => ({
          id: cat.id,
          name: cat.name,
          slug: cat.slug,
          photo_url: cat.photo_url, 
        }));
        setSections(mapped);
      })
      .catch(err => console.error("Fetch error:", err));
  }, []);


  return (
    <main className="min-h-screen bg-gray-100">

      {/* Header */}
      <Header />

      {/* Page Content */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {sections.map((section) => (
            <a
              key={section.id}
              href={`/categories/${section.slug}`}
              className="group relative h-72 rounded-2xl overflow-hidden shadow-xl"
            >
              {/* Background Image */}
              <img
                src={section.photo_url}
                alt={section.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition duration-300" />

              {/* Text */}
              <div className="absolute inset-0 flex items-center justify-center">
                <h2 className="text-white text-2xl font-bold tracking-wide text-center px-4">
                  {section.name}
                </h2>
              </div>
            </a>
          ))}
        </div>

      </div>
    </main>

  );
}
