import CertIcon from "@/icons/certIcon";
import React from "react";
import SideBarItem from "./sideBarItem";
import SectionCardHeader from "../cards/common/sectionCardHeader";
import { useAppSelector } from "@/lib/redux/hooks";

const routes = [
  {
    name: "My Account",
    route: "/account/profile",
    icon: CertIcon,
    access: ["customer", "vendor"],
  },
  {
    name: "Wallet",
    route: "/account/wallet",
    icon: CertIcon,
    access: ["vendor"],
  },
  {
    name: "Orders",
    route: "/account/orders",
    icon: CertIcon,
    access: ["customer"],
  },
  {
    name: "Wishlist",
    route: "/account/wishlist",
    icon: CertIcon,
    access: ["customer"],
  },
  {
    name: "My Shop",
    route: "/account/shop",
    icon: CertIcon,
    access: ["vendor"],
  },
  {
    name: "Workers",
    route: "/account/workers",
    icon: CertIcon,
    access: ["vendor"],
  },
  {
    name: "Change Password",
    route: "/account/password",
    icon: CertIcon,
    access: ["customer", "vendor"],
  },
];

const AccountPageSideBar = () => {
  const auth = useAppSelector((state) => state.auth);
  const type = auth.type;

  const filteredRoutes = routes.filter((route) => route.access.includes(type));
  return (
    <div>
      <div className={`section-card-header`}>
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-xl  text-offBlack">User Profile</h3>
        </div>
        <div className="border-b-2 mb-3 w-full"></div>
        <div className="flex p-2">
          <div className="rounded-md mr-3 h-20 w-20 bg-cover bg-no-repeat bg-center bg-[url(/images/Ads.png)]"></div>
          {/* <img className="h-" src="/images/Ads.png" alt="" /> */}
          <div className=" flex flex-col justify-between">
            <p className="text-xs">UID-EDYTFUY</p>
            <p className="text-lg text-offBlack">{auth.data?.fullName}</p>
            <p>{auth.data?.createdAt}</p>
          </div>
        </div>
      </div>
      <ul className="p-2 mt-5">
        {filteredRoutes.map((route) => (
          <SideBarItem
            IconComponent={route.icon}
            label={route.name}
            path={route.route}
            key={`account-route-${route.name}`}
          />
        ))}
        <li></li>
      </ul>
    </div>
  );
};

export default AccountPageSideBar;
