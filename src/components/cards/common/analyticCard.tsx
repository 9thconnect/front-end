// import { cn } from "@/lib/utils";
// import { LucideProps } from "lucide-react";
// import React from "react";
// import { twMerge } from "tailwind-merge";

// type AnalyticCardProp = {
//   title?: string | number;
//   subTitle: string;
//   Icon: React.ForwardRefExoticComponent<
//     Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
//   >;
//   className?: string;
//   iconClassName?: string;
//   colorClass?: string;
// };

// const AnalyticCard = ({
//   title,
//   subTitle,
//   Icon,
//   className,
//   iconClassName,
// }: AnalyticCardProp) => {
//   return (
//     <div className={cn(` w-full rounded-lg bg-white border p-3 ${className}`)}>
//       <div
//         className={twMerge(
//           `${iconClassName} bg-primary/20 rounded-full p-2 inline-flex items-center justify-center`
//         )}
//       >
//         <Icon size={15} color="red" />
//       </div>
//       <p className="my-2 text-sm">{subTitle}</p>
//       <p className="text-2xl text-offBlack">{title}</p>
//     </div>
//   );
// };

// export default AnalyticCard;

import { cn } from "@/lib/utils";
import { LucideProps } from "lucide-react";
import React from "react";
import { twMerge } from "tailwind-merge";

type AnalyticCardProp = {
  title?: string | number;
  subTitle: string;
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  className?: string;
  iconClassName?: string;
  colorClass?: string; // Added colorClass prop as optional
};

const AnalyticCard = ({
  title,
  subTitle,
  Icon,
  className,
  iconClassName,
  colorClass = "bg-red-100",
}: AnalyticCardProp) => {
  return (
    <div className={cn("rounded-xl p-6 shadow-sm", className, colorClass)}>
      <div className="flex justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{subTitle}</p>
          <p className="text-3xl font-bold">{title}</p>
        </div>
        <div className={cn("rounded-lg p-2", colorClass)}>
          <Icon className={cn("h-8 w-8", iconClassName)} />
        </div>
      </div>
    </div>
  );
};

export default AnalyticCard;
