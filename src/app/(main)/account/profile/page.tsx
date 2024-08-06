import React from "react";
import { metaObject } from "@/config/site.config";
import ProfileForm from "@/components/forms/profile/profileForm";
import { z } from "zod";
import { profileValidationSchema } from "@/components/forms/profile/profileValidator";

export const metadata = {
  ...metaObject("Hire A Professional"),
};

const Page = () => {
  return (
    <div>
      <h3 className="text-2xl text-offBlack border-b pb-4">
        Create Your Profile
      </h3>
      <ProfileForm />
    </div>
  );
};

export default Page;
