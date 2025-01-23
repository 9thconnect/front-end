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
};

const AnalyticCard = ({
  title,
  subTitle,
  Icon,
  className,
  iconClassName,
}: AnalyticCardProp) => {
  return (
    <div className={cn(` w-full rounded-lg bg-white border p-3 ${className}`)}>
      <div
        className={twMerge(
          `${iconClassName} bg-primary/20 rounded-full p-2 inline-flex items-center justify-center`
        )}
      >
        <Icon size={15} color="red" />
      </div>
      <p className="my-2 text-sm">{subTitle}</p>
      <p className="text-2xl text-offBlack">{title}</p>
    </div>
  );
};

export default AnalyticCard;
