"use client";

import ImageCarousel from "@/components/carousel/imageCarousel";
import React from "react";

const MainHeroSection = ({ images }: { images: string[] }) => {
  // const images = [
  //   "/images/1-banner.jpg",
  //   "/images/2-banner.jpg",
  //   "/images/3-banner.jpg",
  //   "/images/4-banner.jpg",
  //   "/images/5-banner.jpg",
  //   "/images/6-banner.jpg",
  // ];

  return (
    <div className="w-full h-full rounded-xl contain-content">
      <ImageCarousel images={images} interval={5000} animationType="slide" />
    </div>
  );
};

export default MainHeroSection;
