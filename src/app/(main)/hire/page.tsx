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
          <div className="min-h-60 bg-[url('https://s3-alpha-sig.figma.com/img/3048/d2ba/2be35d48b8daca0b6b718c9628b25105?Expires=1725235200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=AX1Mmnh7F3r88knG7LKEYDFRKgKZOJLiFaZMqB0XeP2Sxa85W3PMR0esRyloJonV1WJnvzObVntgbvqSP5lQrIbajF5ULlApQ~Lmdvkv4wweYNxGW7sKIyPMbGUwMx6F4Ed8aCb4bmKi4wqIMlFf9cKZUwFBi8iWJTAcwqvQO4O3Jh1UsUnPKaM4YJezFK7J0IXAZtJsasZ4oWbKNL3ZSdzmijIqemsosGHUTam6XH57IEWh~LlT0T1XUVyX-SHyLrNfATG1W~nWO64UqWAQUr9oLTrKUtJYybDrhEoipeUa~SEo252Dbx5VbcP8Ty3N3I4NNYFRXBBRuizoImK3Iw__')] bg-cover bg-no-repeat "></div>
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
          <div className="min-h-60 bg-[url('https://s3-alpha-sig.figma.com/img/3048/d2ba/2be35d48b8daca0b6b718c9628b25105?Expires=1725235200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=AX1Mmnh7F3r88knG7LKEYDFRKgKZOJLiFaZMqB0XeP2Sxa85W3PMR0esRyloJonV1WJnvzObVntgbvqSP5lQrIbajF5ULlApQ~Lmdvkv4wweYNxGW7sKIyPMbGUwMx6F4Ed8aCb4bmKi4wqIMlFf9cKZUwFBi8iWJTAcwqvQO4O3Jh1UsUnPKaM4YJezFK7J0IXAZtJsasZ4oWbKNL3ZSdzmijIqemsosGHUTam6XH57IEWh~LlT0T1XUVyX-SHyLrNfATG1W~nWO64UqWAQUr9oLTrKUtJYybDrhEoipeUa~SEo252Dbx5VbcP8Ty3N3I4NNYFRXBBRuizoImK3Iw__')] bg-cover bg-no-repeat "></div>
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
