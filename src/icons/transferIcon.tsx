import React from "react";

interface TransferIconProps {
  color?: string;
}

const TransferIcon: React.FC<TransferIconProps> = ({ color = "#28303F" }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="2"
      y="2"
      width="10"
      height="8"
      rx="2"
      stroke={color}
      strokeWidth="1.5"
    />
    <rect
      x="12"
      y="14"
      width="10"
      height="8"
      rx="2"
      stroke={color}
      strokeWidth="1.5"
    />
    <path
      d="M20.4142 4L21.7071 5.29289C22.0976 5.68342 22.0976 6.31658 21.7071 6.70711L20.4142 8M16 6L21.4142 6"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M3.58579 16L2.29289 17.2929C1.90237 17.6834 1.90237 18.3166 2.29289 18.7071L3.58579 20M8 18L2.58579 18"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

export default TransferIcon;
