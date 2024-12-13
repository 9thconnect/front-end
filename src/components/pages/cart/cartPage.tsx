"use client";

import CartCard from "@/components/cards/common/cartCard";
import SectionCardHeader from "@/components/cards/common/sectionCardHeader";
import SectionContainer from "@/components/cards/common/sectionContainer";
import ProductCard from "@/components/cards/productCard";
import Empty from "@/components/common/empty";
import ScrollableContainer from "@/components/common/scrollableContainer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { productDummyList } from "@/data/dummy/productDummyData";
import { UserType } from "@/lib/redux/features/auth/authSlice";
import {
  clearCart,
  clearCertFromServer,
  fetchCartFromServer,
} from "@/lib/redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { useGetMyCert, useGetProductList } from "@/lib/requests/user/product";
import { CartItem } from "@/type/common";
import requests from "@/utils/requests";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const CartPage = () => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.auth.data);
  const isUser =
    useAppSelector((state) => state.auth.type) == UserType.CUSTOMER;

  const cartItems = useAppSelector((state) => state.cart?.items ?? []);

  useEffect(() => {
    if (isLoggedIn && isUser) {
      dispatch(fetchCartFromServer());
    }
  }, [isLoggedIn, isUser]);

  useEffect(() => {
    if (cartItems.length > 0) {
      // Logic to handle updated cart items
      console.log("Cart items updated:", cartItems);
    }
  }, [cartItems]);

  const calculateSubtotal = () => {
    if (cartItems?.length > 0) {
      return cartItems?.reduce((sum, item) => {
        if (item.product) {
          const itemPrice = item.product.price;

          return sum + itemPrice * item.quantity;
        }

        return 0;
      }, 0);
    }

    return 0;
  };

  const deliveryFee = 500; // Example delivery fee
  const subtotal = calculateSubtotal();
  const total = subtotal;

  const {
    data: productList,
    isLoading,
    isError,
    error,
  } = useGetProductList("", 1);

  const router = useRouter();

  const onClearCart = () => {
    if (isLoggedIn) {
      dispatch(clearCertFromServer());
    } else {
      dispatch(clearCart());
    }
  };

  return (
    <div>
      <SectionContainer className="mt-5">
        <div className="block md:grid md:grid-cols-8 md:gap-8">
          <div className="md:col-span-5 mt-10 md:mt-0">
            <div className={`section-card-header `}>
              <div className="flex justify-between items-center mb-5">
                <h3 className="text-2xl  text-offBlack">Cart</h3>
                <Button onClick={onClearCart}>Clear Cart</Button>
              </div>
              <div className="border-b-2 w-full"></div>
            </div>

            <div className="mt-3">
              {cartItems &&
                (cartItems.length === 0 ? (
                  <Empty size={150} text="Cart Empty" />
                ) : (
                  cartItems.map((item, index) => (
                    <CartCard
                      key={`${item.product._id}-${index}`}
                      product={item.product}
                      quantity={item.quantity}
                    />
                  ))
                ))}
            </div>
          </div>
          <div className="md:self-start md:sticky md:col-span-3 md:top-56">
            <h2 className="my-3 text-2xl text-offBlack">Cart Summary</h2>
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-3">
                <p>Subtotal</p>
                <p className="text-offBlack">₦ {subtotal.toLocaleString()}</p>
              </div>
              {/* <div className="flex justify-between items-center">
                <p>Delivery Fee</p>
                <p>₦ {deliveryFee.toLocaleString()}</p>
              </div> */}
              <Separator className="my-4" />
              <div className="flex justify-between items-center">
                <p>Total</p>
                <p>₦ {total.toLocaleString()}</p>
              </div>
            </div>
            <Button
              onClick={() =>
                router.push(
                  `${
                    isLoggedIn
                      ? "/marketplace/cart/checkout"
                      : "/customer/login?redirectTo=/marketplace/cart"
                  } `
                )
              }
              disabled={subtotal < 1}
              className="w-full mt-5 rounded-lg"
            >
              {!isLoggedIn ? "Login to checkout " : "Checkout "}₦{" "}
              {total.toLocaleString()}
            </Button>
          </div>
        </div>
      </SectionContainer>
      <SectionContainer>
        <SectionCardHeader
          linkText="Marketplace"
          linkUrl="/marketplace"
          title="Viewed Products"
        />
        <ScrollableContainer>
          <div className="flex mt-4 space-x-4 cursor-pointer">
            {productList?.data?.data.products.map((product, index) => (
              <div className="w-80 flex-none self-stretch" key={index}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </ScrollableContainer>
      </SectionContainer>
    </div>
  );
};

export default CartPage;
