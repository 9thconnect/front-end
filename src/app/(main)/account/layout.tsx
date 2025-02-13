"use client";

import SectionContainer from "@/components/cards/common/sectionContainer";
import AccountPageSideBar from "@/components/sidebar/accountPageSideBar";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useAppSelector } from "@/lib/redux/hooks";
import { IVendor } from "@/type/users";

export default function AccountPagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const path = usePathname();

  const vendor = useAppSelector((state) => state.auth.data as IVendor);
  const type = useAppSelector((state) => state.auth.type);

  console.log(path);

  return (
    <div>
      <Breadcrumb className="my-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/hire">Account</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-primary capitalize">
              {path.split("/")[2]}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <SectionContainer>
        <div className="lg:grid grid-cols-1 lg:grid-cols-8 gap-8">
          {(vendor && vendor.profileBuild) ||
            (type == "customer" && (
              <aside className="self-start lg:sticky col-span-2 top-56 mb-10">
                <AccountPageSideBar />
              </aside>
            ))}

          <div
            className={`${
              (vendor && vendor.profileBuild) || type == "customer"
                ? "col-span-6"
                : "col-span-8"
            } `}
          >
            <div className="rounded-md  p-2">{children}</div>
          </div>
        </div>
      </SectionContainer>
    </div>
  );
}
