"use client";

import MainFooter from "@/components/footer/footer";
import MainHeader from "@/components/header/header";

export default function OtherPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="px-2 lg:px-14 m-auto lg:py-8">
      <MainHeader />
      <div>{children}</div>
      <MainFooter />
    </div>
  );
}
