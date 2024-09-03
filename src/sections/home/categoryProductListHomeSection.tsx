"use client";

import React from "react";
import CategoryProductListSection from "../common/categoryProductListSection";
import { useQuery } from "@tanstack/react-query";
import { fetchProductCategories } from "@/lib/requests/admin/categories/admin-category-request";

const CategoryProductListHomeSection = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["product-category"],
    queryFn: () => fetchProductCategories(),
  });

  return (
    <div>
      {!isLoading && !isError && (
        <div>
          <CategoryProductListSection
            title={data?.data?.data?.categories[0]?.title as string}
            api="/api/products/electrical"
            pageUrl={`/marketplace/home?category=${data?.data?.data?.categories[0]?._id}`}
            category={data?.data?.data?.categories[0]?._id as string}
          />
          <CategoryProductListSection
            title={data?.data?.data?.categories[1]?.title as string}
            api="/api/products/plumbing"
            pageUrl={`/marketplace/home?category=${data?.data?.data?.categories[1]?._id}`}
            category={data?.data?.data?.categories[1]?._id as string}
          />
          <CategoryProductListSection
            title={data?.data?.data?.categories[2]?.title as string}
            api="/api/products/roofing"
            pageUrl={`/marketplace/home?category=${data?.data?.data?.categories[2]?._id}`}
            category={data?.data?.data?.categories[2]?._id as string}
          />
        </div>
      )}
    </div>
  );
};

export default CategoryProductListHomeSection;
