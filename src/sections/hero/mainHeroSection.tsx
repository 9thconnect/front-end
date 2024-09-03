"use client";

import ImageCarousel from "@/components/carousel/imageCarousel";
import React from "react";

const MainHeroSection: React.FC = () => {
  const images = [
    "/images/1-banner.png",
    "/images/2-banner.png",
    "/images/3-banner.png",
    "/images/4-banner.png",
    "/images/5-banner.png",
    "/images/6-banner.png",
  ];

  return (
    <div className="w-full h-full rounded-xl contain-content">
      <ImageCarousel images={images} interval={5000} animationType="slide" />
    </div>
  );
};

export default MainHeroSection;
