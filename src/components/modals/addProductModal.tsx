import React from "react";
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
import { Button } from "../ui/button";
import ProductForm from "../forms/product/productForm";
import { X } from "lucide-react";

const AddProductModal = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button>Add Product</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-3xl h-screen overflow-y-auto">
        <div className="relative h-full w-full">
          <AlertDialogHeader className="flex  flex-row items-center">
            <AlertDialogCancel className="bg-gray-100 rounded-full p-2 mr-3">
              <X />
            </AlertDialogCancel>
            <AlertDialogTitle>Add Product</AlertDialogTitle>
          </AlertDialogHeader>
        </div>

        <ProductForm />
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AddProductModal;
