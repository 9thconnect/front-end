"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, LogOutIcon } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { IVendor } from "@/type/users";
import ProfileForm from "@/components/forms/profile/profileForm";
import VendorSignUpPage from "@/components/pages/vendor/signUpPage";
import { logoutUser, UserType } from "@/lib/redux/features/auth/authSlice";
import VendorBuildProfilePage from "@/components/pages/vendor/buildProfilePage";
import { useRouter } from "next/navigation";
import requests from "@/utils/requests";
import { toast } from "sonner";

const Page = () => {
  const vendor = useAppSelector((state) => state.auth.data as IVendor);

  const type = useAppSelector((state) => state.auth.type);

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    setLoading(true);
    try {
      await requests.post(`customer/auth/logout`, {});
      dispatch(logoutUser());

      toast.success("logout successful");

      router.push(`/vendor/login`);
    } catch (error) {
      toast.success("logout error, try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {(vendor && vendor.profileBuild) || type == "customer" ? (
        <div>
          <h3 className="text-2xl text-offBlack border-b pb-4">
            Update Your Profile
          </h3>
          <ProfileForm />
        </div>
      ) : (
        <div className="w-full max-w-4xl mx-auto mt-8 justify-center items-center flex-col flex">
          <img
            src="/building.svg"
            alt="Profile Building Illustration"
            className="w-full max-w-md"
          />
          <h2 className="my-7 text-5xl font-bold text-offBlack">
            Start Building Your Profile
          </h2>

          <p className="text-gray-500 text-center text-xl">
            You need to complete your profile to start using the platform.
          </p>

          <div className="flex space-x-3 mt-10 mb-44">
            <Button onClick={() => router.push("/account/build")}>
              Complete Profile
            </Button>
            <Button disabled={loading} onClick={handleLogout}>
              {loading ? "Loading.." : "Logout"}
              <LogOutIcon className="ml-3" size={15} />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
