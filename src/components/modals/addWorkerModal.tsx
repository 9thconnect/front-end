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

const AddWorkerModal = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button>Add Worker</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-xl  overflow-y-auto text-offBlack">
        <div className="relative h-full w-full">
          <AlertDialogHeader className="flex  flex-row items-center">
            <AlertDialogCancel className="bg-gray-100 rounded-full p-1 h-10 w-10 mr-3">
              <X size={15} />
            </AlertDialogCancel>
            <AlertDialogTitle>Add Worker</AlertDialogTitle>
          </AlertDialogHeader>
        </div>

        {/* <WithdrawForm /> */}
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AddWorkerModal;
