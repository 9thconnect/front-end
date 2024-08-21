import AuthContainerCard from "@/components/cards/common/authContainerCard";
import { LoginForm } from "@/components/forms/vendor/login/loginForm";
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
      title="Login To Your Account"
      body={"Welcome back to McDonald"}
    >
      <LoginForm type={params.type} />
    </AuthContainerCard>
  );
};

export default page;
