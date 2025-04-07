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
import { Product } from "@/type/common";
import { addToWishList } from "@/lib/requests/user/product";
import axios, { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { truncateText } from "@/utils/common";
import { toggleNotCustomerModal } from "@/lib/redux/features/layout/layoutSlice";
import { UserType } from "@/lib/redux/features/auth/authSlice";

interface ProductCardProps {
  product: Product;
}

export interface IProduct {
  category: string;
  name: string;
  price: number;
  vendor: string;
  discount?: string;
  imageUrl: string;
  id: string;
  location?: string;
  reviews?: string;
  quantity?: number;
  unitsLeft?: number;
  sizes?: string[];
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useAppDispatch();

  const handleNoCustomer = () => {
    console.log("No customer");

    dispatch(toggleNotCustomerModal({ open: true }));
  };

  const { mutate, isPending } = useMutation({
    mutationKey: ["addRemoveWishlist"],
    mutationFn: (data: Product) => {
      return addToWishList(product._id);
    },
    onSuccess: (data) => {
      toast(data.message, {
        description: `${product.name}`,
        action: {
          label: "Wish List",
          onClick: () => console.log("Undo"),
          actionButtonStyle: {
            backgroundColor: "#ab0505b9",
            color: "#880b0bf",
          },
        },
      });
    },

    onError: (error: AxiosError<{ message: string }>) => {
      console.log(error.response?.data.message);

      toast.error(error.response?.data.message);
    },
  });

  const handleAddToWishlist = async (product: Product) => {
    try {
      const res = await addToWishList(product._id);

      toast(res.message, {
        description: `${product.name}`,
        action: {
          label: "Whish List",
          onClick: () => console.log("Undo"),
          actionButtonStyle: {
            backgroundColor: "#ab0505b9",
            color: "#880b0bf",
          },
        },
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("An error occurred try again");
      }
    }
  };

  const isLoggedIn = useAppSelector((state) => state.auth.data);
  const loadingAddToCart = useAppSelector((state) => state.cart.addingToCart);
  const type = useAppSelector((state) => state.auth.type);

  const handleAddToCart = (
    e: React.MouseEvent<HTMLElement>,
    product: Product
  ) => {
    e.preventDefault();

    console.log("wdw");

    if (isLoggedIn) {
      dispatch(addItemToServer({ product, quantity: 1, type: "productCard" }));
    } else {
      dispatch(addItem({ product, quantity: 1, type: "productCard" }));
    }
  };

  return (
    <Link
      href={`/${
        product.productSaleType == "b2b" ? "wholesale" : "marketplace"
      }/${product._id}`}
      className="block w-full h-full unselectable"
    >
      <Card className="relative h-full w-full border border-white hover:shadow-2xl hover:shadow-primary/30 hover:border-primary group duration-300 flex flex-col">
        {product.discount.active && (
          <div className="absolute z-10 top-5 left-2 bg-red-500 bg-opacity-75 text-white text-xs px-2 py-1 rounded">
            {product.discount.amount}
          </div>
        )}
        <CardHeader className="p-0 relative">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-48 object-cover rounded-t-lg unselectable"
          />
          {/* <button
            onClick={(e) => {
              e.preventDefault();

              if (isLoggedIn && type !== UserType.CUSTOMER) {
                handleNoCustomer();
                return;
              }

              mutate(product);
            }}
            className="absolute top-2 right-2 p-2 bg-white bg-opacity-75 rounded-full hover:bg-gray-100 z-10"
          >
            {isPending ? (
              <LoaderCircleIcon className="w-4 h-4 animate-spin " />
            ) : (
              <HeartIcon className="w-4 h-4 " />
            )}
          </button> */}
        </CardHeader>
        <CardContent className="px-2">
          <div className="flex justify-between">
            <p className="text-xs my-3 text-gray-500">
              {product?.productCategory?.title}
            </p>
            {product.productSaleType === "b2b" && (
              <p className="text-xs my-3 text-gray-500">
                Min.order: {product?.minimumOrder}
              </p>
            )}
          </div>

          <CardTitle className="text-sm font-medium">{product.name}</CardTitle>
          <p className="text-lg font-light mt-3 text-black">
            ₦ {product.price.toLocaleString()}
          </p>
        </CardContent>
        <CardFooter className="w-full flex justify-between mt-auto self-baseline relative">
          <CardDescription className="text-xs ">
            Sold By{" "}
            <span className="text-primary">
              {truncateText(
                product?.seller?.businesses[0].shopName || "No Shop Name",
                20
              )}
            </span>
          </CardDescription>

          {loadingAddToCart?.state &&
          loadingAddToCart?.product?._id == product._id ? (
            <Button className="p-2 h-10 rounded-full hover:bg-primary text-[#7C7C7C] hover:text-white bg-gray-200 z-10 absolute right-0 bottom-0 mb-3 mr-3 transition-opacity duration-500">
              <LoaderCircleIcon className="w-5 h-5 animate-spin" />
              <span className="text-sm  ml-1 ">Add To Cart</span>
            </Button>
          ) : (
            <Button
              onClick={(e) => {
                e.preventDefault();

                if (isLoggedIn && type !== UserType.CUSTOMER) {
                  handleNoCustomer();
                  return;
                }
                handleAddToCart(e, product);
              }}
              className=" p-2  h-10 rounded-full hover:bg-primary text-[#7C7C7C] hover:text-white bg-gray-200 z-10 absolute right-0 bottom-0 mb-3 mr-3 md:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-500"
            >
              <ShippingBoxIcon className="text-inherit" />
              <span className="text-sm  ml-1 ">Add To Cart</span>
            </Button>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProductCard;
