import React from "react";
import { Button } from "@/components/ui/button";
import CategorySection from "@/sections/dashboard/category/categorySection";

const Page = () => {
  return (
    <div>
      <div className="sm:flex justify-between items-center flex-wrap">
        <p className="text-2xl text-offBlack">Categories</p>
        <div className="sm:flex flex-wrap sm:flex-nowrap">
          <Button className="w-full sm:w-fit mt-2 sm:mt-0 font-normal">
            Download
          </Button>
        </div>
      </div>
      <CategorySection />
    </div>
  );
};

export default Page;
