"use client";

import DashboardNavBar from "@/components/header/dashboardHeader";
import DashboardSideBar from "@/components/sidebar/dasboard/dashboardSideBar";
import { Separator } from "@/components/ui/separator";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { toggleAdminSideBar } from "@/lib/redux/features/layout/layoutSlice";
import { useRouter } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IAdmin } from "@/type/users";
import requests from "@/utils/requests";
import { logoutUser } from "@/lib/redux/features/auth/authSlice";
import { toast } from "sonner";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // await requests.post(`admin/auth/logout`, {});
      dispatch(logoutUser());

      toast.success("logout successful");

      router.push(`/admin/login`);
    } catch (error) {}
  };

  const admin = useAppSelector((state) => state.auth.data as IAdmin);
  return (
    <div className="text-[#878C95]">
      <DashboardSideBar />
      <div className="lg:ml-64">
        <nav className="fixed top-0 z-40 w-full lg:w-[calc(100%-256px)]  bg-white border-b border-gray-200 ">
          <div className="px-3 py-3 lg:px-5 lg:pl-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center justify-start rtl:justify-end">
                <button
                  data-drawer-target="logo-sidebar"
                  data-drawer-toggle="logo-sidebar"
                  aria-controls="logo-sidebar"
                  type="button"
                  className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                  onClick={() => dispatch(toggleAdminSideBar())}
                >
                  <span className="sr-only">Open sidebar</span>
                  <svg
                    className="w-6 h-6"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      clipRule="evenodd"
                      fillRule="evenodd"
                      d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex items-center">
                <div className="flex items-center ms-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Avatar>
                        <AvatarImage src={admin?.avatar} alt="@shadcn" />
                        <AvatarFallback>
                          {admin?.fullName?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="mr-5">
                      <DropdownMenuLabel>{admin?.fullName}</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => router.push("/dashboard/settings")}
                      >
                        Settings
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          router.push("/dashboard/settings/profile")
                        }
                      >
                        Account
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleLogout()}>
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <div className="p-4 mt-14 bg-white">{children}</div>
      </div>
    </div>
  );
}
