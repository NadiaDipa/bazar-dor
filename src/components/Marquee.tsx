import Marquee from "react-fast-marquee";

interface Products {
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
  const res = await fetch("https://api.abcz.workers.dev/api/bazardor/products");
  const products: Products[] = await res.json();
  // console.log(products)

  return (
    <Marquee autoFill speed={40} className="mt-5">
      {products?.map((product) => {
        return (
          <div
            className="flex items-center whitespace-nowrap px-6 border-r border-gray-200"
            key={product.id}
          >
            <span>{product.categoryIcon}</span>
            <span> {product.nameBn}</span>
            <span>
              {" "}
              {product.today.toLocaleString("bn-BD")} টাকা/
              {banglaUnit(product.unit)}
            </span>

            <span>
              {product.change.dir === "up" ? (
                <span className="text-red-700"> ▲ {product.change.pct}%</span>
              ) : product.change.dir === "down" ? (
                <span className="text-green-700"> ▼ {product.change.pct}%</span>
              ) : (
                <span className="text-gray-400"> - {product.change.pct}%</span>
              )}
            </span>
          </div>
        );
      })}
    </Marquee>
  );
};

export default MarqueeBazar;
