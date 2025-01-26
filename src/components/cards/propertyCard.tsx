"use client";

import React, { useState } from "react";
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
import {
  HeartIcon,
  LoaderCircleIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { toast } from "sonner";
import { useAppDispatch } from "@/lib/redux/hooks";
import { addToWishList } from "@/lib/requests/user/product";
import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { truncateText } from "@/utils/common";
import { Property } from "@/type/property";

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const dispatch = useAppDispatch();

  const { mutate, isPending } = useMutation({
    mutationKey: ["addRemoveWishlist"],
    mutationFn: (data: Property) => {
      return addToWishList(property._id);
    },
    onSuccess: (data) => {
      toast(data.message, {
        description: `${property.title}`,
        action: {
          label: "Wish List",
          onClick: () => console.log("Undo"),
          actionButtonStyle: {
            backgroundColor: "#ab0505b9",
            color: "#880b0bf",
          },
        },
      });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data.message);
    },
  });

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isAnimating) return;

    setIsAnimating(true);
    setCurrentImageIndex((prev) =>
      prev === property.images.length - 1 ? 0 : prev + 1
    );

    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  const previousImage = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isAnimating) return;

    setIsAnimating(true);
    setCurrentImageIndex((prev) =>
      prev === 0 ? property.images.length - 1 : prev - 1
    );

    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  return (
    <Link
      href={`/real-estate/${property._id}`}
      className="block w-full h-full unselectable"
    >
      <Card className="relative h-full w-full border border-white hover:shadow-2xl hover:shadow-primary/30 hover:border-primary group duration-300 flex flex-col">
        <CardHeader className="p-0 relative">
          <div className="relative h-48 overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out h-full"
              style={{
                transform: `translateX(-${currentImageIndex * 100}%)`,
              }}
            >
              {property.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${property.title} - Image ${index + 1}`}
                  className="w-full h-full object-cover flex-shrink-0"
                />
              ))}
            </div>
            {property.images.length > 1 && (
              <>
                <Button
                  onClick={previousImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-1 bg-black/50 hover:bg-black/70 rounded-full z-20 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  disabled={isAnimating}
                >
                  <ChevronLeft className="w-4 h-4 text-white" />
                </Button>
                <Button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 bg-black/50 hover:bg-black/70 rounded-full z-20 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  disabled={isAnimating}
                >
                  <ChevronRight className="w-4 h-4 text-white" />
                </Button>
              </>
            )}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-20">
              {property.images.map((_, index) => (
                <div
                  key={index}
                  className={`w-1.5 h-1.5 rounded-full ${
                    index === currentImageIndex ? "bg-white" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-2">
          <div className="flex justify-between">
            <p className="text-xs my-3 text-gray-500">
              {property.propertyType.title}
            </p>
            <p className="text-xs my-3 text-gray-500">
              {property.location.state}, {property.location.country}
            </p>
          </div>

          <CardTitle className="text-sm font-medium">
            {property.title}
          </CardTitle>
          <p className="text-lg font-light mt-3 text-black">
            ₦ {property.price.toLocaleString()}
          </p>

          <div className="flex gap-2 mt-2 text-sm text-gray-600">
            <span>{property.details.bedroom} bed</span>
            <span>•</span>
            <span>{property.details.bathroom} bath</span>
          </div>
        </CardContent>
        <CardFooter className="w-full flex justify-between mt-auto self-baseline">
          <CardDescription className="text-xs">
            Listed by{" "}
            <span className="text-primary">
              {truncateText(property.marketedBy.shopName || "No Shop Name", 20)}
            </span>
          </CardDescription>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default PropertyCard;
