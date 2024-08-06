import * as React from "react";

interface LogoIconCompProps {
  color?: string;
}

const LogoIconComp: React.FC<LogoIconCompProps> = ({ color = "#8E7E7E" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={17} height={16} fill="none">
    <path
      fill={color}
      fillRule="evenodd"
      d="M6.696 3.582 3.079 0h13.546v13.416l-3.766-3.73.054.053V3.582H6.696Z"
      clipRule="evenodd"
    />
    <path
      fill={color}
      fillRule="evenodd"
      d="M3.58 7.755.376 4.58h6.47v5.106h5.06V16L8.7 12.825H3.58v-5.07ZM7.876 4.58h4.03v4.067h-4.03V4.58Z"
      clipRule="evenodd"
    />
    <path
      fill={color}
      fillRule="evenodd"
      d="M11.906 8.647H7.875V4.58h4.03v4.067Z"
      clipRule="evenodd"
    />
  </svg>
);

export default LogoIconComp;
