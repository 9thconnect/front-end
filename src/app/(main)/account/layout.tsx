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

export default function AccountPagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const path = usePathname();

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
          <aside className="self-start lg:sticky col-span-3 top-56 mb-10">
            <AccountPageSideBar />
          </aside>

          <div className="col-span-5">
            <div className="rounded-md border p-2">{children}</div>
          </div>
        </div>
      </SectionContainer>
    </div>
  );
}
