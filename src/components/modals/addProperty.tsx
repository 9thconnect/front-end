import React from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import PropertyForm from "../forms/property/propertyForm";

const AddPropertyModal = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button>Add Property</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-3xl h-[90%] overflow-y-auto">
        <div className="relative h-full w-full">
          <AlertDialogHeader className="flex  flex-row items-center">
            <AlertDialogCancel className="bg-gray-100 rounded-full p-2 mr-3">
              <X />
            </AlertDialogCancel>
            <AlertDialogTitle>Add Property</AlertDialogTitle>
          </AlertDialogHeader>
        </div>

        <PropertyForm />
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AddPropertyModal;
