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
      <div className="bg-[url('https://s3-alpha-sig.figma.com/img/6a6d/c7d4/696a5b5f167757391ac16bf51e0b316e?Expires=1725235200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Yj8CjsoMEiA7jHuS1U2XWftj5NE6lYXZ6UXGZs~PgWkeVkAXn2HyAhbG80rWwEoEM~9LyjDjls~IjvbebU006o8N0BDl8N98g3tYVXwmYhk4fY3mBxbsKDgctbsJld~Fq4eFzi21ZqE08OEsuY6fZKYlQR9PLOFksc5W4Lr6m6-6kGDw9nVGoJwDOgk-zO7hxU~4uZqjXZ4lHahDUmB2IBPsWclk-UP3K8vw56InyVtZKLfQJkL0SU~9BFdLjZR0WnaK7wFCvXkVowLiE-5SVx4M2yGi0LZMKD-rx2m6Zaz5Du1UGQmNoMctlWiulg-yPQOmqxEN1aIlkRVl6N8~0A__')] bg-cover h-80 bg-no-repeat rounded-2xl mt-5 "></div>

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
