// import React from "react";

// interface IconProps extends React.SVGProps<SVGSVGElement> {}

// const ShippingBoxIcon: React.FC<IconProps> = (props) => (
//   <svg
//     width="20"
//     height="20"
//     viewBox="0 0 20 20"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//     {...props}
//   >
//     <path
//       d="M11.6665 2.98824L10.5891 1.91083C10.2637 1.58539 9.73602 1.58539 9.41058 1.91083L8.33317 2.98824M9.99984 5.83341V2.1549"
//       stroke="#7C7C7C"
//       strokeLinecap="round"
//     />
//     <path
//       d="M3.3335 8.33325V13.7639C3.3335 14.5214 3.7615 15.2139 4.43907 15.5527L9.10574 17.886C9.66879 18.1676 10.3315 18.1676 10.8946 17.886L15.5613 15.5527C16.2388 15.2139 16.6668 14.5214 16.6668 13.7639V8.33325"
//       stroke="#7C7C7C"
//     />
//     <path
//       d="M15.0002 4.16675L16.6668 5.00008L10.0002 8.33341L3.3335 5.00008L5.00016 4.16675"
//       stroke="#7C7C7C"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//     <path
//       d="M16.6667 5L10 8.33333L11.6667 10.8333L18.3333 7.5L16.6667 5Z"
//       stroke="#7C7C7C"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//     <path
//       d="M3.33333 5L10 8.33333L8.33333 10.8333L1.66667 7.5L3.33333 5Z"
//       stroke="#7C7C7C"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//   </svg>
// );

// export default ShippingBoxIcon;

import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {}

const ShippingBoxIcon: React.FC<IconProps> = ({ className, ...props }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`text-gray-500 ${className}`} // default color with Tailwind
    {...props}
  >
    <path
      d="M11.6665 2.98824L10.5891 1.91083C10.2637 1.58539 9.73602 1.58539 9.41058 1.91083L8.33317 2.98824M9.99984 5.83341V2.1549"
      stroke="currentColor"
      strokeLinecap="round"
    />
    <path
      d="M3.3335 8.33325V13.7639C3.3335 14.5214 3.7615 15.2139 4.43907 15.5527L9.10574 17.886C9.66879 18.1676 10.3315 18.1676 10.8946 17.886L15.5613 15.5527C16.2388 15.2139 16.6668 14.5214 16.6668 13.7639V8.33325"
      stroke="currentColor"
    />
    <path
      d="M15.0002 4.16675L16.6668 5.00008L10.0002 8.33341L3.3335 5.00008L5.00016 4.16675"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16.6667 5L10 8.33333L11.6667 10.8333L18.3333 7.5L16.6667 5Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3.33333 5L10 8.33333L8.33333 10.8333L1.66667 7.5L3.33333 5Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default ShippingBoxIcon;
