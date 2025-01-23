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
    // <div>
    //   <div className="h-60 md:h-[500px] mt-5">
    //     <MainHeroSection images={heroImages} />
    //   </div>

    //   <SectionContainer>
    //     <div className="mt-5">
    //       <SectionCardHeader
    //         title="New Arrival"
    //         linkUrl="/real-estate/home"
    //         linkText="See all"
    //       />

    //       {!properties || properties.length === 0 ? (
    //         <div className="text-center py-10 text-gray-500">
    //           No new properties available at the moment
    //         </div>
    //       ) : (
    //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
    //           {properties.map((property: Property) => (
    //             <PropertyCard key={property._id} property={property} />
    //           ))}
    //         </div>
    //       )}
    //     </div>
    //   </SectionContainer>
    // </div>

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
