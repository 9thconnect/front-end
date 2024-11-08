import SectionCardHeader from "@/components/cards/common/sectionCardHeader";
import SectionContainer from "@/components/cards/common/sectionContainer";
import { metaObject } from "@/config/site.config";
import CategoryTalentListSection from "@/sections/common/categoryTalentListSection";
import MainHeroSection from "@/sections/hero/mainHeroSection";
import CategoryTalentListHomeForPro from "@/sections/hire/categoryTalentListSectionHomeForProfessional";
import { CircleArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

export const metadata = {
  ...metaObject("Hire A Professional"),
};

async function fetchProfessionals() {
  const res = await fetch(
    "{{url}}/pro/all-pro-gig?search=Belland&pageNumber=1&filterByProfessionType=66b4fbf4022e85271b30f54a&startPrice=20000&endPrice=50000",
    { cache: "no-store" }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch professionals");
  }
  const data = await res.json();
  return data.data.data.professions;
}

const page = async () => {
  return (
    <div>
      <div className="bg-[url('https://res.cloudinary.com/dougwnqok/image/upload/v1727944375/95b7bc7460e22dd9948714052bae5d29_m5yfbt.png')] bg-cover h-80 bg-no-repeat bg-center rounded-2xl mt-5 "></div>

      <div className="mt-4 w-full text-center">
        <Link className="flex items-center" href={"/hire/home"}>
          <p className="text-primary text-4xl text-center">
            {" "}
            View all professionals
          </p>

          <CircleArrowRight className="text-primary ml-3" size={25} />
        </Link>
      </div>

      <CategoryTalentListHomeForPro />
      <div className="h-60 md:h-[600px] mt-5">
        <MainHeroSection
          images={[
            "https://res.cloudinary.com/dougwnqok/image/upload/v1728995905/Architects_bxopcc.jpg",
            "https://res.cloudinary.com/dougwnqok/image/upload/v1728995904/electrician_yggbw4.jpg",
          ]}
        />
      </div>
    </div>
  );
};

export default page;
