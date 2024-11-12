import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Camera, Clock, CreditCard, Mail, Phone, User } from "lucide-react";
import MainBadge from "../badges/mainBadge";
import { SingleTransactionData } from "@/type/common";
import Image from "next/image";
import { siteConfig } from "@/config/site.config";

const PaymentReceipt = ({
  paymentData,
}: {
  paymentData: SingleTransactionData;
}) => {
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (error) {
      return dateString;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount);
  };

  const getStatusColor = (status: string): string => {
    const statusColors = {
      approved: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      cancelled: "bg-red-100 text-red-800",
      failed: "bg-red-100 text-red-800",
    } as const;

    type StatusKey = keyof typeof statusColors;
    return (
      statusColors[status.toLowerCase() as StatusKey] ||
      "bg-gray-100 text-gray-800"
    );
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <div className="p-7 w-full flex justify-center">
        <Image alt="logo" src={siteConfig.logo} height={200} width={200} />
      </div>

      <CardHeader className="border-b">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-bold">Payment Receipt</CardTitle>
          <MainBadge
            type="grey"
            className={`${getStatusColor(paymentData.status)} capitalize`}
            text={paymentData.status}
          />
        </div>
      </CardHeader>

      <CardContent className="space-y-6 pt-6">
        {/* Transaction Info */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Invoice Reference</p>
            <p className="font-medium">{paymentData.invoiceRef}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Order ID</p>
            <p className="font-medium">{paymentData.order.orderID}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Payment Date</p>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-500" />
              <p className="font-medium">
                {formatDate(paymentData.paymentDate)}
              </p>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Payment Method</p>
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-gray-500" />
              <p className="font-medium capitalize">
                {paymentData.payment_options}
              </p>
            </div>
          </div>
        </div>

        <Separator />

        {/* Customer Info */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Customer Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <User className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-medium">{paymentData.payerName}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{paymentData.payerEmail}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium">{paymentData.payerPhoneNumber}</p>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Order Items */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Order Details</h3>
          <div className="space-y-4">
            {paymentData.order.orderItems.map((item) => (
              <div
                key={item._id}
                className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 bg-gray-50 rounded-lg gap-4"
              >
                <div className="flex items-center gap-4 w-full">
                  <div className="relative h-20 w-32 rounded-md overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="flex justify-between w-full">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <div className="ml-24 md:ml-0">
                      <p className="font-medium text-right">
                        {formatCurrency(item.price)}
                      </p>
                      <p className="text-sm text-gray-600 text-right">
                        MCD Fee: {formatCurrency(item.MCDFee)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Payment Summary */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Payment Summary</h3>
          <div className="bg-gray-50 p-4 rounded-lg space-y-2">
            <div className="flex justify-between items-center pb-2">
              <span className="text-gray-600">Subtotal</span>
              <span>{formatCurrency(paymentData.amount)}</span>
            </div>
            <div className="flex justify-between items-center pb-2">
              <span className="text-gray-600">MCD Fee</span>
              <span>
                {formatCurrency(
                  paymentData.order.orderItems.reduce(
                    (sum, item) => sum + item.MCDFee,
                    0
                  )
                )}
              </span>
            </div>
            <Separator />
            <div className="flex justify-between items-center pt-2 font-medium text-lg">
              <span>Total Amount</span>
              <span>{formatCurrency(paymentData.amount)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentReceipt;
