import { LucideProps } from "lucide-react";
import React from "react";

type AnalyticCardProp = {
  title: string;
  subTitle: string;
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
};

const AnalyticCard = ({ title, subTitle, Icon }: AnalyticCardProp) => {
  return (
    <div className="w-full rounded-lg bg-white border p-3">
      <div className="bg-primary/20 rounded-full p-2 inline-flex items-center justify-center">
        <Icon color="red" />
      </div>
      <p className="my-2">{subTitle}</p>
      <p className="text-2xl text-offBlack">{title}</p>
    </div>
  );
};

export default AnalyticCard;
