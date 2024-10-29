import React from "react";

interface BriefCaseIconProps {
  color?: string;
}

const BriefCaseIcon: React.FC<BriefCaseIconProps> = ({ color = "#878C95" }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.66699 5.00033V4.16699C6.66699 2.78628 7.78628 1.66699 9.16699 1.66699H10.8337C12.2144 1.66699 13.3337 2.78628 13.3337 4.16699V5.00033M1.66699 10.8337H18.3337M6.66699 9.58366V12.0837M13.3337 9.58366V12.0837M5.00033 18.3337H15.0003C16.8413 18.3337 18.3337 16.8413 18.3337 15.0003V8.33366C18.3337 6.49271 16.8413 5.00033 15.0003 5.00033H5.00033C3.15938 5.00033 1.66699 6.49271 1.66699 8.33366V15.0003C1.66699 16.8413 3.15938 18.3337 5.00033 18.3337Z"
      stroke={color}
      strokeWidth="1.25"
      strokeLinecap="round"
    />
  </svg>
);

export default BriefCaseIcon;
