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
