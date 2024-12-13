"use client";

import React, { useEffect, useState } from "react";
import { LoaderCircleIcon, Trash, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Counter from "@/components/common/countComponent";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import {
  addItemToServer,
  decreaseItemFromServer,
  removeItem,
  removeItemFromServer,
  updateQuantity,
} from "@/lib/redux/features/cart/cartSlice";
import { Product } from "@/type/common";
import { toast } from "sonner";

export type CartCardProp = {
  product: Product;
  quantity: number;
};
const CartCard = ({ product, quantity }: CartCardProp) => {
  const [count, setCount] = useState<number>(0);

  console.log("CartCardProp", quantity);

  const isLoggedIn = useAppSelector((state) => state.auth.data);
  const isDeleting = useAppSelector(
    (state) => state.cart.deletingProductFromCart
  );
  const loadingAddToCart = useAppSelector((state) => state.cart.addingToCart);

  const loading =
    loadingAddToCart?.state && loadingAddToCart?.product?._id == product._id;

  const isDeeting = useAppSelector((state) => state.cart);

  const handleRemove = (id: string) => {
    if (isLoggedIn) {
      dispatch(removeItemFromServer({ id: id, quantity: quantity }));
    } else {
      dispatch(removeItem(id));
    }
  };

  const dispatch = useAppDispatch();

  const handleQuantityChange = (quantityTwo: number) => {
    if (quantityTwo === 0) {
      handleRemove(product._id);
    } else {
      if (isLoggedIn) {
        if (quantity < quantityTwo) {
          console.log("increase");

          console.log("QUANTITY", quantity, quantityTwo);

          dispatch(addItemToServer({ product, quantity: quantityTwo }));
        } else {
          console.log("decrease");

          console.log("QUANTITY", quantity, quantityTwo);
          dispatch(
            decreaseItemFromServer({ product: product, quantity: quantity })
          );
        }
      } else {
        if (
          quantity > quantityTwo &&
          product.productSaleType == "b2b" &&
          product.minimumOrder &&
          product.minimumOrder >= quantity
        ) {
          toast.error(`You cannot go below minimum order`, {
            description: `The product minimum order is ${product.minimumOrder}`,
            action: {
              label: "Cart",
              onClick: () => console.log("Undo"),
              actionButtonStyle: {
                backgroundColor: "#ab0505b9",
                color: "#880b0bf",
              },
            },
          });

          return;
        }
        dispatch(updateQuantity({ product: product, quantity: quantityTwo }));
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
              backgroundImage: `url(${product?.images[0]})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="ml-2">
            <p className="text-primary">{product?.seller?.fullName}</p>
            <h3>{product?.name}</h3>
          </div>
        </div>
        <h3 className="text-2xl  text-offBlack">
          ₦ {product?.price.toLocaleString()}
        </h3>
      </div>
      <div className="flex justify-between items-center mt-3">
        <Button
          variant={"ghost"}
          className=" w-8 h-8 p-1 bg-gray-100 rounded-full "
          onClick={() => handleRemove(product?._id)}
        >
          {isDeleting?.product == product?._id && isDeleting?.state ? (
            <LoaderCircleIcon className="w-4 h-4 animate-spin " />
          ) : (
            <Trash2 size={15} color="red" />
          )}
        </Button>

        {quantity && (
          <Counter
            loading={loading}
            disable={loading}
            disableInput
            count={quantity}
            setCount={handleQuantityChange}
          />
        )}
      </div>
    </div>
  );
};

export default CartCard;
