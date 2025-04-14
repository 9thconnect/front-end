import React from "react";
import { Truck, User, Coins } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const page = () => {
  return (
    <div className="h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto space-y-4">
        <h1 className="text-3xl font-bold mb-8">Admin Settings</h1>

        <div className="grid gap-4 md:grid-cols-3">
          <Link
            href={"/dashboard/settings/delivery"}
            className="bg-white rounded-md border h-32 flex flex-col items-center justify-center gap-2 hover:bg-primary hover:text-white transition-colors"
          >
            <Truck className="h-8 w-8" />
            <span className="text-lg font-medium">Delivery Setting</span>
          </Link>

          <Link
            href={"/dashboard/settings/profile"}
            className="bg-white rounded-md border h-32 flex flex-col items-center justify-center gap-2 hover:bg-primary hover:text-white transition-colors"
          >
            <User className="h-8 w-8" />
            <span className="text-lg font-medium">Profile Setting</span>
          </Link>

          <Link
            href={"/dashboard/settings/gateway"}
            className="bg-white rounded-md border h-32 flex flex-col items-center justify-center gap-2 hover:bg-primary hover:text-white transition-colors"
          >
            <Coins className="h-8 w-8" />
            <span className="text-lg font-medium">Gateway Setting</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
