import { matchesPathname } from "@/utils/matchPath";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface NavItemProps {
  IconComponent: React.ComponentType<{ color?: string }>;
  label: string;
  path: string;
}

const SideBarItem = ({ IconComponent, label, path }: NavItemProps) => {
  const pathName = usePathname();
  const isActive = matchesPathname(pathName, path);

  const color = isActive ? "black" : "#8E7E7E";

  return (
    <div className={`flex mb-5 ${isActive ? "text-offBlack" : ""}`}>
      <Link className="flex items-center" href={path}>
        <div className="mr-1">
          <IconComponent color={color} />
        </div>

        <span>{label}</span>
      </Link>
    </div>
  );
};

export default SideBarItem;
