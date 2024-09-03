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
import React, { useState } from "react";
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

export type CategoryItemProp = {
  id: string;
  name?: string;
  description?: string;
  productCount: number;
};

const SubCategoryItem = ({
  category,
  type,
}: {
  category: Category;
  type: CategoryType;
}) => {
  const [open, setOpen] = useState(false);

  const [openEdit, setOpenEdit] = useState(false);

  const mutation = useDeleteCategory(type, category._id, setOpenEdit);
  return (
    <div
      key={category._id}
      className="flex py-1 px-4   justify-between items-center align-middle border-b"
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
              {mutation.isPending ? "Deleting" : "Yes Delete"}{" "}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <h4> {category.title}</h4>
      <div className="flex items-center">
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
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default SubCategoryItem;
