import React, { useState, useCallback } from "react";
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
import RateProForm, { RateProSchema } from "../forms/hire/rateExp";
import requests from "@/utils/requests";

const RateProjectModal = ({ professionId }: { professionId: string }) => {
  const [loading, setLoading] = useState<
    "idle" | "success" | "error" | "loading"
  >("idle");
  const [isOpen, setIsOpen] = useState(true);
  const [rateExp, setRateExp] = useState(false);
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmitRating = useCallback(
    async (data: z.infer<typeof RateProSchema>) => {
      setLoading("loading");
      try {
        await requests.patch(`/pro/rate-gig/${professionId}`, {
          rating: data.rate,
          comment: data.comment,
        });
        setLoading("success");
        toast.success("Rating submitted successfully");
        setIsOpen(false);
      } catch (error) {
        setLoading("error");
        if (axios.isAxiosError(error)) {
          toast.error(
            error.response?.data.message || "An error occurred, try again"
          );
          setErrorMessage(error.response?.data.message);
        } else {
          toast.error("An error occurred, try again");
        }
      }
    },
    []
  );

  const handleSuccessButtonClick = useCallback(() => {
    setRateExp(true);
    setLoading("idle");
  }, []);

  const handleClose = useCallback(() => {
    setRateExp(true);
    setLoading("idle");
  }, []);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="w-full">Rate Vendor</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-xl overflow-y-auto text-offBlack">
        <div className="relative h-full w-full">
          <AlertDialogHeader className="flex flex-row items-center">
            <AlertDialogCancel className="bg-gray-100 rounded-full p-1 h-10 w-10 mr-3">
              <X size={15} />
            </AlertDialogCancel>
            <AlertDialogTitle>Rate Vendor</AlertDialogTitle>
          </AlertDialogHeader>
        </div>
        <HOCLoading
          status={loading}
          successMessage="Rating submitted"
          successDescription="Your rating has been submitted for the vendor"
          onSuccessButtonClick={handleSuccessButtonClick}
          successButtonText="Go to project"
          cancelButtonText="Continue"
          errorMessage={errorMessage}
          onClose={handleClose}
          onErrorButtonClick={() => {}}
        >
          <RateProForm onSubmit={onSubmitRating} />
        </HOCLoading>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default RateProjectModal;
