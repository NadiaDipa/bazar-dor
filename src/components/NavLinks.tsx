"use client";

import { useEffect, useState } from "react";
import NavActiveItem from "./NavActiveItem";

interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

export default function NavLinks() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.abcz.workers.dev/api/bazardor/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Categories fetch error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="pl-10 mt-5 text-sm text-gray-500">লোড হচ্ছে...</div>;
  }

  return (
    <div className="flex items-center gap-4 pl-10 mt-5 overflow-x-auto py-2">
      {categories?.map((category) => (
        <div key={category.id}>
          <NavActiveItem
            slug={category.slug}
            nameBn={category.nameBn}
            icon={category.icon}
          />
        </div>
      ))}
    </div>
  );
}