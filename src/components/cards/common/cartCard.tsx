"use client";

import React, { useEffect, useState } from "react";
import { Trash, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Counter from "@/components/common/countComponent";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import {
  addItemToServer,
  removeItem,
  removeItemFromServer,
  updateQuantity,
} from "@/lib/redux/features/cart/cartSlice";
import { Product } from "@/type/common";

export type CartCardProp = {
  product: Product;
  quantity: number;
};
const CartCard = ({ product, quantity }: CartCardProp) => {
  const [count, setCount] = useState<number>(0);

  const isLoggedIn = useAppSelector((state) => state.auth.data);

  const handleRemove = (id: string) => {
    console.log(quantity);

    if (isLoggedIn) {
      dispatch(removeItemFromServer({ id: id, quantity: quantity }));
    } else {
      dispatch(removeItem(id));
    }
  };

  const dispatch = useAppDispatch();

  const handleQuantityChange = (quantityTwo: number) => {
    console.log("isLoggedIn", isLoggedIn);
    if (quantityTwo === 0) {
      handleRemove(product._id);
    } else {
      if (isLoggedIn) {
        if (quantity < quantityTwo) {
          console.log("increase");

          dispatch(addItemToServer({ product, quantity: 1 }));
        } else {
          console.log("decrease");
          dispatch(
            removeItemFromServer({ id: product._id, quantity: quantityTwo })
          );
        }
      } else {
        dispatch(updateQuantity({ id: product._id, quantity: quantityTwo }));
      }
    }
  };

  return (
    <div className="mt-8">
      <div className="flex justify-between">
        <div className="flex">
          <div
            className={`rounded-lg w-40 h-20`}
            style={{
              backgroundImage: `url(${product.images[0]})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="ml-2">
            <p className="text-primary">{product.seller.fullName}</p>
            <h3>{product.name}</h3>
          </div>
        </div>
        <h3 className="text-2xl  text-offBlack">
          ₦ {product.price.toLocaleString()}
        </h3>
      </div>
      <div className="flex justify-between items-center mt-3">
        <Button
          variant={"ghost"}
          className=" w-8 h-8 p-1 bg-gray-100 rounded-full "
          onClick={() => handleRemove(product._id)}
        >
          <Trash2 size={15} color="red" />
        </Button>
        <Counter disable count={quantity} setCount={handleQuantityChange} />
      </div>
    </div>
  );
};

export default CartCard;
