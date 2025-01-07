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
import LogisticsCard from "@/components/cards/logistiCard";
import { useGetLogisticsList } from "@/lib/requests/user/logistics";

const logisticTypes = [
  { name: "Road", value: "road" },
  { name: "Air", value: "air" },
  { name: "Sea", value: "sea" },
];

const logisticSubTypes = [
  { name: "Van", value: "van" },
  { name: "Cargo Airline", value: "cargoAirline" },
  // Add more subtypes as needed
];

const ITEMS_PER_PAGE = 12;

const LogisticsHomePage = () => {
  const [isTypeOpen, setIsTypeOpen] = useState(true);
  const [isSubTypeOpen, setIsSubTypeOpen] = useState(true);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string | undefined>();
  const [selectedSubType, setSelectedSubType] = useState<string | undefined>();
  const [page, setPage] = useState(1);

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedType(undefined);
    setSelectedSubType(undefined);
  };

  const {
    data: logisticsList,
    isLoading,
    isError,
    error,
  } = useGetLogisticsList(searchTerm, page, selectedType, selectedSubType);

  const totalPages = logisticsList?.data?.data.count
    ? Math.ceil(logisticsList.data.data.count / ITEMS_PER_PAGE)
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
                placeholder="Search logistics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>

            <FilterSection
              title="Logistics Type"
              items={logisticTypes}
              isOpen={isTypeOpen}
              onToggle={() => setIsTypeOpen(!isTypeOpen)}
              selectedValue={selectedType}
              onSelect={(value) => setSelectedType(value as string)}
            />

            <FilterSection
              title="Sub Type"
              items={logisticSubTypes}
              isOpen={isSubTypeOpen}
              onToggle={() => setIsSubTypeOpen(!isSubTypeOpen)}
              selectedValue={selectedSubType}
              onSelect={(value) => setSelectedSubType(value as string)}
            />
          </SectionContainer>
        </aside>

        <SectionContainer className="col-span-8 md:col-span-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              {!isLoading &&
                `1 - ${logisticsList?.data?.data.logistics.length} of ${logisticsList?.data?.data.count} Logistics Fleets`}
            </div>

            {/* Mobile Filters */}
            <DropdownMenu>
              <DropdownMenuTrigger>
                <AlignJustify size={30} className="md:hidden" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Filter Logistics</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <input
                    type="text"
                    placeholder="Search logistics..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-2 border rounded-md"
                  />
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <FilterSelect
                    label="Logistics Type"
                    options={logisticTypes}
                    placeholder="Select Type"
                    state={[selectedType, setSelectedType]}
                  />
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <FilterSelect
                    label="Sub Type"
                    options={logisticSubTypes}
                    placeholder="Select Sub Type"
                    state={[selectedSubType, setSelectedSubType]}
                  />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Desktop Filters */}
            <div className="hidden md:flex space-x-2">
              <FilterSelect
                label="Logistics Type"
                options={logisticTypes}
                placeholder="Select Type"
                state={[selectedType, setSelectedType]}
              />
              <FilterSelect
                label="Sub Type"
                options={logisticSubTypes}
                placeholder="Select Sub Type"
                state={[selectedSubType, setSelectedSubType]}
              />

              {(searchTerm || selectedType || selectedSubType) && (
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
          ) : logisticsList?.data?.data.logistics ? (
            logisticsList.data.data.logistics.length > 0 ? (
              <>
                <ItemList
                  items={logisticsList.data.data.logistics}
                  renderItem={(item) => <LogisticsCard logistics={item} />}
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
              <p>No logistics fleets found matching your criteria</p>
            )
          ) : (
            <p>Error fetching logistics fleets</p>
          )}
        </SectionContainer>
      </div>
    </div>
  );
};

export default LogisticsHomePage;
