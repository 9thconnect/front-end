"use client";
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
import { Button } from "../ui/button";
import ProductForm from "../forms/product/productForm";
import { X } from "lucide-react";
import { useAppSelector } from "@/lib/redux/hooks";
import { IVendor } from "@/type/users";
import { AlertCircle, Clock, Building2, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const BusinessAwaitingApproval = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-6 p-8">
      <div className="relative flex justify-center">
        <img
          src="/images/undraw_pending-approval_6cdu.png"
          alt="Business verification"
          className="rounded-lg lg:w-1/2"
        />
        <div className="absolute -bottom-4 -right-4 bg-primary p-3 rounded-full shadow-lg">
          <Clock className="w-8 h-8 text-white" />
        </div>
      </div>

      <Card className="w-full max-w-lg mt-8">
        <CardContent className="p-6">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <AlertCircle className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-semibold text-gray-800">
              Verification in Progress
            </h2>
          </div>

          <p className="text-gray-600 text-center mb-6">
            Your business is currently under review. We&apos;re working to
            verify your information to ensure the best experience for you and
            your customers.
          </p>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
              <Building2 className="w-5 h-5 text-blue-500" />
              <div>
                <h3 className="font-medium text-gray-800">Business Details</h3>
                <p className="text-sm text-gray-500">Under Review</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <div>
                <h3 className="font-medium text-gray-800">Expected Time</h3>
                <p className="text-sm text-gray-500">24-48 hours</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const AddProductModal = () => {
  const vendor = useAppSelector((state) => state.auth.data as IVendor);

  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button className="" onClick={() => setOpen(true)}>
        Add Product
      </Button>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent className="max-w-3xl h-[90%] overflow-y-auto">
          <div className="relative h-full w-full">
            <AlertDialogHeader className="flex  flex-row items-center">
              <AlertDialogCancel className="bg-gray-100 rounded-full p-2 mr-3">
                <X />
              </AlertDialogCancel>

              <AlertDialogTitle>
                {vendor &&
                vendor.businesses &&
                vendor.businesses[0].businessApproved
                  ? "Add Product"
                  : "Business Not Yet Approved"}
              </AlertDialogTitle>
            </AlertDialogHeader>
          </div>

          {vendor &&
          vendor.businesses &&
          vendor.businesses[0].businessApproved ? (
            <ProductForm setOpen={setOpen} />
          ) : (
            <BusinessAwaitingApproval />
          )}
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AddProductModal;
