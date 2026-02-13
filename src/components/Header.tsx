"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-3xl">🍴</span>
          <span className="text-2xl font-bold tracking-tight text-gray-900 group-hover:text-green-600 transition">
            MyRecipes
          </span>
        </Link>

        {/* Button */}
        <Link
          href="/create"
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-xl font-medium shadow-md hover:shadow-lg transition-all duration-300"
        >
          + Create Recipe
        </Link>

      </div>
    </header>
  );
}
