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
      <div className="h-60 md:h-[300px]">
        <MainHeroSection images={["/images/Ads8.jpg", "/images/Ads8.jpg"]} />
      </div>

      <SectionContainer>
        <div className="mt-5">
          <SectionCardHeader
            title="New Arrival"
            linkUrl={"/wholesale/home"}
            linkText="See more"
          />

          <div className="border-b-2 w-full mb-8"></div>
          <FeaturedProductSection type="b2b-new-arrival" channel="wholeSale" />
        </div>
        <div className="mt-5">
          <SectionCardHeader
            title="Top Rated"
            linkUrl={"/wholesale/home"}
            linkText="See more"
          />

          <div className="border-b-2 w-full mb-8"></div>
          <FeaturedProductSection channel="wholeSale" type="b2b-top-rated" />
          <div className="mt-2">
            <BrandsSection />
          </div>
        </div>
      </SectionContainer>
      <div className="h-60 md:h-[300px] mt-5">
        <MainHeroSection
          images={[
            "https://s3-alpha-sig.figma.com/img/1fc1/7a11/8cccf3adfc0b9a36e8895c4dd4246b30?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=CCOMVi5arxw71sdsHy3XKvTJOtCcS4BjkMiIoBqWcXs7JOVT2yETxgFkagUwqfr8RwxlkRvMgCUQs6Z6YvyzmyNdHjmHipFlLW2gs0Zgqt8L3cSwEe3F2mFXbfoDq8hZ2AYniQFjSHsH3uPTvF-i5gRzhpaCMOIUIK1v3seDzZjn-iKtRaQ2o7xEkfrwvPJZUbPifxwU2dNCWC3-0krbFVOLzANpaqo6vWL6uzJ5iiHwqwMBBaYGZoCg7l~yHN09Q2Dqmvzf13sRgK~cDSgmG1Fgj1EgmJYabLfG2RoBrotqloadFE-wnHShLQXuAgWtmgOxFe94LdxJP32fCOhIJA__",
            "https://s3-alpha-sig.figma.com/img/1fc1/7a11/8cccf3adfc0b9a36e8895c4dd4246b30?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=CCOMVi5arxw71sdsHy3XKvTJOtCcS4BjkMiIoBqWcXs7JOVT2yETxgFkagUwqfr8RwxlkRvMgCUQs6Z6YvyzmyNdHjmHipFlLW2gs0Zgqt8L3cSwEe3F2mFXbfoDq8hZ2AYniQFjSHsH3uPTvF-i5gRzhpaCMOIUIK1v3seDzZjn-iKtRaQ2o7xEkfrwvPJZUbPifxwU2dNCWC3-0krbFVOLzANpaqo6vWL6uzJ5iiHwqwMBBaYGZoCg7l~yHN09Q2Dqmvzf13sRgK~cDSgmG1Fgj1EgmJYabLfG2RoBrotqloadFE-wnHShLQXuAgWtmgOxFe94LdxJP32fCOhIJA__",
          ]}
        />
      </div>
      <CategoryProductListHomeSection channel="wholeSale" />
    </div>
  );
}

export default page;
