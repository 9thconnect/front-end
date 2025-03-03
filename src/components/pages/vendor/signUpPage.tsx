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

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProfessionalCompanyDetailsForm, {
  professionalCompanyDetailsValidationSchema,
} from "@/components/forms/vendor/signup/account/professional/companyDetail";
import QualificationForm, {
  QualificationValidationSchema,
} from "@/components/forms/vendor/signup/account/professional/artisan/qualificationForm";
import PortfolioForm, {
  PortfolioValidationSchema,
} from "@/components/forms/vendor/signup/account/professional/artisan/portfolioForm";
import { SubmitHandler } from "react-hook-form";
import {
  SelectSellerTypeForm,
  selectSellerTypeValidationSchema,
} from "@/components/forms/vendor/signup/sellerType/sellerTypeForm";

export interface VendorSignUpRequest {
  fullName?: string;
  email?: string;
  phoneNumber?: string;
  vendorType?: "professional" | "seller" | "logistic" | "real-estate";
  password?: string;
  gender?: string;
  accountNumber?: string;
  accountName?: string;
  bankCode?: string;
  businessType?: string;
  businessDesc?: string;
  shopName?: string;
  shopCountry?: string;
  shopAddress?: string;
  shopCity?: string;
  shopState?: string;
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
  professionalType?: "individual" | "company";
  sellerType?: "wholeSale" | "retail";
  price?: number;
  expectedDelivery?: number;
  qualifications?: Array<{
    degree: string;
    institute: string;
    year: string;
  }>;
  portfolio?: string[];
  agreement?: boolean;
}

