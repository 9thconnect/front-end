"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { LottieComponentProps } from "lottie-react";

import successAnimation from "@/components/lotties/success.json";
import errorAnimation from "@/components/lotties/error.json";
import loadingAnimation from "@/components/lotties/loading.json";

const Lottie = dynamic<LottieComponentProps>(() => import("lottie-react"), {
  ssr: false,
});

const PaymentStatusPage: React.FC = () => {
  const [currentAnimation, setCurrentAnimation] =
    useState<any>(loadingAnimation);
  const [isLoading, setIsLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState<string>(
    "Processing Payment..."
  );

  const searchParams = useSearchParams();
  const status = searchParams.get("status");

  useEffect(() => {
    if (status === "cancelled" || status === "failed") {
      setCurrentAnimation(errorAnimation);
      setStatusMessage(
        status === "cancelled" ? "Payment Cancelled" : "Payment Failed"
      );
    } else {
      setCurrentAnimation(successAnimation);
      setStatusMessage("Payment Successful");
    }
    setIsLoading(false);
  }, [status]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-64 h-64">
        <Lottie animationData={currentAnimation} loop={isLoading} />
      </div>
      <p className="text-2xl font-bold mt-4">{statusMessage}</p>
    </div>
  );
};

export default PaymentStatusPage;
