"use client";

import React from "react";
import CategoryProductListSection from "../common/categoryProductListSection";
import { useQuery } from "@tanstack/react-query";
import { fetchProductCategories } from "@/lib/requests/admin/categories/admin-category-request";

const CategoryProductListHomeSection = ({
  channel,
}: {
  channel?: "retail" | "wholeSale";
}) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["product-category"],
    queryFn: () => fetchProductCategories(),
  });

  return (
    <div>
      {!isLoading && !isError && (
        <div>
          {/* <CategoryProductListSection
            title={data?.data?.data?.categories[0]?.title as string}
            api="/api/products/electrical"
            pageUrl={`/${
              channel && channel == "wholeSale" ? "wholesale" : "marketplace"
            }/home?category=${data?.data?.data?.categories[0]?._id}`}
            category={data?.data?.data?.categories[0]?._id as string}
            channel={channel}
          />
          <CategoryProductListSection
            title={data?.data?.data?.categories[1]?.title as string}
            api="/api/products/plumbing"
            pageUrl={`/${
              channel && channel == "wholeSale" ? "wholesale" : "marketplace"
            }/home?category=${data?.data?.data?.categories[1]?._id}`}
            category={data?.data?.data?.categories[1]?._id as string}
            channel={channel}
          />
          <CategoryProductListSection
            title={data?.data?.data?.categories[2]?.title as string}
            api="/api/products/roofing"
            pageUrl={`/${
              channel && channel == "wholeSale" ? "wholesale" : "marketplace"
            }/home?category=${data?.data?.data?.categories[2]?._id}`}
            category={data?.data?.data?.categories[2]?._id as string}
            channel={channel}
          />

          <CategoryProductListSection
            title={data?.data?.data?.categories[3]?.title as string}
            api="/api/products/roofing"
            pageUrl={`/${
              channel && channel == "wholeSale" ? "wholesale" : "marketplace"
            }/home?category=${data?.data?.data?.categories[3]?._id}`}
            category={data?.data?.data?.categories[3]?._id as string}
            channel={channel}
          /> */}

          {/* loop through 1 to 10 */}

          {Array.from({ length: 20 }, (_, i) => (
            <CategoryProductListSection
              key={i}
              title={data?.data?.data?.categories[i]?.title as string}
              api="/api/products/roofing"
              pageUrl={`/${
                channel && channel == "wholeSale" ? "wholesale" : "marketplace"
              }/home?category=${data?.data?.data?.categories[i]?._id}`}
              category={data?.data?.data?.categories[i]?._id as string}
              channel={channel}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryProductListHomeSection;
