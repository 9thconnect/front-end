"use client";

import { siteConfig } from "@/config/site.config";
import CertIcon from "@/icons/certIcon";
import { PanelRight } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import DashboardSideBarItem from "./sideBarItem";
import { Separator } from "@/components/ui/separator";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { toggleAdminSideBar } from "@/lib/redux/features/layout/layoutSlice";

const routes = [
  {
    name: "Dashboard",
    route: "/dashboard/home",
    icon: CertIcon,
  },
  {
    name: "Transactions",
    route: "/dashboard/transactions/",
    icon: CertIcon,
  },
  {
    name: "Categories",
    route: "/dashboard/categories",
    icon: CertIcon,
  },

  {
    name: "Professionals",
    route: "/dashboard/professionals",
    icon: CertIcon,
  },
  {
    name: "Vendors",
    route: "/dashboard/vendors",
    icon: CertIcon,
  },
  {
    name: "Notifications",
    route: "/dashboard/notifications",
    icon: CertIcon,
  },
  {
    name: "Settings",
    route: "/dashboard/settings",
    icon: CertIcon,
  },
];

const DashboardSideBar = () => {
  const dispatch = useAppDispatch();
  const isSideBarOpened = useAppSelector(
    (state) => state.layout.adminSideBarOpen
  );

  console.log(isSideBarOpened);

  return (
    <aside
      id="logo-sidebar"
      className={`fixed  top-0 left-0 z-50 w-64 h-screen pt-6 transition-transform -translate-x-full bg-white border-r border-gray-200 ${
        isSideBarOpened ? "translate-x-1" : "lg:translate-x-0"
      }  dark:bg-gray-800 dark:border-gray-700`}
      aria-label="Sidebar"
    >
      <div className="px-3 h-full  pb-4 overflow-y-auto bg-white">
        <div className="justify-between h-full flex flex-col">
          <div>
            <div className="flex items-center justify-between mb-8">
              <Image
                className="w-28 mr-10"
                alt="site logo"
                src={siteConfig.logo}
              />

              <PanelRight onClick={() => dispatch(toggleAdminSideBar())} />
            </div>
            <h3 className="mb-3">Overview</h3>
            <div>
              {routes.slice(0, 3).map((route) => (
                <DashboardSideBarItem
                  IconComponent={route.icon}
                  label={route.name}
                  path={route.route}
                  key={`account-route-${route.name}`}
                />
              ))}
            </div>

            <h3 className="mb-7">Marketplace Management</h3>
            <div>
              {routes.slice(3, 5).map((route) => (
                <DashboardSideBarItem
                  IconComponent={route.icon}
                  label={route.name}
                  path={route.route}
                  key={`account-route-${route.name}`}
                />
              ))}
            </div>

            <Separator />
          </div>

          <div className="pl-2 mt-auto">
            {routes.slice(5, 8).map((route) => (
              <DashboardSideBarItem
                IconComponent={route.icon}
                label={route.name}
                path={route.route}
                key={`account-route-${route.name}`}
              />
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default DashboardSideBar;
