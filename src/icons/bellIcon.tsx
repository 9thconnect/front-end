// components/CustomIcon.tsx

import React from "react";

interface BellIconProps {
  color?: string;
}

const BellIcon: React.FC<BellIconProps> = ({ color = "#8E7E7E" }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="11.334" cy="3.33325" r="2" stroke={color} strokeWidth="1.5" />
    <path
      d="M7.3805 2.71289C5.50824 2.99555 4.01091 4.54186 3.78577 6.52925L3.55585 8.55889C3.49872 9.06322 3.29432 9.53781 2.96968 9.91993C2.28074 10.7308 2.83989 11.9999 3.88611 11.9999H12.1126C13.1588 11.9999 13.718 10.7308 13.029 9.91993C12.7044 9.53781 12.5 9.06322 12.4428 8.5589L12.2909 7.21772"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10 13.3333C9.70888 14.11 8.92335 14.6666 8 14.6666C7.07665 14.6666 6.29112 14.11 6 13.3333"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

export default BellIcon;
