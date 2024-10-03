import SectionCardHeader from "@/components/cards/common/sectionCardHeader";
import SectionContainer from "@/components/cards/common/sectionContainer";
import { metaObject } from "@/config/site.config";
import CategoryTalentListSection from "@/sections/common/categoryTalentListSection";
import TopRatedProfessions from "@/sections/common/topRatedProfessions";
import MainHeroSection from "@/sections/hero/mainHeroSection";
import React from "react";

export const metadata = {
  ...metaObject("Hire A Professional"),
};

const page = async () => {
  return (
    <div>
      <div className="bg-[url('https://res.cloudinary.com/dougwnqok/image/upload/v1727944375/95b7bc7460e22dd9948714052bae5d29_m5yfbt.png')] bg-cover h-80 bg-no-repeat bg-center rounded-2xl mt-5 "></div>

      <SectionContainer>
        <SectionCardHeader
          title="Top Rated Professionals"
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
