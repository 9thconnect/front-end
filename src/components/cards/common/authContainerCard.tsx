"use client";

import React from "react";

type AuthContainerCardProp = {
  children: React.ReactNode;
  image: string;
  backUrl: string;
  title: string;
  body: string;
};

const AuthContainerCard = ({ children, image }: AuthContainerCardProp) => {
  const containerHeight = `calc(100vh - 135px)`;
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
        {children}
      </div>
    </div>
  );
};

export default AuthContainerCard;
