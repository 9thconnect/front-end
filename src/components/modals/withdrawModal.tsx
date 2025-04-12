"use client";

import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogCancel,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { WithdrawForm } from "../forms/wallet/withdrawForm";

const WithdrawFromWalletModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)}>Withdraw</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-xl overflow-y-auto text-offBlack">
        <div className="relative h-full w-full">
          <AlertDialogHeader className="flex flex-row items-center">
            <AlertDialogCancel className="bg-gray-100 rounded-full p-1 h-10 w-10 mr-3">
              <X size={15} />
            </AlertDialogCancel>
            <AlertDialogTitle>Withdraw</AlertDialogTitle>
          </AlertDialogHeader>
        </div>
        <WithdrawForm setIsOpen={setIsOpen} />
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default WithdrawFromWalletModal;
