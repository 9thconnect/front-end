"use client";

import { Separator } from "@/components/ui/separator";
import { ArrowLeft } from "lucide-react";
import React from "react";

type AuthContainerCardProp = {
  children: React.ReactNode;
  image: string;
  backUrl: string;
  title: string;
  body: string;
};

const AuthContainerCard = ({
  children,
  image,
  title,
  backUrl,
  body,
}: AuthContainerCardProp) => {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  let containerHeight;
  if (isMobile) {
    containerHeight = `100%`;
  } else {
    containerHeight = `calc(100vh - 135px)`;
  }

  return (
    <div
      className="grid grid-cols-2 p-3 gap-2 bg-white rounded-xl"
      style={{ height: containerHeight }}
    >
      <div className="hidden md:block col-span-1 rounded-lg overflow-hidden relative image-wrapper">
        <div
          className="image-content"
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
      </div>
      <div className="col-span-2 md:col-span-1 overflow-y-auto p-1 md:p-4">
        <div className="text-offBlack">
          {/* <ArrowLeft />
          <h2 className="my-2 text-xl">{title}</h2>
          <p className="mb-4">{body}</p>
          <Separator /> */}
        </div>
        {children}
      </div>
    </div>
  );
};

export default AuthContainerCard;
