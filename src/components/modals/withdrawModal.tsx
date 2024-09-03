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
import { WithdrawForm } from "../forms/wallet/withdrawForm";

const WithdrawFromWallerModal = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button>Withdraw</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-xl  overflow-y-auto text-offBlack">
        <div className="relative h-full w-full">
          <AlertDialogHeader className="flex  flex-row items-center">
            <AlertDialogCancel className="bg-gray-100 rounded-full p-1 h-10 w-10 mr-3">
              <X size={15} />
            </AlertDialogCancel>
            <AlertDialogTitle>Withdraw</AlertDialogTitle>
          </AlertDialogHeader>
        </div>

        <WithdrawForm />
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default WithdrawFromWallerModal;
