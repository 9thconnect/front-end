"use client";

import AuthContainerCard from "@/components/cards/common/authContainerCard";
import { DialogLoading } from "@/components/common/dialogLoading";
import AccountDetailsForm, {
  accountDetailsValidationSchema,
} from "@/components/forms/vendor/signup/account/accountDetailsForm";
import ProfessionalDetailsForm, {
  professionalDetailsValidationSchema,
} from "@/components/forms/vendor/signup/account/professional/professionalDetailsForm";
import BusinessDetailsForm, {
  businessDetailsValidationSchema,
} from "@/components/forms/vendor/signup/business/businessDetailsForm";
import VendorSignupImageForm, {
  vendorSignupImageValidationSchema,
} from "@/components/forms/vendor/signup/image/vendorSignupImageForm";
import PasswordForm, {
  passwordValidationSchema,
} from "@/components/forms/vendor/signup/password/passwordFormData";
import VendorSignupProfileForm from "@/components/forms/vendor/signup/profile/vendorSignupProfileForm";
import { vendorSignupProfileValidationSchema } from "@/components/forms/vendor/signup/profile/vendorSignupProfileValidator";
import {
  SelectAccountTypeForm,
  selectAccountValidationSchema,
} from "@/components/forms/vendor/signup/type/accountTypeForm";
import { UserType } from "@/lib/redux/features/auth/authSlice";
import { signUp } from "@/lib/requests/vendor/auth";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

export interface VendorSignUpRequest {
  fullName?: string;
  email?: string;
  phoneNumber?: string;
  vendorType?: "professional" | "seller";
  password?: string;
  gender?: string;
  accountNumber?: string;
  accountName?: string;
  bankCode?: string;
  businessType?: string;
  businessDesc?: string;
  shopName?: string;
  shopAddress?: string;
  shopCity?: string;
  businessLegalName?: string;
  businessEmail?: string;
  businessPhoneNumber?: string;
  businessRegNo?: string;
  businessLogo?: string;
  avatar?: string;
  professionType?: string;
  professionName?: string;
  professionCity?: string;
  professionDesc?: string;
}

