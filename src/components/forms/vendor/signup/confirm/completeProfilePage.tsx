"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { RadioGroup } from "@/components/ui/radio-group";
import { VendorSignUpRequest } from "@/components/pages/vendor/signUpPage";
import { BaggageClaimIcon, ArrowLeft, EditIcon, LinkIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { DialogLoading } from "@/components/common/dialogLoading";
import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";
import requests from "@/utils/requests";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  CreditCard,
  Building,
  FileText,
  Image,
  Clock,
  DollarSign,
  GraduationCap,
  BriefcaseBusiness,
} from "lucide-react";
import { useAppDispatch } from "@/lib/redux/hooks";
import { updateBuildStatus } from "@/lib/redux/features/auth/authSlice";
import { truncateText } from "@/utils/common";

type VendorSignupSelectSellerTypeFormProps = {
  formStateData: VendorSignUpRequest;
  setStage: React.Dispatch<React.SetStateAction<number>>;
};

export function CompleteProfilePage({
  formStateData,
  setStage,
}: VendorSignupSelectSellerTypeFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [dialogStatus, setDialogStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("loading");

  const [dialogMessage, setDialogMessage] = useState<string>("");
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSubmitProfile = async () => {
    let finalData;

    let retailSellerData = {
      vendorType: formStateData.vendorType,
      sellerType: formStateData.sellerType,
      accountNumber: formStateData.accountNumber,
      bankCode: formStateData.bankCode,
      businessType: formStateData.businessType,
      businessDesc: formStateData.businessDesc,
      shopName: formStateData.shopName,
      shopAddress: formStateData.shopAddress,
      shopCity: formStateData.shopCity,
      shopState: formStateData.shopState,
      businessLegalName: formStateData.businessLegalName,
      businessEmail: formStateData.businessEmail,
      businessPhoneNumber: formStateData.businessPhoneNumber,
      businessRegNo: formStateData.businessRegNo,
      businessLogo: formStateData.businessLogo,
    };

    let wholesaleSellerData = {
      vendorType: formStateData.vendorType,
      sellerType: formStateData.sellerType,
      accountNumber: formStateData.accountNumber,
      bankCode: formStateData.bankCode,
      businessType: formStateData.businessType,
      businessDesc: formStateData.businessDesc,
      shopName: formStateData.shopName,
      shopAddress: formStateData.shopAddress,
      shopCity: formStateData.shopCity,
      shopState: formStateData.shopState,
      shopCountry: formStateData.shopCountry,
      businessLegalName: formStateData.businessLegalName,
      businessEmail: formStateData.businessEmail,
      businessPhoneNumber: formStateData.businessPhoneNumber,
      businessRegNo: formStateData.businessRegNo,
      businessLogo: formStateData.businessLogo,
    };

    let individualProfessionalData = {
      vendorType: formStateData.vendorType,
      professionalType: formStateData.professionalType,
      bankCode: formStateData.bankCode,
      accountNumber: formStateData.accountNumber,
      professionType: formStateData.professionType,
      professionName: formStateData.professionName,
      professionCity: formStateData.professionCity,
      professionDesc: formStateData.professionDesc,
      price: formStateData.price,
      expectedDelivery: formStateData.expectedDelivery,
      portfolio: formStateData.portfolio,
      qualifications: formStateData.qualifications,
    };

    let companyProfessionalData = {
      vendorType: formStateData.vendorType,
      professionalType: formStateData.professionalType,
      accountNumber: formStateData.accountNumber,
      bankCode: formStateData.bankCode,
      businessType: formStateData.businessType,
      businessDesc: formStateData.businessDesc,
      shopName: formStateData.shopName,
      shopAddress: formStateData.shopAddress,
      shopCity: formStateData.shopCity,
      shopState: formStateData.shopState,
      businessLegalName: formStateData.businessLegalName,
      businessEmail: formStateData.businessEmail,
      businessPhoneNumber: formStateData.businessPhoneNumber,
      businessRegNo: formStateData.businessRegNo,
      businessLogo: formStateData.businessLogo,
    };

    let logisticsData = {
      vendorType: formStateData.vendorType,
      sellerType: formStateData.sellerType,
      accountNumber: formStateData.accountNumber,
      bankCode: formStateData.bankCode,
      businessType: formStateData.businessType,
      businessDesc: formStateData.businessDesc,
      shopName: formStateData.shopName,
      shopAddress: formStateData.shopAddress,
      shopCity: formStateData.shopCity,
      shopState: formStateData.shopState,
      businessLegalName: formStateData.businessLegalName,
      businessEmail: formStateData.businessEmail,
      businessPhoneNumber: formStateData.businessPhoneNumber,
      businessRegNo: formStateData.businessRegNo,
      businessLogo: formStateData.businessLogo,
    };

    let realEstateData = {
      vendorType: formStateData.vendorType,
      sellerType: formStateData.sellerType,
      accountNumber: formStateData.accountNumber,
      bankCode: formStateData.bankCode,
      businessType: formStateData.businessType,
      businessDesc: formStateData.businessDesc,
      shopName: formStateData.shopName,
      shopAddress: formStateData.shopAddress,
      shopCity: formStateData.shopCity,
      shopState: formStateData.shopState,
      businessLegalName: formStateData.businessLegalName,
      businessEmail: formStateData.businessEmail,
      businessPhoneNumber: formStateData.businessPhoneNumber,
      businessRegNo: formStateData.businessRegNo,
      businessLogo: formStateData.businessLogo,
    };

    if (formStateData.vendorType == "logistic") {
      finalData = logisticsData;
    } else if (formStateData.vendorType == "real-estate") {
      finalData = realEstateData;
    } else if (
      formStateData.vendorType == "professional" &&
      formStateData.professionalType == "company"
    ) {
      finalData = companyProfessionalData;
    } else if (
      formStateData.vendorType == "professional" &&
      formStateData.professionalType == "individual"
    ) {
      finalData = individualProfessionalData;
    } else if (
      formStateData.vendorType == "seller" &&
      formStateData.sellerType == "wholeSale"
    ) {
      finalData = wholesaleSellerData;
    } else if (
      formStateData.vendorType == "seller" &&
      formStateData.sellerType == "retail"
    ) {
      finalData = retailSellerData;
    } else {
      finalData = retailSellerData;
    }

    try {
      setDialogStatus("loading"); // Show loading dialog
      setIsLoading(true);
      const res = await requests.patch("vendor/build-profile", finalData);
      toast.success(res.message);

      dispatch(updateBuildStatus());
      router.push(`/account/welcome`);

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

      setDialogStatus("error");
    }
  };

  return (
    <div>
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
      <div className="max-w-4xl mx-auto md:p-4">
        <ReviewSection formStateData={formStateData} />

        <div className="flex justify-end space-x-2 mt-6">
          <Button
            onClick={() => setStage(3)}
            className="flex items-center gap-2"
          >
            <EditIcon className="w-4 h-4" />
            Continue Edit
          </Button>
          <Button
            onClick={handleSubmitProfile}
            className="flex items-center gap-2"
          >
            <BaggageClaimIcon className="w-4 h-4" />
            Complete Profile
          </Button>
        </div>
      </div>
    </div>
  );
}

interface Qualification {
  degree: string;
  institute: string;
  year: string;
}

interface InfoItemProps {
  icon: React.ElementType;
  label: string;
  value?: string | number | null | Qualification[] | string[];
  type?: "default" | "qualifications" | "portfolio";
}

const InfoItem: React.FC<InfoItemProps> = ({
  icon: Icon,
  label,
  value,
  type = "default",
}) => {
  console.log(type);

  return (
    <div className="flex items-start space-x-3 mb-4">
      <Icon className="w-5 h-5 text-gray-500 mt-1 flex-shrink-0" />
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-500">{label}</p>

        {type === "qualifications" && Array.isArray(value) ? (
          <div className="space-y-2">
            {(value as Qualification[]).map((qual, index) => (
              <div key={index} className="bg-gray-50 p-2 rounded">
                <p className="text-base font-medium">{qual.degree}</p>
                <p className="text-sm text-gray-600">{qual.institute}</p>
                <p className="text-sm text-gray-500">{qual.year}</p>
              </div>
            ))}
          </div>
        ) : type === "portfolio" && Array.isArray(value) ? (
          <div className="space-y-1">
            {(value as string[]).map((link, index) => (
              <a
                key={index}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className=" text-blue-600 hover:text-blue-800 hover:underline truncate flex items-center"
              >
                <LinkIcon />
                {truncateText(link, 30)}
              </a>
            ))}
          </div>
        ) : (
          <p className="text-base">{value?.toString() || "Not provided"}</p>
        )}
      </div>
    </div>
  );
};

const ReviewSection = ({
  formStateData,
}: {
  formStateData: VendorSignUpRequest;
}) => {
  const isBusinessType =
    ["seller", "logistic", "real-estate"].includes(
      formStateData.vendorType as string
    ) ||
    (formStateData.vendorType === "professional" &&
      formStateData.professionalType === "company");

  const isProfessional = formStateData.vendorType === "professional";

  return (
    <div className="space-y-6 mb-6">
      <Card className="p-0 md:p-2">
        <CardHeader>
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            <Building2 className="w-5 h-5" />
            Profile Review
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Business/Professional Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium border-b pb-2">
                {isBusinessType
                  ? "Business Information"
                  : "Professional Information"}
              </h3>

              {isBusinessType ? (
                <>
                  <InfoItem
                    icon={Building}
                    label="Business Legal Name"
                    value={formStateData.businessLegalName}
                  />
                  <InfoItem
                    icon={Briefcase}
                    label="Business Type"
                    value={formStateData.businessType}
                  />
                  <InfoItem
                    icon={FileText}
                    label="Business Registration No."
                    value={formStateData.businessRegNo}
                  />
                  <InfoItem
                    icon={Mail}
                    label="Business Email"
                    value={formStateData.businessEmail}
                  />
                  <InfoItem
                    icon={Phone}
                    label="Business Phone"
                    value={formStateData.businessPhoneNumber}
                  />
                </>
              ) : (
                isProfessional && (
                  <>
                    <InfoItem
                      icon={Briefcase}
                      label="Profession Type"
                      value={formStateData.professionType}
                    />
                    <InfoItem
                      icon={FileText}
                      label="Profession Name"
                      value={formStateData.professionName}
                    />
                    <InfoItem
                      icon={MapPin}
                      label="City"
                      value={formStateData.professionCity}
                    />
                    <InfoItem
                      icon={Clock}
                      label="Expected Delivery"
                      value={formStateData.expectedDelivery}
                    />
                    <InfoItem
                      icon={DollarSign}
                      label="Price"
                      value={formStateData.price}
                    />
                  </>
                )
              )}
            </div>

            {/* Location & Additional Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium border-b pb-2">
                {isBusinessType ? "Shop Details" : "Additional Information"}
              </h3>

              {isBusinessType ? (
                <>
                  <InfoItem
                    icon={Building}
                    label="Shop Name"
                    value={formStateData.shopName}
                  />
                  <InfoItem
                    icon={MapPin}
                    label="Shop Address"
                    value={formStateData.shopAddress}
                  />
                  <InfoItem
                    icon={MapPin}
                    label="City"
                    value={formStateData.shopCity}
                  />
                  <InfoItem
                    icon={MapPin}
                    label="State"
                    value={formStateData.shopState}
                  />
                </>
              ) : (
                isProfessional && (
                  <>
                    <InfoItem
                      icon={FileText}
                      label="Professional Description"
                      value={formStateData.professionDesc}
                    />
                    <InfoItem
                      icon={BriefcaseBusiness}
                      label="Portfolio"
                      type="portfolio"
                      value={formStateData.portfolio}
                    />
                    <InfoItem
                      icon={GraduationCap}
                      label="Qualifications"
                      type="qualifications"
                      value={formStateData.qualifications}
                    />
                  </>
                )
              )}
            </div>

            {/* Banking Information */}
            <div className="md:col-span-2 space-y-4">
              <h3 className="text-lg font-medium border-b pb-2">
                Banking Information
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <InfoItem
                  icon={CreditCard}
                  label="Account Number"
                  value={formStateData.accountNumber}
                />
                <InfoItem
                  icon={Building}
                  label="Bank Code"
                  value={formStateData.bankCode}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
