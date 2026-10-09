"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavActiveItemProps {
  slug: string;
  nameBn: string;
  icon: string;
}

const NavActiveItem = ({ slug, nameBn, icon }: NavActiveItemProps) => {
  const pathname = usePathname();
  const isActive = pathname === `/categories/${slug}`;

  return (
    <Link
      className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all whitespace-nowrap text-sm font-medium ${
        isActive
          ? "bg-green-700 text-white shadow-sm"
          : "text-gray-700 bg-gray-50 hover:bg-green-50 hover:text-green-700 border border-gray-100"
      }`}
      href={`/categories/${slug}`}
    >
      <span>{icon}</span>
      <span>{nameBn}</span>
    </Link>
  );
};

export default NavActiveItem;