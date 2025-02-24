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
import { Textarea } from "../ui/textarea";
import { AxiosError } from "axios";

// Define the types for the props
interface TwoStageAlertDialogProps {
  triggerText: string;
  triggerButton: ReactNode;
  initialTitle: string;
  nextTitle: string;
  initialDescription: string;
  apiUrl: string;
  id?: string;
  type?: "approve" | "reject" | "suspend" | "unsuspend";
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
  type,
  onSuccess,
}) => {
  const [stage, setStage] = useState(1); // 1: Initial stage, 2: Authentication stage
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");

  const [reason, setReason] = useState("");

  const handleNextStage = () => setStage(2);

  const queryClient = useQueryClient();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      let body = {};

      if (type === "reject") {
        body = { reasonForRejection: reason };
      } else if (type === "suspend") {
        body = { reasonForSuspension: reason };
      }
      const res = await requests.patch(apiUrl, body);

      queryClient.invalidateQueries({ queryKey: [`get-businesses`] });
      queryClient.invalidateQueries({ queryKey: ["get-business", id] });

      setMessage(res.message);

      setSuccess(true);
      if (onSuccess) onSuccess(res);
    } catch (error: AxiosError<{ message: string }> | any) {
      setSuccess(false);
      setMessage(error.response?.data.message || "An error occurred");
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
            <AlertDialogCancel
              onClick={() => {
                setMessage("");
                setStage(1);
              }}
              className="flex justify-center items-center p-2 bg-gray-100 rounded-full mr-3"
            >
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
        ) : message.length > 0 ? (
          <p className=" text-xl text-center">{message}</p>
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
              !success &&
              (type === "reject" || type === "suspend") && (
                <div className="w-full flex justify-center">
                  <Textarea
                    onChange={(e) => setReason(e.target.value)}
                    placeholder={`Reason for ${type}`}
                  />
                </div>
              )
            )}
            <AlertDialogFooter className="mt-4">
              <AlertDialogCancel
                onClick={() => {
                  setMessage("");
                  setStage(1);
                }}
                className="sm:w-32 w-full"
              >
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
