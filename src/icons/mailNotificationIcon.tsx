import React from "react";

interface MailNotificationIconProps {
  color?: string;
}

const MailNotificationIcon: React.FC<MailNotificationIconProps> = ({
  color = "#28303F",
}) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6 9L9.7812 11.5208C11.1248 12.4165 12.8752 12.4165 14.2188 11.5208L14.7092 11.1939M13.8027 4H6C3.79086 4 2 5.79086 2 8V18C2 20.2091 3.79086 22 6 22H18C20.2091 22 22 20.2091 22 18V12.1973M22 7C22 8.65685 20.6569 10 19 10C17.3431 10 16 8.65685 16 7C16 5.34315 17.3431 4 19 4C20.6569 4 22 5.34315 22 7Z"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

export default MailNotificationIcon;