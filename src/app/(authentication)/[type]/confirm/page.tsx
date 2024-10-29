import AuthContainerCard from "@/components/cards/common/authContainerCard";
import { ConfirmAccountForm } from "@/components/forms/admin/auth/confirmAccount/confirmAccountForm";
import React from "react";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const page = ({ searchParams }: Props) => {
  return (
    <AuthContainerCard
      backUrl="/"
      image="/images/Ads.png"
      title="Confirm Login"
      body={"Use OTP to to login your password"}
    >
      <ConfirmAccountForm email={searchParams.email as string} />
    </AuthContainerCard>
  );
};

export default page;
