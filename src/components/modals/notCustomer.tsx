import React from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { X } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { toggleNotCustomerModal } from "@/lib/redux/features/layout/layoutSlice";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";

const NotCustomerModal = () => {
  const isDialogOpen = useAppSelector(
    (state) => state.layout.showNotCustomerModal
  );

  const dispatch = useAppDispatch();

  const setIsDialogOpen = (open: boolean) => {
    dispatch(
      toggleNotCustomerModal({
        open: open,
      })
    );
  };
  const router = useRouter();
  return (
    <div>
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent className="max-w-xl max-h-screen overflow-y-auto text-offBlack">
          <AlertDialogHeader className="flex flex-row items-center">
            <AlertDialogCancel
              className="bg-gray-100 rounded-full p-1 h-10 w-10 mr-3"
              onClick={() => setIsDialogOpen(false)}
            >
              <X size={15} />
            </AlertDialogCancel>
            <AlertDialogTitle>Only Customers</AlertDialogTitle>
          </AlertDialogHeader>
          <div className=" flex flex-col items-center mt-8">
            <p>
              You need to be a customer to complete this action, please sign in
              as a customer to continue
            </p>
            <img
              className="h-2/3"
              alt="access denied"
              src={"/images/noaccess.png"}
            />
          </div>

          <div className="flex justify-center mt-4">
            <Button
              onClick={() => {
                setIsDialogOpen(false);
                router.push("/customer/register");
              }}
              className="mr-2"
            >
              Register as a Customer
            </Button>
            <Button
              onClick={() => {
                setIsDialogOpen(false);
                router.push("/customer/login");
              }}
            >
              Sign in as Customer
            </Button>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default NotCustomerModal;
