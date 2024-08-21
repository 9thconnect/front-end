"use client";

import CategoryItem from "@/components/common/categoryItem";
import { Button } from "@/components/ui/button";
import {
  fetchBusinessCategories,
  fetchProductCategories,
  fetchProfessionalsCategories,
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
      <p className="text-lg text-offBlack">{title}</p>
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
          return <CategoryItem category={item} type={title} />;
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

  const [open, setOpen] = useState<{
    type: CategoryType;
    open: boolean;
  }>({
    type: "product",
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
      type: "product",
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
                <span className="capitalize">{open.type}</span>
              </AlertDialogTitle>
            </div>
          </AlertDialogHeader>
          <AddCategoryForm type={open.type} closeModel={closeModel} />
        </AlertDialogContent>
      </AlertDialog>
      <div className="grid md:grid-cols-2 gap-5 mt-6">
        {businessData && businessData.data?.data?.categories && (
          <CategorySectionComp
            title="business"
            categories={businessData.data?.data?.categories}
            openModel={openModel}
          />
        )}
        {professionalsData && professionalsData.data?.data?.categories && (
          <CategorySectionComp
            title="profession"
            categories={professionalsData.data?.data?.categories}
            openModel={openModel}
          />
        )}
        {productData && productData.data?.data?.categories && (
          <CategorySectionComp
            title="product"
            categories={productData.data?.data?.categories}
            openModel={openModel}
          />
        )}
      </div>
    </>
  );
};

export default CategorySection;
