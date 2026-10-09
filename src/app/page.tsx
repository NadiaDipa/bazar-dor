import Banner from "@/components/Banner";
import Marquee from "@/components/Marquee";
import PriceUpDown from "@/components/HomePageProduct";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Marquee/>
      
      <div className="bg-[#F0F5F0] pb-10">
        <Banner/>
        <PriceUpDown/>
       
      </div>
    </div>
  );
}
