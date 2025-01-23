"use client";

import { useEffect, useState } from "react";
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
import { toggleTrackModal } from "@/lib/redux/features/layout/layoutSlice";
import EnhancedSearch from "../forms/search/enhancedSearch";

const MainHeader = () => {
  const [isSticky, setIsSticky] = useState(false);
  const router = useRouter();

  const auth = useAppSelector((state) => state.auth);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
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

  const isLoggedIn = useAppSelector((state) => state.auth.data);

  return (
    <header
      className={`bg-white rounded-xl px-3 pb-2 pt-3 ${
        isSticky ? "sticky-header" : ""
      }`}
    >
      <div className="bg-gray-100 w-full hidden px-3 py-3 rounded-lg md:flex justify-between items-center">
        <div className="md:flex hidden items-center text-sm">
          <div className="[&>*]:mr-10">
            <Link href={"/about"}>About Us</Link>
            {/* <Link href={"/"}>Contact Us</Link> */}
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
            className="ml-10"
          >
            Track Order
          </div>
          <div className="ml-10">Call Us: +2342014642998</div>
        </div>

        {auth && auth.type !== UserType.VENDOR && (
          <Link href={"/vendor/register"}>Become A Vendor</Link>
        )}
      </div>
      <div className="mt-6 flex justify-between items-center">
        <div className="flex w-full md:w-auto items-center">
          <Link href={"/"}>
            <Image
              className="w-32 sm:w-auto"
              alt="site logo"
              src={siteConfig.logo}
            />
          </Link>

          <CategoryCard />

          <EnhancedSearch />

          {/* <label
            htmlFor="search"
            className="relative text-gray-400 focus-within:text-gray-600 block w-full md:w-2/5 ml-2 grow sm:ml-10"
          >
            <Image
              className="absolute top-1/2 transform -translate-y-1/2 left-3"
              alt="search icon"
              src={searchIcon}
            />
            <Input
              id="search"
              className="ring-0 outline-none focus:outline-none pl-10"
              type="text"
              placeholder="Search"
            />
          </label> */}

          <MainDrawer />
        </div>
        <div className="hidden md:flex items-center text-sm">
          <div className="[&>*]:mr-10 flex">
            {isLoggedIn ? (
              <Link
                className="text-nowrap flex items-center"
                href={"/account/profile"}
              >
                <Image alt="user icon" src={userIcon} />
                <span className="ml-2">Account</span>
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

            <Link
              className="text-nowrap flex items-center"
              href={"/marketplace/cart"}
            >
              <Image alt="user icon" src={cartIcon} />
              <span className="ml-2">Cart</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex justify-between md:justify-center mt-7">
        <ul className="flex">
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
        <div className="flex md:hidden">
          <div className={"bg-gray-200 p-2 rounded-full md:bg-transparent"}>
            <BellIcon />
          </div>
          <div
            onClick={() => router.push("/marketplace/cart")}
            className={"bg-gray-200 p-2 rounded-full md:bg-transparent ml-2"}
          >
            <CertIcon />
          </div>
        </div>
      </div>
    </header>
  );
};

export default MainHeader;
