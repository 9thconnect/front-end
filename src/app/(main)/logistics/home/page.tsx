import React from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { metaObject } from "@/config/site.config";
import { useSearchParams } from "next/navigation";
import HireHomePage from "@/components/pages/hire/hireHomePage";
import MarketplaceHomePage from "@/components/pages/marketplace/marketPlaceHomePage";
import RealEstateHomePage from "@/components/pages/realEstate/realEstateHomePage";
import LogisticsHomePage from "@/components/pages/logistics/logisticsHome";

export const metadata = {
  ...metaObject("Marketplace Home"),
};

const page = ({ searchParams }: any) => {
  console.log("dddkkdk", searchParams?.category);

  return (
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
      <div className="bg-[url('https://res.cloudinary.com/dougwnqok/image/upload/v1731592382/PODX9843_1_rutvjx.jpg')] bg-cover bg-center h-56 bg-no-repeat rounded-2xl mt-5 "></div>
      <LogisticsHomePage />
    </div>
  );
};

export default page;
