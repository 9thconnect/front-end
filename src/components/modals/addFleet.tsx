"use client";

import React, { useState } from "react";
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
import FleetForm from "../forms/logistic/logisticForm";

const AddFleetModal = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Add Fleet</Button>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent className="max-w-3xl h-[90%] overflow-y-auto">
          <div className="relative h-full w-full">
            <AlertDialogHeader className="flex  flex-row items-center">
              <AlertDialogCancel className="bg-gray-100 rounded-full p-2 mr-3">
                <X />
              </AlertDialogCancel>
              <AlertDialogTitle>Add Fleet</AlertDialogTitle>
            </AlertDialogHeader>
          </div>

          <FleetForm setOpen={setOpen} />
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default AddFleetModal;
