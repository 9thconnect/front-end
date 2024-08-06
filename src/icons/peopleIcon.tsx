import * as React from "react";

interface PeopleIconComponentProps {
  color?: string;
}

const PeopleIconComponent: React.FC<PeopleIconComponentProps> = ({
  color = "red",
}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={17} height={16} fill="none">
    <ellipse
      cx={7.292}
      cy={11.667}
      stroke={color}
      strokeLinejoin="round"
      strokeWidth={1.5}
      rx={4.667}
      ry={2.333}
    />
    <circle
      cx={7.292}
      cy={4.667}
      r={2.667}
      stroke={color}
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
    <path
      fill={color}
      fillRule="evenodd"
      d="M10.811 6.57a4.018 4.018 0 0 1-1.168 1.333 2.75 2.75 0 1 0 1.065-5.318c.304.498.503 1.068.564 1.678a1.25 1.25 0 0 1-.46 2.307ZM12.756 13.183c.344-.462.536-.975.536-1.516 0-.078-.004-.155-.012-.231.244-.113.408-.226.505-.322a.386.386 0 0 0 .088-.114.386.386 0 0 0-.088-.114c-.112-.11-.312-.244-.62-.372a4.052 4.052 0 0 0-.224-.086c-.448-.764-1.3-1.411-2.4-1.844h.084c1.18 0 2.282.197 3.117.545.416.174.802.4 1.095.688.296.291.538.691.538 1.183 0 .491-.242.892-.538 1.183-.293.289-.679.514-1.095.688a6.33 6.33 0 0 1-.986.312Zm1.12-2.173v-.003.003Zm0-.017v-.004.004Z"
      clipRule="evenodd"
    />
  </svg>
);

export default PeopleIconComponent;