const VendorSignUpPage = ({ type }: { type: UserType }) => {
  const [stage, setStage] = useState(1);
  const [previousStage, setPreviousStage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [dialogStatus, setDialogStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("loading");

  const updateStage = (newStage: number) => {
    setPreviousStage(stage);
    setStage(newStage);
  };

  const [openSelectProType, setOpenSelectProType] = useState(false);

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
    shopCountry: "",
    shopAddress: "",
    shopCity: "",
    shopState: "",
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
    qualifications: [],
    portfolio: [],
    agreement: false,
  });

  const handleSubmitStageOne = (
    formData: z.infer<typeof vendorSignupProfileValidationSchema>
  ) => {
    if (!formData.agreement) {
      toast.error("Please agree to our Terms and Conditions");
      return;
    }
    setData((prevData) => ({
      ...prevData,
      fullName: formData.fullName,
      email: formData.email,
      phoneNumber: formData.phone,
      gender: formData.gender,
      agreement: formData.agreement,
    }));

    console.log(formData);

    if (type == UserType.CUSTOMER) {
      updateStage(7);
    } else {
      updateStage(4);
    }
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

      updateStage(7);
    } else {
      updateStage(3);
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

    updateStage(4);
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
      updateStage(11);
    } else if (formData.type == "professional") {
      setOpenSelectProType(true);
    } else {
      updateStage(7);
    }
  };

  const handleSubmitStageFive = async (
    formData: z.infer<typeof businessDetailsValidationSchema>
  ) => {
    setData((prevData) => ({
      ...prevData,
      businessDesc: formData.businessDesc,
      shopName: formData.shopName,
      shopCountry: formData.shopCountry,
      shopAddress: formData.shopAddress,
      shopCity: formData.shopCity,
      shopState: formData.shopState,
      businessLegalName: formData.businessLegalName,
      businessEmail: formData.businessEmail,
      businessPhoneNumber: formData.businessPhoneNumber,
      businessRegNo: formData.businessRegNo,
      businessLogo: formData.businessLogo,
      businessType: formData.businessType,
    }));

    updateStage(7);
  };

  const handleSubmitStageEight = async (
    formData: z.infer<typeof professionalCompanyDetailsValidationSchema>
  ) => {
    setData((prevData) => ({
      ...prevData,
      businessDesc: formData.businessDesc,
      shopName: formData.shopName,
      shopAddress: formData.shopAddress,
      shopCity: formData.shopCity,
      shopState: formData.shopState,
      businessLegalName: formData.businessLegalName,
      businessEmail: formData.businessEmail,
      businessPhoneNumber: formData.businessPhoneNumber,
      businessRegNo: formData.businessRegNo,
      businessLogo: formData.businessLogo,
      businessType: formData.businessType,
      professionalType: "company",
    }));

    updateStage(7);
  };

  const handleSubmitStageNine: SubmitHandler<QualificationValidationSchema> = (
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

    updateStage(10);
  };

  const handleSubmitStageTen: SubmitHandler<PortfolioValidationSchema> = (
    data
  ) => {
    // Handle the submitted data
    console.log(data.portfolio);
    // You can process the qualifications data here
    // For example, update your state or send it to an API

    setData((prevData) => ({
      ...prevData,
      portfolio: data.portfolio.map((image) => image.imageUrl),
    }));

    updateStage(7);
  };

  const handleSubmitStageEleven = (
    formData: z.infer<typeof selectSellerTypeValidationSchema>
  ) => {
    setData((prevData) => ({
      ...prevData,
      sellerType: formData.sellerType,
    }));

    console.log(data, formData);

    updateStage(7);
  };

  const handleSubmitStageSix = (
    formData: z.infer<typeof professionalDetailsValidationSchema>
  ) => {
    console.log("company form data");

    setData((prevData) => ({
      ...prevData,
      professionType: formData.professionType,
      professionName: formData.professionName,
      professionCity: formData.professionCity,
      professionDesc: formData.professionDesc,
      professionalType: "individual",
      price: formData.price,
      expectedDelivery: formData.expectedDelivery,
    }));

    console.log(data, formData);

    updateStage(9);

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

    console.log(
      "dataWithoutAccountName",
      type == UserType.VENDOR,
      dataWithoutAccountName.vendorType,
      dataWithoutAccountName.professionType,
      dataWithoutAccountName.professionalType
    );

    let finalData;

    let retailSellerData = {
      fullName: dataWithoutAccountName.fullName,
      email: dataWithoutAccountName.email,
      phoneNumber: dataWithoutAccountName.phoneNumber,
      vendorType: dataWithoutAccountName.vendorType,
      sellerType: dataWithoutAccountName.sellerType,
      password: dataWithoutAccountName.password,
      gender: dataWithoutAccountName.gender,
    };

    let wholesaleSellerData = {
      fullName: dataWithoutAccountName.fullName,
      email: dataWithoutAccountName.email,
      phoneNumber: dataWithoutAccountName.phoneNumber,
      vendorType: dataWithoutAccountName.vendorType,
      sellerType: dataWithoutAccountName.sellerType,
      password: dataWithoutAccountName.password,
      gender: dataWithoutAccountName.gender,
    };

    let individualProfessionalData = {
      fullName: dataWithoutAccountName.fullName,
      email: dataWithoutAccountName.email,
      phoneNumber: dataWithoutAccountName.phoneNumber,
      vendorType: dataWithoutAccountName.vendorType,
      professionalType: "individual",
      password: dataWithoutAccountName.password,
      gender: dataWithoutAccountName.gender,
    };

    let companyProfessionalData = {
      fullName: dataWithoutAccountName.fullName,
      email: dataWithoutAccountName.email,
      phoneNumber: dataWithoutAccountName.phoneNumber,
      vendorType: dataWithoutAccountName.vendorType,
      professionalType: "company",
      password: dataWithoutAccountName.password,
      gender: dataWithoutAccountName.gender,
    };

    let customerData = {
      fullName: dataWithoutAccountName.fullName,
      email: dataWithoutAccountName.email,
      phoneNumber: dataWithoutAccountName.phoneNumber,
      password: dataWithoutAccountName.password,
    };

    let logisticsData = {
      fullName: dataWithoutAccountName.fullName,
      email: dataWithoutAccountName.email,
      phoneNumber: dataWithoutAccountName.phoneNumber,
      password: dataWithoutAccountName.password,
      vendorType: dataWithoutAccountName.vendorType,
      gender: dataWithoutAccountName.gender,
    };

    let realEstateData = {
      fullName: dataWithoutAccountName.fullName,
      email: dataWithoutAccountName.email,
      phoneNumber: dataWithoutAccountName.phoneNumber,
      password: dataWithoutAccountName.password,
      vendorType: dataWithoutAccountName.vendorType,
      gender: dataWithoutAccountName.gender,
    };

    if (type == UserType.CUSTOMER) {
      finalData = customerData;
    } else if (
      type == UserType.VENDOR &&
      dataWithoutAccountName.vendorType == "logistic"
    ) {
      finalData = logisticsData;
    } else if (
      type == UserType.VENDOR &&
      dataWithoutAccountName.vendorType == "real-estate"
    ) {
      finalData = realEstateData;
    } else if (
      type == UserType.VENDOR &&
      dataWithoutAccountName.vendorType == "professional" &&
      dataWithoutAccountName.professionalType == "company"
    ) {
      finalData = companyProfessionalData;
    } else if (
      type == UserType.VENDOR &&
      dataWithoutAccountName.vendorType == "professional" &&
      dataWithoutAccountName.professionalType == "individual"
    ) {
      finalData = individualProfessionalData;
    } else if (
      type == UserType.VENDOR &&
      dataWithoutAccountName.vendorType == "seller" &&
      dataWithoutAccountName.sellerType == "wholeSale"
    ) {
      finalData = wholesaleSellerData;
    } else if (
      type == UserType.VENDOR &&
      dataWithoutAccountName.vendorType == "seller" &&
      dataWithoutAccountName.sellerType == "retail"
    ) {
      finalData = retailSellerData;
    } else {
      finalData = retailSellerData;
    }

    try {
      setDialogStatus("loading"); // Show loading dialog
      setIsLoading(true);
      const res = await signUp(finalData, type);
      toast.success(res.message);

      // if (type == UserType.VENDOR) {
      router.push(`/${type}/verify?email=${data.email}`);
      // return;
      // }

      // router.push(`/${type}/login`);

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

      <Dialog
        open={openSelectProType}
        onOpenChange={(state) => setOpenSelectProType(state)}
        modal
      >
        <DialogContent className="rounded-lg px-2 max-w-2xl">
          <DialogHeader>
            <div className="flex justify-between items-center mb-4">
              <span
                onClick={() => setOpenSelectProType(false)}
                className="bg-gray-100 flex justify-center items-center rounded-full p-1 h-10 w-10 mr-3 cursor-pointer"
              >
                <X size={15} />
              </span>
              <DialogTitle className="text-black text-2xl">
                Become a professional
              </DialogTitle>
            </div>

            <Separator className="mt-3" />
            <DialogDescription className="flex space-x-3">
              <div className="border w-1/2 rounded-xl overflow-hidden">
                <div className="bg-[url('https://res.cloudinary.com/dougwnqok/image/upload/v1727799631/4d56ce8c38262e55c19c507e6ac71960_kt6zfd.png')] bg-cover h-60 bg-no-repeat"></div>
                <div className="p-4">
                  <h2 className="font-bold text-lg text-offBlack">Company</h2>
                  <p>For companies and business owners</p>
                  <Button
                    onClick={() => {
                      console.log("kwkwkwf");

                      setData((prevData) => ({
                        ...prevData,
                        professionalType: "company",
                      }));
                      setOpenSelectProType(false);
                      setPreviousStage(4);
                      setStage(7);
                    }}
                    className="w-full mt-4"
                  >
                    Signup
                  </Button>
                </div>
              </div>
              <div className="border w-1/2 rounded-xl overflow-hidden">
                <div className="bg-[url('https://res.cloudinary.com/dougwnqok/image/upload/v1727799634/d51f1918fcfd3a3890328613e2556e35_qs9kgs.png')] bg-cover h-60 bg-no-repeat"></div>
                <div className="p-4">
                  <h2 className="font-bold text-lg text-offBlack">
                    Individual
                  </h2>
                  <p>Sign up as an individual worker or sole proprietor</p>
                  <Button
                    onClick={() => {
                      setData((prevData) => ({
                        ...prevData,
                        professionalType: "individual",
                      }));
                      setOpenSelectProType(false);
                      setPreviousStage(4);
                      setStage(7);
                    }}
                    className="w-full mt-4"
                  >
                    Signup
                  </Button>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <div>
        <div>
          {stage == 1 && (
            <VendorSignupProfileForm
              onSubmit={handleSubmitStageOne}
              formStateData={data}
              type={type}
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

          {stage == 4 && (
            <SelectAccountTypeForm
              onSubmit={handleSubmitStageFour}
              formStateData={data}
              setStage={setStage}
            />
          )}
          {stage == 5 && (
            <BusinessDetailsForm
              onSubmit={handleSubmitStageFive}
              formStateData={data}
              setStage={setStage}
            />
          )}
          {stage == 6 && (
            <ProfessionalDetailsForm
              onSubmit={handleSubmitStageSix}
              formStateData={data}
              setStage={setStage}
              previousStage={4}
            />
          )}
          {stage == 7 && (
            <PasswordForm
              onSubmit={handleSubmitStageSeven}
              formStateData={data}
              previousStage={previousStage}
              setStage={setStage}
            />
          )}
          {stage == 8 && (
            <ProfessionalCompanyDetailsForm
              onSubmit={handleSubmitStageEight}
              formStateData={data}
              setStage={setStage}
            />
          )}

          {stage == 9 && (
            <QualificationForm
              onSubmit={handleSubmitStageNine}
              formStateData={data}
              setStage={setStage}
              previousStage={4}
            />
          )}
          {stage == 10 && (
            <PortfolioForm
              onSubmit={handleSubmitStageTen}
              formStateData={data}
              setStage={setStage}
            />
          )}
          {stage == 11 && (
            <SelectSellerTypeForm
              onSubmit={handleSubmitStageEleven}
              formStateData={data}
              setStage={setStage}
            />
          )}
        </div>
      </div>
    </AuthContainerCard>
  );
};

export default VendorSignUpPage;
