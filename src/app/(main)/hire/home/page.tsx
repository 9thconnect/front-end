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

export const metadata = {
  ...metaObject("Hire Home"),
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
            <BreadcrumbLink href="/hire">Hire</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-primary capitalize">
              {searchParams?.category ? "By Category" : "All"}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="bg-[url('https://res.cloudinary.com/dougwnqok/image/upload/v1727799631/4d56ce8c38262e55c19c507e6ac71960_kt6zfd.png')] bg-cover h-56 bg-no-repeat bg-center rounded-2xl mt-5 "></div>
      <HireHomePage />
    </div>
  );
};

export default page;
