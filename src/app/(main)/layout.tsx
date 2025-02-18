"use client";

import MainFooter from "@/components/footer/footer";
import MainHeader from "@/components/header/header";
import NotCustomerModal from "@/components/modals/notCustomer";
import TrackOrderModal from "@/components/modals/trackOrderModal";
import Script from "next/script";

export default function OtherPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="px-2 lg:px-14 m-auto lg:py-8">
      <Script src="//code.tidio.co/zjzf4sgtmmvqxxuvrt0ojcqau7xesodf.js" />
      <MainHeader />
      <TrackOrderModal />
      <NotCustomerModal />
      <div>{children}</div>
      <MainFooter />
    </div>
  );
}
