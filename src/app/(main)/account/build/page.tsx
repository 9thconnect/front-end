"use client";

import VendorBuildProfilePage from "@/components/pages/vendor/buildProfilePage";
import { UserType } from "@/lib/redux/features/auth/authSlice";
import React from "react";

const Page = () => {
  return <VendorBuildProfilePage type={UserType.VENDOR} />;
};

export default Page;
