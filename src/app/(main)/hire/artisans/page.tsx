import SectionCardHeader from "@/components/cards/common/sectionCardHeader";
import SectionContainer from "@/components/cards/common/sectionContainer";
import { metaObject } from "@/config/site.config";
import CategoryTalentListSection from "@/sections/common/categoryTalentListSection";
import MainHeroSection from "@/sections/hero/mainHeroSection";
import CategoryTalentListHomeForArtisan from "@/sections/hire/categoryTalentListSectionHomeForArtisans";
import { CircleArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

export const metadata = {
  ...metaObject("Hire A Artisan"),
};

const page = async () => {
  return (
    <div>
      <div className="bg-[url('https://res.cloudinary.com/dougwnqok/image/upload/v1727944377/696a5b5f167757391ac16bf51e0b316e_bjxilh.jpg')] bg-cover h-80 bg-no-repeat rounded-2xl mt-5 "></div>
      <div className="mt-4 w-full text-center">
        <Link className="flex items-center" href={"/hire/home?type=artisan"}>
          <p className="text-primary text-4xl text-center">
            {" "}
            View all artisans
          </p>

          <CircleArrowRight className="text-primary ml-3" size={25} />
        </Link>
      </div>
      <CategoryTalentListHomeForArtisan />
      <div className="h-60 md:h-[600px] mt-5">
        <MainHeroSection
          images={[
            "https://res.cloudinary.com/dougwnqok/image/upload/v1728996053/masons_xghw1l.jpg",
            "https://res.cloudinary.com/dougwnqok/image/upload/v1728996050/handymen_ysna2e.jpg",
          ]}
        />
      </div>
    </div>
  );
};

export default page;
