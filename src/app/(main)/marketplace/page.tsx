import SectionCardHeader from "@/components/cards/common/sectionCardHeader";
import SectionContainer from "@/components/cards/common/sectionContainer";
import { MainCarousel } from "@/components/carousel/mainCarousel";
import BrandsSection from "@/sections/common/brandsSection";
import CategoryProductListSection from "@/sections/common/categoryProductListSection";
import FeaturedProductSection from "@/sections/common/featuredProductSection";
import MainHeroSection from "@/sections/hero/mainHeroSection";
import CategoryProductListHomeSection from "@/sections/home/categoryProductListHomeSection";
import OfferSection from "@/sections/home/offerSection";
import Link from "next/link";
import React from "react";

function page() {
  return (
    <div className="pt-8">
      <div className="h-60 md:h-[600px]">
        <MainHeroSection
          images={[
            "/images/Ads8.jpg",
            "https://res.cloudinary.com/dougwnqok/image/upload/v1728994853/Home_appliances_bwxga1.jpg",
            "https://res.cloudinary.com/dougwnqok/image/upload/v1728994850/house_hold_furniture_tnp2qp.jpg",
            "/images/1-banner.jpg",
            "/images/2-banner.jpg",
            "/images/3-banner.jpg",
            "/images/4-banner.jpg",
            "/images/5-banner.jpg",
            "/images/6-banner.jpg",
          ]}
        />
      </div>

      <SectionContainer>
        <OfferSection />
        <div className="mt-5">
          <SectionCardHeader
            title="New Arrival"
            linkUrl={"/marketplace/home"}
            linkText="See more"
          />

          <div className="border-b-2 w-full mb-8"></div>
          <FeaturedProductSection />
        </div>
        <div className="mt-5">
          <SectionCardHeader
            title="Top Rated"
            linkUrl={"/marketplace/home"}
            linkText="See more"
          />

          <div className="border-b-2 w-full mb-8"></div>
          <FeaturedProductSection type="top-rated" />
          <div className="mt-2">
            <BrandsSection />
          </div>
        </div>
      </SectionContainer>
      <div className="h-60 md:h-[500px] mt-5">
        <MainHeroSection
          images={[
            "https://res.cloudinary.com/dougwnqok/image/upload/v1728994853/Home_appliances_bwxga1.jpg",
            "https://res.cloudinary.com/dougwnqok/image/upload/v1728994850/house_hold_furniture_tnp2qp.jpg",
            "/images/1-banner.jpg",
            "/images/2-banner.jpg",
            "/images/3-banner.jpg",
            "/images/4-banner.jpg",
            "/images/5-banner.jpg",
            "/images/6-banner.jpg",
          ]}
        />
      </div>
      <CategoryProductListHomeSection />
    </div>
  );
}

export default page;
