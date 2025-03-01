"use client";

import { Button } from "@/components/ui/button";
import { CircleCheckBig, CircleOff } from "lucide-react";
import requests from "@/utils/requests";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

interface ProductActionButtonProps {
  productId: string;
  disabled: boolean;
}

const toggleProductStatus = async (
  productId: string,
  action: "enable" | "disable"
) => {
  try {
    await requests.patch(
      `/product/admin/enable-disable/${productId}/${action}`,
      {}
    );
  } catch (error) {
    console.error("Error toggling product status:", error);
    throw error; // Re-throw error to handle it in the mutation
  }
};

export const ProductActionButton: React.FC<ProductActionButtonProps> = ({
  productId,
  disabled,
}) => {
  const queryClient = useQueryClient();

  const toggleStatusMutation = useMutation({
    mutationFn: () =>
      toggleProductStatus(productId, !disabled ? "disable" : "enable"),
    onSuccess: () => {
      toast.success(
        `Product ${!disabled ? "disabled" : "enabled"} successfully`
      );
      queryClient.invalidateQueries({ queryKey: ["get-products-admin"] });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(
        error.response?.data.message || "Failed to toggle product status"
      );
    },
  });

  const handleToggleStatus = () => {
    toggleStatusMutation.mutate();
  };

  return (
    <Button
      className="rounded-3xl"
      onClick={handleToggleStatus}
      disabled={toggleStatusMutation.isPending}
    >
      {!disabled ? (
        <>
          Disable <CircleOff className="ml-2" />
        </>
      ) : (
        <>
          Enable <CircleCheckBig className="ml-2" />
        </>
      )}
      {toggleStatusMutation.isPending && " Processing..."}
    </Button>
  );
};
