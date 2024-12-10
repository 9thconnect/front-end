import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Clock,
  CreditCard,
  Mail,
  Phone,
  User,
  Tag,
  Calendar,
} from "lucide-react";
import MainBadge from "../badges/mainBadge";
import { SingleTransactionData } from "@/type/common";
import Image from "next/image";
import { siteConfig } from "@/config/site.config";

const PaymentReceiptProject = ({
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
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Payment For</p>
            <div className="flex items-center gap-2">
              <Tag className="h-4 w-4 text-gray-500" />
              <p className="font-medium capitalize">{paymentData.paymentFor}</p>
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

        {/* Project Details */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Project Details</h3>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <div className="flex items-center gap-2 mb-2">
                <Tag className="h-4 w-4 text-gray-500" />
                <p className="font-medium">Project ID</p>
                <span className="text-sm text-gray-600">
                  {paymentData.project?.projectID || "N/A"}
                </span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <User className="h-4 w-4 text-gray-500" />
                <p className="font-medium">Professional</p>
                <span className="text-sm text-gray-600">
                  {paymentData.project?.professional?.fullName || "N/A"}
                </span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <p className="font-medium">Project Status</p>
                <span
                  className={`text-sm capitalize ${getStatusColor(
                    paymentData.project?.status || ""
                  )}`}
                >
                  {paymentData.project?.status || "N/A"}
                </span>
              </div>
              <p className="text-gray-600">
                {paymentData.project?.projectDescription ||
                  "No project description available"}
              </p>
            </div>
          </div>
        </div>

        <Separator />

        {/* Offer Details */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Offer Details</h3>
          <div className="bg-gray-50 p-4 rounded-lg space-y-2">
            <div className="flex items-center gap-2 mb-2">
              <Tag className="h-4 w-4 text-gray-500" />
              <p className="font-medium">Profession</p>
              <span className="text-sm text-gray-600">
                {paymentData.offer?.profession?.professionName || "N/A"}
              </span>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <User className="h-4 w-4 text-gray-500" />
              <p className="font-medium">Professional</p>
              <span className="text-sm text-gray-600">
                {paymentData.offer?.professional?.fullName || "N/A"}
              </span>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <p className="font-medium">Offer Status</p>
              <span
                className={`text-sm capitalize ${getStatusColor(
                  paymentData.offer?.status || ""
                )}`}
              >
                {paymentData.offer?.status || "N/A"}
              </span>
            </div>
            <p className="text-gray-600">
              {paymentData.offer?.projectDescription ||
                "No offer description available"}
            </p>
          </div>
        </div>

        <Separator />

        {/* Payment Summary */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Payment Summary</h3>
          <div className="bg-gray-50 p-4 rounded-lg space-y-2">
            <div className="flex justify-between items-center pb-2">
              <span className="text-gray-600">Total Project Price</span>
              <span>
                {formatCurrency(paymentData.project?.approvedPrice || 0)}
              </span>
            </div>
            <div className="flex justify-between items-center pb-2">
              <span className="text-gray-600">Gateway Fee</span>
              <span>
                {formatCurrency(paymentData.project?.gatewayFee || 0)}
              </span>
            </div>
            <div className="flex justify-between items-center pb-2">
              <span className="text-gray-600">Transaction Fee</span>
              <span>{formatCurrency(paymentData.project?.MCDFee || 0)}</span>
            </div>
            <div className="flex justify-between items-center pb-2">
              <span className="text-gray-600">Professional Pay</span>
              <span>
                {formatCurrency(paymentData.project?.professionalPay || 0)}
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

export default PaymentReceiptProject;
