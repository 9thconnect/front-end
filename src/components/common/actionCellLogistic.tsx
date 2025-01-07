import React, { useState } from "react";
import { deleteFleet } from "@/lib/requests/vendor/fleet"; // You'll need to create this
import { toast } from "sonner";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { Button } from "@/components/ui/button";
import { EllipsisVertical, X } from "lucide-react";
import FleetForm from "../forms/logistic/logisticForm";

interface ActionCellProps {
  row: any; // Using any here as the row type from tanstack table is complex
}

const ActionCellFleet: React.FC<ActionCellProps> = ({ row }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [viewContact, setViewContact] = useState(false);
  const queryClient = useQueryClient();

  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      const resp = await deleteFleet(id);
      queryClient.invalidateQueries({ queryKey: [`get-fleet`] });
      toast.success(resp.message);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("An error occurred try again");
      }
    } finally {
      setOpen(false);
      setLoading(false);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="flex items-center w-10 h-10 p-2 bg-[#F2F2F2] justify-center rounded-full">
            <EllipsisVertical />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Fleet Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setEdit(true)}>
            Edit Vehicle
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            Delete Vehicle
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setViewContact(true)}>
            View Contact Info
          </DropdownMenuItem>
          <DropdownMenuItem>View Details</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger />
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              vehicle from the fleet.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <Button
              disabled={loading}
              onClick={() => handleDelete(row.original._id)}
            >
              {loading ? "Deleting..." : "Delete"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Edit Fleet Dialog */}
      <AlertDialog open={edit} onOpenChange={setEdit}>
        <AlertDialogContent className="max-w-3xl h-screen overflow-y-auto">
          <div className="relative h-full w-full">
            <AlertDialogHeader className="flex flex-row items-center">
              <AlertDialogCancel className="bg-gray-100 rounded-full p-2 mr-3">
                <X />
              </AlertDialogCancel>
              <AlertDialogTitle>Edit {row.original.title}</AlertDialogTitle>
            </AlertDialogHeader>
          </div>
          <FleetForm fleet={row.original} />
        </AlertDialogContent>
      </AlertDialog>

      {/* View Contact Info Dialog */}
      <AlertDialog open={viewContact} onOpenChange={setViewContact}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Contact Information</AlertDialogTitle>
          </AlertDialogHeader>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Vehicle Contact</h3>
              <p>Call: {row.original.contact.callNumber}</p>
              <p>WhatsApp: {row.original.contact.whatsAppNumber}</p>
            </div>
            <div>
              <h3 className="font-semibold">Agent Details</h3>
              <p>{row.original.marketedBy.shopName}</p>
              <p>{row.original.marketedBy.businessLegalName}</p>
              <p>ID: {row.original.marketedBy.shopID}</p>
            </div>
            <div>
              <h3 className="font-semibold">Vehicle Details</h3>
              <p>Type: {row.original.logisticType}</p>
              <p>Sub Type: {row.original.logisticSubType}</p>
              <p>Registration: {row.original.registration}</p>
            </div>
            <div>
              <h3 className="font-semibold">Vendor</h3>
              <p>{row.original.vendor.fullName}</p>
              <p>ID: {row.original.vendor.vendorID}</p>
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setViewContact(false)}>
              Close
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ActionCellFleet;
