"use client";

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
import { HeartIcon, ShieldCheck, StarIcon } from "lucide-react";
import ShippingBoxIcon from "@/icons/shippingBoxIcon";
import { toast } from "sonner";

export interface ITalent {
  id: string;
  name: string;
  profession: string;
  location: string;
  rating?: number;
  verified: boolean;
  imageUrl: string;
  category?: string;
  type: "professional" | "artisan";
}

interface TalentCardProps {
  talent: ITalent;
}

const TalentCard: React.FC<TalentCardProps> = ({ talent }) => {
  const handleAddToWishlist = (talent: ITalent) => {
    toast(`Talent added to whish list`, {
      description: `${talent.name} added to whish list`,
      action: {
        label: "Whish List",
        onClick: () => console.log("Undo"),
        actionButtonStyle: {
          backgroundColor: "#ab0505b9",
          color: "#880b0bf",
        },
      },
    });
  };

  return (
    <Link
      href={`/hire/${talent.type}s/${talent.id}`}
      className="block h-full w-full unselectable"
    >
      <Card className="relative h-full w-full border border-white hover:shadow-2xl hover:shadow-primary/30 hover:border-primary group duration-300">
        <CardHeader className="p-0 relative">
          <img
            src={
              talent.imageUrl ||
              `https://fakeimg.pl/600x192?text=${talent.name}`
            }
            alt={talent.name}
            className="w-full h-48 object-cover rounded-t-lg unselectable"
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              handleAddToWishlist(talent);
            }}
            className="absolute top-2 right-2 p-2 bg-white bg-opacity-75 rounded-full hover:bg-gray-100 z-10"
          >
            <HeartIcon className="w-4 h-4 " />
          </button>
        </CardHeader>
        <CardContent className="">
          <p className="text-xs mt-3 text-gray-500">{talent.profession}</p>
          <CardTitle className=" text-md lg:text-lg mt-2 font-medium">
            {talent.name}
          </CardTitle>
          <p className="text-md font-light mt-1 text-black">
            {talent.location}
          </p>
          {talent.verified && (
            <div className="mt-3">
              <div className="rounded-2xl bg-purple-700 text-white inline-flex items-center px-2 py-1">
                <ShieldCheck size={10} />
                <p className="text-[10px]">Verified</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
};

export default TalentCard;
