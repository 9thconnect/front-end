import AuthContainerCard from "@/components/cards/common/authContainerCard";
import { ForgotPasswordForm } from "@/components/forms/vendor/password/forgetPassword";
import { ResetPasswordForm } from "@/components/forms/vendor/password/resetPasswordForm";
import { UserType } from "@/lib/redux/features/auth/authSlice";
import React from "react";

type Props = {
  params: { type: UserType };
  searchParams: { [key: string]: string | string[] | undefined };
};

const page = ({ searchParams, params }: Props) => {
  return (
    <AuthContainerCard
      backUrl="/"
      image="/images/Ads.png"
      title="Reset your password"
      body={"Use OTP to reset your password"}
    >
      <ResetPasswordForm
        type={params.type}
        email={searchParams.email as string}
      />
    </AuthContainerCard>
  );
};

export default page;
