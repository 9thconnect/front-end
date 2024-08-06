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
              {searchParams?.category ?? "All"}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="bg-[url('https://s3-alpha-sig.figma.com/img/6a6d/c7d4/696a5b5f167757391ac16bf51e0b316e?Expires=1723420800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=WMFqJZMEyCShsg8tbtAgGl8PKr5OLE8krbeJ9uDtwWS5oQHK1AZZcCPYSRA4aVX01TL%7E4-6VZkS6KibV-Tm6ejUhPUpr3yJgfBt1JmeDSoK8gomdOT8wHcAvry4FcI9Czz7I-eR4EbE1z-fJ5WKWaXx2CY4ZdeTT8TArMaL0rZt5u2TdtPtBU0jImvBZnKOMMfaEbJCG3MBnQchdew7vjEdkrdxEff-3PWOEiLxpvEnZKTvPJ-W4IbmA1FQOvGIS4QY3a64Ly86uz0DCTC8xuGhVOY%7Ev8XIgsFcTKXRxmZYMr-Oj9b82YKbgclTtfQZqWGH0IfHyeDDPJmZEQOvNCg__')] bg-cover h-56 bg-no-repeat rounded-2xl mt-5 "></div>
      <MarketplaceHomePage />
    </div>
  );
};

export default page;
