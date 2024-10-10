"use client";

import React from "react";
import CategoryProductListSection from "../common/categoryProductListSection";
import { useQuery } from "@tanstack/react-query";
import {
  fetchProductCategories,
  fetchProfessionalsCategories,
} from "@/lib/requests/admin/categories/admin-category-request";
import CategoryTalentListSection from "../common/categoryTalentListSection";

const CategoryTalentListHomeForArtisan = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["professional-category"],
    queryFn: () => fetchProfessionalsCategories(),
  });

  return (
    <div>
      {!isLoading && !isError && (
        <div>
          <CategoryTalentListSection
            title={data?.data?.data?.categories[0]?.title as string}
            api="/api/home/electrical"
            pageUrl={`/hire/home?category=${data?.data?.data?.categories[0]?._id}`}
            professionType={data?.data?.data?.categories[0]?._id as string}
            type="artisan"
          />
          <CategoryTalentListSection
            title={data?.data?.data?.categories[1]?.title as string}
            api="/api/home/plumbing"
            pageUrl={`/hire/home?category=${data?.data?.data?.categories[1]?._id}`}
            professionType={data?.data?.data?.categories[1]?._id as string}
            type="artisan"
          />
          <CategoryTalentListSection
            title={data?.data?.data?.categories[2]?.title as string}
            api="/api/home/roofing"
            pageUrl={`/hire/home?category=${data?.data?.data?.categories[2]?._id}`}
            professionType={data?.data?.data?.categories[2]?._id as string}
            type="artisan"
          />
        </div>
      )}
    </div>
  );
};

export default CategoryTalentListHomeForArtisan;
