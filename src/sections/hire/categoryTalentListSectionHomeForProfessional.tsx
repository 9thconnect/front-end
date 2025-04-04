"use client";

import React from "react";
import CategoryProductListSection from "../common/categoryProductListSection";
import { useQuery } from "@tanstack/react-query";
import {
  fetchProductCategories,
  fetchProfessionalsCategories,
} from "@/lib/requests/admin/categories/admin-category-request";
import CategoryTalentListSection from "../common/categoryTalentListSection";
import SectionContainer from "@/components/cards/common/sectionContainer";
import SectionCardHeader from "@/components/cards/common/sectionCardHeader";
import { useGetTopRatedProfessionalList } from "@/lib/requests/user/professional";
import { SkeletonTalentCard } from "@/components/cards/skeletons/talent";
import Empty from "@/components/common/empty";
import TalentCard from "@/components/cards/talentCard";
import ScrollableContainer from "@/components/common/scrollableContainer";
import { shuffleArray } from "@/utils/common";
import { Category } from "@/type/category";

const CategoryTalentListHomeForPro = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["professional-category"],
    queryFn: () => fetchProfessionalsCategories(),
  });

  const {
    data: professionalList,
    isLoading: isLoadingTopRated,
    isError: isErrorTopRated,
    error,
  } = useGetTopRatedProfessionalList(1);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 mt-5 gap-4">
          {[...Array(4)].map((_, index) => (
            <SkeletonTalentCard key={index} />
          ))}
        </div>
      );
    }

    if (isError) {
      return (
        <div className="text-center py-8 text-red-500">
          Error: {error instanceof Error ? error.message : "An error occurred"}
        </div>
      );
    }

    if (
      !professionalList?.data?.data?.professions ||
      professionalList.data.data.professions.length === 0
    ) {
      return <Empty size={150} text="Empty Top Rated" />;
    }

    return (
      <ScrollableContainer>
        <div className="flex space-x-4 cursor-pointer">
          {professionalList.data.data.professions.map((professional) => (
            <div className="flex-none" key={professional._id}>
              <TalentCard
                talent={{
                  id: professional._id,
                  name: professional.vendor.fullName,
                  profession: professional.professionName,
                  rating: 0,
                  imageUrl: professional.vendor.avatar,
                  type: "professional",
                  location: professional.professionCity,
                  verified: professional.professionActive,
                }}
              />
            </div>
          ))}
        </div>
      </ScrollableContainer>
    );
  };

  const categories = data?.data?.data?.categories || [];
  const shuffledCategories: Category[] = shuffleArray([...categories]);

  return (
    <div>
      <SectionContainer>
        <SectionCardHeader
          title="Top Rated"
          linkUrl={"/hire/home?type=professional"}
          linkText="See more"
        />
        {renderContent()}
      </SectionContainer>
      {!isLoading && !isError && (
        <div>
          {shuffledCategories.slice(0, 20).map((category, i) => (
            <CategoryTalentListSection
              title={category?.title as string}
              api="/api/professional/electrical"
              pageUrl={`/hire/home?category=${category?._id}&type=professional`}
              professionType={category?._id as string}
              type="professional"
              key={category?._id as string}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryTalentListHomeForPro;
