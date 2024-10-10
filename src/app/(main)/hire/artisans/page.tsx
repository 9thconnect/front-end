import SectionCardHeader from "@/components/cards/common/sectionCardHeader";
import SectionContainer from "@/components/cards/common/sectionContainer";
import { metaObject } from "@/config/site.config";
import CategoryTalentListSection from "@/sections/common/categoryTalentListSection";
import MainHeroSection from "@/sections/hero/mainHeroSection";
import CategoryTalentListHomeForArtisan from "@/sections/hire/categoryTalentListSectionHomeForArtisans";
import React from "react";

export const metadata = {
  ...metaObject("Hire A Artisan"),
};

const page = async () => {
  return (
    <div>
      <div className="bg-[url('https://res.cloudinary.com/dougwnqok/image/upload/v1727944377/696a5b5f167757391ac16bf51e0b316e_bjxilh.jpg')] bg-cover h-80 bg-no-repeat rounded-2xl mt-5 "></div>

      <CategoryTalentListHomeForArtisan />
      <div className="h-64 mt-5">
        <MainHeroSection />
      </div>
    </div>
  );
};

export default page;
