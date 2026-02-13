"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Breadcrumbs() {
  const pathname = usePathname(); // /category/desert
  const segments = pathname.split("/").filter(Boolean);

return (
  <div className="px-4 md:px-8 lg:px-16 py-2">
    <nav className="text-sm text-gray-500 flex flex-wrap items-center gap-1">
      
      {/* Home link */}
      <Link href="/" className="hover:text-gray-700 hover:underline transition-colors">
        Home
      </Link>

      {/* Breadcrumb segments */}
      {segments.map((segment, index) => {

        if (segment === "categories") {
          return;
        }

        if ((Number(segment))) {
          return;
        }
        const href = "/" + segments.slice(0, index + 1).join("/");

        return (
          <span key={href} className="flex items-center gap-1">
            <span className="text-gray-400">/</span>
            <Link
              href={href}
              className="hover:text-gray-700 hover:underline capitalize transition-colors"
            >
              {decodeURIComponent(segment)}
            </Link>
          </span>
        );
      })}

    </nav>
  </div>
);

  
}
