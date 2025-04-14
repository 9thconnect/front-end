import React from "react";
import SectionCardHeader from "@/components/cards/common/sectionCardHeader";
import SectionContainer from "@/components/cards/common/sectionContainer";
import TalentCard from "@/components/cards/talentCard";
import { useGetProfessionalList } from "@/lib/requests/user/professional";
import { Skeleton } from "@/components/ui/skeleton";
import Empty from "@/components/common/empty";
import { SkeletonTalentCard } from "@/components/cards/skeletons/talent";

interface ICategory {
  title: string;
  pageUrl: string;
  professionType?: string;
  api: string;
  type: "professional" | "artisan";
}

const EmptyState = () => (
  <div className="text-center py-8">
    <h3 className="text-lg font-semibold mb-2">No professionals found</h3>
    <p className="text-gray-500">
      There are currently no professionals in this category.
    </p>
  </div>
);

const CategoryTalentListSection = ({
  title,
  pageUrl,
  professionType,
  api,
  type,
}: ICategory) => {
  const {
    data: professionalList,
    isLoading,
    isError,
    error,
  } = useGetProfessionalList(type, "", 1, professionType);

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
      return <Empty size={150} text="Empty Category" />;
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 mt-5 gap-4">
        {professionalList.data.data.professions
          .slice(0, 50)
          .map((professional) => (
            <div className="flex-none" key={professional._id}>
              <TalentCard
                talent={{
                  id: professional._id,
                  name:
                    type == "professional"
                      ? professional.vendor.fullName
                      : professional.artisan
                      ? professional.artisan.fullName
                      : "",
                  profession: professional.professionName,
                  rating: 0,
                  imageUrl: professional.vendor.avatar,
                  type: type,
                  location: professional.professionCity,
                  verified: professional.professionActive,
                  category: professionType,
                }}
              />
            </div>
          ))}
      </div>
    );
  };
  if (
    !professionalList?.data?.data?.professions ||
    professionalList.data.data.professions.length === 0
  ) {
    return null;
  }
  return (
    <SectionContainer>
      <SectionCardHeader title={title} linkUrl={pageUrl} linkText="See more" />
      {renderContent()}
    </SectionContainer>
  );
};

export default CategoryTalentListSection;
