"use client";

import React from "react";
import CategoryProductListSection from "../common/categoryProductListSection";
import { useQuery } from "@tanstack/react-query";
import {
  fetchProductCategories,
  fetchProfessionalsCategories,
} from "@/lib/requests/admin/categories/admin-category-request";
import CategoryTalentListSection from "../common/categoryTalentListSection";
import { Category } from "@/type/category";
import { shuffleArray } from "@/utils/common";

const CategoryTalentListHomeForArtisan = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["professional-category"],
    queryFn: () => fetchProfessionalsCategories(),
  });

  const categories = data?.data?.data?.categories || [];
  const shuffledCategories: Category[] = shuffleArray([...categories]);

  return (
    <div>
      {!isLoading && !isError && (
        <div>
          {shuffledCategories.slice(0, 20).map((category, i) => (
            <CategoryTalentListSection
              title={category?.title as string}
              api="/api/professional/electrical"
              pageUrl={`/hire/home?category=${category?._id}&type=artisan`}
              professionType={category?._id as string}
              type="artisan"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryTalentListHomeForArtisan;
