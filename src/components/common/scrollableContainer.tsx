"use client";

import React, {
  useRef,
  useState,
  useEffect,
  MouseEvent,
  ReactNode,
} from "react";

interface ScrollableContainerProps {
  children: ReactNode;
}

const ScrollableContainer: React.FC<ScrollableContainerProps> = ({
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const mouseDownHandler = (e: MouseEvent<HTMLDivElement>) => {
      setIsDragging(true);
      setStartX(e.pageX - container.offsetLeft);
      setScrollLeft(container.scrollLeft);
    };

    const mouseLeaveHandler = () => {
      setIsDragging(false);
    };

    const mouseUpHandler = () => {
      setIsDragging(false);
    };

    const mouseMoveHandler = (e: MouseEvent<HTMLDivElement>) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 2; // Scroll-fast
      container.scrollLeft = scrollLeft - walk;
    };

    container.addEventListener("mousedown", mouseDownHandler as any);
    container.addEventListener("mouseleave", mouseLeaveHandler);
    container.addEventListener("mouseup", mouseUpHandler);
    container.addEventListener("mousemove", mouseMoveHandler as any);

    return () => {
      container.removeEventListener("mousedown", mouseDownHandler as any);
      container.removeEventListener("mouseleave", mouseLeaveHandler);
      container.removeEventListener("mouseup", mouseUpHandler);
      container.removeEventListener("mousemove", mouseMoveHandler as any);
    };
  }, [isDragging, startX, scrollLeft]);

  return (
    <div
      className="w-full overflow-x-auto pb-10"
      style={{
        scrollbarWidth: "none",
      }}
      ref={containerRef}
    >
      <div className="flex space-x-4 cursor-pointer">{children}</div>
    </div>
  );
};

export default ScrollableContainer;
