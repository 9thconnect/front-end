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
      <div className="bg-[url('https://s3-alpha-sig.figma.com/img/6a6d/c7d4/696a5b5f167757391ac16bf51e0b316e?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=JLgR8emoFmZ4TD0xESWKVNCGiHNwiHVCPWMEswowMK3wMdcAwC8c-VqbNUF1nH9HGwF1F3BY6KPk7wQHna2COjf6be-qGf6gDj1Vnn0zvyqJxyTa5quuu9ryVFh1C75XbG2ponJySer0k-FM7fKn2zj08xioSil4JxY9CRWD22oOTEKjgMPnUV14pjQqQW2ciOhI-2qRthMbXODeNMxAzD893EPV~XYPyVBPv8huYNuhmE1eUN5cl0YbYMu95FUCReet45iWf3GfEzZSs5sYniCfU9faVX69ci8X9C1FHBiW37~vDLtkG00ABgKvL8JSKpSk79z4~Oq5gFpG6pMpjA__')] bg-cover h-56 bg-no-repeat rounded-2xl mt-5 "></div>
      <MarketplaceHomePage />
    </div>
  );
};

export default page;
