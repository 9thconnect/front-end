import SectionCardHeader from "@/components/cards/common/sectionCardHeader";
import SectionContainer from "@/components/cards/common/sectionContainer";
import { metaObject, siteConfig } from "@/config/site.config";
import MainHeroSection from "@/sections/hero/mainHeroSection";
import PropertyCard from "@/components/cards/propertyCard";
import { Property } from "@/type/property";
import { Logistics } from "@/type/logistics";
import LogisticsCard from "@/components/cards/logistiCard";
import Empty from "@/components/common/empty";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import LogisticsHomePage from "@/components/pages/logistics/logisticsHome";

export const metadata = {
  ...metaObject("Real Estate"),
};

export const dynamic = "force-dynamic";
export const revalidate = 3600;

async function getNewArrivals() {
  try {
    const response = await fetch(
      `${siteConfig.apiURL}/logistic/fleets/new-arrival`,
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

    console.log(data.data.data);

    return data.data.data;
  } catch (error) {
    console.error("Error fetching new arrivals:", error);
    return [];
  }
}

const Page = async () => {
  const fleet = await getNewArrivals();

  const heroImages = [
    "https://res.cloudinary.com/dougwnqok/image/upload/v1735287755/pexels-elevate-1267325_pz67be.jpg",
    "https://res.cloudinary.com/dougwnqok/image/upload/v1735287715/pexels-chanaka-318741-906494_do3xop.jpg",
    "https://res.cloudinary.com/dougwnqok/image/upload/v1735287710/pexels-albinberlin-906982_le92zv.jpg",
  ];

  return (
    // <div>
    //   <div className="h-60 md:h-[300px] mt-5">
    //     <MainHeroSection images={heroImages} />
    //   </div>

    //   <SectionContainer>
    //     <div className="mt-5">
    //       <SectionCardHeader
    //         title="New Arrival"
    //         linkUrl="/logistics/home"
    //         linkText="See all"
    //       />

    //       {!fleet || fleet.length === 0 ? (
    //         <div className="text-center py-10 text-gray-500">
    //           <Empty size={200} text="No new arrival" />
    //         </div>
    //       ) : (
    //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
    //           {fleet.map((fleet: Logistics) => (
    //             <LogisticsCard key={fleet._id} logistics={fleet} />
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
            <BreadcrumbLink href="/real-estate">Logistics</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
        </BreadcrumbList>
      </Breadcrumb>
      <div className="h-60 md:h-[300px] mt-5">
        <MainHeroSection images={heroImages} />
      </div>
      <LogisticsHomePage />
    </div>
  );
};

export default Page;
