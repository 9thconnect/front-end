"use client";

import React, { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import SendProposalForm, {
  ProposalSchema,
} from "../forms/hire/sendProposalForm";
import { HOCLoading } from "@/hoc/loadingHOC";
import { z } from "zod";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import RateProForm, { RateProSchema } from "../forms/hire/rateExp";

const CompleteProjectModal = () => {
  const [loading, setLoading] = useState<
    "idle" | "success" | "error" | "loading"
  >("idle");

  const router = useRouter();

  const [rateExp, setRateExp] = useState(false);

  async function onSubmit() {
    setLoading("loading");
    try {
      // Make the API call
      await axios.post("/api/rate"); // Replace with your API endpoint
      setLoading("success");
    } catch (error) {
      setLoading("success");
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data.message || "An error occurred, try again"
        );
      } else {
        toast.error("An error occurred, try again");
      }
    } finally {
      // setLoading("idle"); // Comment this line out to keep the success or error state until action is taken
    }
  }

  async function onSubmitRating(data: z.infer<typeof RateProSchema>) {
    setLoading("loading");
    try {
      // Make the API call
      await axios.post("/api/rate", data); // Replace with your API endpoint
      setLoading("success");
    } catch (error) {
      setLoading("error");
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data.message || "An error occurred, try again"
        );
      } else {
        toast.error("An error occurred, try again");
      }
    } finally {
      setLoading("idle"); // Comment this line out to keep the success or error state until action is taken
    }
  }

  const id = "wdlkmkwnekjfnewkfjenfjkew";

  return (
    <AlertDialog>
      <AlertDialogTrigger className="w-full">
        <Button className="w-full">Complete Project</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-xl overflow-y-auto text-offBlack">
        <div className="relative h-full w-full">
          <AlertDialogHeader className="flex flex-row items-center">
            <AlertDialogCancel className="bg-gray-100 rounded-full p-1 h-10 w-10 mr-3">
              <X size={15} />
            </AlertDialogCancel>
            <AlertDialogTitle>Project Completion</AlertDialogTitle>
          </AlertDialogHeader>
        </div>
        <HOCLoading
          status={loading}
          successMessage="Proposal Completed"
          successDescription="Your proposal has been submitted, we will send a copy to the professional and they will get back to you"
          onSuccessButtonClick={() => {
            setRateExp(true), setLoading("idle");
          }}
          successButtonText="Rate Experience"
          // hideCancelButton={loading == "success"}
          cancelButtonText="Continue Shopping"
          onClose={() => router.push("/marketplace")}
        >
          {/* <RateProForm onSubmit={onSubmitRating} /> */}
        </HOCLoading>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CompleteProjectModal;
