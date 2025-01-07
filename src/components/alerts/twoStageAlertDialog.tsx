"use client";

import React, { ReactNode, useState } from "react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { X, Loader, CircleCheck } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import BoxIcon from "@/icons/box";
import requests from "@/utils/requests";
import { useQueryClient } from "@tanstack/react-query";

// Define the types for the props
interface TwoStageAlertDialogProps {
  triggerText: string;
  triggerButton: ReactNode;
  initialTitle: string;
  nextTitle: string;
  initialDescription: string;
  apiUrl: string;
  id?: string;
  onSuccess?: (data: any) => void;
}

const TwoStageAlertDialog: React.FC<TwoStageAlertDialogProps> = ({
  triggerText,
  triggerButton,
  initialTitle,
  nextTitle,
  initialDescription,
  apiUrl,
  id,
  onSuccess,
}) => {
  const [stage, setStage] = useState(1); // 1: Initial stage, 2: Authentication stage
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleNextStage = () => setStage(2);

  const queryClient = useQueryClient();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await requests.patch(apiUrl, {});

      setSuccess(true);
      if (onSuccess) onSuccess(res);

      queryClient.invalidateQueries({ queryKey: [`get-businesses`] });
      queryClient.invalidateQueries({ queryKey: [`get-business`, id] });
    } catch (error) {
      setSuccess(false);
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  function onOpenChange(open: boolean) {
    setStage(1);
    setSuccess(false);
    console.log("alert open", open);
  }

  return (
    <AlertDialog onOpenChange={onOpenChange}>
      <AlertDialogTrigger>{triggerButton}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex items-center">
            <AlertDialogCancel className="flex justify-center items-center p-2 bg-gray-100 rounded-full mr-3">
              <X size={20} />
            </AlertDialogCancel>
            <AlertDialogTitle className="font-thin text-offBlack">
              {stage === 1 ? initialTitle : nextTitle}
            </AlertDialogTitle>
          </div>
        </AlertDialogHeader>

        <div className="w-full flex justify-center">
          <div
            className={`p-5 rounded-full w-fit my-7 ${
              success ? "bg-green-100" : "bg-[#D3EFF0]"
            }`}
          >
            {success ? <CircleCheck color="green" size={60} /> : <BoxIcon />}
          </div>
        </div>

        {loading ? (
          <div className="w-full flex justify-center items-center">
            <Loader size={40} />
            <p className="ml-3">Loading, please wait...</p>
          </div>
        ) : (
          <>
            {stage === 1 ? (
              <AlertDialogDescription className="text-center">
                <h4 className="text-xl font-bold text-offBlack">
                  {initialTitle}
                </h4>
                {initialDescription}
              </AlertDialogDescription>
            ) : (
              !success && (
                <div className="w-full flex justify-center">
                  <Input type="password" placeholder="Enter your password" />
                </div>
              )
            )}
            <AlertDialogFooter className="mt-4">
              <AlertDialogCancel className="sm:w-32 w-full">
                Cancel
              </AlertDialogCancel>
              {!success ? (
                <Button
                  className="flex-1"
                  onClick={stage === 1 ? handleNextStage : handleSubmit}
                >
                  {stage === 1 ? "Next" : "Yes, Confirm"}
                </Button>
              ) : (
                <AlertDialogCancel className="flex-1">View</AlertDialogCancel>
              )}
            </AlertDialogFooter>
          </>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default TwoStageAlertDialog;
