import React from "react";

interface UsersIconProps {
  color?: string;
}

const UsersIcon: React.FC<UsersIconProps> = ({ color = "#878C95" }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <ellipse
      cx="8.33333"
      cy="14.5837"
      rx="5.83333"
      ry="2.91667"
      stroke={color}
      strokeWidth="1.25"
      strokeLinejoin="round"
    />
    <circle
      cx="8.33333"
      cy="5.83333"
      r="3.33333"
      stroke={color}
      strokeWidth="1.25"
      strokeLinejoin="round"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.5373 8.5415C12.2689 8.95725 11.9406 9.33063 11.5645 9.64941C11.8598 9.74197 12.1741 9.79186 12.5 9.79186C14.2259 9.79186 15.625 8.39275 15.625 6.66686C15.625 5.03705 14.3773 3.69865 12.785 3.55469C13.0068 3.98716 13.1675 4.45618 13.2556 4.95033C13.9148 5.24093 14.375 5.90015 14.375 6.66686C14.375 7.68995 13.5556 8.52166 12.5373 8.5415Z"
      fill={color}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15.8325 14.6309C15.8241 15.1428 15.6784 15.6345 15.4169 16.093C15.7238 16.0086 16.0114 15.9107 16.2755 15.8007C16.7731 15.5934 17.2166 15.3306 17.5452 15.0068C17.8761 14.6809 18.1245 14.256 18.1245 13.7507C18.1245 13.2453 17.8761 12.8204 17.5452 12.4945C17.2166 12.1707 16.7731 11.9079 16.2755 11.7006C15.4232 11.3455 14.325 11.1168 13.124 11.0576C13.9592 11.4819 14.6412 12.0148 15.1121 12.6209C15.3601 12.6902 15.5888 12.7686 15.7947 12.8544C16.2019 13.0241 16.4906 13.2102 16.668 13.385C16.8432 13.5575 16.8745 13.6807 16.8745 13.7507C16.8745 13.8206 16.8432 13.9438 16.668 14.1163C16.4962 14.2856 16.2198 14.4656 15.8325 14.6309Z"
      fill={color}
    />
  </svg>
);

export default UsersIcon;