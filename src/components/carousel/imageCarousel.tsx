"use client";

import { useEffect, useState } from "react";

interface ImageCarouselProps {
  images: string[];
  interval?: number;
  animationType?: "fade" | "bounce" | "slide";
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  interval = 1000,
  animationType = "fade",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const changeImage = () => {
      setAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        setAnimating(false);
      }, 500); // Duration of the animation
    };

    const timer = setInterval(changeImage, interval);

    return () => clearInterval(timer);
  }, [images, interval]);

  const getAnimationClass = (index: number) => {
    if (!animating)
      return index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0";

    if (index === currentIndex) {
      return animationType === "fade"
        ? "animate-fadeOut"
        : animationType === "bounce"
        ? "animate-bounceOut"
        : "animate-slideOut";
    } else if (index === (currentIndex + 1) % images.length) {
      return animationType === "fade"
        ? "animate-fadeIn"
        : animationType === "bounce"
        ? "animate-bounceIn"
        : "animate-slideIn";
    }
    return "opacity-0 z-0";
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Image ${index + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${getAnimationClass(
            index
          )}`}
          style={{
            transitionProperty: "opacity, transform",
            transitionDuration: "0.5s",
          }}
        />
      ))}
    </div>
  );
};

export default ImageCarousel;
