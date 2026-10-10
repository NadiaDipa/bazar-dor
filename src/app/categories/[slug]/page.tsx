"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Product {
  id: number;
  nameBn: string;
  unit: string;
  image: string;
  today: number;
  categoryNameBn?: string;
  categoryIcon?: string;
  change: {
    dir: string;
    pct: number;
  };
}

const banglaUnit = (unit: string) => {
  if (unit === "kg") return "কেজি";
  if (unit === "litre") return "লিটার";
  if (unit === "dozen") return "ডজন";
  if (unit === "piece") return "পিস";
  return unit;
};

const CategoryDetails = () => {
  const params = useParams();
  const slug = params.slug as string;

  const [products, setProducts] = useState<Product[]>([]);
  const [sortOrder, setSortOrder] = useState("default");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `https://api.abcz.workers.dev/api/bazardor/products?category=${slug}`
        );

        if (!res.ok) {
          throw new Error("Products could not be loaded");
        }

        const data: Product[] = await res.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      getProducts();
    }
  }, [slug]);

  // if-else দিয়ে সোর্টিং লজিক
  const sortedProducts = [...products].sort((a, b) => {
    if (sortOrder === "low-to-high") {
      return Number(a.today) - Number(b.today);
    } else if (sortOrder === "high-to-low") {
      return Number(b.today) - Number(a.today);
    } else {
      return 0;
    }
  });

  const categoryNameBn = products[0]?.categoryNameBn || slug;
  const categoryIcon = products[0]?.categoryIcon || "🛒";

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F0F5F0] flex items-center justify-center">
        <p className="text-gray-600">পণ্যের তথ্য লোড হচ্ছে...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F0F5F0] py-6 sm:py-8">
      <main className="max-w-6xl mx-auto px-4">
        {/* Category Header */}
        <section className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 sm:p-5 shadow-sm">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-50 text-2xl sm:h-14 sm:w-14 sm:text-3xl">
            {categoryIcon}
          </div>

          <div>
            <h1 className="text-xl font-bold text-gray-800 sm:text-2xl">
              {categoryNameBn}
            </h1>

            <p className="mt-1 text-xs text-gray-500">
              প্রতিটি পণ্যের আজকের দাম ও পরিবর্তন
            </p>
          </div>
        </section>

        {/* Sort Section */}
        <section className="mt-4 mb-3 flex items-center justify-between gap-2 rounded-xl border border-gray-200 bg-white px-3 py-3 sm:px-4 shadow-sm">
          <p className="text-xs text-gray-500 sm:text-sm">
            মোট {products.length.toLocaleString("bn-BD")}টি পণ্য দেখানো হচ্ছে
          </p>

          <div className="flex shrink-0 items-center gap-2">
            <label htmlFor="sort" className="text-xs text-gray-600 sm:text-sm">
              সাজান
            </label>

            <select
              id="sort"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="max-w-36 rounded-lg border border-gray-300 bg-white px-2 py-2 text-xs sm:max-w-none sm:text-sm outline-none focus:border-green-600 cursor-pointer"
            >
              <option value="default">ডিফল্ট</option>
              <option value="low-to-high">দাম কম থেকে বেশি</option>
              <option value="high-to-low">দাম বেশি থেকে কম</option>
            </select>
          </div>
        </section>

        {/* Products Grid */}
        <section className="grid grid-cols-1 items-stretch gap-3 sm:grid-cols-2 md:grid-cols-3">
          {sortedProducts.map((product) => (
            <Link
              href={`/product/${product.id}`}
              key={product.id}
              className="flex h-30 w-full flex-col justify-between rounded-xl border border-gray-200 bg-white p-3 sm:p-4 hover:shadow-md transition-shadow"
            >
              {/* Product Info */}
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-50 text-xl sm:h-11 sm:w-11">
                  {product.image}
                </div>

                <div className="min-w-0">
                  <h2 className="wrap-break text-sm font-bold leading-snug text-gray-800 sm:text-base">
                    {product.nameBn}
                  </h2>

                  <p className="mt-1 text-xs text-gray-500">
                    প্রতি {banglaUnit(product.unit)}
                  </p>
                </div>
              </div>

              {/* Price and Change */}
              <div className="flex items-end justify-between gap-2">
                <div>
                  <span className="mb-1 block text-xs text-gray-500">
                    আজকের দাম
                  </span>

                  <p className="font-bold leading-tight text-gray-900">
                    <span className="text-lg sm:text-xl">
                      {Number(product.today).toLocaleString("bn-BD")}
                    </span>{" "}
                    <span className="text-xs font-normal text-gray-600">
                      টাকা
                    </span>
                  </p>
                </div>

                {product.change?.dir === "up" ? (
                  <span className="shrink-0 rounded-full bg-red-50 px-2 py-1 text-[10px] font-bold text-red-600 sm:text-xs">
                    ▲{" "}
                    {Math.abs(
                      product.change.pct ? product.change.pct : 0
                    ).toLocaleString("bn-BD")}
                    %
                  </span>
                ) : product.change?.dir === "down" ? (
                  <span className="shrink-0 rounded-full bg-green-50 px-2 py-1 text-[10px] font-bold text-green-700 sm:text-xs">
                    ▼{" "}
                    {Math.abs(
                      product.change.pct ? product.change.pct : 0
                    ).toLocaleString("bn-BD")}
                    %
                  </span>
                ) : (
                  <span className="shrink-0 rounded-full bg-gray-100 px-2 py-1 text-[10px] font-bold text-gray-500 sm:text-xs">
                    —{" "}
                    {Math.abs(
                      product.change && product.change.pct
                        ? product.change.pct
                        : 0
                    ).toLocaleString("bn-BD")}
                    %
                  </span>
                )}
              </div>
            </Link>
          ))}
        </section>
      </main>
    </div>
  );
};

export default CategoryDetails;