// "use client";

// import React, { useState } from "react";
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
// import SendProposalForm, {
//   ProposalSchema,
// } from "../forms/hire/sendProposalForm";
// import { HOCLoading } from "@/hoc/loadingHOC";
// import { z } from "zod";
// import axios from "axios";
// import { toast } from "sonner";

// const SendProposalModal = () => {
//   const [loading, setLoading] = useState<
//     "idle" | "success" | "error" | "loading"
//   >("idle");

//   async function onSubmit(data: z.infer<typeof ProposalSchema>) {
//     setLoading("loading");
//     try {
//       setLoading("loading");

//       //   make the all
//     } catch (error) {
//       if (axios.isAxiosError(error)) {
//         toast.error(error.response?.data.message);
//       } else {
//         toast.error("An error occurred try again");
//         // Just a stock error
//       }
//     } finally {
//       setLoading("idle");
//     }
//   }

//   return (
//     <AlertDialog>
//       <AlertDialogTrigger className="w-full">
//         <Button className="w-full">Hire Professional</Button>
//       </AlertDialogTrigger>
//       <AlertDialogContent className="max-w-xl  overflow-y-auto text-offBlack">
//         <div className="relative h-full w-full">
//           <AlertDialogHeader className="flex  flex-row items-center">
//             <AlertDialogCancel className="bg-gray-100 rounded-full p-1 h-10 w-10 mr-3">
//               <X size={15} />
//             </AlertDialogCancel>
//             <AlertDialogTitle>Hire Professional</AlertDialogTitle>
//           </AlertDialogHeader>
//         </div>
//         <HOCLoading
//           status={loading}
//           successMessage="Proposal Submitted"
//           successDescription="Your proposal has been submitted, we will send a copy to the professional and they will get back to you"
//           onSuccessButtonClick={() => console.log("Next action")}
//           successButtonText="Proceed to project"
//           hideCancelButton
//           onClose={() => console.log("Close dialog")}
//         >
//           <SendProposalForm onSubmit={onSubmit} />
//         </HOCLoading>
//       </AlertDialogContent>
//     </AlertDialog>
//   );
// };

// export default SendProposalModal;

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
import SendProposalForm, {
  ProposalSchema,
} from "../forms/hire/sendProposalForm";
import { HOCLoading } from "@/hoc/loadingHOC";
import { z } from "zod";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const SendProposalModal = () => {
  const [loading, setLoading] = useState<
    "idle" | "success" | "error" | "loading"
  >("idle");

  const router = useRouter();

  async function onSubmit(data: z.infer<typeof ProposalSchema>) {
    setLoading("loading");
    try {
      // Make the API call
      await axios.post("/api/send-proposal", data); // Replace with your API endpoint
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

  const id = "wdlkmkwnekjfnewkfjenfjkew";

  return (
    <AlertDialog>
      <AlertDialogTrigger className="w-full">
        <Button className="w-full">Hire Professional</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-xl overflow-y-auto text-offBlack">
        <div className="relative h-full w-full">
          <AlertDialogHeader className="flex flex-row items-center">
            <AlertDialogCancel className="bg-gray-100 rounded-full p-1 h-10 w-10 mr-3">
              <X size={15} />
            </AlertDialogCancel>
            <AlertDialogTitle>Hire Professional</AlertDialogTitle>
          </AlertDialogHeader>
        </div>
        <HOCLoading
          status={"success"}
          successMessage="Proposal Submitted"
          successDescription="Your proposal has been submitted, we will send a copy to the professional and they will get back to you"
          onSuccessButtonClick={() => router.push(`/hire/projects/${id}`)}
          successButtonText="Proceed to project"
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
