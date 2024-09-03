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
import { HeartIcon } from "lucide-react";
import ShippingBoxIcon from "@/icons/shippingBoxIcon";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { addItem, addItemToServer } from "@/lib/redux/features/cart/cartSlice";
import { Product } from "@/type/common";

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

  const handleAddToWishlist = (product: Product) => {
    toast(`Product added to whish list`, {
      description: `${product.name} added to whish list`,
      action: {
        label: "Whish List",
        onClick: () => console.log("Undo"),
        actionButtonStyle: {
          backgroundColor: "#ab0505b9",
          color: "#880b0bf",
        },
      },
    });
  };

  const isLoggedIn = useAppSelector((state) => state.auth.data);

  const handleAddToCart = (
    e: React.MouseEvent<HTMLElement>,
    product: Product
  ) => {
    e.preventDefault();

    console.log("wdw");

    if (isLoggedIn) {
      dispatch(addItemToServer({ product, quantity: 1 }));
    } else {
      dispatch(addItem({ product, quantity: 1 }));
    }
  };

  return (
    <Link
      href={`/marketplace/${product._id}`}
      className="block w-full h-full unselectable"
    >
      <Card className="relative h-full w-full border border-white hover:shadow-2xl hover:shadow-primary/30 hover:border-primary group duration-300 flex flex-col">
        {product.discount && (
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
          <button
            onClick={(e) => {
              e.preventDefault();
              handleAddToWishlist(product);
            }}
            className="absolute top-2 right-2 p-2 bg-white bg-opacity-75 rounded-full hover:bg-gray-100 z-10"
          >
            <HeartIcon className="w-4 h-4 " />
          </button>
        </CardHeader>
        <CardContent className="">
          <p className="text-xs my-3 text-gray-500">
            {product.subCategory.title}
            {/* {product.productCategory.title} TODO:change back */}
          </p>
          <CardTitle className="text-sm font-medium">{product.name}</CardTitle>
          <p className="text-lg font-light mt-3 text-black">
            ₦ {product.price.toLocaleString()}
          </p>
        </CardContent>
        <CardFooter className="w-full flex justify-between mt-auto self-baseline relative">
          <CardDescription className="text-sm text-primary">
            {product.seller.fullName}
          </CardDescription>
          <Button
            onClick={(e) => handleAddToCart(e, product)}
            className=" p-2 w-10 h-10 rounded-full hover:bg-primary/50 bg-gray-200 z-10 absolute right-0 bottom-0 mb-3 mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          >
            <ShippingBoxIcon />
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProductCard;
