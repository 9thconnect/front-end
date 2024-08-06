"use client";

import React from "react";
import { Card } from "../ui/card";

interface Offer {
  title: string;
  detail: string;
  url: string;
  icon: React.ComponentType;
  backgroundImage: string;
}

interface OfferCardProps {
  offer: Offer;
}

const OfferCard: React.FC<OfferCardProps> = ({ offer }) => {
  const { title, detail, url, icon: IconComponent, backgroundImage } = offer;
  return (
    <Card
      className="relative overflow-hidden"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="p-4 bg-primary bg-opacity-75 text-white">
        <IconComponent />
        <h3 className="text-lg font-semibold my-2">{title}</h3>
        <p className="text-lg font-thin">{detail}</p>
      </div>
    </Card>
  );
};

export default OfferCard;
