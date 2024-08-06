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
      <div className="bg-[url('https://s3-alpha-sig.figma.com/img/6a6d/c7d4/696a5b5f167757391ac16bf51e0b316e?Expires=1723420800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=WMFqJZMEyCShsg8tbtAgGl8PKr5OLE8krbeJ9uDtwWS5oQHK1AZZcCPYSRA4aVX01TL%7E4-6VZkS6KibV-Tm6ejUhPUpr3yJgfBt1JmeDSoK8gomdOT8wHcAvry4FcI9Czz7I-eR4EbE1z-fJ5WKWaXx2CY4ZdeTT8TArMaL0rZt5u2TdtPtBU0jImvBZnKOMMfaEbJCG3MBnQchdew7vjEdkrdxEff-3PWOEiLxpvEnZKTvPJ-W4IbmA1FQOvGIS4QY3a64Ly86uz0DCTC8xuGhVOY%7Ev8XIgsFcTKXRxmZYMr-Oj9b82YKbgclTtfQZqWGH0IfHyeDDPJmZEQOvNCg__')] bg-cover h-80 bg-no-repeat rounded-2xl mt-5 "></div>

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
