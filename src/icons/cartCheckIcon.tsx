import React from "react";

interface CartCheckIconProps {
  color?: string;
}

const CartCheckIcon: React.FC<CartCheckIconProps> = ({ color = "#28303F" }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11 20.5C11 21.3284 10.3284 22 9.5 22C8.67157 22 8 21.3284 8 20.5C8 19.6716 8.67157 19 9.5 19C10.3284 19 11 19.6716 11 20.5Z"
      stroke={color}
      strokeWidth="1.5"
    />
    <path
      d="M20 20.5C20 21.3284 19.3284 22 18.5 22C17.6716 22 17 21.3284 17 20.5C17 19.6716 17.6716 19 18.5 19C19.3284 19 20 19.6716 20 20.5Z"
      stroke={color}
      strokeWidth="1.5"
    />
    <path
      d="M11 11L12.7528 12.4023C13.1707 12.7366 13.7777 12.6826 14.1301 12.2799L17 9"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6 4H18C20.2091 4 22 5.79086 22 8V13C22 15.2091 20.2091 17 18 17H10C7.79086 17 6 15.2091 6 13V4ZM6 4C6 2.89543 5.10457 2 4 2H2"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default CartCheckIcon;
