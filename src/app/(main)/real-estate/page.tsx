import { metaObject, siteConfig } from "@/config/site.config";
import MainHeroSection from "@/sections/hero/mainHeroSection";
import Image from "next/image";
import React from "react";

export const metadata = {
  ...metaObject("Real Estate"),
};

const page = () => {
  return (
    <div>
      <div className="h-60 md:h-[500px] mt-5">
        <MainHeroSection
          images={[
            "https://res.cloudinary.com/dougwnqok/image/upload/v1735286600/modern-residential-district-with-green-roof-balcony-generated-by-ai_dd88dw.jpg",
            "https://res.cloudinary.com/dougwnqok/image/upload/v1735286597/villa-house-model-key-drawing-retro-desktop-real-estate-sale-concept_abicsf.jpg",
          ]}
        />
      </div>
      <h3 className="text-center text-5xl text-gray-400 my-10">
        Welcome To 9th Real estate
      </h3>
    </div>
  );
};

export default page;
