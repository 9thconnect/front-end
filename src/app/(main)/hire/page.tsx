import SectionCardHeader from "@/components/cards/common/sectionCardHeader";
import SectionContainer from "@/components/cards/common/sectionContainer";
import { Button } from "@/components/ui/button";
import { metaObject } from "@/config/site.config";
import CategoryTalentListSection from "@/sections/common/categoryTalentListSection";
import TopRatedProfessions from "@/sections/common/topRatedProfessions";
import MainHeroSection from "@/sections/hero/mainHeroSection";
import Link from "next/link";

export const metadata = {
  ...metaObject("Hire A Professional"),
};

const page = async () => {
  return (
    <div className="pt-5">
      <div className="lg:flex lg:space-x-5 text-offBlack">
        <div className="md:grid grid-cols-2 bg-white rounded-xl overflow-hidden">
          <div className="min-h-60 bg-[url('https://res.cloudinary.com/dougwnqok/image/upload/v1727799631/4d56ce8c38262e55c19c507e6ac71960_kt6zfd.png')] bg-cover bg-no-repeat bg-center"></div>
          <div className="flex flex-col px-5 py-10">
            <h2 className="text-xl font-semibold">Hire a Professional</h2>
            <p className="mt-4 text-lg">
              Looking for a platform to see our unique creations? 9th
              Marketplace is the perfect place to showcase your craftsmanship.
            </p>

            <Link
              href={"/hire/professionals"}
              className="bg-gray-100 mt-28 text-black hover:text-white hover:bg-primary inline-block self-start px-8 py-4 rounded-lg transition-all duration-75"
            >
              See Professionals
            </Link>
          </div>
        </div>
        <div className="mt-5 lg:mt-0 md:grid grid-cols-2 bg-white rounded-xl overflow-hidden">
          <div className="min-h-60 bg-[url('https://res.cloudinary.com/dougwnqok/image/upload/v1727942799/85a78f48cd09d81a21a4bdc3c2d3c9c1_bueo7f.png')] bg-cover bg-no-repeat bg-center "></div>
          <div className="flex flex-col px-5 py-10">
            <h2 className="text-xl font-semibold">Find an Artisan</h2>
            <p className="mt-4 text-lg">
              Looking for a platform to see our unique creations? 9th
              Marketplace is the perfect place to showcase your craftsmanship.
            </p>
            <Link
              href={"/hire/artisans"}
              className="bg-gray-100 mt-28 text-black hover:text-white hover:bg-primary inline-block self-start px-8 py-4 rounded-lg transition-all duration-75"
            >
              See Artisans
            </Link>
          </div>
        </div>
      </div>
      <SectionContainer>
        <SectionCardHeader
          title="Top Rated Professionals"
          linkUrl={"/hire/home?category=top-rated"}
          linkText="See more"
          className="mb-5"
        />
        <TopRatedProfessions />
      </SectionContainer>

      <div className="h-80 mt-5">
        <MainHeroSection />
      </div>
    </div>
  );
};

export default page;
