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

  return (
    <div>
      <SectionContainer>
        <SectionCardHeader
          title="Top Rated"
          linkUrl={"/hire/home"}
          linkText="See more"
        />
        {renderContent()}
      </SectionContainer>
      {!isLoading && !isError && (
        <div>
          <CategoryTalentListSection
            title={data?.data?.data?.categories[0]?.title as string}
            api="/api/professional/electrical"
            pageUrl={`/hire/home?category=${data?.data?.data?.categories[0]?._id}&type=professional`}
            professionType={data?.data?.data?.categories[0]?._id as string}
            type="professional"
          />
          <CategoryTalentListSection
            title={data?.data?.data?.categories[1]?.title as string}
            api="/api/professional/plumbing"
            pageUrl={`/hire/home?category=${data?.data?.data?.categories[1]?._id}&type=professional`}
            professionType={data?.data?.data?.categories[1]?._id as string}
            type="professional"
          />
          <CategoryTalentListSection
            title={data?.data?.data?.categories[2]?.title as string}
            api="/api/professional/roofing"
            pageUrl={`/hire/home?category=${data?.data?.data?.categories[2]?._id}&type=professional`}
            professionType={data?.data?.data?.categories[2]?._id as string}
            type="professional"
          />
        </div>
      )}
    </div>
  );
};

export default CategoryTalentListHomeForPro;
