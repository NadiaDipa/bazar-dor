import React from "react";

const Banner = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <div className="w-full bg-[#F5F7F5] py-6">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between p-6 md:p-8">
          
          <div className="card-body p-0">
            <span className="text-green-600 font-semibold bg-[#e6f4ea] w-fit px-3 py-0.5 rounded-full text-xs md:text-sm">
              {date}
            </span>
            <h2 className="card-title text-3xl md:text-4xl font-bold text-gray-900 mt-2">
              আজকের বাজারের দাম এক নজরে
            </h2>
            <p className="text-[16px] md:text-[18px] text-gray-500 mt-3 mb-5 leading-relaxed">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-<br className="hidden md:block"/>
              সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
            </p>
            <div className="card-actions justify-start">
              <button className="btn bg-green-700 hover:bg-emerald-700 text-white border-none px-6 rounded-xl shadow-sm">
                সব পণ্য দেখুন
              </button>
            </div>
          </div>

          <div className="mt-6 md:mt-0 shrink-0">
            <img
              src="/bazar-hero.png"
              alt="Bazar Hero Illustration"
              className="w-72 md:w-80 h-auto object-contain"
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Banner;