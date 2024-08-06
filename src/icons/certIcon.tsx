// components/CertIcon.tsx

import React from "react";

interface CertIconProps {
  color?: string;
}

const CertIcon: React.FC<CertIconProps> = ({ color = "#8E7E7E" }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_383_16899)">
      <path
        d="M4.00065 2.66659H12.0007C13.4734 2.66659 14.6673 3.86049 14.6673 5.33325V8.66659C14.6673 10.1393 13.4734 11.3333 12.0007 11.3333H6.66732C5.19456 11.3333 4.00065 10.1393 4.00065 8.66659V2.66659ZM4.00065 2.66659C4.00065 1.93021 3.4037 1.33325 2.66732 1.33325H1.33398"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.33398 13.6667C7.33398 14.219 6.88627 14.6667 6.33398 14.6667C5.7817 14.6667 5.33398 14.219 5.33398 13.6667C5.33398 13.1145 5.7817 12.6667 6.33398 12.6667C6.88627 12.6667 7.33398 13.1145 7.33398 13.6667Z"
        stroke={color}
        strokeWidth="1.5"
      />
      <path
        d="M13.334 13.6667C13.334 14.219 12.8863 14.6667 12.334 14.6667C11.7817 14.6667 11.334 14.219 11.334 13.6667C11.334 13.1145 11.7817 12.6667 12.334 12.6667C12.8863 12.6667 13.334 13.1145 13.334 13.6667Z"
        stroke={color}
        strokeWidth="1.5"
      />
      <path
        d="M7.33398 8C8.90475 8.89357 9.7657 8.8842 11.334 8"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_383_16899">
        <rect width="16" height="16" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export default CertIcon;
