"use client";

import { fetchBrandCategories } from "@/lib/requests/admin/categories/admin-category-request";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import React from "react";

const BrandsSection = () => {
  const { data: brandData, isLoading } = useQuery({
    queryKey: ["brand"],
    queryFn: () => fetchBrandCategories(),
  });

  const brands = brandData?.data?.data?.categories || [];

  // Loading state
  if (isLoading) {
    return (
      <div id="brands" className="bg-white rounded-lg px-3 py-5">
        <Skeleton className="h-10 w-32 mb-7" />
        <div className="flex flex-wrap gap-4">
          {[1, 2, 3, 4].map((index) => (
            <Skeleton key={index} className="w-[200px] h-[50px] rounded-full" />
          ))}
        </div>
      </div>
    );
  }

  // Empty state
  if (brands.length === 0) {
    return (
      <div className="bg-gray-100 rounded-lg px-3 py-5">
        <h3 className="text-3xl mb-7 font-bold text-black">Brands</h3>
        <Alert variant="default">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            No brands available at the moment.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  // Content state
  return (
    <div className="bg-gray-100 rounded-lg px-3 py-5">
      <h3 className="text-3xl mb-7 font-bold text-black">Brands</h3>
      <div className="flex flex-wrap gap-4">
        {brands.map((brand, index) => (
          <div key={brand._id || index} className="flex items-center">
            <img
              alt={`${brand._id} logo`}
              src={brand.image}
              width={200}
              height={50}
              className="rounded-full object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandsSection;
