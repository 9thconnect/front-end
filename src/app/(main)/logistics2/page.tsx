import { navigate } from "@/app/actions";
import { metaObject, siteConfig } from "@/config/site.config";
import MainHeroSection from "@/sections/hero/mainHeroSection";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const metadata = {
  ...metaObject("9th Logistics"),
};

const page = () => {
  return (
    <div className="">
      <div className="h-60 md:h-[500px] mt-5">
        <MainHeroSection
          images={[
            "https://res.cloudinary.com/dougwnqok/image/upload/v1735287755/pexels-elevate-1267325_pz67be.jpg",
            "https://res.cloudinary.com/dougwnqok/image/upload/v1735287715/pexels-chanaka-318741-906494_do3xop.jpg",
            "https://res.cloudinary.com/dougwnqok/image/upload/v1735287710/pexels-albinberlin-906982_le92zv.jpg",
          ]}
        />
      </div>

      <h3 className="text-center text-5xl text-gray-400 my-10">
        Welcome To 9th Logistic Hub
      </h3>

      {/* <h3 className="mt-8 text-3xl font-bold text-offBlack">Our Partners</h3>
      <div className="flex items-center space-x-7 mt-8">
        <div className="cursor-pointer">
          <img
            className=" h-56 w-56 rounded-3xl "
            src="https://res.cloudinary.com/dougwnqok/image/upload/v1728574102/Frame_1400002996_vmh94l.png"
            alt=""
          />
        </div>
        <Link href={"/logistics/royal"} className="cursor-pointer">
          <img
            className=" h-56 w-56 rounded-3xl "
            src="https://res.cloudinary.com/dougwnqok/image/upload/v1728574553/WhatsApp_Image_2024-10-10_at_8.02.46_AM_ottgqn.jpg"
            alt=""
          />
        </Link>
      </div> */}
    </div>
  );
};

export default page;
