import Banner from "@/components/Banner";
import Marquee from "@/components/Marquee";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Marquee/>
      
      <div className="bg-[#F5F7F5] pb-10">
        <Banner/>
       
      </div>
    </div>
  );
}
