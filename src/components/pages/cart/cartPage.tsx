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
import { useAppSelector } from "@/lib/redux/hooks";
import { useRouter } from "next/navigation";
import React from "react";

const CartPage = () => {
  const cartItems = useAppSelector((state) => state.cart.items);

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => {
      const itemPrice = item.product.price;

      return sum + itemPrice * item.quantity;
    }, 0);
  };

  const deliveryFee = 500; // Example delivery fee
  const subtotal = calculateSubtotal();
  const total = subtotal + deliveryFee;

  const router = useRouter();

  return (
    <div>
      <SectionContainer className="mt-5">
        <div className="block md:grid md:grid-cols-8 md:gap-8">
          <div className="md:col-span-5 mt-10 md:mt-0">
            <div className={`section-card-header `}>
              <div className="flex justify-between items-center mb-5">
                <h3 className="text-2xl  text-offBlack">Cart</h3>
              </div>
              <div className="border-b-2 w-full"></div>
            </div>

            <div className="mt-3">
              {cartItems.length === 0 ? (
                <Empty size={150} text="Cart Empty" />
              ) : (
                cartItems.map((item) => (
                  <CartCard
                    key={item.product.id}
                    product={item.product}
                    quantity={item.quantity}
                  />
                ))
              )}
            </div>
          </div>
          <div className="md:self-start md:sticky md:col-span-3 md:top-56">
            <h2 className="my-3 text-2xl text-offBlack">Cart Summary</h2>
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-3">
                <p>Subtotal</p>
                <p className="text-offBlack">₦ {subtotal.toLocaleString()}</p>
              </div>
              <div className="flex justify-between items-center">
                <p>Delivery Fee</p>
                <p>₦ {deliveryFee.toLocaleString()}</p>
              </div>
              <Separator className="my-4" />
              <div className="flex justify-between items-center">
                <p>Total</p>
                <p>₦ {total.toLocaleString()}</p>
              </div>
            </div>
            <Button
              onClick={() => router.push("/marketplace/cart/checkout")}
              disabled={subtotal < 1}
              className="w-full mt-5 rounded-lg"
            >
              Checkout ₦ {total.toLocaleString()}
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
            {productDummyList.map((product, index) => (
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
