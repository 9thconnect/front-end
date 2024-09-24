// import React, { useEffect, useState } from "react";
// import {
//   AlertDialog,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";
// import { Button } from "../ui/button";
// import { X } from "lucide-react";
// import { HOCLoading } from "@/hoc/loadingHOC";
// import { z } from "zod";
// import axios from "axios";
// import { toast } from "sonner";
// import { useRouter } from "next/navigation";
// import RateProForm, { RateProSchema } from "../forms/hire/rateExp";

// const CompleteProjectModal = () => {
//   const [loading, setLoading] = useState<
//     "idle" | "success" | "error" | "loading"
//   >("idle");
//   const [isOpen, setIsOpen] = useState(false);
//   const [rateExp, setRateExp] = useState(false);
//   const router = useRouter();

//   async function onSubmit() {
//     // setLoading("loading");
//     try {
//       await axios.post("/api/rate");
//       setLoading("success");
//     } catch (error) {
//       console.log(error);

//       setLoading("error");
//       if (axios.isAxiosError(error)) {
//         toast.error(
//           error.response?.data.message || "An error occurred, try again"
//         );
//       } else {
//         setLoading("error");
//         toast.error("An error occurred, try again");
//       }
//     } finally {
//       setLoading("idle");
//     }
//   }

//   async function onSubmitRating(data: z.infer<typeof RateProSchema>) {
//     setLoading("loading");
//     try {
//       await axios.post("/api/rate", data);
//       setLoading("success");
//     } catch (error) {
//       console.log("klmkerk");
//       setLoading("error");
//       if (axios.isAxiosError(error)) {
//         toast.error(
//           error.response?.data.message || "An error occurred, try again"
//         );
//       } else {
//         toast.error("An error occurred, try again");
//       }
//     } finally {
//       console.log("");

//       setLoading("idle");
//     }
//   }

//   useEffect(() => {
//     if (isOpen) {
//       onSubmit();
//     }
//   }, [isOpen]);

//   return (
//     <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
//       <AlertDialogTrigger asChild>
//         <Button className="w-full">Complete Project</Button>
//       </AlertDialogTrigger>
//       <AlertDialogContent className="max-w-xl overflow-y-auto text-offBlack">
//         <div className="relative h-full w-full">
//           <AlertDialogHeader className="flex flex-row items-center">
//             <AlertDialogCancel className="bg-gray-100 rounded-full p-1 h-10 w-10 mr-3">
//               <X size={15} />
//             </AlertDialogCancel>
//             <AlertDialogTitle>Project Completion</AlertDialogTitle>
//           </AlertDialogHeader>
//         </div>
//         <HOCLoading
//           status={loading}
//           successMessage="Proposal Completed"
//           successDescription="Your proposal has been submitted, we will send a copy to the professional and they will get back to you"
//           onSuccessButtonClick={() => {
//             setRateExp(true);
//             setLoading("idle");
//           }}
//           successButtonText="Rate Experience"
//           cancelButtonText="Continue Shopping"
//           onClose={() => router.push("/marketplace")}
//         >
//           {rateExp && <RateProForm onSubmit={onSubmitRating} />}
//         </HOCLoading>
//       </AlertDialogContent>
//     </AlertDialog>
//   );
// };

// export default CompleteProjectModal;

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

const CompleteProjectModal = () => {
  const [loading, setLoading] = useState<
    "idle" | "success" | "error" | "loading"
  >("idle");
  const [isOpen, setIsOpen] = useState(false);
  const [rateExp, setRateExp] = useState(false);
  const router = useRouter();

  const onSubmit = useCallback(async () => {
    setLoading("loading");
    try {
      await axios.post("/api/rate");
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
    }
  }, []);

  const onSubmitRating = useCallback(
    async (data: z.infer<typeof RateProSchema>) => {
      setLoading("loading");
      try {
        await axios.post("/api/rate", data);
        setLoading("success");
        toast.success("Rating submitted successfully");
        setIsOpen(false);
      } catch (error) {
        setLoading("error");
        if (axios.isAxiosError(error)) {
          toast.error(
            error.response?.data.message || "An error occurred, try again"
          );
        } else {
          toast.error("An error occurred, try again");
        }
      }
    },
    []
  );

  const handleOpenChange = useCallback(
    async (open: boolean) => {
      if (open && loading === "idle") {
        await onSubmit();
      } else if (!open) {
        setLoading("idle");
      }

      setIsOpen(open);
    },
    [loading, onSubmit]
  );

  const handleSuccessButtonClick = useCallback(() => {
    setRateExp(true);
    setLoading("idle");
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    router.push("/marketplace");
  }, [router]);

  return (
    <AlertDialog open={isOpen} onOpenChange={handleOpenChange}>
      <AlertDialogTrigger asChild>
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
          onSuccessButtonClick={handleSuccessButtonClick}
          successButtonText="Rate Experience"
          cancelButtonText="Continue Shopping"
          onClose={handleClose}
          onErrorButtonClick={onSubmit}
        >
          {rateExp && <RateProForm onSubmit={onSubmitRating} />}
        </HOCLoading>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CompleteProjectModal;
