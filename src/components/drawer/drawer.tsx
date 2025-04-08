"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LogOutIcon, LogsIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { logoutUser, UserType } from "@/lib/redux/features/auth/authSlice";
import { formatDate } from "@/utils/format-date";
import requests from "@/utils/requests";
import { toast } from "sonner";
import { useState } from "react";

export function MainDrawer() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // Add state to control Sheet

  const handleLogout = async () => {
    setLoading(true);
    try {
      await requests.post(`${auth.type}/auth/logout`, {});
      dispatch(logoutUser());
      toast.success("logout successful");
      router.push(`/${auth.type}/login`);
    } catch (error) {
      toast.success("logout error, try again");
    } finally {
      setLoading(false);
    }
  };

  const handleLinkClick = () => {
    setIsOpen(false); // Close the drawer when a link is clicked
  };

  const menuItems = [
    { label: "About Us", path: "/about" },
    { label: "Marketplace", path: "/marketplace" },
    { label: "Wholesale", path: "/wholesale" },
    { label: "Hire a Professional", path: "/hire" },
    { label: "Real Estate", path: "/real-estate" },
    { label: "Logistics", path: "/logistics" },
  ];

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button
          className="bg-gray-200 p-2 rounded-full flex items-center justify-center w-10 h-10 border ml-3"
          onClick={() => setIsOpen(true)} // Open the drawer
        >
          <LogsIcon size={30} />
        </button>
      </SheetTrigger>
      <SheetContent className="w-full flex flex-col">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>

        {/* User Profile Section - Fixed at top */}
        {auth.data && (
          <div className="rounded-lg p-4 mb-4 flex-shrink-0">
            <div className="flex justify-between items-center mb-3">
              <Button
                onClick={() => {
                  router.push(`/account/profile`);
                  handleLinkClick();
                }}
                className="text-sm"
              >
                Dashboard
              </Button>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                {loading ? "Loading.." : "Logout"}
                <LogOutIcon className="ml-2" size={15} />
              </Button>
            </div>
            <div className="mb-3 w-full"></div>
            <div className="flex flex-col items-center p-2">
              <div
                className="rounded-md mr-3 h-20 w-20 bg-cover bg-no-repeat bg-center"
                style={{
                  backgroundImage: `url(${
                    auth.data?.avatar || "/images/Ads.png"
                  })`,
                }}
              />
              <div className="flex flex-col items-center mt-6 justify-between">
                <p className="text-xs">{auth.data.phoneNumber}</p>
                <p className="text-lg text-gray-800">{auth.data?.fullName}</p>
                <p className="text-sm text-gray-600">
                  {formatDate(new Date(auth.data.createdAt), "DD MMM, YYYY")}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Links - Scrollable */}
        <nav className="flex-1 overflow-y-auto space-y-4 py-4">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.path}
              onClick={handleLinkClick} // Close drawer on click
              className="block px-4 py-2 text-sm hover:bg-gray-100 rounded-lg transition-colors"
            >
              {item.label}
            </Link>
          ))}

          {/* Conditional Vendor Registration Link */}
          {auth && auth.type !== UserType.VENDOR && (
            <Link
              href="/vendor/register"
              onClick={handleLinkClick} // Close drawer on click
              className="block px-4 py-2 text-sm hover:bg-gray-100 rounded-lg transition-colors text-primary"
            >
              Become A Vendor
            </Link>
          )}

          {/* Login/Signup Link for non-authenticated users */}
          {!auth.data && (
            <Link
              href="/customer/login"
              onClick={handleLinkClick} // Close drawer on click
              className="block px-4 py-2 text-sm hover:bg-gray-100 rounded-lg transition-colors"
            >
              Login/SignUp
            </Link>
          )}
        </nav>

        {/* Contact Information - Fixed at bottom */}
        <div className="mt-auto p-4 flex-shrink-0">
          <p className="text-sm text-gray-600">Call Us: +2342014642998</p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
