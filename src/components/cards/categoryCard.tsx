"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Circle, MenuIcon, Undo2Icon } from "lucide-react";
import { useQueries, useQuery } from "@tanstack/react-query";
import {
  fetchProductCategories,
  fetchSubCategories,
} from "@/lib/requests/admin/categories/admin-category-request";
import Link from "next/link";
import { Category } from "@/type/category";
import { Button } from "../ui/button";

const CategoryCard = () => {
  const [open, setOpen] = React.useState(false);

  const {
    data: categories,
    isLoading: isLoadingCat,
    error: CatError,
  } = useQuery({
    queryKey: ["product-category"],
    queryFn: () => fetchProductCategories(),
  });

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger>
        <MenuIcon className="ml-3" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80 max-h-[600px] overflow-y-auto p-5 shadow-lg shadow-primary/30 rounded-lg">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-bold">Categories</h3>

          <Button variant="ghost" onClick={() => setOpen(false)}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17 9L14 12M14 12L11 15M14 12L11 9M14 12L17 15M3.52405 15.4403L7.34938 18.8689C8.16293 19.5981 9.2072 20 10.2882 20H17.5371C20.0019 20 22 17.9533 22 15.4286V8.57143C22 6.0467 20.0019 4 17.5371 4H10.2882C9.2072 4 8.16293 4.40191 7.34939 5.13108L3.52406 8.55965C1.49198 10.381 1.49198 13.619 3.52405 15.4403Z"
                stroke="#8E7E7E"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </Button>
        </div>

        <Accordion type="single" collapsible className="w-full mt-10">
          {isLoadingCat ? (
            "Loading Cats"
          ) : CatError ? (
            "error"
          ) : (
            <div>
              {categories?.data?.data?.categories.map((category) => (
                <AccordionItem
                  className="mb-4"
                  key={category._id}
                  value={category._id}
                >
                  <AccordionTrigger className="text-[16px] font-semibold">
                    {category.title}
                  </AccordionTrigger>
                  <AccordionContent>
                    <SubCategoryList category={category} />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </div>
          )}
        </Accordion>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const SubCategoryList = ({ category }: { category: Category }) => {
  const { isLoading, isError, data, error, refetch, isFetching } = useQuery({
    queryKey: ["product-sub-category", { category: category._id, page: 1 }],
    queryFn: fetchSubCategories,
    enabled: !!category._id,
  });

  if (isLoading) return <p>Loading Subcategories...</p>;
  if (isError) return <p>Error loading subcategories</p>;

  return (
    <div>
      <Link
        href={`/marketplace/home?category=${category._id}`}
        key={category._id}
        className="flex items-center w-full justify-between cursor-pointer mb-3"
      >
        <div className="flex items-center">
          <Circle size={15} />
          <p className="ml-3">All {category.title}</p>
        </div>
      </Link>
      {data &&
        data.data?.data?.categories.map((subCategory) => (
          <Link
            href={`/marketplace/home?subCategory=${subCategory._id}`}
            key={subCategory._id}
            className="flex items-center w-full justify-between cursor-pointer mb-3"
          >
            <div className="flex items-center">
              <Circle size={15} />
              <p className="ml-3">{subCategory.title}</p>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default CategoryCard;
