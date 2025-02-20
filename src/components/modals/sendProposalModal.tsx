"use client";

import React, { useState } from "react";
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
import { HOCLoading } from "@/hoc/loadingHOC";
import { z } from "zod";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import SendProposalForm, {
  ProposalSchema,
} from "../forms/hire/sendProposalForm";
import requests from "@/utils/requests";

const SendProposalModal = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState<
    "idle" | "success" | "error" | "loading"
  >("idle");

  const router = useRouter();

  async function onSubmit(data: z.infer<typeof ProposalSchema>) {
    console.log("submitting");

    setLoading("loading");
    try {
      // Make the API call
      await requests.post("/offer/send-offer", {
        professionId: id,
        proposedPrice: data.budget,
        projectDescription: data.description,
      }); // Replace with your API endpoint
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
      // setLoading("idle"); // Comment this line out to keep the success or error state until action is taken
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger className="w-full">
        <Button className="w-full">Hire Professional</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-xl overflow-y-auto text-offBlack">
        <div className="relative h-full w-full">
          <AlertDialogHeader className="flex flex-row items-center">
            <AlertDialogCancel
              onClick={() => setLoading("idle")}
              className="bg-gray-100 rounded-full p-1 h-10 w-10 mr-3"
            >
              <X onClick={() => setLoading("idle")} size={15} />
            </AlertDialogCancel>
            <AlertDialogTitle>Hire Professional</AlertDialogTitle>
          </AlertDialogHeader>
        </div>
        <HOCLoading
          status={loading}
          successMessage="Proposal Submitted"
          successDescription="Your proposal has been submitted, we will send a copy to the professional and they will get back to you"
          onSuccessButtonClick={() => router.push(`/account/customer-offers`)}
          successButtonText="See All Offers"
          hideCancelButton={loading == "success"}
          onClose={() => setLoading("idle")}
        >
          <SendProposalForm onSubmit={onSubmit} />
        </HOCLoading>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SendProposalModal;
