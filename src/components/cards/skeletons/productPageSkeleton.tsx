import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import SectionContainer from "@/components/cards/common/sectionContainer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SingleProductSkeleton = () => {
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
            <Skeleton className="h-4 w-24" />
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <SectionContainer className="mt-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Image Gallery Skeleton */}
          <div className="space-y-4">
            <Skeleton className="w-full aspect-square rounded-lg" />
            <div className="flex gap-2">
              {[1, 2, 3, 4].map((index) => (
                <Skeleton key={index} className="w-20 h-20 rounded-lg" />
              ))}
            </div>
          </div>

          {/* Product Info Skeleton */}
          <div className="px-8 flex flex-col">
            <Skeleton className="h-8 w-3/4 my-3" />

            <div className="flex space-x-4 flex-wrap">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-28" />
            </div>

            <Skeleton className="h-12 w-40 mt-7" />

            <div className="flex items-center mt-2">
              <Skeleton className="h-6 w-48 mr-3" />
              <Skeleton className="h-6 w-32" />
            </div>

            <div className="flex mt-7">
              <Skeleton className="h-6 w-24" />
            </div>

            <div className="flex gap-2 my-2">
              {[1, 2, 3].map((index) => (
                <Skeleton key={index} className="h-10 w-20 rounded-lg" />
              ))}
            </div>

            <div className="w-full flex mt-5 items-end md:mt-auto space-x-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-10 rounded-full" />
            </div>
          </div>
        </div>
      </SectionContainer>

      <SectionContainer className="mt-5">
        <div>
          <Tabs defaultValue="spec" className="w-full">
            <TabsList className="w-full sm:w-auto pb-3 bg-white">
              <TabsTrigger value="spec">
                <Skeleton className="h-4 w-24" />
              </TabsTrigger>
              <TabsTrigger value="review">
                <Skeleton className="h-4 w-32" />
              </TabsTrigger>
              <TabsTrigger value="info">
                <Skeleton className="h-4 w-24" />
              </TabsTrigger>
            </TabsList>

            <TabsContent className="w-full border-t" value="spec">
              <div className="mt-3 bg-gray-100 p-7 rounded-lg">
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </SectionContainer>

      {/* Similar Products Skeleton */}
      <SectionContainer>
        <div className="flex justify-between items-center mb-4">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-24" />
        </div>

        <div className="flex space-x-4 overflow-x-auto pb-4">
          {[1, 2, 3, 4].map((index) => (
            <div key={index} className="w-80 flex-none">
              <div className="border rounded-lg p-4">
                <Skeleton className="w-full aspect-square rounded-lg mb-4" />
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-8 w-1/2 mb-2" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </div>
          ))}
        </div>
      </SectionContainer>
    </div>
  );
};

export default SingleProductSkeleton;
