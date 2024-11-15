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
import { z } from "zod";
import { vendorSignupProfileValidationSchema } from "../forms/vendor/signup/profile/vendorSignupProfileValidator";
import VendorSignupProfileForm from "../forms/vendor/signup/profile/vendorSignupProfileForm";
import { UserType } from "@/lib/redux/features/auth/authSlice";
import VendorSignupImageForm, {
  vendorSignupImageValidationSchema,
} from "../forms/vendor/signup/image/vendorSignupImageForm";
import ProfessionalDetailsForm, {
  professionalDetailsValidationSchema,
} from "../forms/vendor/signup/account/professional/professionalDetailsForm";
import QualificationForm, {
  QualificationValidationSchema,
} from "../forms/vendor/signup/account/professional/artisan/qualificationForm";
import { SubmitHandler } from "react-hook-form";
import PortfolioForm, {
  PortfolioValidationSchema,
} from "../forms/vendor/signup/account/professional/artisan/portfolioForm";
import { DialogLoading } from "../common/dialogLoading";
import requests from "@/utils/requests";
import { toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";

export interface ArtisanSignUpRequest {
  fullName?: string;
  email?: string;
  phoneNumber?: string;
  gender?: string;
  avatar?: string;
  professionName?: string;
  professionCity?: string;
  professionDesc?: string;
  price?: number;
  qualifications?: Array<{
    degree: string;
    institute: string;
    year: string;
  }>;
  portfolio?: string[];
}

const AddWorkerModal = () => {
  const [stage, setStage] = useState(1);
  const [previousStage, setPreviousStage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [dialogStatus, setDialogStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("loading");
  const [data, setData] = useState<ArtisanSignUpRequest>({
    fullName: "",
    email: "",
    phoneNumber: "",
    gender: "",
    avatar: "",
    professionName: "",
    professionCity: "",
    professionDesc: "",
    qualifications: [],
    portfolio: [],
  });
  const [dialogMessage, setDialogMessage] = useState<string>("");

  const updateStage = (newStage: number) => {
    setPreviousStage(stage);
    setStage(newStage);
  };

  const handleSubmitStageOne = (
    formData: z.infer<typeof vendorSignupProfileValidationSchema>
  ) => {
    setData((prevData) => ({
      ...prevData,
      fullName: formData.fullName,
      email: formData.email,
      phoneNumber: formData.phone,
    }));

    console.log(data);

    updateStage(2);
  };

  const handleSubmitStageTwo = (
    formData: z.infer<typeof vendorSignupImageValidationSchema>
  ) => {
    setData((prevData) => ({
      ...prevData,
      gender: formData.gender,
      avatar: formData.image,
    }));

    updateStage(3);
  };

  const handleSubmitStageThree = (
    formData: z.infer<typeof professionalDetailsValidationSchema>
  ) => {
    console.log("company form data");

    setData((prevData) => ({
      ...prevData,
      professionType: formData.professionType,
      professionName: formData.professionName,
      professionCity: formData.professionCity,
      professionDesc: formData.professionDesc,
      price: formData.price,
      expectedDelivery: formData.expectedDelivery,
    }));

    updateStage(4);
  };

  const handleSubmitStageFour: SubmitHandler<QualificationValidationSchema> = (
    data
  ) => {
    // Handle the submitted data
    console.log(data.qualifications);
    // You can process the qualifications data here
    // For example, update your state or send it to an API

    setData((prevData) => ({
      ...prevData,
      qualifications: data.qualifications,
    }));

    updateStage(5);
  };

  const handleSubmitStageFive: SubmitHandler<
    PortfolioValidationSchema
  > = async (formData) => {
    setData((prevData) => ({
      ...prevData,
      portfolio: formData.portfolio.map((image) => image.imageUrl),
    }));

    try {
      setDialogStatus("loading"); // Show loading dialog
      setIsLoading(true);
      const res = await requests.post<null>(`/artisan/register`, data);

      toast.success(res.message);

      setDialogStatus("success");
      setDialogMessage(res.message);

      setStage(0);

      setData({
        fullName: "",
        email: "",
        phoneNumber: "",
        gender: "",
        avatar: "",
        professionName: "",
        professionCity: "",
        professionDesc: "",
        qualifications: [],
        portfolio: [],
      });

      console.log(res);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setDialogMessage(error.response?.data.message);
        toast.error(error.response?.data.message);
      } else {
        toast.error("An error occurred try again");
        // Just a stock error
      }

      console.log(error);
      setDialogStatus("error");

      // Show error dialog
    } finally {
      // setIsLoading(false); // Hide loading dialog
    }
  };

  const router = useRouter();

  return (
    <div>
      <DialogLoading
        open={isLoading}
        status={dialogStatus}
        loadingMessage="Processing your request..."
        successMessage={dialogMessage}
        errorMessage={dialogMessage}
        successButtonText="View Artisan"
        onSuccessButtonClick={() => setIsLoading(false)}
        onClose={() => {
          setIsLoading(false);
          setDialogStatus("idle");
        }}
      />
      <AlertDialog>
        <AlertDialogTrigger>
          <Button>Add Worker</Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="max-w-xl  overflow-y-auto text-offBlack">
          <div className="relative h-full w-full">
            <AlertDialogHeader className="flex absolute top-3 right-0  flex-row items-center">
              <AlertDialogCancel className="bg-gray-100 rounded-full p-1 h-10 w-10 mr-3">
                <X size={15} />
              </AlertDialogCancel>
              <AlertDialogTitle></AlertDialogTitle>
            </AlertDialogHeader>
          </div>
          {stage == 1 && (
            <VendorSignupProfileForm
              onSubmit={handleSubmitStageOne}
              formStateData={data}
              type={UserType.VENDOR}
              setStage={setStage}
            />
          )}
          {stage == 2 && (
            <VendorSignupImageForm
              onSubmit={handleSubmitStageTwo}
              formStateData={data}
              setStage={setStage}
            />
          )}

          {stage == 3 && (
            <ProfessionalDetailsForm
              onSubmit={handleSubmitStageThree}
              formStateData={data}
              setStage={setStage}
              previousStage={2}
            />
          )}

          {stage == 4 && (
            <QualificationForm
              onSubmit={handleSubmitStageFour}
              formStateData={data}
              setStage={setStage}
              previousStage={3}
            />
          )}
          {stage == 5 && (
            <PortfolioForm
              onSubmit={handleSubmitStageFive}
              formStateData={data}
              setStage={setStage}
            />
          )}
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AddWorkerModal;
