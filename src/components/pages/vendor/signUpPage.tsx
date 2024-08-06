"use client";

import AuthContainerCard from "@/components/cards/common/authContainerCard";
import VendorSignupProfileForm from "@/components/forms/vendor/signup/profile/vendorSignupProfileForm";
import { vendorSignupProfileValidationSchema } from "@/components/forms/vendor/signup/profile/vendorSignupProfileValidator";
import React from "react";
import { z } from "zod";

const VendorSignUpPage = () => {
  const handleSubmit = (
    data: z.infer<typeof vendorSignupProfileValidationSchema>
  ) => {
    console.log(data);
  };
  return (
    <AuthContainerCard
      backUrl="/"
      image="/images/Ads.png"
      title="Create Your Profile"
      body="We are excited to get you started as well. See you at the other side."
    >
      <div>
        <h2>Create your Profile</h2>
        <p>
          We are excited to get you started as well. See you at the other side.
        </p>
        <div>
          <VendorSignupProfileForm onSubmit={handleSubmit} />
        </div>
      </div>
    </AuthContainerCard>
  );
};

export default VendorSignUpPage;
