"use client";

import SectionContainer from "@/components/cards/common/sectionContainer";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import FilterSection from "@/components/common/filterSection";
import FilterSelect from "@/components/common/filterSelect";
import ItemList from "@/components/common/itemList";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AlignJustify, ChevronLeft, ChevronRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { SkeletonTalentCard } from "@/components/cards/skeletons/talent";
import { Skeleton } from "@/components/ui/skeleton";
import PropertyCard from "@/components/cards/propertyCard";
import { getProductList } from "@/lib/requests/user/product";
import {
  getPropertyList,
  useGetPropertyList,
} from "@/lib/requests/user/property";

const locations = [
  { name: "Ikeja", value: "Ikeja" },
  { name: "Lekki", value: "Lekki" },
  { name: "Victoria Island", value: "Victoria Island" },
  { name: "Ikoyi", value: "Ikoyi" },
  { name: "Ajah", value: "Ajah" },
];

const priceRanges = [
  { name: "₦20M - ₦40M", value: "20000000-40000000" },
  { name: "₦40M - ₦60M", value: "40000000-60000000" },
  { name: "₦60M - ₦80M", value: "60000000-80000000" },
  { name: "₦80M - ₦100M", value: "80000000-100000000" },
];

const ITEMS_PER_PAGE = 12;

// Custom hook for fetching properties

const RealEstateHomePage = () => {
  const [isLocationOpen, setIsLocationOpen] = useState(true);
  const [isPriceOpen, setIsPriceOpen] = useState(true);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<
    string | undefined
  >();
  const [selectedPrice, setSelectedPrice] = useState<string | undefined>();
  const [page, setPage] = useState(1);

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedLocation(undefined);
    setSelectedPrice(undefined);
  };

  const params = useSearchParams();
  const propertyTypeId = params.get("propertyType");

  const priceRange = (price?: string) => {
    if (!price) {
      return {
        startPrice: undefined,
        endPrice: undefined,
      };
    }

    const [startPrice, endPrice] = price
      .split("-")
      .map((value) => Number(value.trim()));

    return {
      startPrice,
      endPrice,
    };
  };

  const {
    data: propertyList,
    isLoading,
    isError,
    error,
  } = useGetPropertyList(
    searchTerm,
    page,
    propertyTypeId || undefined,
    selectedLocation,
    priceRange(selectedPrice)?.startPrice,
    priceRange(selectedPrice)?.endPrice
  );

  const totalPages = propertyList?.data?.data.count
    ? Math.ceil(propertyList.data.data.count / ITEMS_PER_PAGE)
    : 0;

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (isError) {
    return <div>Error: {(error as Error).message}</div>;
  }

  return (
    <div className="mt-5">
      <div className="grid grid-cols-8 gap-4">
        <aside className="hidden md:block self-start sticky col-span-2 top-56">
          <SectionContainer className="sticky self-start">
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search properties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>

            <FilterSection
              title="Location"
              items={locations}
              isOpen={isLocationOpen}
              onToggle={() => setIsLocationOpen(!isLocationOpen)}
              selectedValue={selectedLocation}
              onSelect={(value) => setSelectedLocation(value as string)}
            />

            <FilterSection
              title="Price Range"
              items={priceRanges}
              isOpen={isPriceOpen}
              onToggle={() => setIsPriceOpen(!isPriceOpen)}
              selectedValue={selectedPrice}
              onSelect={(value) => setSelectedPrice(value as string)}
            />
          </SectionContainer>
        </aside>

        <SectionContainer className="col-span-8 md:col-span-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              {!isLoading &&
                `1 - ${propertyList?.data?.data.count} of ${propertyList?.data?.data.count} Properties`}
            </div>

            {/* Mobile Filters */}
            <DropdownMenu>
              <DropdownMenuTrigger>
                <AlignJustify size={30} className="md:hidden" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Filter Properties</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <input
                    type="text"
                    placeholder="Search properties..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-2 border rounded-md"
                  />
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <FilterSelect
                    label="Location"
                    options={locations}
                    placeholder="Select Location"
                    state={[selectedLocation, setSelectedLocation]}
                  />
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <FilterSelect
                    label="Price Range"
                    options={priceRanges}
                    placeholder="Select Price Range"
                    state={[selectedPrice, setSelectedPrice]}
                  />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Desktop Filters */}
            <div className="hidden md:flex space-x-2">
              <FilterSelect
                label="Location"
                options={locations}
                placeholder="Select Location"
                state={[selectedLocation, setSelectedLocation]}
              />
              <FilterSelect
                label="Price Range"
                options={priceRanges}
                placeholder="Select Price Range"
                state={[selectedPrice, setSelectedPrice]}
              />

              {(searchTerm || selectedLocation || selectedPrice) && (
                <Button onClick={handleClearFilters}>Clear Filters</Button>
              )}
            </div>
          </div>

          {isLoading ? (
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
              {[...Array(6)].map((_, index) => (
                <SkeletonTalentCard key={index} />
              ))}
            </div>
          ) : propertyList?.data?.data.properties ? (
            propertyList.data.data.properties.length > 0 ? (
              <>
                <ItemList
                  items={propertyList.data.data.properties}
                  renderItem={(item) => <PropertyCard property={item} />}
                />

                {/* Pagination Controls */}
                <div className="mt-8 flex items-center justify-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1 || isLoading}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>

                  <div className="flex gap-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNumber;
                      if (totalPages <= 5) {
                        pageNumber = i + 1;
                      } else if (page <= 3) {
                        pageNumber = i + 1;
                      } else if (page >= totalPages - 2) {
                        pageNumber = totalPages - 4 + i;
                      } else {
                        pageNumber = page - 2 + i;
                      }

                      return (
                        <Button
                          key={pageNumber}
                          variant={page === pageNumber ? "default" : "outline"}
                          size="icon"
                          onClick={() => handlePageChange(pageNumber)}
                          disabled={isLoading}
                          className="w-8 h-8"
                        >
                          {pageNumber}
                        </Button>
                      );
                    })}

                    {totalPages > 5 && page < totalPages - 2 && (
                      <>
                        <span className="px-2">...</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handlePageChange(totalPages)}
                          disabled={isLoading}
                          className="w-8 h-8"
                        >
                          {totalPages}
                        </Button>
                      </>
                    )}
                  </div>

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === totalPages || isLoading}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>

                <div className="mt-4 text-center text-sm text-gray-600">
                  Page {page} of {totalPages}
                </div>
              </>
            ) : (
              <p>No properties found matching your criteria</p>
            )
          ) : (
            <p>Error fetching properties</p>
          )}
        </SectionContainer>
      </div>
    </div>
  );
};

export default RealEstateHomePage;
