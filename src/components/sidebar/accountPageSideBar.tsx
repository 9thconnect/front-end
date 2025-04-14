import CertIcon from "@/icons/certIcon";
import React, { useState } from "react";
import SideBarItem from "./sideBarItem";
import SectionCardHeader from "../cards/common/sectionCardHeader";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { Button } from "../ui/button";
import { LogOut, LogOutIcon } from "lucide-react";
import { logoutUser, UserType } from "@/lib/redux/features/auth/authSlice";
import requests from "@/utils/requests";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { IVendor } from "@/type/users";
import { formatDate } from "@/utils/format-date";

const routes = [
  {
    name: "My Account",
    route: "/account/profile",
    icon: CertIcon,
    access: ["customer", "vendor"],
    vendorType: [],
    professionalType: [],
  },
  {
    name: "My Business",
    route: "/account/business",
    icon: CertIcon,
    access: ["vendor"],
    vendorType: ["seller", "professional"],
    professionalType: ["company"],
  },
  {
    name: "My Profession Artisan",
    route: "/account/artisan/profession",
    icon: CertIcon,
    access: ["vendor"],
    vendorType: ["professional"],
    professionalType: ["individual"],
  },
  {
    name: "Offers",
    route: "/account/offers",
    icon: CertIcon,
    access: ["vendor"],
    vendorType: ["professional"],
    professionalType: ["individual", "company"],
  },
  {
    name: "Projects",
    route: "/account/projects",
    icon: CertIcon,
    access: ["vendor"],
    vendorType: ["professional"],
    professionalType: ["individual", "company"],
  },

  {
    name: "Offers",
    route: "/account/customer-offers",
    icon: CertIcon,
    access: ["customer"],
    vendorType: [],
    professionalType: [],
  },
  {
    name: "Projects",
    route: "/account/customer-projects",
    icon: CertIcon,
    access: ["customer"],
    vendorType: [],
    professionalType: [],
  },

  {
    name: "Wallet",
    route: "/account/wallet",
    icon: CertIcon,
    access: ["vendor"],
    vendorType: ["seller", "professional"],
    professionalType: ["company", "individual"],
  },
  {
    name: "Wallet",
    route: "/account/customer-wallet",
    icon: CertIcon,
    access: ["customer"],
    vendorType: [],
    professionalType: [],
  },
  {
    name: "Transactions",
    route: "/account/transactions",
    icon: CertIcon,
    access: ["customer"],
    vendorType: [],
    professionalType: [],
  },
  {
    name: "Orders",
    route: "/account/orders",
    icon: CertIcon,
    access: ["customer", "vendor"],
    vendorType: ["seller"],
    professionalType: [],
  },
  {
    name: "Wishlist",
    route: "/account/wishlist",
    icon: CertIcon,
    access: ["customer"],
    vendorType: [],
    professionalType: [],
  },
  {
    name: "My Shop",
    route: "/account/shop",
    icon: CertIcon,
    access: ["vendor"],
    vendorType: ["seller"],
    professionalType: ["company"],
  },
  {
    name: "Properties",
    route: "/account/properties",
    icon: CertIcon,
    access: ["vendor"],
    vendorType: ["real-estate"],
    professionalType: [],
  },
  {
    name: "Fleet Management",
    route: "/account/fleet",
    icon: CertIcon,
    access: ["vendor"],
    vendorType: ["logistic"],
    professionalType: [],
  },
  {
    name: "Workers",
    route: "/account/workers",
    icon: CertIcon,
    access: ["vendor"],
    vendorType: ["professional"],
    professionalType: ["company"],
  },
  {
    name: "Change Password",
    route: "/account/password",
    icon: CertIcon,
    access: ["customer", "vendor"],
    vendorType: [],
    professionalType: [],
  },
  {
    name: "Notifications",
    route: "/account/notifications",
    icon: CertIcon,
    access: ["customer", "vendor"],
    vendorType: [],
    professionalType: [],
  },
];

const AccountPageSideBar = () => {
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const vendor = auth.data as IVendor;
  const type = auth.type;
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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

  // const filteredRoutes = routes.filter((route) => route.access.includes(type));

  const filteredRoutes = routes.filter((route) => {
    // Check access first
    if (!route.access.includes(auth.type)) {
      return false;
    }

    // If access is for vendor, check vendorType
    if (auth.type === "vendor") {
      let vendorData = auth.data as IVendor;
      if (
        route.vendorType.length > 0 &&
        !route.vendorType.includes(vendorData.vendorType)
      ) {
        return false;
      }

      // If vendorType is professional, check professionalType
      if (vendorData.vendorType === "professional") {
        if (
          route.professionalType.length > 0 &&
          !route.professionalType.includes(vendorData.professionalType)
        ) {
          return false;
        }
      }
    }

    return true;
  });

  console.log(auth.data);

  const userTitle = type === UserType.CUSTOMER ? "Customer" : vendor.vendorType;

  return (
    <div>
      {auth.data && (
        <div className={`section-card-header`}>
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-xl  text-offBlack">
              Profile -
              <span className="text-primary capitalize"> {userTitle}</span>{" "}
            </h3>
            <Button disabled={loading} onClick={handleLogout}>
              {loading ? "Loading.." : "Logout"}
              <LogOutIcon className="ml-2" size={15} />
            </Button>
          </div>
          <div className="border-b-2 mb-3 w-full"></div>
          <div className="flex p-2">
            <div
              className="rounded-md mr-3 h-20 w-20 bg-cover bg-no-repeat bg-center"
              style={{
                backgroundImage: `url(${
                  auth.data?.avatar || "/images/Ads.png"
                })`,
              }}
            ></div>
            {/* <img className="h-" src="/images/Ads.png" alt="" /> */}
            <div className=" flex flex-col justify-between">
              <p className="text-xs">{auth.data.phoneNumber}</p>
              <p className="text-lg text-offBlack">{auth.data?.fullName}</p>

              <p>{formatDate(new Date(auth.data.createdAt), "DD MMM, YYYY")}</p>
            </div>
          </div>
        </div>
      )}

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
