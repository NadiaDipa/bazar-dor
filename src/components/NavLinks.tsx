import NavActiveItem from "./NavActiveItem";

interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

const NavLinks = async () => {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/categories"
  );

  const categories: Category[] = await res.json();

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
};

export default NavLinks;