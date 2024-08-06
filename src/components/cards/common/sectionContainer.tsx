import React from "react";

const SectionContainer = ({
  children,
  className,
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) => {
  return (
    <div className={`mt-5 bg-white rounded-lg p-2 sm:p-6 ${className}`}>
      {children}
    </div>
  );
};

export default SectionContainer;
