import React from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Phone, MessageSquare } from "lucide-react";
import { truncateText } from "@/utils/common";
import { Logistics } from "@/type/logistics";

interface LogisticsCardProps {
  logistics: Logistics;
}

const LogisticsCard: React.FC<LogisticsCardProps> = ({ logistics }) => {
  const handleCall = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = `tel:${logistics.contact.callNumber}`;
  };

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = `https://wa.me/${logistics.contact.whatsAppNumber}`;
  };

  return (
    <Link
      href={`/logistics/${logistics._id}`}
      className="block w-full h-full unselectable"
    >
      <Card className="relative h-full w-full border border-white hover:shadow-2xl hover:shadow-primary/30 hover:border-primary group duration-300 flex flex-col">
        <CardHeader className="p-0 relative">
          <div className="relative h-48 overflow-hidden">
            <img
              src={logistics.image}
              alt={logistics.title}
              className="w-full h-full object-cover rounded-t-md"
            />
          </div>
        </CardHeader>
        <CardContent className="px-2">
          <div className="flex justify-between">
            <p className="text-xs my-3 text-gray-500">
              {logistics.logisticType.toUpperCase()}
            </p>
            <p className="text-xs my-3 text-gray-500">
              REG: {logistics.registration}
            </p>
          </div>

          <CardTitle className="text-sm font-medium">
            {logistics.title}
          </CardTitle>

          <div className="flex justify-between mt-3">
            <p className="text-base font-medium text-primary">
              ₦{logistics.ratePerKg.toLocaleString()}/kg
            </p>
            <p className="text-base font-medium text-primary">
              ₦{logistics.ratePerKilometer.toLocaleString()}/km
            </p>
          </div>

          <div className="flex gap-2 mt-2 text-sm text-gray-600">
            <span>{logistics.logisticSubType}</span>
            <span>•</span>
            <span>{logistics.capacity.toLocaleString()}kg capacity</span>
          </div>
        </CardContent>
        <CardFooter className="w-full flex justify-between mt-auto self-baseline">
          <div className="flex items-center gap-2">
            <img
              src={logistics.marketedBy.businessLogo}
              alt={logistics.marketedBy.shopName}
              className="w-6 h-6 rounded-full object-cover"
            />
            <CardDescription className="text-xs">
              {truncateText(logistics.marketedBy.shopName, 20)} •{" "}
              {logistics.marketedBy.shopCity}
            </CardDescription>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default LogisticsCard;
