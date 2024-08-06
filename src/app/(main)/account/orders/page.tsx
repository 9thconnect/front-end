import { Button } from "@/components/ui/button";
import React from "react";

const page = () => {
  return (
    <div>
      <div className="flex justify-between items-center border-b pb-2">
        <h3 className="text-xl text-offBlack">Orders</h3>
        <div className="flex space-x-2 items-center">
          <p>Status</p>
          <Button variant="outline" disabled>
            Delivered
          </Button>
          <Button variant="outline">Track Order</Button>
        </div>
      </div>
    </div>
  );
};

export default page;
