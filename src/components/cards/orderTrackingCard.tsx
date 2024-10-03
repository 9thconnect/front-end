import React from "react";
import { formatCurrency } from "@/utils/format-currency";
import { OrderTracking } from "@/type/common";

const OrderTrackingInfo = ({
  trackingData,
}: {
  trackingData: OrderTracking;
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">{trackingData.title}</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p>
            <strong>Order ID:</strong> {trackingData.orderID}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            <span className="capitalize">{trackingData.status}</span>
          </p>
          <p>
            <strong>Payment Status:</strong>{" "}
            {trackingData.isPaid ? "Paid" : "Unpaid"}
          </p>
        </div>
        <div>
          <p>
            <strong>Total Items Price:</strong>{" "}
            {formatCurrency(trackingData.orderDetails.itemsTotalPrice)}
          </p>
          <p>
            <strong>Extra Price:</strong>{" "}
            {formatCurrency(trackingData.orderDetails.extraPrice)}
          </p>
          <p>
            <strong>Total Price:</strong>{" "}
            {formatCurrency(trackingData.orderDetails.totalPrice)}
          </p>
        </div>
      </div>
      <h3 className="text-lg font-semibold mt-4 mb-2">Order Items:</h3>
      <div className="space-y-4">
        {trackingData.orderItems.map((item, index) => (
          <div key={index} className="border-t pt-2">
            <p>
              <strong>{item.name}</strong> (Quantity: {item.quantity})
            </p>
            <p>
              Price: {formatCurrency(item.price)} | Total:{" "}
              {formatCurrency(item.total)}
            </p>
            <p>
              Seller Pay: {formatCurrency(item.sellerPay)} | MCD Fee:{" "}
              {formatCurrency(item.MCDFee)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderTrackingInfo;
