import React from "react";
import PaymentSuccessPage from "@/components/pages/hire/paymentSuccessPage";
import { Suspense } from "react";
const page = () => {
  return (
    <div>
      <Suspense>
        <PaymentSuccessPage />
      </Suspense>
    </div>
  );
};

export default page;
