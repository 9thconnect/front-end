import { matchesPathname } from "@/utils/matchPath";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface NavItemProps {
  IconComponent: React.ComponentType<{ color?: string }>;
  label: string;
  path: string;
}

const DashboardSideBarItem = ({ IconComponent, label, path }: NavItemProps) => {
  const pathName = usePathname();
  const isActive = matchesPathname(pathName, path);

  const color = isActive ? "white" : "#8E7E7E";

  return (
    <div
      className={`flex mb-7 ${
        isActive ? "text-white bg-primary px-3 py-2 rounded-lg" : "pl-3"
      }`}
    >
      <Link className="flex items-center" href={path}>
        <div className="mr-2">
          <IconComponent color={color} />
        </div>

        <span>{label}</span>
      </Link>
    </div>
  );
};

export default DashboardSideBarItem;
