import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import React from "react";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
const page = ({ params }: Props) => {
  return (
    <div>
      <div className="flex justify-between items-center border-b pb-2">
        <h3 className="hidden sm:block text-xl text-offBlack">
          Order Detail {params.id}
        </h3>
        <div className="flex space-x-2 items-center">
          <p>Status</p>
          <Button variant="outline" disabled>
            Delivered
          </Button>
          <Button variant="outline">Track Order</Button>
        </div>
      </div>
      <div className="mt-3">
        <p className="text-sm">Date place: 27 July, 2024</p>
        <p className="text-md text-offBlack">Order ID: QW34565768</p>
      </div>

      <div className="mt-6">
        <p className="text-offBlack">Items in this Order</p>
        <div className="px-0.5 py-2 border mt-2 rounded-lg">
          {[1, 2].map((item) => (
            <div key={`item-in-order-${item}`} className="flex p-2">
              <div className="rounded-md mr-3 h-24 w-36 bg-cover bg-no-repeat bg-center bg-[url(/images/Ads.png)]"></div>
              {/* <img className="h-" src="/images/Ads.png" alt="" /> */}
              <div className=" flex flex-col space-y-4">
                <p className="text-xs">QTY: 23</p>
                <p>Dangote 3X, cement type CEMII 42.</p>
                <p className="text-lg text-offBlack">
                  ₦ {"70000".toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6">
        <p className="text-offBlack">Items in this Order</p>
        <div className="px-2 py-2 border mt-2 rounded-lg">
          <div className="flex justify-between items-center">
            <p>Subtotal</p>
            <p className="text-offBlack">₦ 18,499.00</p>
          </div>
          <div className="flex justify-between items-center my-3">
            <p>Delivery Fee</p>
            <p className="text-offBlack">₦ 0.00</p>
          </div>
          <Separator orientation="horizontal" />
          <div className="flex justify-between items-center mt-3">
            <p>Total</p>
            <p className="text-offBlack">₦ 18,499.00</p>
          </div>
        </div>
      </div>
      <div className="mt-2">
        <div className="px-2 py-2 border mt-2 rounded-lg">
          <div className="flex justify-between items-center">
            <p>Status</p>
            <p className="text-offBlack">Success</p>
          </div>
          <div className="flex justify-between items-center my-3">
            <p>Payment method</p>
            <p className="text-offBlack">Card</p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <p className="text-offBlack">Delivery Information</p>
        <div className="px-2 py-2 border mt-2 rounded-lg">
          <div className="flex justify-between items-center">
            <p>Delivery method</p>
            <p className="text-offBlack">Door</p>
          </div>
          <div className="flex justify-between items-center my-3">
            <p>Fulfilled by</p>
            <p className="text-offBlack">Chika Trucks & Co.</p>
          </div>
          <div className="flex justify-between items-center my-3">
            <p>Date</p>
            <p className="text-offBlack">Mar 7 - Mar 20, 2024</p>
          </div>
          <Separator orientation="horizontal" />
          <div className="flex justify-between items-center mt-3">
            <p>Address</p>
            <p className="text-offBlack text-right">
              52, Kado Crescent, Off Aminu Kano Crescent, Wuse II, Abuja,
              Nigeria.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
