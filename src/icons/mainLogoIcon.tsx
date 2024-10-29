import React from "react";

interface MainLogoIconProps {
  color?: string;
}

const MainLogoIcon: React.FC<MainLogoIconProps> = ({ color = "#878C95" }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M19.3001 14.9868L16.1313 11.8488V4.56254C16.1313 4.17594 15.8179 3.86254 15.4313 3.86254H8.06728L5.02973 0.854297H19.3001V14.9868Z"
      stroke={color}
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
    <path
      d="M4.6459 9.69876C4.6459 9.51193 4.57121 9.33285 4.43846 9.20139L1.70163 6.49102H7.26408V12.0749C7.26408 12.4615 7.57748 12.7749 7.96408 12.7749H13.4919V18.1673L10.7386 15.4406C10.6075 15.3108 10.4305 15.2379 10.246 15.2379H4.6459V9.69876ZM9.93075 6.49102H13.4919V10.0969H9.93075V6.49102Z"
      stroke={color}
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
    <path
      d="M13.4916 10.0969H9.93047V6.49102H13.4916V10.0969Z"
      stroke={color}
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
  </svg>
);

export default MainLogoIcon;
