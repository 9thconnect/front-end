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
            <Link
              href="https://x.com/9thmarketplace"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image alt="TwitterIcon" src={TwitterIcon} />
            </Link>

            <Link
              href="https://www.instagram.com/9thmarketplace"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image alt="InstagramIcon" src={InstagramIcon} />
            </Link>

            <Link
              href="https://www.facebook.com/profile.php?id=61566668534655&mibextid=ZbWKwL"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image alt="fb icon" src={FaceBookIcon} />
            </Link>

            <Link
              href="https://www.tiktok.com/@9thmarketplace?_t=8qZMkxYJ8sg&_r=1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image alt="TiktokIcon" src={TiktokIcon} />
            </Link>

            {/* <Image alt="WhatsappIcon" src={WhatsappIcon} /> */}

            <Link
              href="https://youtube.com/@9thmarketplace?si=UwiK_aDz9Y_Ow5IC"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image alt="YoutubeIcon" src={YoutubeIcon} />
            </Link>
          </div>
          <Separator className="my-4" />
          <div className="flex space-x-2">
            <Image className="h-7 w-7" alt="FlagChina" src={FlagChina} />
            <Image className="h-7 w-7" alt="FlagGhana" src={FlagGhana} />
            <Image className="h-7 w-7" alt="FlagNigeria" src={FlagNigeria} />
            <Image
              className="h-7 w-7"
              alt="FlagUnitedKingdom"
              src={FlagUnitedKingdom}
            />
            <Image
              className="h-7 w-7"
              alt="FlagUsOutlyingIslands"
              src={FlagUsOutlyingIslands}
            />
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
              <Link href={"/logistics"}>Delivery hub</Link>
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
              <Link href={"/legal#section13"}>Payment</Link>
            </li>
          </ul>
        </div>

        <div className="">
          <h3 className="text-lg font-bold mb-4">More Info</h3>
          <ul>
            <li>
              <Link href={"/customer/register"}>Customer Register </Link>
            </li>
            <li>
              <Link href={"/customer/login"}>Customer Login</Link>
            </li>
            <li>
              <Link href={"/vendor/register"}>Vendor Register</Link>
            </li>
            <li>
              <Link href={"/vendor/login"}>Vendor Login</Link>
            </li>
          </ul>
        </div>

        <div className="">
          <h3 className="text-lg font-bold mb-4">Need Help</h3>
          <ul>
            <li>
              <Link href={"/knowledge-center#section4"}>FAQs</Link>
            </li>
            <li>
              <Link
                target="_blank"
                href={"https://chatting.page/zjzf4sgtmmvqxxuvrt0ojcqau7xesodf"}
              >
                24/7 Support
              </Link>
            </li>
            <li>
              <Link
                target="_blank"
                href={"https://chatting.page/zjzf4sgtmmvqxxuvrt0ojcqau7xesodf"}
              >
                Live Chat
              </Link>
            </li>
            <li>
              <Link href={"/blog"}>Our Blog</Link>
            </li>
            <li>
              <Link href={"/knowledge-center"}>Return Policy</Link>
            </li>
            <li>
              <Link href={"/wholesale"}>Bulk Purchase</Link>
            </li>
          </ul>
        </div>

        {/* Last row: Twice as big */}
        {/* <div className="">
          <h3 className="text-lg font-bold mb-4">Download App</h3>
          <Image alt="google_play_image" src={AppleStore} />
          <Image alt="apple_play_image" src={GooglePlay} />
        </div> */}
      </div>
      <div className="bg-[#313133] text-white rounded-b-lg text-center py-6">
        <p>© 9TH TECH 2025. All Rights Reserved.</p>
      </div>
    </SectionContainer>
  );
};

export default MainFooter;
