import { siteConfig } from "@/config/site.config";
import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <div className="flex justify-center flex-col px-4 py-40 items-center">
      <Image className="w-32 sm:w-auto" src={siteConfig.logo} alt="" />
      <h3 className="text-center text-5xl text-black mt-4">Coming Soon</h3>
    </div>
  );
};

export default page;
