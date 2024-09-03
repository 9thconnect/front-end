"use client";

import CartCard from "@/components/cards/common/cartCard";
import SectionCardHeader from "@/components/cards/common/sectionCardHeader";
import SectionContainer from "@/components/cards/common/sectionContainer";
import ProductCard from "@/components/cards/productCard";
import Empty from "@/components/common/empty";
import ScrollableContainer from "@/components/common/scrollableContainer";
import CheckoutForm from "@/components/forms/checkout/checkoutForm";
import { checkoutValidationSchema } from "@/components/forms/checkout/checkoutValidator";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { productDummyList } from "@/data/dummy/productDummyData";
import { useAppSelector } from "@/lib/redux/hooks";
import { orderProduct, useGetNewArrival } from "@/lib/requests/user/product";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

const CheckoutPage = () => {
  const cartItems = useAppSelector((state) => state.cart.items);
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);

  const handlePaymentClick = () => {
    console.log(formRef.current);

    if (formRef.current) {
      // Type cast the hidden button to HTMLButtonElement to access the click method
      const hiddenSubmitButton = formRef.current.querySelector(
        'button[type="submit"]'
      ) as HTMLButtonElement;
      hiddenSubmitButton?.click();
    }
  };

  const onSubmit = async (data: z.infer<typeof checkoutValidationSchema>) => {
    try {
      setLoading(true);
      const response = await orderProduct({
        shippingAddress: {
          address: data.address,
          city: data.city,
          state: data.state,
          postalCode: data.posterCode,
          country: data.country,
        },
      });
      toast.success(response.message);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("An error occurred try again");
      }
    } finally {
      setLoading(false);
    }
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => {
      const itemPrice = item.product.price;

      return sum + itemPrice * item.quantity;
    }, 0);
  };

  const deliveryFee = 500; // Example delivery fee
  const subtotal = calculateSubtotal();
  const total = subtotal + deliveryFee;

  const { data: productList, isLoading, isError, error } = useGetNewArrival();

  return (
    <div>
      <SectionContainer className="mt-5">
        <div className="block md:grid md:grid-cols-8 md:gap-8">
          <div className="md:col-span-5 mt-10 md:mt-0">
            <div className={`section-card-header `}>
              <div className=" mb-5">
                <h3 className="text-2xl  text-offBlack">Delivery Details</h3>
                <p className="text-sm mt-3">
                  This is the address where we will deliver your items.
                </p>
              </div>
              <div className="border-b-2 w-full"></div>
            </div>

            <CheckoutForm onSubmit={onSubmit} ref={formRef} />
          </div>
          <div className="md:self-start md:sticky md:col-span-3 md:top-56">
            <h2 className="my-3 text-2xl text-offBlack">Order Summary</h2>
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
              disabled={subtotal < 1 || loading}
              onClick={handlePaymentClick}
              className="w-full mt-5 rounded-lg"
            >
              {loading
                ? "loading.."
                : `Make payment ₦ ${total.toLocaleString()}`}
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

export default CheckoutPage;
