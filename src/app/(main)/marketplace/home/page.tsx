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
            <BreadcrumbLink href="/marketplace">Marketplace</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-primary capitalize">
              {searchParams?.category ? "By Category" : "All"}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="bg-[url('https://res.cloudinary.com/dougwnqok/image/upload/v1731592382/PODX9843_1_rutvjx.jpg')] bg-cover bg-center h-56 bg-no-repeat rounded-2xl mt-5 "></div>
      <MarketplaceHomePage />
    </div>
  );
};

export default page;
