import React from "react";

const MainBadge = ({
  text,
  type,
}: {
  text: string;
  type: "grey" | "green" | "red" | "blue";
}) => {
  // Define color classes based on the type
  const colorClasses = {
    grey: {
      background: "bg-[#F2F2F2]",
      dot: "bg-[#8E7E7E]",
    },
    green: {
      background: "bg-[#00800033]",
      dot: "bg-[#008000]",
    },
    red: {
      background: "bg-[#D0333333]",
      dot: "bg-[#D03333]",
    },
    blue: {
      background: "bg-blue-200",
      dot: "bg-blue-700",
    },
  };

  return (
    <div
      className={`px-3 py-0.5 inline-flex items-center ${colorClasses[type].background} rounded-2xl`}
    >
      <span
        className={`w-2 h-2 rounded-full ${colorClasses[type].dot} mr-2`}
      ></span>
      <p className="text-black text-sm">{text}</p>
    </div>
  );
};

export default MainBadge;
