import React from "react";
import Link from "next/link";

interface SectionCardHeaderProps {
  title: string;
  linkUrl: string;
  linkText: string;
  className?: string;
}

const SectionCardHeader: React.FC<SectionCardHeaderProps> = ({
  title,
  linkUrl,
  linkText,
  className = "",
}) => {
  return (
    <div className={`section-card-header ${className}`}>
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-3xl font-bold text-[#05141B]">{title}</h3>
        <Link className="text-primary underline" href={linkUrl}>
          {linkText}
        </Link>
      </div>
      <div className="border-b-2 w-full"></div>
    </div>
  );
};

export default SectionCardHeader;
