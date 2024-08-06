import type { Metadata } from "next";
import { sora } from "@/app/fonts";
import "./globals.css";
import cn from "@/utils/class-names";
import { Toaster } from "@/components/ui/sonner";
import { siteConfig } from "@/config/site.config";
import StoreProvider from "./StoreProvider";
import { makeStore } from "@/lib/redux/store";

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang="en" dir="ltr">
        <body
          suppressHydrationWarning
          className={cn(sora.variable, "font-inter")}
        >
          <div>{children}</div>
          <Toaster closeButton />
        </body>
      </html>
    </StoreProvider>
  );
}
