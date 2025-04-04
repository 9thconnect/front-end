"use client";

import React from "react";
import CategoryProductListSection from "../common/categoryProductListSection";
import { useQuery } from "@tanstack/react-query";
import { fetchProductCategories } from "@/lib/requests/admin/categories/admin-category-request";
import { shuffleArray } from "@/utils/common";

const CategoryProductListHomeSection = ({
  channel,
}: {
  channel?: "retail" | "wholeSale";
}) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["product-category"],
    queryFn: () => fetchProductCategories(),
  });

  const categories = data?.data?.data?.categories || [];
  const shuffledCategories = shuffleArray([...categories]);

  return (
    <div>
      {!isLoading && !isError && (
        <div>
          {/* {Array.from({ length: 20 }, (_, i) => (
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
          ))} */}
          {shuffledCategories.slice(0, 20).map((category, i) => (
            <CategoryProductListSection
              key={i}
              title={category?.title as string}
              api="/api/products/roofing"
              pageUrl={`/${
                channel && channel == "wholeSale" ? "wholesale" : "marketplace"
              }/home?category=${category?._id}`}
              category={category?._id as string}
              channel={channel}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryProductListHomeSection;
