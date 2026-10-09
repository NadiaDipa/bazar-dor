import React from "react";

interface Market {
  market: string;
  division: string;
  min: number;
  max: number;
}

interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: string;
    pct: number;
  };
  markets: Market[];
}

const ProductDetails = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const res = await fetch(
    `https://api.abcz.workers.dev/api/bazardor/products/${id}`
  );

  if (!res.ok) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F0F5F0]">
        <div className="text-center">
          <h1 className="text-xl font-bold text-gray-800">
            পণ্য পাওয়া যায়নি
          </h1>

          <a
            href="/"
            className="text-green-700 underline mt-3 inline-block"
          >
            হোম পেজে ফিরে যান
          </a>
        </div>
      </div>
    );
  }

  const product: Product = await res.json();

  const markets = product.markets ?? [];

  const minPrice = markets.length
    ? Math.min(...markets.map((market) => market.min))
    : 0;

  const maxPrice = markets.length
    ? Math.max(...markets.map((market) => market.max))
    : 0;

  const avgPrice = markets.length
    ? markets.reduce(
        (total, market) => total + (market.min + market.max) / 2,
        0
      ) / markets.length
    : 0;

  const formatPrice = (price: number) =>
    price.toLocaleString("bn-BD", {
      maximumFractionDigits: 2,
    });

  return (
    <div className="min-h-screen py-8 bg-[#F0F5F0]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <div className="breadcrumbs text-xs mb-6 text-gray-600">
          <ul>
            <li>
              <a href="/">হোম</a>
            </li>
            <li>{product.categoryNameBn}</li>
            <li>{product.nameBn}</li>
          </ul>
        </div>

        {/* Product Summary */}
        <div className="border border-gray-200 rounded-2xl p-5 sm:p-6 bg-[#FAFCFA] flex flex-col sm:flex-row justify-between items-center gap-5 shadow-sm">
          <div className="flex items-center gap-4 w-full">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-[#F0F5F0] flex items-center justify-center shrink-0 border border-gray-200">
              <span className="text-4xl">
                {product.image || product.categoryIcon}
              </span>
            </div>

            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">
                {product.nameBn}
              </h1>

              <p className="text-xs text-gray-500 mb-2">
                প্রতি {product.unit === "kg" ? "কেজি" : product.unit} ·{" "}
                {product.categoryNameBn}
              </p>

              <p className="text-xs text-gray-600">
                গতকালের তুলনায় আজ দাম{" "}
                <span className="font-semibold">
                  {product.change.dir === "up"
                    ? "বেড়েছে"
                    : product.change.dir === "down"
                    ? "কমেছে"
                    : "অপরিবর্তিত"}
                </span>{" "}
                · {formatPrice(product.change.pct)}%
              </p>
            </div>
          </div>

          {/* Today's Price */}
          <div className="bg-[#F0F5F0] border border-gray-200 rounded-2xl p-4 text-center w-full sm:w-28 shrink-0">
            <p className="text-xs text-gray-500">আজকের দাম</p>

            <p className="text-3xl font-bold text-gray-800 my-1">
              {formatPrice(product.today)}
            </p>

            <p className="text-xs text-gray-500">
              টাকা / {product.unit === "kg" ? "কেজি" : product.unit}
            </p>

            <p
              className={`text-xs font-semibold mt-1 ${
                product.change.dir === "up"
                  ? "text-red-500"
                  : product.change.dir === "down"
                  ? "text-green-600"
                  : "text-gray-500"
              }`}
            >
              {product.change.dir === "up"
                ? "▲"
                : product.change.dir === "down"
                ? "▼"
                : "—"}{" "}
              {formatPrice(product.change.pct)}%
            </p>
          </div>
        </div>

        {/* Price Summary */}
        <div className="mt-4 border border-gray-200 rounded-2xl p-4 sm:p-5 bg-[#FAFCFA] shadow-sm">
          <h2 className="font-semibold text-sm text-gray-800 mb-3">
            দামের সারসংক্ষেপ
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Minimum Price */}
            <div className="border border-gray-200 rounded-xl p-4 bg-[#FAFCFA]">
              <p className="text-xs text-gray-500 mb-2">
                সর্বনিম্ন দাম
              </p>

              <p className="text-xl font-bold text-green-600">
                {formatPrice(minPrice)}{" "}
                <span className="text-xs font-normal">টাকা</span>
              </p>

              <p className="text-xs text-gray-500 mt-1">
                সবচেয়ে কম দামের বাজার
              </p>
            </div>

            {/* Maximum Price */}
            <div className="border border-gray-200 rounded-xl p-4 bg-[#FAFCFA]">
              <p className="text-xs text-gray-500 mb-2">
                সর্বাধিক দাম
              </p>

              <p className="text-xl font-bold text-red-500">
                {formatPrice(maxPrice)}{" "}
                <span className="text-xs font-normal">টাকা</span>
              </p>

              <p className="text-xs text-gray-500 mt-1">
                সবচেয়ে বেশি দামের বাজার
              </p>
            </div>

            {/* Average Price */}
            <div className="border border-gray-200 rounded-xl p-4 bg-[#FAFCFA]">
              <p className="text-xs text-gray-500 mb-2">
                গড় দাম
              </p>

              <p className="text-xl font-bold text-green-600">
                {formatPrice(avgPrice)}{" "}
                <span className="text-xs font-normal">টাকা</span>
              </p>

              <p className="text-xs text-gray-500 mt-1">
                বাজারগুলোর আনুমানিক গড়
              </p>
            </div>
          </div>

          {/* Market Table */}
          <h2 className="font-semibold text-sm text-gray-800 mt-5 mb-3">
            বাজারভিত্তিক আজকের দাম
          </h2>

          <div className="overflow-x-auto rounded-xl border border-gray-300 bg-[#FAFCFA]">
            <table className="table w-full text-xs border-collapse">
              <thead>
                <tr className="text-gray-600 bg-[#FAFCFA] font-medium">
                  <th className="py-3.5 px-4 text-left border-b-2 border-gray-400">
                    বাজার
                  </th>

                  <th className="py-3.5 px-4 text-left border-b-2 border-gray-400">
                    বিভাগ
                  </th>

                  <th className="py-3.5 px-4 text-left border-b-2 border-gray-400">
                    সর্বনিম্ন
                  </th>

                  <th className="py-3.5 px-4 text-left border-b-2 border-gray-400">
                    সর্বোচ্চ
                  </th>

                  <th className="py-3.5 px-4 text-right border-b-2 border-gray-400">
                    গড়
                  </th>
                </tr>
              </thead>

              <tbody>
                {markets.map((market, index) => (
                  <tr
                    key={`${market.market}-${index}`}
                    className={`transition-colors ${
                      index % 2 === 0
                        ? "bg-[#FAFCFA]"
                        : "bg-[#F0F5F0]"
                    } hover:bg-[#E8F0E8]`}
                  >
                    <td className="py-3.5 px-4 font-medium text-gray-800 border-b border-gray-400">
                      {market.market}
                    </td>

                    <td className="py-3.5 px-4 text-gray-600 border-b border-gray-400">
                      {market.division}
                    </td>

                    <td className="py-3.5 px-4 text-gray-700 border-b border-gray-400">
                      {formatPrice(market.min)} টাকা
                    </td>

                    <td className="py-3.5 px-4 text-gray-700 border-b border-gray-400">
                      {formatPrice(market.max)} টাকা
                    </td>

                    <td className="py-3.5 px-4 text-right font-semibold text-gray-900 border-b border-gray-400">
                      {formatPrice(
                        (market.min + market.max) / 2
                      )}{" "}
                      টাকা
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
