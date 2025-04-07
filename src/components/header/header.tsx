"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site.config";
import { Input } from "../ui/input";
import searchIcon from "@public/icons/search.svg";
import userIcon from "@public/icons/user.svg";
import cartIcon from "@public/icons/cart.svg";
import fastDeliveryIcon from "@public/icons/fast-delivery.svg";
import LogoIconComp from "@/icons/logoIcon";
import PeopleIconComponent from "@/icons/peopleIcon";
import FlashIconComponent from "@/icons/flashIcon";
import NavItem from "./navItem";
import {
  AlignVerticalDistributeCenter,
  MenuIcon,
  StretchHorizontal,
  StretchHorizontalIcon,
} from "lucide-react";
import BellIcon from "@/icons/bellIcon";
import CertIcon from "@/icons/certIcon";
import { MainDrawer } from "../drawer/drawer";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { UserType } from "@/lib/redux/features/auth/authSlice";
import CategoryCard from "../cards/categoryCard";
import {
  toggleNotCustomerModal,
  toggleTrackModal,
} from "@/lib/redux/features/layout/layoutSlice";
import EnhancedSearch from "../forms/search/enhancedSearch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/utils/common";
import { IVendor } from "@/type/users";

const MainHeader = () => {
  const [headerState, setHeaderState] = useState("full"); // "full", "mini", or "top"
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const router = useRouter();

  const auth = useAppSelector((state) => state.auth);
  const type = useAppSelector((state) => state.auth.type);
  const userData = useAppSelector((state) => state.auth.data);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          // Only update when we've scrolled at least 5px to reduce jitter
          if (Math.abs(currentScrollY - lastScrollY.current) < 5) {
            ticking.current = false;
            return;
          }

          // Top of page
          if (currentScrollY < 50) {
            setHeaderState("top");
          }
          // Scrolling down - show mini header
          else if (currentScrollY > lastScrollY.current) {
            setHeaderState("mini");
          }
          // Scrolling up - show full header
          else if (currentScrollY < lastScrollY.current) {
            setHeaderState("full");
          }

          lastScrollY.current = currentScrollY;
          ticking.current = false;
        });

        ticking.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  interface NavItemType {
    IconComponent: React.ComponentType<{ color?: string }>;
    label: string;
    path: string;
  }

  const navItems: NavItemType[] = [
    {
      IconComponent: LogoIconComp,
      label: "Marketplace",
      path: "/marketplace",
    },
    {
      IconComponent: FlashIconComponent,
      label: "Wholesale",
      path: "/wholesale",
    },
    {
      IconComponent: PeopleIconComponent,
      label: "Hire a Professional",
      path: "/hire",
    },
    {
      IconComponent: FlashIconComponent,
      label: "Real Estate",
      path: "/real-estate",
    },
    {
      IconComponent: FlashIconComponent,
      label: "Logistics",
      path: "/logistics",
    },
  ];

  const dispatch = useAppDispatch();

  const handleNoCustomer = () => {
    console.log("No customer");
    dispatch(toggleNotCustomerModal({ open: true }));
  };

  const isLoggedIn = useAppSelector((state) => state.auth.data as IVendor);

  const cartItems = useAppSelector((state) => state.cart?.items ?? []);

  const calculateSubtotal = () => {
    if (cartItems?.length > 0) {
      return cartItems?.reduce((sum, item) => {
        if (item.product) {
          return item.quantity;
        }

        return 0;
      }, 0);
    }

    return 0;
  };

  const user = useAppSelector((state) => state.auth);

  const userTitle =
    user.type === UserType.CUSTOMER ? "Customer" : isLoggedIn?.vendorType;

  const isSticky = headerState !== "top";
  const showMiniHeader = headerState === "mini";

  return (
    <header
      className={`bg-white rounded-xl ${
        isSticky ? "fixed top-0 left-0 right-0 z-50 shadow-md" : ""
      }`}
      style={{
        transition: "transform 0.3s ease",
        transform: isSticky ? "translateY(0)" : "none",
        margin: isSticky ? "0 16px" : "", // Add some margin when sticky
        width: isSticky ? "calc(100% - 32px)" : "100%",
      }}
    >
      {/* Full header content */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          showMiniHeader ? "max-h-0 opacity-0" : "opacity-100"
        }`}
        style={{
          maxHeight: showMiniHeader ? "0" : "500px", // Use explicit height values
        }}
      >
        <div className="px-3 pb-2 pt-3">
          <div className="bg-gray-100 w-full hidden px-3 py-3 rounded-lg md:flex justify-between items-center">
            <div className="md:flex hidden items-center text-sm">
              <div className="[&>*]:mr-10">
                <Link href={"/about"}>About Us</Link>
              </div>
              <div className="h-8 bg-gray-300 w-0.5"></div>
              <div
                onClick={() =>
                  dispatch(
                    toggleTrackModal({
                      open: true,
                    })
                  )
                }
                className="ml-10 cursor-pointer"
              >
                Track Order
              </div>
              <div className="ml-10">Call Us: 07009THMARKET, 07000444999</div>
            </div>

            {auth && auth.type !== UserType.VENDOR && (
              <Link href={"/vendor/register"}>Become A Vendor</Link>
            )}
          </div>
          <div className="mt-6 flex justify-between items-center">
            <div className="flex w-full md:w-auto items-center">
              <Link href={"/"}>
                <Image
                  className="w-32 sm:w-auto hidden md:block"
                  alt="site logo"
                  src={siteConfig.logo}
                />
              </Link>

              <CategoryCard />

              <EnhancedSearch />

              <div className="block md:hidden">
                <MainDrawer />
              </div>
            </div>
            <div className="hidden md:flex items-center  text-sm">
              <div className="[&>*]:mr-10 flex items-center ">
                {isLoggedIn ? (
                  <Link
                    className="text-nowrap flex flex-col items-center justify-center"
                    href={"/account/profile"}
                  >
                    <Avatar>
                      <AvatarImage src={auth.data?.avatar} alt="@shadcn" />
                      <AvatarFallback>
                        {getInitials(auth.data?.fullName ?? "")}
                      </AvatarFallback>
                    </Avatar>
                    <p className="capitalize">{userTitle}</p>
                  </Link>
                ) : (
                  <Link
                    className="text-nowrap flex items-center"
                    href={"/customer/login"}
                  >
                    <Image alt="user icon" src={userIcon} />
                    <span className="ml-2">Login/SignUp</span>
                  </Link>
                )}

                {userData && type !== UserType.CUSTOMER ? (
                  <div
                    onClick={handleNoCustomer}
                    className="text-nowrap flex items-center"
                  >
                    <Image alt="user icon" src={cartIcon} />
                    <span className="ml-2">Cart</span>
                  </div>
                ) : (
                  <Link
                    className="text-nowrap flex items-center"
                    href={"/marketplace/cart"}
                  >
                    <Image alt="user icon" src={cartIcon} />
                    <div className="relative">
                      <span className="ml-2">Cart</span>
                      <span className="absolute flex items-center justify-center  -top-6 -right-4">
                        <div className="bg-primary h-full text-sm text-white px-2 py-1 rounded-xl  inline-block">
                          {calculateSubtotal()}
                        </div>
                      </span>
                    </div>
                  </Link>
                )}

                <div className="hidden md:block lg:hidden !mr-0">
                  <MainDrawer />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation section - always visible */}
      <div
        className={`flex justify-between md:justify-center py-4 px-3 ${
          showMiniHeader ? "border-b border-gray-200" : "mt-7"
        }`}
      >
        <ul className="lg:flex hidden">
          {navItems.map((item, index) => (
            <li
              key={index}
              className={`flex md:items-center ${
                index !== navItems.length - 1 ? "md:mr-10" : ""
              }`}
            >
              <NavItem
                IconComponent={item.IconComponent}
                label={item.label}
                path={item.path}
              />
            </li>
          ))}
        </ul>

        <div className="flex items-center md:hidden">
          <button
            onClick={() => router.push("/account/notifications")}
            className="bg-gray-200 p-2 rounded-full w-10 h-10 flex items-center justify-center"
          >
            <BellIcon />
          </button>

          <button
            onClick={() => router.push("/marketplace/cart")}
            className="bg-gray-200 p-2 rounded-full w-10 h-10 flex items-center justify-center ml-2"
          >
            <CertIcon />
          </button>

          <button
            onClick={() => dispatch(toggleTrackModal({ open: true }))}
            className="bg-gray-200 px-4 py-2 rounded-full flex items-center justify-center ml-2 text-sm font-medium"
          >
            Track Order
          </button>
        </div>
      </div>
    </header>
  );
};

export default MainHeader;
