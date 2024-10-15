"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getMyBusiness } from "@/lib/requests/vendor/profile";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import BusinessDetailsForm, {
  businessDetailsValidationSchema,
} from "@/components/forms/vendor/signup/business/businessDetailsForm";
import { z } from "zod";
import { VendorSignUpRequest } from "./signUpPage";
import requests from "@/utils/requests";
import { toast } from "sonner";

const MyBusinessPage = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<VendorSignUpRequest | null>(null);

  const { isLoading, isError, data, error, isFetching } = useQuery({
    queryKey: ["get-businesses"],
    queryFn: getMyBusiness,
  });

  const queryClient = useQueryClient();

  // useEffect to update formData when loading has stopped and there's no error
  useEffect(() => {
    if (!isLoading && !isError && data && data.data) {
      const businessData = data.data[0];
      setFormData({
        vendorType: "seller",
        businessType: businessData?.businessType?._id,
        businessDesc: businessData?.businessDesc,
        shopName: businessData?.shopName,
        shopAddress: businessData?.shopAddress,
        shopCity: businessData?.shopCity,
        businessLegalName: businessData?.businessLegalName,
        businessEmail: businessData?.businessEmail,
        businessPhoneNumber: businessData?.businessPhoneNumber,
        businessRegNo: businessData?.businessRegNo,
        businessLogo: businessData?.businessLogo,
      });
    }
  }, [isLoading, isError, data]);

  if (isLoading || isFetching) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (isError) {
    return (
      <div className="text-center mt-10 text-red-500">
        Error: {error?.message}
      </div>
    );
  }

  const businessData = data?.data?.[0] ?? null;

  const handleSubmit = async (
    formData: z.infer<typeof businessDetailsValidationSchema>
  ) => {
    try {
      let res = await requests.patch(
        `vendor/update-my-business/${businessData?._id}`,
        formData
      );

      //get-businesses

      queryClient.invalidateQueries({ queryKey: [`get-businesses`] });

      toast.success(res.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
        <DialogTrigger asChild>
          <Button variant="outline">Edit Profile</Button>
        </DialogTrigger>
        <DialogContent className="h-[95%] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Edit {businessData?.shopName} ({businessData?.businessType?.title}
              )
            </DialogTitle>
            <DialogDescription>
              Make changes to your business here. Click save when you are done.
            </DialogDescription>
          </DialogHeader>
          {formData && (
            <BusinessDetailsForm
              formStateData={formData}
              onSubmit={handleSubmit}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Business Details */}
      <div className="flex justify-between items-center border-b pb-2">
        <h3 className="hidden sm:block text-xl text-offBlack">
          {businessData?.shopName} ({businessData?.businessType?.title})
        </h3>
        <div className="flex space-x-2 items-center">
          <p>Status</p>
          <Button variant="outline" disabled>
            {businessData?.businessApproved ? "Approved" : "Pending Approval"}
          </Button>
          <Button variant="outline">
            {businessData?.businessActive ? "Active" : "Inactive"}
          </Button>
        </div>
      </div>

      <div className="mt-3">
        <p className="text-sm">Business Email: {businessData?.businessEmail}</p>
        <p className="text-md text-offBlack">Shop ID: {businessData?.shopID}</p>
        <p className="text-md text-offBlack">
          Owner: {businessData?.vendor?.fullName}
        </p>
      </div>

      <div className="mt-6">
        <p className="text-offBlack">Business Details</p>
        <div className="px-1 py-2 border mt-2 rounded-lg">
          <div className="flex justify-between items-center px-2">
            <p>Business Name</p>
            <p className="text-offBlack">{businessData?.businessLegalName}</p>
          </div>
          <div className="flex justify-between items-center mt-3 px-2">
            <p>Business Registration No</p>
            <p className="text-offBlack">{businessData?.businessRegNo}</p>
          </div>

          <Separator orientation="horizontal" />

          <div className="flex justify-between items-center my-3 px-2">
            <p>Business Description</p>
            <p className="text-offBlack">{businessData?.businessDesc}</p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <p className="text-offBlack">Shop Information</p>
        <div className="px-2 py-2 border mt-2 rounded-lg">
          <div className="flex justify-between items-center mt-3">
            <p>Address</p>
            <p className="text-offBlack text-right">
              {businessData?.shopAddress}
            </p>
          </div>
          <div className="flex justify-between items-center mt-3">
            <p>City</p>
            <p className="text-offBlack text-right">{businessData?.shopCity}</p>
          </div>
          <div className="flex justify-between items-center mt-3">
            <p>Phone Number</p>
            <p className="text-offBlack text-right">
              {businessData?.businessPhoneNumber}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-2">
        <div className="px-2 py-2 border mt-2 rounded-lg">
          <div className="flex justify-between items-center">
            <p>Vendor Email</p>
            <p className="text-offBlack">{businessData?.vendor?.email}</p>
          </div>
          <div className="flex justify-between items-center my-3">
            <p>Vendor ID</p>
            <p className="text-offBlack">{businessData?.vendor?.vendorID}</p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <p className="text-offBlack">Business Logo</p>
        <div className="px-2 py-2 border mt-2 rounded-lg">
          <div className="flex justify-between items-center mt-3">
            <img
              src={businessData?.businessLogo}
              alt="Business Logo"
              className="h-24 w-24 object-cover"
            />
          </div>
        </div>
      </div>

      <Button onClick={() => setOpen(true)} className="mt-4 w-full">
        Update {businessData?.shopName} ({businessData?.businessType?.title})
      </Button>
    </div>
  );
};

export default MyBusinessPage;
