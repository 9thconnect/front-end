import React from "react";
import { X, ReceiptText, RotateCwIcon } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerClose,
  DrawerTitle,
  DrawerFooter,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { SingleTransactionData } from "@/type/common";
import { formatCurrency } from "@/utils/format-currency";
import { renderPaymentStatus } from "./renderPaymentStatus";
import { useMutation } from "@tanstack/react-query";
import requests from "@/utils/requests";
import { toast } from "sonner";
import { AxiosError } from "axios";

interface PaymentReceiptDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onClose: () => void;
  singleTransactionData: SingleTransactionData | null;
  isSingleLoading: boolean;
  singleTransactionError: Error | null;
}

const PaymentReceiptDrawer: React.FC<PaymentReceiptDrawerProps> = ({
  open,
  onOpenChange,
  onClose,
  singleTransactionData,
  isSingleLoading,
  singleTransactionError,
}) => {
  const { mutate, isPending } = useMutation({
    mutationKey: ["retry-paymenr"],
    mutationFn: (ref: string) => {
      return requests.patch(`/payment/verify-payment/${ref}`, {});
    },
    onSuccess: (data) => {
      toast(data.message);
    },

    onError: (error: AxiosError<{ message: string }>) => {
      console.log(error.response?.data.message);

      toast.error(error.response?.data.message);
    },
  });
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-w-[425px] h-full flex flex-col ml-auto border">
        <DrawerHeader className="flex-shrink-0">
          <div className="flex items-center">
            <DrawerClose className="flex justify-center items-center p-2 bg-gray-100 rounded-full mr-3">
              <X size={20} />
            </DrawerClose>
            <DrawerTitle className="font-thin text-offBlack">
              Payment Receipt
            </DrawerTitle>
          </div>
        </DrawerHeader>

        <div className="flex-grow overflow-y-auto">
          {isSingleLoading ? (
            <div className="p-4 space-y-4">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
            </div>
          ) : singleTransactionError ? (
            <div className="p-4 text-red-500">
              Error loading transaction details
            </div>
          ) : singleTransactionData ? (
            <div className="px-3 mt-4">
              <div className="p-4 rounded-lg mb-4 relative border text-center">
                <div className="p-2 rounded-full bg-primary/20 flex justify-center items-center absolute -top-5 right-1/2">
                  <ReceiptText size={15} className="text-primary" />
                </div>
                <div className="mt-3">
                  <p>
                    {new Date(
                      singleTransactionData.paymentDate
                    ).toLocaleString()}
                  </p>
                  <p className="text-3xl font-bold text-offBlack my-3">
                    {formatCurrency(singleTransactionData.amount)}
                  </p>
                  {/* {renderPaymentStatus(singleTransactionData.status)} */}
                  <div className="flex items-center justify-center">
                    {renderPaymentStatus(singleTransactionData.status)}

                    {singleTransactionData.status === "pending" && (
                      <RotateCwIcon
                        onClick={() =>
                          !isPending && mutate(singleTransactionData.invoiceRef)
                        }
                        className={`ml-2 ${
                          isPending && "animate-spin"
                        }  cursor-pointer`}
                      />
                    )}
                  </div>
                </div>
              </div>
              <div>
                {/* Transaction details */}
                {Object.entries({
                  Customer: singleTransactionData.payerName,
                  Email: singleTransactionData.payerEmail,
                  Phone: singleTransactionData.payerPhoneNumber,
                  "Invoice Ref": singleTransactionData.invoiceRef,
                  "Order ID": singleTransactionData.order.orderID,
                  "Payment Method": singleTransactionData.payment_options,
                  "Order Status": singleTransactionData.order.status,
                }).map(([key, value]) => (
                  <div
                    key={key}
                    className="border-b pb-5 mt-3 flex justify-between items-center"
                  >
                    <p>{key}</p>
                    <p>{value}</p>
                  </div>
                ))}

                {/* Order Items */}
                <div className="mt-5">
                  <p className="font-bold mb-3">Order Items:</p>
                  {singleTransactionData.order.orderItems.map((item, index) => (
                    <div key={index} className="border-b pb-3 mb-3">
                      <p>
                        {item.name} x {item.quantity}
                      </p>
                      <p>Price: {formatCurrency(item.price)}</p>
                      <p>Total: {formatCurrency(item.total)}</p>
                    </div>
                  ))}
                </div>

                {/* Total Amount */}
                <div className="border-b pb-5 mt-3 flex justify-between items-center">
                  <p className="font-bold text-offBlack">Total Amount</p>
                  <p className="font-bold text-offBlack">
                    {formatCurrency(singleTransactionData.amount)}
                  </p>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        <DrawerFooter className="w-full flex-shrink-0">
          <div className="flex w-full space-x-4">
            <Button className="w-full">Download</Button>
            <Button className="w-full" variant="outline">
              Print
            </Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default PaymentReceiptDrawer;
