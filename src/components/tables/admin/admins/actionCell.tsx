import { Admin } from "@/type/common";
import { Edit2, EyeIcon, Trash2 } from "lucide-react";
import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import requests from "@/utils/requests";
import { toast } from "sonner";
import AdminForm from "@/components/forms/admin/admin";
import { AdminSchema } from "@/components/forms/admin/admin";
import { z } from "zod";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";

const ActionCell = ({ row, id }: { row: Admin; id?: string }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true);

    requests
      .delete(`/admin/delete-admin/${row._id}`)
      .then((response) => {
        toast.success(response.message);

        queryClient.invalidateQueries({
          queryKey: [`get-admins`],
        });
        console.log("Delete successful:", response);
        // Optionally, add a refetch or other UI update here
      })
      .catch((error) => {
        toast.error("Error deleting admin");
        console.error("Error deleting admin:", error);
      })
      .finally(() => {
        setIsDeleting(false);
        setIsAlertOpen(false);
      });
  };

  const handleSubmit = async (data: z.infer<typeof AdminSchema>) => {
    // Handle form submission, e.g. send data to server
    try {
      const res = await requests.patch(`admin/edit-admin/${row._id}`, {
        fullName: data.fullName,
        username: data.username,
        email: data.email,
        role: data.role,
        // isActive: data.isActive,
        phone: data.phone,
      });

      queryClient.invalidateQueries({
        queryKey: [`get-admins`],
      });

      toast.success(res.message);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("An error occurred try again");
        // Just a stock error
      }
    }
    console.log(data);
  };

  const handleClose = (close: boolean) => setIsOpen(close);

  return (
    <div className="flex items-center">
      <Sheet onOpenChange={handleClose} open={isOpen}>
        <SheetTrigger>
          <div className="z-50 flex items-center p-2 bg-[#F2F2F2] mr-2 rounded-full cursor-pointer">
            <Edit2 color="#8E7E7E" />
          </div>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Edit {row.fullName}</SheetTitle>
            <AdminForm
              admin={{
                fullName: row.fullName,
                username: row.username,
                email: row.email,
                role: row.role,
                isActive: row.isActive,
                phone: "1234567890",
              }}
              onSubmit={handleSubmit}
              onClose={() => setIsOpen(false)}
            />
          </SheetHeader>
        </SheetContent>
      </Sheet>

      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogTrigger asChild>
          <div className="flex items-center p-2 bg-[#F0D3D3] rounded-full cursor-pointer">
            <Trash2 color="#7B0A0A" />
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <div>
              <Button onClick={handleDelete} disabled={isDeleting}>
                {isDeleting ? "Deleting..." : "Continue"}
              </Button>
            </div>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ActionCell;
