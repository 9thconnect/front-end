"use client";

import SectionContainer from "@/components/cards/common/sectionContainer";
import ProductCard from "@/components/cards/productCard";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import FilterSection from "@/components/common/filterSection";
import FilterSelect from "@/components/common/filterSelect";
import ItemList from "@/components/common/itemList";
import { productDummyList } from "@/data/dummy/productDummyData";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AlignJustify, ChevronLeft, ChevronRight } from "lucide-react";
import { useGetProductList } from "@/lib/requests/user/product";
import { fetchProductCategories } from "@/lib/requests/admin/categories/admin-category-request";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { SkeletonTalentCard } from "@/components/cards/skeletons/talent";

const states = [
  { name: "Abuja", value: "201" },
  { name: "Lagos", value: "202" },
  { name: "Kano", value: "203" },
  { name: "Rivers", value: "204" },
  { name: "Kaduna", value: "205" },
  { name: "Enugu", value: "206" },
  { name: "Ogun", value: "207" },
  { name: "Oyo", value: "208" },
  { name: "Cross River", value: "209" },
  { name: "Plateau", value: "210" },
];

const rates = [
  { name: "Under N5,000", value: "0 - 5000" },
  { name: "N6,000 - N15,000", value: "6000 - 15000" },
  { name: "N15,000 - N35,000", value: "15000 - 35000" },
  { name: "N35,000 - N100,000", value: "35000 - 100000" },
  { name: "Above N100,000", value: "100000 - 50000000" },
];

const starts = [
  { name: "5", value: 5 },
  { name: "4", value: 4 },
  { name: "3", value: 3 },
  { name: "2", value: 2 },
  { name: "1", value: 1 },
];

const brands = [
  { name: "Nagari", value: "Nagari" },
  { name: "7central", value: "7central" },
  { name: "Jasiri", value: "Jasiri" },
  { name: "Maikano", value: "Maikano" },
];
const ITEMS_PER_PAGE = 40;

const MarketplaceHomePage = () => {
  const [isLocationOpen, setIsLocationOpen] = useState(true);
  const [isRateOpen, setIsRateOpen] = useState(true);
  const [isRatingOpen, setIsRatingOpen] = useState(true);
  const [isBrandOpen, setIsBrandOpen] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState<
    string | undefined
  >();
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

  const [page, setPage] = useState(1);

  const handleClearFilters = () => {
    setSelectedPrice(undefined);
    setSelectedCategory(undefined);
    setSelectedRating(undefined);
    setSelectedBrand(undefined);
    setSelectedLocation(undefined);
    setSelectedRatingSide(undefined);
  };

  const params = useSearchParams();
  const catId = params.get("category");
  const subCatId = params.get("subCategory");

  useEffect(() => {
    if (catId) {
      setSelectedCategory(catId);
    }
  }, [catId]);

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
    data: productList,
    isLoading,
    isError,
    error,
  } = useGetProductList(
    "",
    page,
    selectedCategory,
    subCatId as string | undefined,
    priceRange(selectedPrice).startPrice,
    priceRange(selectedPrice).endPrice
  );

  const { data: categories, isLoading: isLoadingCat } = useQuery({
    queryKey: ["product-category"],
    queryFn: () => fetchProductCategories(),
  });

  const totalPages = productList?.data?.data
    ? Math.ceil(productList.data.data.count / ITEMS_PER_PAGE)
    : 0;

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      // Scroll to top smoothly
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // if (isLoading) {
  //   return (
  //     <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
  //       {[...Array(4)].map((_, index) => (
  //         <SkeletonTalentCard key={index} />
  //       ))}
  //     </div>
  //   );
  // }

  if (isError) {
    return <div>Error: {(error as Error).message}</div>;
  }

  return (
    <div className="mt-5">
      <div className="grid grid-cols-8 gap-4">
        <aside className="hidden md:block self-start sticky col-span-2 top-56">
          <SectionContainer className="sticky self-start">
            <FilterSection
              title="Brand"
              items={brands}
              isOpen={isBrandOpen}
              onToggle={() => setIsBrandOpen(!isBrandOpen)}
              selectedValue={selectedBrand}
              onSelect={(value) => setSelectedBrand(value as string)}
            />
            <FilterSection
              title="Location"
              items={states}
              isOpen={isLocationOpen}
              onToggle={() => setIsLocationOpen(!isLocationOpen)}
              selectedValue={selectedLocation}
              onSelect={(value) => setSelectedLocation(value as string)}
            />
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
              items={starts}
              isOpen={isRatingOpen}
              onToggle={() => setIsRatingOpen(!isRatingOpen)}
              selectedValue={selectedRatingSide?.toString()}
              onSelect={(value) => setSelectedRatingSide(Number(value))}
            />
          </SectionContainer>
        </aside>

        <SectionContainer className="col-span-8 md:col-span-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              {!isLoading &&
                `1 - ${productList?.data?.data.products.length} of ${productList?.data?.data.count}`}
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <AlignJustify size={30} className="md:hidden" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Filter</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  {categories?.data?.data && (
                    <FilterSelect
                      label="Category"
                      options={categories?.data?.data?.categories.map(
                        (cat) => ({
                          name: cat.title as string,
                          value: cat._id as string,
                        })
                      )}
                      placeholder="Category"
                      state={[selectedCategory, setSelectedCategory]}
                    />
                  )}
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <FilterSelect
                    label="Price"
                    options={rates}
                    placeholder="Select Price"
                    state={[selectedPrice, setSelectedPrice]}
                  />
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <FilterSelect
                    label="Rating"
                    options={starts.map((start) => ({
                      name: `${start.value} star`,
                      value: start.value.toString(),
                    }))}
                    placeholder="Select Rating"
                    state={[selectedRating, setSelectedRating]}
                  />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="hidden md:flex space-x-2">
              {categories?.data?.data && (
                <FilterSelect
                  label="Category"
                  options={categories?.data?.data?.categories.map((cat) => ({
                    name: cat.title as string,
                    value: cat._id as string,
                  }))}
                  placeholder="Category"
                  state={[selectedCategory, setSelectedCategory]}
                />
              )}
              <FilterSelect
                label="Price"
                options={rates}
                placeholder="Select Price"
                state={[selectedPrice, setSelectedPrice]}
              />
              <FilterSelect
                label="Rating"
                options={starts.map((start) => ({
                  name: `${start.value} star`,
                  value: start.value.toString(),
                }))}
                placeholder="Select Rating"
                state={[selectedRating, setSelectedRating]}
              />

              {(selectedPrice !== undefined ||
                selectedRating !== undefined ||
                selectedBrand !== undefined ||
                selectedLocation !== undefined ||
                selectedRate !== undefined ||
                selectedRatingSide !== undefined ||
                selectedCategory !== undefined) && (
                <Button onClick={handleClearFilters}>Clear</Button>
              )}
            </div>
          </div>

          {isLoading ? (
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
              {[...Array(12)].map((_, index) => (
                <SkeletonTalentCard key={index} />
              ))}
            </div>
          ) : (
            productList?.data?.data.products && (
              <>
                <ItemList
                  items={productList.data.data.products}
                  renderItem={(item) => <ProductCard product={item} />}
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

                {/* Page Info */}
                <div className="mt-4 text-center text-sm text-gray-600">
                  Page {page} of {totalPages}
                </div>
              </>
            )
          )}
        </SectionContainer>
      </div>
    </div>
  );
};

export default MarketplaceHomePage;
