import SectionCardHeader from "@/components/cards/common/sectionCardHeader";
import SectionContainer from "@/components/cards/common/sectionContainer";
import { metaObject, siteConfig } from "@/config/site.config";
import MainHeroSection from "@/sections/hero/mainHeroSection";
import PropertyCard from "@/components/cards/propertyCard";
import { Property } from "@/type/property";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import RealEstateHomePage from "@/components/pages/realEstate/realEstateHomePage";

export const metadata = {
  ...metaObject("Real Estate"),
};

export const dynamic = "force-dynamic";
export const revalidate = 3600;

async function getNewArrivals() {
  try {
    const response = await fetch(
      `${siteConfig.apiURL}/real-estate/properties/new-arrival`,
      {
        next: {
          revalidate: 3600,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch new arrivals: ${response.statusText}`);
    }

    const data = await response.json();
    return data.data.data;
  } catch (error) {
    console.error("Error fetching new arrivals:", error);
    return [];
  }
}

const Page = async () => {
  const properties = await getNewArrivals();

  const heroImages = [
    "https://res.cloudinary.com/dougwnqok/image/upload/v1735286600/modern-residential-district-with-green-roof-balcony-generated-by-ai_dd88dw.jpg",
    "https://res.cloudinary.com/dougwnqok/image/upload/v1735286597/villa-house-model-key-drawing-retro-desktop-real-estate-sale-concept_abicsf.jpg",
  ];

  return (
    <div>
      <Breadcrumb className="my-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/real-estate">Real Estate</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
        </BreadcrumbList>
      </Breadcrumb>
      <div className="bg-[url('https://res.cloudinary.com/dougwnqok/image/upload/v1731592382/PODX9843_1_rutvjx.jpg')] bg-cover bg-center h-56 bg-no-repeat rounded-2xl mt-5 "></div>
      <RealEstateHomePage />
    </div>
  );
};

export default Page;
