// components/NavItem.tsx

"use client";
import React from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { matchesPathname } from "@/utils/matchPath";

interface NavItemProps {
  IconComponent: React.ComponentType<{ color?: string }>;
  label: string;
  path: string;
}

const NavItem: React.FC<NavItemProps> = ({ IconComponent, label, path }) => {
  const router = useRouter();
  const pathName = usePathname();
  const isActive = matchesPathname(pathName, path);

  // Check if the screen width is less than 768px (mobile size)
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  // Set the icon color based on the active status and screen size
  const color = isActive ? (isMobile ? "#FFFFFF" : "#FF0000") : "#8E7E7E";

  return (
    <div
      className={`flex items-center mr-2 md:mr-0 md:px-3 ${
        isActive
          ? "md:text-primary md:border-b md:pb-2 md:border-primary bg-primary md:bg-transparent md:rounded-none md:px-0 rounded-3xl pr-4"
          : "md:pb-2"
      }`}
    >
      <Link className="flex items-center" href={path}>
        <div
          className={`${
            isActive ? "" : "bg-gray-200"
          }  p-2 rounded-full md:bg-transparent`}
        >
          <IconComponent color={color} />
        </div>

        <span
          className={`${
            isActive ? "block text-white md:text-inherit" : "hidden"
          }   sm:block  ml-1`}
        >
          {label}
        </span>
      </Link>
    </div>
  );
};

export default NavItem;
