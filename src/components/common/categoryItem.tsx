"use client";

import {
  EllipsisVerticalIcon,
  Eye,
  Pencil,
  PencilOff,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
import { Category, CategoryType } from "@/type/category";
import EditCategoryForm from "../forms/admin/category/EditCategoryForm";
import { useDeleteCategory } from "../forms/admin/category/useAddCategory";
import AddCategoryForm from "../forms/admin/category/AddCategoryForm";
import { useQuery } from "@tanstack/react-query";
import { fetchSubCategories } from "@/lib/requests/admin/categories/admin-category-request";
import SubCategoryItem from "./subCategoryItem";

export type CategoryItemProp = {
  id: string;
  name?: string;
  description?: string;
  productCount: number;
};

const CategoryItem = ({
  category,
  type,
}: {
  category: Category;
  type: CategoryType;
}) => {
  const [open, setOpen] = useState(false);

  const [openEdit, setOpenEdit] = useState(false);

  const [openAddSub, setOpenAddSub] = useState(false);

  const [view, setView] = useState<{ open: boolean; category?: string }>({
    open: false,
    category: undefined,
  });

  const [loadingCategory, setLoadingCategory] = useState(false);

  const [page, setPage] = useState(1);

  // const {
  //   data,
  //   refetch,
  //   isFetching,
  // } = useQuery({
  //   queryKey: ["product-sub-category", { category: view.category, page: page }],
  //   queryFn: () => fetchSubCategories,
  //   enabled: false,
  // });

  const { isLoading, isError, data, error, refetch, isFetching } = useQuery({
    queryKey: ["product-sub-category", { category: view.category, page: page }],
    queryFn: fetchSubCategories,
    enabled: !!view.category,
  });

  useEffect(() => {
    if (view.open && view.category) {
      refetch();
    }
  }, [view]);

  function closeModal() {
    setOpenAddSub(false);
  }

  const mutation = useDeleteCategory(type, category._id, setOpenEdit);
  return (
    <div
      key={category._id}
      className="flex py-2 px-4  justify-between items-start align-middle"
    >
      <AlertDialog open={open} onOpenChange={(o) => setOpen(o)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="flex justify-between items-center">
              <AlertDialogCancel className="rounded-full p-0  w-9 h-9">
                <X size={17} />
              </AlertDialogCancel>
              <AlertDialogTitle>
                Edit <span className="capitalize">{category.title}</span>
              </AlertDialogTitle>
            </div>
          </AlertDialogHeader>
          <EditCategoryForm category={category} type={type} />
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={openAddSub} onOpenChange={(o) => setOpenAddSub(o)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="flex justify-between items-center">
              <AlertDialogCancel className="rounded-full p-0  w-9 h-9">
                <X size={17} />
              </AlertDialogCancel>
              <AlertDialogTitle>
                Add Sub To{" "}
                <span className="capitalize">
                  {category.title
                    .replace(/-/g, " ")
                    .replace(/\b\w/g, (char) => char.toUpperCase())}
                </span>
              </AlertDialogTitle>
            </div>
          </AlertDialogHeader>
          <AddCategoryForm
            type={type}
            closeModel={closeModal}
            category={category._id}
          />
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={openEdit} onOpenChange={(o) => setOpenEdit(o)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete{" "}
              {category.title}
              and remove data from the servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              onClick={() => mutation.mutate()}
              disabled={mutation.isPending}
            >
              {" "}
              {mutation.isPending ? "Deleting" : "Yes Delete"}{" "}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={view.open} onOpenChange={(o) => setView({ open: o })}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{category.title}</AlertDialogTitle>
          </AlertDialogHeader>
          <div>
            {data ? (
              <>
                <ul>
                  {data.data?.data?.categories.map((cat) => (
                    <SubCategoryItem
                      key={cat._id}
                      category={cat}
                      type={"product-sub-category"}
                    />
                  ))}
                </ul>
              </>
            ) : isError ? (
              <span>Error: {error.message}</span>
            ) : isLoading ? (
              <span>Loading...</span>
            ) : (
              <span>Not ready ...</span>
            )}
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Close</AlertDialogCancel>
            <Button onClick={() => setOpenAddSub(true)}>
              {mutation.isPending ? "Adding" : "Add New Sub"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <h4> {category.title}</h4>
      <div className="flex items-center">
        <p className="mr-5">{0}</p>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant={"ghost"}>
              <EllipsisVerticalIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel> {category.title}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setOpen(true)}>
              Edit
              <DropdownMenuShortcut>
                <Pencil size={13} />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setOpenEdit(true)}>
              Delete
              <DropdownMenuShortcut>
                <Trash2 size={13} />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setOpenAddSub(true)}>
              Add Sub
              <DropdownMenuShortcut>
                <Plus size={13} />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                setView({
                  open: true,
                  category: category._id,
                })
              }
            >
              View
              <DropdownMenuShortcut>
                <Eye size={13} />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default CategoryItem;
