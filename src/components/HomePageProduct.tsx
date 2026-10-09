import React from "react";

interface Product {
  id: number;
  nameBn: string;
  unit: string;
  image: string;
  today: number;
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

const HomePageProduct = async () => {
  const res = await fetch("https://api.abcz.workers.dev/api/bazardor/products");
  const data: Product[] = await res.json();
  // console.log(data);

  // increased products
  const increasedProducts = data
    .filter((item: any) => item.change?.dir === "up")
    .sort((a: any, b: any) => b.change.pct - a.change.pct)
    .slice(0, 6);

  // decreased products
  const decreasedProducts = data
    .filter((item: any) => item.change?.dir === "down")
    .sort((a: any, b: any) => Math.abs(b.change.pct) - Math.abs(a.change.pct))
    .slice(0, 6);

  return (
    <div className="max-w-6xl mx-auto px-4 my-8">
      <h1 className="font-bold mb-3 text-2xl">
        <span className="text-red-600">▲</span> আজ দাম বেড়েছে
      </h1>
      {/* increased products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {increasedProducts?.map((product: Product) => (
          <div
            key={product.id}
            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-3xl shrink-0">
                {product.image}
              </div>

              <div>
                <h4 className="font-bold text-lg text-gray-800 leading-tight">
                  {product.nameBn}
                </h4>
                <p className="text-xs text-gray-400 mt-1">
                  প্রতি {banglaUnit(product.unit)}
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-50 flex items-end justify-between">
              <div>
                <span className="text-xs text-gray-400 block mb-1">
                  আজকের দাম
                </span>
                <span className="text-2xl font-bold text-gray-900 tracking-tight">
                  {Number(product.today).toLocaleString("bn-BD")}{" "}
                  <span className="text-sm font-normal text-gray-600">
                    টাকা
                  </span>
                </span>
              </div>

              <span className="text-xs font-bold text-red-600 bg-red-50 px-2.5 py-1 rounded-full flex items-center gap-1">
                ▲ {Math.abs(Number(product.change?.pct))}%
              </span>
            </div>
          </div>
        ))}
      </div>

      <h1 className="font-bold mb-3 mt-10 text-2xl">
        <span className="text-green-600">▼</span> আজ দাম কমেছে
      </h1>
      {/* decreased products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {decreasedProducts?.map((product: Product) => (
          <div
            key={product.id}
            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-3xl shrink-0">
                {product.image}
              </div>

              <div>
                <h4 className="font-bold text-lg text-gray-800 leading-tight">
                  {product.nameBn}
                </h4>
                <p className="text-xs text-gray-400 mt-1">
                  প্রতি {banglaUnit(product.unit)}
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-50 flex items-end justify-between">
              <div>
                <span className="text-xs text-gray-400 block mb-1">
                  আজকের দাম
                </span>
                <span className="text-2xl font-bold text-gray-900 tracking-tight">
                  {Number(product.today).toLocaleString("bn-BD")}{" "}
                  <span className="text-sm font-normal text-gray-600">
                    টাকা
                  </span>
                </span>
              </div>

              <span className="text-xs font-bold text-green-600 bg-red-50 px-2.5 py-1 rounded-full flex items-center gap-1">
                ▼ {Math.abs(Number(product.change?.pct))}%
              </span>
            </div>
          </div>
        ))}
      </div>


{/* All products  */}
      <h1 className="font-bold mb-3 mt-12 text-2xl">সব পণ্য</h1>
      <p className="mb-5 text-gray-400">মোট ৩৩টি পণ্য দেখানো হচ্ছে</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {data?.map((product: Product) => (
          <div
            key={product.id}
            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-3xl shrink-0">
                {product.image}
              </div>

              <div>
                <h4 className="font-bold text-lg text-gray-800 leading-tight">
                  {product.nameBn}
                </h4>
                <p className="text-xs text-gray-400 mt-1">
                  প্রতি {banglaUnit(product.unit)}
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-50 flex items-end justify-between">
              <div>
                <span className="text-xs text-gray-400 block mb-1">
                  আজকের দাম
                </span>
                <span className="text-2xl font-bold text-gray-900 tracking-tight">
                  {Number(product.today).toLocaleString("bn-BD")}{" "}
                  <span className="text-sm font-normal text-gray-600">
                    টাকা
                  </span>
                </span>
              </div>


              <span  className="text-xs font-bold bg-red-50 px-2.5 py-1 rounded-full flex items-center gap-1">
                {product.change.dir === "up" ? (
                  <span className="text-red-700"> ▲ {product.change.pct}%</span>
                ) : product.change.dir === "down" ? (
                  <span className="text-green-600">
                    {" "}
                    ▼ {product.change.pct}%
                  </span>
                ) : (
                  <span className="text-gray-400">
                    {" "}
                    - {product.change.pct}%
                  </span>
                )}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePageProduct;
