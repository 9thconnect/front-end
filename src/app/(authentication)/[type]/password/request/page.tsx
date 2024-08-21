import AuthContainerCard from "@/components/cards/common/authContainerCard";
import { ForgotPasswordForm } from "@/components/forms/vendor/password/forgetPassword";
import { UserType } from "@/lib/redux/features/auth/authSlice";
import React from "react";

type Props = {
  params: { type: UserType };
  searchParams: { [key: string]: string | string[] | undefined };
};

const page = ({ params }: Props) => {
  return (
    <AuthContainerCard
      backUrl="/"
      image="/images/Ads.png"
      title="Request Reset"
      body={"Forget password? not an issue, request"}
    >
      <ForgotPasswordForm type={params.type} />
    </AuthContainerCard>
  );
};

export default page;
