import { navigate } from "@/app/actions";
import { siteConfig } from "@/config/site.config";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="">
      <div className="bg-[url('https://res.cloudinary.com/dougwnqok/image/upload/v1728574405/b6a0c12097ef7583e80635c26631cf4e_xjfdoa.jpg')] bg-cover h-80 bg-no-repeat bg-center rounded-2xl mt-5 "></div>

      <h3 className="mt-8 text-3xl font-bold text-offBlack">Our Partners</h3>
      <div className="flex items-center space-x-7 mt-8">
        <div className="cursor-pointer">
          <img
            className=" h-56 w-56 rounded-3xl "
            src="https://res.cloudinary.com/dougwnqok/image/upload/v1728574102/Frame_1400002996_vmh94l.png"
            alt=""
          />
        </div>
        <Link href={"/logistics/royal"} className="cursor-pointer">
          <img
            className=" h-56 w-56 rounded-3xl "
            src="https://res.cloudinary.com/dougwnqok/image/upload/v1728574553/WhatsApp_Image_2024-10-10_at_8.02.46_AM_ottgqn.jpg"
            alt=""
          />
        </Link>
      </div>
    </div>
  );
};

export default page;
