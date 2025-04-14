"use client";

import ImageCarousel from "@/components/carousel/imageCarousel";
import React from "react";

const MainHeroSection = ({ images }: { images: string[] }) => {
  return (
    <div className="w-full h-full rounded-xl contain-content">
      <ImageCarousel images={images} interval={5000} animationType="slide" />
    </div>
  );
};

export default MainHeroSection;