const VendorSignUpPage = ({ type }: { type: UserType }) => {
  const [stage, setStage] = useState(1);

  const [isLoading, setIsLoading] = useState(false);
  const [dialogStatus, setDialogStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("loading");
  const [dialogMessage, setDialogMessage] = useState<string>("");
  const router = useRouter();

  const [data, setData] = useState<VendorSignUpRequest>({
    fullName: "",
    email: "",
    phoneNumber: "",
    vendorType: "seller",
    password: "",
    gender: "",
    accountNumber: "",
    accountName: "",
    bankCode: "",
    businessType: "",
    businessDesc: "",
    shopName: "",
    shopAddress: "",
    shopCity: "",
    businessLegalName: "",
    businessEmail: "",
    businessPhoneNumber: "",
    businessRegNo: "",
    businessLogo: "",
    avatar: "",
    professionType: "",
    professionName: "",
    professionCity: "",
    professionDesc: "",
  });
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

    setStage(2);
  };

  const handleSubmitStageTwo = (
    formData: z.infer<typeof vendorSignupImageValidationSchema>
  ) => {
    setData((prevData) => ({
      ...prevData,
      gender: formData.gender,
      avatar: formData.image,
    }));

    console.log(type, data);

    if (type == "customer") {
      console.log("na customer");

      setStage(7);
    } else {
      setStage(3);
    }
  };

  const handleSubmitStageThree = (
    formData: z.infer<typeof accountDetailsValidationSchema>
  ) => {
    setData((prevData) => ({
      ...prevData,
      accountNumber: formData.accountNumber,
      bankCode: formData.bank,
      accountName: formData.accountName,
    }));

    console.log(data, formData);

    setStage(4);
  };

  const handleSubmitStageFour = (
    formData: z.infer<typeof selectAccountValidationSchema>
  ) => {
    setData((prevData) => ({
      ...prevData,
      vendorType: formData.type,
    }));

    console.log(data, formData);

    if (formData.type == "seller") {
      setStage(5);
    } else {
      setStage(6);
    }
  };

  const handleSubmitStageFive = async (
    formData: z.infer<typeof businessDetailsValidationSchema>
  ) => {
    setData((prevData) => ({
      ...prevData,
      businessDesc: formData.businessDesc,
      shopName: formData.shopName,
      shopAddress: formData.shopAddress,
      shopCity: formData.shopCity,
      businessLegalName: formData.businessLegalName,
      businessEmail: formData.businessEmail,
      businessPhoneNumber: formData.businessPhoneNumber,
      businessRegNo: formData.businessRegNo,
      businessLogo: formData.businessLegalName,
      businessType: formData.businessType,
    }));

    setStage(7);
  };

  const handleSubmitStageSix = (
    formData: z.infer<typeof professionalDetailsValidationSchema>
  ) => {
    setData((prevData) => ({
      ...prevData,
      professionType: formData.professionType,
      professionName: formData.professionName,
      professionCity: formData.professionCity,
      professionDesc: formData.professionDesc,
    }));

    console.log(data, formData);

    setStage(7);

    // submit
  };

  const handleSubmitStageSeven = async (
    formData: z.infer<typeof passwordValidationSchema>
  ) => {
    setData((prevData) => ({
      ...prevData,
      password: formData.password,
    }));

    const updatedData = { ...data, password: formData.password };

    const { accountName, ...dataWithoutAccountName } = updatedData;

    console.log("form data", updatedData);

    try {
      setDialogStatus("loading"); // Show loading dialog
      setIsLoading(true);
      const res = await signUp(dataWithoutAccountName, type);
      toast.success("Account creation successful, check email for OTP");
      router.push(`/${type}/verify?email=${data.email}`);

      console.log(res);
    } catch (error) {
      // router.push(`verify?email=${data.email}`);

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

  return (
    <AuthContainerCard
      backUrl="/"
      image="/images/Ads.png"
      title="Create Your Profile"
      body="We are excited to get you started as well. See you at the other side."
    >
      {/* <DialogLoading
        onButtonClick={() => {}}
        status={"loading"}
        successMessage="Successfully verify your account"
        errorMessage="Error doing the operation"
        open={isLoading}
      /> */}

      <DialogLoading
        open={isLoading}
        status={dialogStatus}
        loadingMessage="Processing your request..."
        successMessage={dialogMessage}
        errorMessage={dialogMessage}
        onClose={() => {
          setIsLoading(false);
          setDialogStatus("idle");
        }}
      />
      <div>
        <h2>Create your Profile</h2>
        <p>
          We are excited to get you started as well. See you at the other side.
        </p>
        <div>
          {stage == 1 && (
            <VendorSignupProfileForm
              onSubmit={handleSubmitStageOne}
              formStateData={data}
            />
          )}
          {stage == 2 && (
            <VendorSignupImageForm
              onSubmit={handleSubmitStageTwo}
              formStateData={data}
            />
          )}
          {stage == 3 && (
            <AccountDetailsForm
              onSubmit={handleSubmitStageThree}
              formStateData={data}
            />
          )}
          {stage == 4 && (
            <SelectAccountTypeForm
              onSubmit={handleSubmitStageFour}
              formStateData={data}
            />
          )}
          {stage == 5 && (
            <BusinessDetailsForm
              onSubmit={handleSubmitStageFive}
              formStateData={data}
            />
          )}
          {stage == 6 && (
            <ProfessionalDetailsForm
              onSubmit={handleSubmitStageSix}
              formStateData={data}
            />
          )}
          {stage == 7 && (
            <PasswordForm
              onSubmit={handleSubmitStageSeven}
              formStateData={data}
            />
          )}
        </div>
      </div>
    </AuthContainerCard>
  );
};

export default VendorSignUpPage;
