"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { AlignJustify } from "lucide-react";

import SectionContainer from "@/components/cards/common/sectionContainer";
import TalentCard from "@/components/cards/talentCard";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import FilterSelect from "@/components/common/filterSelect";
import ItemList from "@/components/common/itemList";
import { useGetProfessionalList } from "@/lib/requests/user/professional";
import { fetchProfessionalsCategories } from "@/lib/requests/admin/categories/admin-category-request";
import { Skeleton } from "@/components/ui/skeleton";
import FilterSection from "@/components/common/filterSection";
import Empty from "@/components/common/empty";
import { SkeletonTalentCard } from "@/components/cards/skeletons/talent";

const rates = [
  { name: "Under N5,000", value: "5000" },
  { name: "N6,000 - N15,0000", value: "15000" },
  { name: "N15,000 - N35,000", value: "35000" },
  { name: "N35,000 - N100,000", value: "100000" },
  { name: "Above N100,000", value: "100001" },
];

const stars = [
  { name: "5", value: 5 },
  { name: "4", value: 4 },
  { name: "3", value: 3 },
  { name: "2", value: 2 },
  { name: "1", value: 1 },
];

const HireHomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState<
    string | undefined
  >();

  const [isLocationOpen, setIsLocationOpen] = useState(true);
  const [isRateOpen, setIsRateOpen] = useState(true);
  const [isRatingOpen, setIsRatingOpen] = useState(true);
  const [isBrandOpen, setIsBrandOpen] = useState(true);
  const [selectedPrice, setSelectedPrice] = useState<string | undefined>();
  const [selectedRating, setSelectedRating] = useState<string | undefined>();

  const [selectedBrand, setSelectedBrand] = useState<string | undefined>();
  const [selectedLocation, setSelectedLocation] = useState<
    string | undefined
  >();
  const [selectedRate, setSelectedRate] = useState<string | undefined>();
  const [selectedRatingSide, setSelectedRatingSide] = useState<
    number | undefined
  >();

  const params = useSearchParams();

  const catName = params.get("category");
  const type = params.get("type") as "professional" | "artisan";

  const { data: categories, isLoading: isLoadingCat } = useQuery({
    queryKey: ["professional-category"],
    queryFn: fetchProfessionalsCategories,
  });

  useEffect(() => {
    if (catName) {
      setSelectedCategory(catName);
    }
  }, [catName]);

  const {
    data: professionalList,
    isLoading,
    isError,
    error,
  } = useGetProfessionalList(type, "", 1, selectedCategory);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
          {[...Array(12)].map((_, index) => (
            <SkeletonTalentCard key={index} />
          ))}
        </div>
      );
    }

    if (isError) {
      return (
        <div className="text-center py-8 text-red-500">
          Error:{" "}
          {error instanceof Error
            ? error.message
            : "An error occurred while fetching data."}
        </div>
      );
    }

    if (
      !professionalList?.data?.data?.professions ||
      professionalList.data.data.professions.length === 0
    ) {
      return (
        <div className="text-center py-8">
          <Empty size={150} text="No professionals found." />
        </div>
      );
    }

    return (
      <ItemList
        items={professionalList.data.data.professions}
        renderItem={(item) => (
          <TalentCard
            talent={{
              id: item._id,
              name: item.vendor.fullName,
              profession: item.professionName,
              rating: 0, // You might want to add a rating field to your item data
              imageUrl: item.vendor.avatar,
              type: type,
              location: item.professionCity,
              verified: item.professionActive,
              category: selectedCategory,
            }}
          />
        )}
      />
    );
  };
  console.log(categories?.data?.data?.categories);

  return (
    <div className="mt-5">
      <div className="grid grid-cols-8 gap-4">
        <aside className="hidden md:block self-start sticky col-span-2 top-56">
          <SectionContainer className="sticky self-start">
            {isLoadingCat ? (
              <Skeleton className="h-10 w-full mb-2" />
            ) : categories?.data?.data ? (
              <FilterSection
                title="Category"
                items={categories.data.data.categories.map((cat) => ({
                  name: cat.title as string,
                  value: cat._id as string,
                }))}
                isOpen={isBrandOpen}
                onToggle={() => setIsBrandOpen(!isBrandOpen)}
                selectedValue={selectedCategory}
                onSelect={(value) => setSelectedCategory(value as string)}
              />
            ) : (
              <div>No categories available</div>
            )}

            <FilterSection
              title="Rate"
              items={rates}
              isOpen={isRateOpen}
              onToggle={() => setIsRateOpen(!isRateOpen)}
              selectedValue={selectedPrice}
              onSelect={(value) => setSelectedPrice(value as string)}
            />
            <FilterSection
              title="Rating"
              items={stars}
              isOpen={isRatingOpen}
              onToggle={() => setIsRatingOpen(!isRatingOpen)}
              selectedValue={selectedRatingSide?.toString()}
              onSelect={(value) => setSelectedRatingSide(Number(value))}
            />
          </SectionContainer>
        </aside>

        <SectionContainer className="col-span-8 md:col-span-6">
          <div className="flex justify-between items-center mb-6">
            <div className="mr-4">
              {catName && (
                <h2 className="text-black text-2xl capitalize text-nowrap">
                  By Category
                </h2>
              )}
              {isLoading ? (
                <Skeleton className="h-4 w-[100px]" />
              ) : professionalList?.data?.data?.professions ? (
                <p>{`1-${professionalList.data.data.professions.length} of ${
                  professionalList.data.data.pages || 0
                }`}</p>
              ) : null}
            </div>
          </div>

          {renderContent()}
        </SectionContainer>
      </div>
    </div>
  );
};

export default HireHomePage;
