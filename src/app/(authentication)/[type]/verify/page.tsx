import AuthContainerCard from "@/components/cards/common/authContainerCard";
import React from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { InputOTPForm } from "@/components/forms/vendor/signup/otp/otpForm";
import { UserType } from "@/lib/redux/features/auth/authSlice";

type Props = {
  params: { type: UserType };
  searchParams: { [key: string]: string | string[] | undefined };
};

const page = ({ searchParams, params }: Props) => {
  console.log(searchParams);
  return (
    <div>
      <AuthContainerCard
        backUrl="/"
        image="/images/Ads.png"
        title="Verify Your Account"
        body={"We just sent an otp to your email, " + searchParams.email}
      >
        <div className="w-full flex flex-col items-center mt-12">
          <InputOTPForm
            type={params.type}
            email={searchParams.email as string}
          />
        </div>
      </AuthContainerCard>
    </div>
  );
};

export default page;
