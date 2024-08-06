"use client";

import ImageCarousel from "@/components/carousel/imageCarousel";
import React from "react";

const MainHeroSection: React.FC = () => {
  const images = ["/images/image.png", "/images/Ads.png", "/images/Ads2.png"];

  return (
    <div className="w-full h-full rounded-xl contain-content">
      <ImageCarousel images={images} interval={5000} animationType="slide" />
    </div>
  );
};

export default MainHeroSection;
