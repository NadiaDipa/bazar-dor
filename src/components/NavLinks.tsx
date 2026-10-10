"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

export default function NavLinks() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const pathname = usePathname();

  useEffect(() => {
    fetch("https://api.abcz.workers.dev/api/bazardor/categories")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Categories fetch failed");
        }
        return res.json();
      })
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.error("Categories fetch error:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="pl-4 mt-3 text-sm text-gray-500">
        লোড হচ্ছে...
      </div>
    );
  }

  return (
    // Ekhane flex-wrap add kora hoyeche jate sobji-r porer item gulo niche vene chole ashe
    <div className="flex flex-wrap items-center gap-2.5 px-4 mt-3 py-2">
      {categories.map((category) => {
        const isActive =
          pathname === `/categories/${category.slug}` ||
          pathname.startsWith(`/categories/${category.slug}/`);

        return (
          <div key={category.id}>
            <Link
              href={`/categories/${category.slug}`}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all whitespace-nowrap text-sm font-medium ${
                isActive
                  ? "bg-green-700 text-white shadow-sm"
                  : "text-gray-700 bg-gray-50 hover:bg-green-50 hover:text-green-700 border border-gray-100"
              }`}
            >
              <span>{category.icon}</span>
              <span>{category.nameBn}</span>
            </Link>
          </div>
        );
      })}
    </div>
  );
}