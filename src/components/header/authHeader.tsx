import { siteConfig } from "@/config/site.config";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const AuthHeader = () => {
  return (
    <div className="flex justify-between items-center bg-white rounded-xl px-2 mb-3">
      <Link href={"/"}>
        <Image
          className="w-32 sm:w-auto"
          alt="site logo"
          src={siteConfig.logo}
        />
      </Link>
      <div className="px-3 py-3 rounded-lg md:flex justify-between items-center">
        <div className="md:flex hidden items-center text-sm">
          <div className="[&>*]:mr-10">
            <Link href={"/"}>About Us</Link>
            <Link href={"/"}>Contact Us</Link>
          </div>
          <div className="h-8 bg-gray-300 w-0.5"></div>
          <Link className="ml-10" href={"/customer/login"}>
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AuthHeader;
