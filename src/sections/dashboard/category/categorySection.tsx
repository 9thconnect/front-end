"use client";

import CategoryItem from "@/components/common/categoryItem";
import { Button } from "@/components/ui/button";
import {
  fetchBrandCategories,
  fetchBusinessCategories,
  fetchLogisticCategories,
  fetchProductCategories,
  fetchProfessionalsCategories,
  fetchPropertiesCategories,
} from "@/lib/requests/admin/categories/admin-category-request";
import { Category, CategoryType } from "@/type/category";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import AddCategoryForm from "@/components/forms/admin/category/AddCategoryForm";
import { X } from "lucide-react";
import AnalyticCard from "@/components/cards/common/analyticCard";

const CategorySectionComp = ({
  title,
  categories,
  openModel,
}: {
  title: CategoryType;
  categories: Category[];
  openModel: (type: CategoryType) => void;
}) => (
  <div className="border rounded-2xl overflow-hidden p-2.5">
    <div className="flex justify-between items-center flex-wrap">
      <p className="text-lg text-offBlack">
        {title
          .replace(/-/g, " ")
          .replace(/\b\w/g, (char) => char.toUpperCase())}
      </p>
      <div className="sm:flex flex-wrap sm:flex-nowrap">
        <Button
          onClick={() => openModel(title)}
          className="w-full sm:w-fit mt-2 sm:mt-0 font-normal"
        >
          Add New
        </Button>
      </div>
    </div>
    <div className="border rounded-2xl overflow-hidden mt-3">
      <div className="flex text-offBlack py-5 px-4 bg-gray-100 justify-between items-start align-middle">
        <h4>Title</h4>
        <h4>Items</h4>
      </div>
      <div className="rounded-2xl overflow-hidden mt-3">
        {categories.map((item) => {
          return <CategoryItem key={item._id} category={item} type={title} />;
        })}
      </div>
    </div>
  </div>
);

const CategorySection = () => {
  const { data: businessData } = useQuery({
    queryKey: ["business-category"],
    queryFn: () => fetchBusinessCategories(),
  });
  const { data: professionalsData } = useQuery({
    queryKey: ["profession-category"],
    queryFn: () => fetchProfessionalsCategories(),
  });
  const { data: productData } = useQuery({
    queryKey: ["product-category"],
    queryFn: () => fetchProductCategories(),
  });
  const { data: brandData } = useQuery({
    queryKey: ["brand"],
    queryFn: () => fetchBrandCategories(),
  });

  const { data: propertiesData } = useQuery({
    queryKey: ["property"],
    queryFn: () => fetchPropertiesCategories(),
  });

  const { data: logisticData } = useQuery({
    queryKey: ["logistic"],
    queryFn: () => fetchLogisticCategories(),
  });

  const [open, setOpen] = useState<{
    type: CategoryType;
    open: boolean;
  }>({
    type: "product-category",
    open: false,
  });

  const openModel = (type: CategoryType) => {
    setOpen({
      type: type,
      open: true,
    });
  };

  const closeModel = () => {
    setOpen({
      type: "product-category",
      open: false,
    });
  };

  const openChange = (isOpen: boolean) => {
    setOpen({
      type: open.type,
      open: isOpen,
    });
  };

  return (
    <>
      <AlertDialog open={open.open} onOpenChange={openChange}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="flex justify-between items-center">
              <AlertDialogCancel className="rounded-full p-0  w-9 h-9">
                <X size={17} />
              </AlertDialogCancel>
              <AlertDialogTitle>
                Add New Category to{" "}
                <span className="capitalize">
                  {open.type
                    .replace(/-/g, " ")
                    .replace(/\b\w/g, (char) => char.toUpperCase())}
                </span>
              </AlertDialogTitle>
            </div>
          </AlertDialogHeader>
          <AddCategoryForm type={open.type} closeModel={closeModel} />
        </AlertDialogContent>
      </AlertDialog>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-3">
        <div className="w-full rounded-lg bg-black border p-3">
          <div className="bg-white/20 rounded-full p-2 inline-flex items-center justify-center">
            <img src="/icons/analytics.svg" alt="" />
          </div>
          <p className="my-2 text-sm">Modules</p>
          <p className="text-2xl text-white">4</p>
        </div>
        <div className="w-full rounded-lg bg-white border p-3">
          <div className="bg-black/20 rounded-full p-2 inline-flex items-center justify-center">
            <img src="/icons/sort-circle.svg" alt="" />
          </div>
          <p className="my-2 text-sm uppercase">TOTAL Categories</p>
          <p className="text-2xl text-black">4</p>
        </div>
        <div className="w-full rounded-lg bg-white border p-3">
          <div className="bg-black/20 rounded-full p-2 inline-flex items-center justify-center">
            <img src="/icons/sort-circle.svg" alt="" />
          </div>
          <p className="my-2 text-sm uppercase">sub Categories</p>
          <p className="text-2xl text-black">420</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-5 mt-6">
        {businessData && businessData.data?.data?.categories && (
          <CategorySectionComp
            title="business-category"
            categories={businessData.data?.data?.categories}
            openModel={openModel}
          />
        )}
        {professionalsData && professionalsData.data?.data?.categories && (
          <CategorySectionComp
            title="profession-category"
            categories={professionalsData.data?.data?.categories}
            openModel={openModel}
          />
        )}
        {productData && productData.data?.data?.categories && (
          <CategorySectionComp
            title="product-category"
            categories={productData.data?.data?.categories}
            openModel={openModel}
          />
        )}
        {brandData && brandData.data?.data?.categories && (
          <CategorySectionComp
            title="brand"
            categories={brandData.data?.data?.categories}
            openModel={openModel}
          />
        )}
        {propertiesData && propertiesData.data?.data?.categories && (
          <CategorySectionComp
            title="property"
            categories={propertiesData.data?.data?.categories}
            openModel={openModel}
          />
        )}
        {logisticData && logisticData.data?.data?.categories && (
          <CategorySectionComp
            title="logistic"
            categories={logisticData.data?.data?.categories}
            openModel={openModel}
          />
        )}
      </div>
    </>
  );
};

export default CategorySection;
