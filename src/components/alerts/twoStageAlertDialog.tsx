// "use client";

// import React, { useState } from "react";
// import {
//   AlertDialog,
//   AlertDialogTrigger,
//   AlertDialogContent,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogCancel,
//   AlertDialogAction,
// } from "@/components/ui/alert-dialog";
// import { X, BadgeCheck, ShieldCheck, Loader, CircleCheck } from "lucide-react";
// import { Button } from "../ui/button";
// import { Input } from "../ui/input";
// import BoxIcon from "@/icons/box";
// import SuccessIcon from "@/icons/successIcon";

// const TwoStageAlertDialog = () => {
//   const [stage, setStage] = useState(1); // 1: Verification, 2: Authentication
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);

//   const handleNextStage = () => setStage(2);

//   const handleSubmit = () => {
//     setLoading(true);
//     setTimeout(() => {
//       setLoading(false);
//       setSuccess(true);
//     }, 2000); // Fake delay of 2 seconds
//   };

//   function onOpenChange(open: boolean) {
//     setStage(1);
//     setSuccess(false);
//     console.log("alert open", open);
//   }

//   return (
//     <AlertDialog onOpenChange={onOpenChange}>
//       <AlertDialogTrigger className="bg-black hover:bg-black/70 rounded-lg w-full sm:w-fit mt-2 sm:mt-0 font-normal py-2 px-5 text-white">
//         Verify
//       </AlertDialogTrigger>
//       <AlertDialogContent>
//         <AlertDialogHeader>
//           <div className="flex items-center">
//             <AlertDialogCancel className="flex justify-center items-center p-2 bg-gray-100 rounded-full mr-3">
//               <X size={20} />
//             </AlertDialogCancel>
//             <AlertDialogTitle className="font-thin text-offBlack">
//               {stage === 1 ? "User Verification" : "Authenticate"}
//             </AlertDialogTitle>
//           </div>
//         </AlertDialogHeader>

//         <div className="w-full flex justify-center">
//           <div
//             className={`p-5 rounded-full w-fit my-7 ${
//               success ? "bg-green-100" : "bg-[#D3EFF0]"
//             }`}
//           >
//             {success ? <CircleCheck color="green" size={60} /> : <BoxIcon />}
//           </div>
//         </div>

//         {loading ? (
//           <div className="w-full flex justify-center items-center">
//             <Loader size={40} />
//             <p className="ml-3">Loading, please wait...</p>
//           </div>
//         ) : (
//           <>
//             {stage === 1 ? (
//               <AlertDialogDescription className="text-center">
//                 <h4 className="text-xl font-bold text-offBlack">Verify User</h4>
//                 This action cannot be undone. This will permanently delete your
//                 account and remove your data from our servers.
//               </AlertDialogDescription>
//             ) : (
//               !success && (
//                 <div className="w-full flex justify-center">
//                   <Input type="password" placeholder="Enter your password" />
//                 </div>
//               )
//             )}
//             <AlertDialogFooter className="mt-4">
//               <AlertDialogCancel className="w-32">Cancel</AlertDialogCancel>
//               {!success ? (
//                 <Button
//                   className="flex-1"
//                   onClick={stage === 1 ? handleNextStage : handleSubmit}
//                 >
//                   {stage === 1 ? "Next" : "Yes, Verify"}
//                 </Button>
//               ) : (
//                 <AlertDialogCancel className="flex-1 bg-black hover:bg-black/80 text-white hover:text-white ">
//                   View
//                 </AlertDialogCancel>
//               )}
//             </AlertDialogFooter>
//           </>
//         )}
//       </AlertDialogContent>
//     </AlertDialog>
//   );
// };

// export default TwoStageAlertDialog;

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

// Define the types for the props
interface TwoStageAlertDialogProps {
  triggerText: string;
  triggerButton: ReactNode;
  initialTitle: string;
  nextTitle: string;
  initialDescription: string;
  apiUrl: string;
  onSuccess?: (data: any) => void;
}

const TwoStageAlertDialog: React.FC<TwoStageAlertDialogProps> = ({
  triggerText,
  triggerButton,
  initialTitle,
  nextTitle,
  initialDescription,
  apiUrl,
  onSuccess,
}) => {
  const [stage, setStage] = useState(1); // 1: Initial stage, 2: Authentication stage
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleNextStage = () => setStage(2);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await requests.patch(apiUrl, {});

      setSuccess(true);
      if (onSuccess) onSuccess(res);
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
