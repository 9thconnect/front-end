import SectionCardHeader from "@/components/cards/common/sectionCardHeader";
import SectionContainer from "@/components/cards/common/sectionContainer";
import { metaObject } from "@/config/site.config";
import CategoryTalentListSection from "@/sections/common/categoryTalentListSection";
import TopRatedProfessions from "@/sections/common/topRatedProfessions";
import MainHeroSection from "@/sections/hero/mainHeroSection";
import React from "react";

export const metadata = {
  ...metaObject("Hire A Artisan"),
};

const page = async () => {
  return (
    <div>
      <div className="bg-[url('https://res.cloudinary.com/dougwnqok/image/upload/v1727944377/696a5b5f167757391ac16bf51e0b316e_bjxilh.jpg')] bg-cover h-80 bg-no-repeat rounded-2xl mt-5 "></div>

      <SectionContainer>
        <SectionCardHeader
          title="Top Rated Artisans"
          linkUrl={"/hire/home?category=top-rated"}
          linkText="See more"
          className="mb-5"
        />
        <TopRatedProfessions />
      </SectionContainer>
      <CategoryTalentListSection
        title="Engineering"
        api="/api/products/engineering"
        pageUrl={`/hire/home?category=engineering`}
      />
      <CategoryTalentListSection
        title="Management"
        api="/api/products/Management"
        pageUrl={`/hire/home?category=management`}
      />
      <div className="h-64 mt-5">
        <MainHeroSection />
      </div>
      <CategoryTalentListSection
        title="Architecture"
        api="/api/products/Architecture"
        pageUrl={`/hire/home?category=architecture`}
      />
    </div>
  );
};

export default page;
