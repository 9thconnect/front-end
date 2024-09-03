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
      <div className="bg-[url('https://s3-alpha-sig.figma.com/img/5493/6d77/95b7bc7460e22dd9948714052bae5d29?Expires=1726444800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=eqjmOiBv3YwSW6sV5zAFhgoUcuHsALx8cF5WbJrhHbWsipFhyliEkKDtZyEHsNlKmcAQyVvfKwXUuewz2ovLzgeBCiGr0tavz9VtQqDCYKflTMACeLfMr-lQ~ZOL0dRZmKx2IrJkOKUED8FT5ORvXve6D5qJ1wktlNh-9jImmxZMNcHtAxq6Y1AbjiW7F-MHt9g8HAnJs0mIGKpgWEC4VwXSXM6onJhOF-NmzX5ruaVyAky6WTLNuIAXTiPaN1h9w~L-tzzjiXBJv0vwY~OA8F4WujxmoYBGYgRhgXGMSrb~B~mlTGxtYdPYFrO7zkwNC5KzWF~mTK5utL4sLjfteA__')] bg-cover h-80 bg-no-repeat bg-center rounded-2xl mt-5 "></div>

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
