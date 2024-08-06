import AuthContainerCard from "@/components/cards/common/authContainerCard";
import VendorSignupProfileForm from "@/components/forms/vendor/signup/profile/vendorSignupProfileForm";
import { vendorSignupProfileValidationSchema } from "@/components/forms/vendor/signup/profile/vendorSignupProfileValidator";
import VendorSignUpPage from "@/components/pages/vendor/signUpPage";
import React from "react";
import { z } from "zod";

const page = () => {
  return <VendorSignUpPage />;
};

export default page;
