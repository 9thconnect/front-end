import React, { useState } from "react";
import { Product } from "@/type/common";
import { deleteProduct } from "@/lib/requests/vendor/product";
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
import ProductForm from "@/components/forms/product/productForm";

interface ActionCellProps {
  row: any;
}

const ActionCell: React.FC<ActionCellProps> = ({ row }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const queryClient = useQueryClient();

  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      const resp = await deleteProduct(id);
      queryClient.invalidateQueries({ queryKey: [`get-products`] });
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
          <DropdownMenuLabel>My Product</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setEdit(true)}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            Delete
          </DropdownMenuItem>
          <DropdownMenuItem>View</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger />
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              product.
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
              {loading ? "Deleting.." : "Delete"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={edit} onOpenChange={setEdit}>
        <AlertDialogContent className="max-w-3xl h-screen overflow-y-auto">
          <div className="relative h-full w-full">
            <AlertDialogHeader className="flex flex-row items-center">
              <AlertDialogCancel className="bg-gray-100 rounded-full p-2 mr-3">
                <X />
              </AlertDialogCancel>
              <AlertDialogTitle>Add {row.original.name}</AlertDialogTitle>
            </AlertDialogHeader>
          </div>

          <ProductForm product={row.original} />
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ActionCell;
