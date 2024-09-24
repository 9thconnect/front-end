"use client";

import React from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { HeartIcon, LoaderCircleIcon } from "lucide-react";
import ShippingBoxIcon from "@/icons/shippingBoxIcon";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { addItem, addItemToServer } from "@/lib/redux/features/cart/cartSlice";
import { Product, WishItem } from "@/type/common";
import { addToWishList } from "@/lib/requests/user/product";
import axios, { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface WishItemCardProps {
  wish: WishItem;
}

const WishItemCard: React.FC<WishItemCardProps> = ({ wish }) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["addRemoveWishlist"],
    mutationFn: (data: WishItem) => {
      return addToWishList(wish._id);
    },
    onSuccess: (data) => {
      toast(data.message, {
        description: `${data.message}`,
        action: {
          label: "Whish List",
          onClick: () => console.log("Undo"),
          actionButtonStyle: {
            backgroundColor: "#ab0505b9",
            color: "#880b0bf",
          },
        },
      });

      queryClient.invalidateQueries({ queryKey: [`get-wishlist`] });
      // get-wishlist
    },

    onError: (error: AxiosError<{ message: string }>) => {
      console.log(error.response?.data.message);

      toast.error(error.response?.data.message);
    },
  });

  return (
    <Link
      href={`/marketplace/${wish._id}`}
      className="block w-full h-full unselectable"
    >
      <Card className="relative h-full w-full border border-white hover:shadow-2xl hover:shadow-primary/30 hover:border-primary group duration-300 flex flex-col">
        <CardHeader className="p-0 relative">
          <img
            src={wish.images[0]}
            alt={wish.name}
            className="w-full h-48 object-cover rounded-t-lg unselectable"
          />
          <button
            onClick={(e) => {
              e.preventDefault();

              mutate(wish);
            }}
            className="absolute top-2 right-2 p-2 bg-white bg-opacity-75 rounded-full hover:bg-gray-100 z-10"
          >
            {isPending ? (
              <LoaderCircleIcon className="w-4 h-4 animate-spin " />
            ) : (
              <HeartIcon className="w-4 h-4 " />
            )}
          </button>
        </CardHeader>
        <CardContent className="">
          <CardTitle className="text-sm font-medium">{wish.name}</CardTitle>
          <p className="text-lg font-light mt-3 text-black">
            ₦ {wish.price.toLocaleString()}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default WishItemCard;
