import Link from 'next/link';

interface Category{
  id:string;
  slug:string;
  nameBn:string;
  icon:string;
}

const NavLinks = async() => {
  const res = await fetch("https://api.abcz.workers.dev/api/bazardor/categories");
  const categories:Category[] = await res.json();
  // console.log(categories);



  return (

    <div className='flex gap-8 pl-10 mt-5'>
      {
        categories?.map((category)=>{
          return(
            <div key={category.id}>
              <Link className='flex gap-1' href={`/categories/${category.slug}`}>
                <span>{category.icon}</span>
                <span>{category.nameBn}</span>
              </Link>
            </div>
          )
        })
      }
    </div>
  )
}

export default NavLinks;