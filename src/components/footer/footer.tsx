import React from "react";
import Logo from "@public/images/logo.png";
import Image from "next/image";

import FaceBookIcon from "@public/icons/socials/facebook.svg";
import InstagramIcon from "@public/icons/socials/instagram.svg";
import TiktokIcon from "@public/icons/socials/tiktok.svg";
import TwitterIcon from "@public/icons/socials/twitter.svg";
import WhatsappIcon from "@public/icons/socials/whatsapp.svg";
import YoutubeIcon from "@public/icons/socials/youtube.svg";

// flags
import FlagChina from "@public/images/flags/FlagChina.png";
import FlagGhana from "@public/images/flags/FlagGhana.png";
import FlagNigeria from "@public/images/flags/FlagNigeria.png";
import FlagUnitedKingdom from "@public/images/flags/FlagUnitedKingdom.png";
import FlagUsOutlyingIslands from "@public/images/flags/FlagUsOutlyingIslands.png";

import AppleStore from "@public/images/applestore.png";
import GooglePlay from "@public/images/googleplay.png";

import { Separator } from "../ui/separator";
import Link from "next/link";
import SectionContainer from "../cards/common/sectionContainer";

const MainFooter = () => {
  return (
    <SectionContainer>
      <div className="bg-[#535357] text-white px-5 sm:px-10 pt-10 pb-20 lg:justify-items-end rounded-t-lg grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {/* First row: Twice as big */}
        <div className="col-span-2 md:col-auto justify-self-start">
          <Image alt="logo" src={Logo} />
          <p className="my-4">
            The ultimate marketplace for Professionals, Building Materials and
            more.
          </p>
          <div className="flex space-x-2">
            <Link href={"https://x.com/9thmarketplace"}>
              <Image alt="TwitterIcon" src={TwitterIcon} />
            </Link>

            <Link href={"https://www.instagram.com/9thmarketplace"}>
              <Image alt="InstagramIcon" src={InstagramIcon} />
            </Link>
            <Image alt="fb icon" src={FaceBookIcon} />
            <Image alt="TiktokIcon" src={TiktokIcon} />
            <Image alt="WhatsappIcon" src={WhatsappIcon} />
            <Image alt="YoutubeIcon" src={YoutubeIcon} />
          </div>
          <Separator className="my-4" />
          <div className="flex space-x-2">
            <Image alt="FlagChina" src={FlagChina} />
            <Image alt="FlagGhana" src={FlagGhana} />
            <Image alt="FlagNigeria" src={FlagNigeria} />
            <Image alt="FlagUnitedKingdom" src={FlagUnitedKingdom} />
            <Image alt="FlagUsOutlyingIslands" src={FlagUsOutlyingIslands} />
          </div>
        </div>

        {/* Four normal size items */}
        <div className="">
          <h3 className="text-lg font-bold mb-4">Join Us</h3>
          <ul>
            <li>
              <Link href={"/career"}>Careers</Link>
            </li>
            <li>
              <Link href={"/become-a-merchant"}>Become a Merchant</Link>
            </li>
            <li>
              <Link href={"/"}>Our Affiliates</Link>
            </li>
            <li>
              <Link href={"/"}>Delivery hub</Link>
            </li>
          </ul>
        </div>

        <div className="">
          <h3 className="text-lg font-bold mb-4">About us</h3>
          <ul>
            <li>
              <Link href={"/about"}>About Us</Link>
            </li>
            <li>
              <Link href={"/legal"}>Terms & Conditions</Link>
            </li>
            <li>
              <Link href={"/legal#section3"}>Privacy Polices</Link>
            </li>
            <li>
              <Link href={"/legal"}>Payment</Link>
            </li>
          </ul>
        </div>

        <div className="">
          <h3 className="text-lg font-bold mb-4">More Info</h3>
          <ul>
            <li>
              <Link href={"/"}>Site map</Link>
            </li>
            <li>
              <Link href={"/"}>Track Order</Link>
            </li>
            <li>
              <Link href={"/customer/register"}>Register Account</Link>
            </li>
            <li>
              <Link href={"/"}>Brands</Link>
            </li>
          </ul>
        </div>

        <div className="">
          <h3 className="text-lg font-bold mb-4">Need Help</h3>
          <ul>
            <li>
              <Link href={"/knowledge-center"}>FAQs</Link>
            </li>
            <li>
              <Link href={"/"}>24/7 Support</Link>
            </li>
            <li>
              <Link href={"/"}>Live Chat</Link>
            </li>
            <li>
              <Link href={"/"}>Our Blog</Link>
            </li>
            <li>
              <Link href={"/knowledge-center"}>Return Policy</Link>
            </li>
            <li>
              <Link href={"/"}>Bulk Purchase</Link>
            </li>
          </ul>
        </div>

        {/* Last row: Twice as big */}
        <div className="">
          <h3 className="text-lg font-bold mb-4">Download App</h3>
          <Image alt="google_play_image" src={AppleStore} />
          <Image alt="apple_play_image" src={GooglePlay} />
        </div>
      </div>
      <div className="bg-[#313133] text-white rounded-b-lg text-center py-6">
        <p>© 9TH TECH 2024. All Rights Reserved.</p>
      </div>
    </SectionContainer>
  );
};

export default MainFooter;
