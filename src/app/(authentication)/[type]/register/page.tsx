import AuthContainerCard from "@/components/cards/common/authContainerCard";
import VendorSignupProfileForm from "@/components/forms/vendor/signup/profile/vendorSignupProfileForm";
import { vendorSignupProfileValidationSchema } from "@/components/forms/vendor/signup/profile/vendorSignupProfileValidator";
import VendorSignUpPage from "@/components/pages/vendor/signUpPage";
import { UserType } from "@/lib/redux/features/auth/authSlice";
import React from "react";
import { z } from "zod";

type Props = {
  params: { type: UserType };
  searchParams: { [key: string]: string | string[] | undefined };
};
const page = ({ searchParams, params }: Props) => {
  return <VendorSignUpPage type={params.type} />;
};

export default page;
