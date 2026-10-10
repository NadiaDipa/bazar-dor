import Marquee from "react-fast-marquee";

interface Product {
  id: number;
  nameBn: string;
  unit: string;
  categoryIcon: string;
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
  return unit;
};

const MarqueeBazar = async () => {
  const res = await fetch("https://openapi.programming-hero.com/api/bazardor/products");
  const products: Product[] = await res.json();

  return (
    <div className="bg-gray-50/80 py-2.5 border-y border-gray-100 mt-4 overflow-hidden">
      <Marquee autoFill speed={40} pauseOnHover>
        {products?.map((product) => {
          const bgClass =
            product.change.dir === "up"
              ? "text-red-600 bg-red-50"
              : product.change.dir === "down"
              ? "text-emerald-600 bg-emerald-50"
              : "text-gray-500 bg-gray-100";

          return (
            <div
              className="flex items-center gap-2 whitespace-nowrap px-5 border-r border-gray-200 text-sm font-medium"
              key={product.id}
            >
              <span>{product.categoryIcon}</span>
              <span className="text-gray-800 font-semibold">{product.nameBn}</span>
              <span className="text-gray-600">
                {product.today.toLocaleString("bn-BD")} টাকা/{banglaUnit(product.unit)}
              </span>

              <span className={`text-xs px-2 py-0.5 rounded-md font-bold flex items-center gap-0.5 ${bgClass}`}>
                {product.change.dir === "up" ? (
                  <>▲ {product.change.pct.toLocaleString("bn-BD")}%</>
                ) : product.change.dir === "down" ? (
                  <>▼ {product.change.pct.toLocaleString("bn-BD")}%</>
                ) : (
                  <>{product.change.pct.toLocaleString("bn-BD")}%</>
                )}
              </span>
            </div>
          );
        })}
      </Marquee>
    </div>
  );
};

export default MarqueeBazar;