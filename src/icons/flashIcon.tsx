import * as React from "react";

interface FlashIconComponentProps {
  color?: string;
}

const FlashIconComponent: React.FC<FlashIconComponentProps> = ({
  color = "#8E7E7E",
}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={17} height={16} fill="none">
    <path
      stroke={color}
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m3.959 9 6-7.667V7h3.333l-6 7.667V9H3.96Z"
    />
  </svg>
);

export default FlashIconComponent;
