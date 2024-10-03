"use client";

import { Copy, CheckCircle, XCircle, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ReactNode, useEffect } from "react";

type DialogLoadingProps = {
  status: "idle" | "success" | "error" | "loading";
  successMessage?: string;
  errorMessage?: string;
  loadingMessage?: string;
  successDescription?: string;
  errorDescription?: string;
  onSuccessButtonClick?: () => void;
  onErrorButtonClick?: () => void;
  onClose?: () => void;
  successButtonText?: string;
  errorButtonText?: string;
  cancelButtonText?: string;
  hideCancelButton?: boolean;
  children?: ReactNode;
};

export function HOCLoading({
  status,
  successMessage = "Success!",
  errorMessage = "An error occurred",
  loadingMessage = "Loading, please wait...",
  successDescription,
  errorDescription,
  onSuccessButtonClick,
  onErrorButtonClick,
  onClose,
  successButtonText = "Next Action",
  errorButtonText = "Retry",
  cancelButtonText = "Cancel",
  hideCancelButton = false,
  children,
}: DialogLoadingProps) {
  useEffect(() => {
    console.log(status);
  }, [status]);

  const renderIcon = () => {
    if (status === "loading")
      return (
        <div className="flex flex-col items-center justify-center">
          <LoaderCircle className="h-14 w-14 animate-spin" />
          <p className="mt-4 text-offBlack text-lg mb-10">{loadingMessage}</p>
        </div>
      );

    if (status === "success")
      return (
        <div className="flex flex-col items-center justify-center">
          <div className="bg-[#2AA44B1A] inline-block p-2 rounded-full">
            <CheckCircle className="h-32 w-32 text-green-500" />
          </div>
          <div className="text-center w-full">
            <p className="mt-9 text-offBlack text-2xl">{successMessage}</p>
            {successDescription && <p className="mt-2">{successDescription}</p>}
            <div className="flex items-center gap-2 mt-10 w-full">
              <Button
                className="col-span-2 w-full"
                onClick={onSuccessButtonClick}
              >
                {successButtonText}
              </Button>
              {!hideCancelButton && (
                <Button
                  variant={"outline"}
                  className="col-span-1 w-full"
                  onClick={onClose}
                >
                  {cancelButtonText}
                </Button>
              )}
            </div>
          </div>
        </div>
      );

    if (status === "error")
      return (
        <div className="flex flex-col items-center justify-center">
          <div className="bg-[#a42a2e1a] inline-block p-2 rounded-full">
            <XCircle className="h-32 w-32 text-red-500" />
          </div>
          <div className="text-center w-full">
            <p className="mt-4 text-offBlack text-2xl">{errorMessage}</p>
            {errorDescription && <p className="mt-2">{errorDescription}</p>}
            <div className=" flex items-center gap-2 mt-10">
              <Button className="w-full" onClick={onErrorButtonClick}>
                {errorButtonText}
              </Button>
              {!hideCancelButton && (
                <Button
                  variant={"outline"}
                  className="w-full"
                  onClick={onClose}
                >
                  {cancelButtonText}
                </Button>
              )}
            </div>
          </div>
        </div>
      );

    return (
      <div>
        {children ? (
          <div>{children}</div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            No Content
          </div>
        )}
      </div>
    );
  };

  return renderIcon();
}
