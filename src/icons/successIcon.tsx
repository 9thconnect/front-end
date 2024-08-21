import * as React from "react";
const SuccessIcon = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={123}
    height={123}
    fill="none"
    {...props}
  >
    <path
      fill="#2AA44B"
      d="M123 61.5c0 33.966-27.534 61.5-61.5 61.5C27.535 123 0 95.466 0 61.5 0 27.535 27.535 0 61.5 0 95.466 0 123 27.535 123 61.5Zm-117.25 0c0 30.79 24.96 55.75 55.75 55.75s55.75-24.96 55.75-55.75S92.29 5.75 61.5 5.75 5.75 30.71 5.75 61.5Z"
    />
    <path
      stroke="#2AA44B"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={7.11}
      d="M91.006 41.193 52.879 79.32 35.55 61.99"
    />
  </svg>
);
export default SuccessIcon;
