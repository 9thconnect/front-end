import React from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { metaObject, siteConfig } from "@/config/site.config";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata = {
  ...metaObject("How to become a vendor"),
};

const page = () => {
  return (
    <div>
      <Breadcrumb className="my-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink className="text-primary" href="/legal">
              Become A merchant
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="grid grid-cols-8 gap-4 bg-white md:px-20 px-5  py-10 text-offBlack rounded-xl mt-3 leading-7">
        {/* Side Navigation */}
        <aside className="hidden md:block self-start sticky col-span-2 top-56">
          <img
            src="https://res.cloudinary.com/dougwnqok/image/upload/v1727943050/9d04fa09a0ec215ca9d0c325499f75a0_fhtvaa.jpg"
            alt="merch"
          />
        </aside>

        <div className="col-span-8 md:col-span-6">
          <h1 className="text-2xl font-bold my-7">Become a Merchant</h1>

          <p>Why sell on 9th Marketplace?</p>
          <ul className="list-disc ml-5">
            <li>Low commission rates</li>
            <li>Expanded client base</li>
            <li>Control</li>
            <li>Seamless communication</li>
            <li>24/7 support</li>
            <li>Cyber safety and security</li>
          </ul>

          <p className="mb-7">
            <span className="font-bold my-7">Low commission rates -</span> Our
            commission fees are as low as 2% on each sale and it is only charged
            when you have successfully completed a transaction. Expanded client
            base- 9th Market place widens your business’ reach by exposing you
            to a diverse and continuous stream of interested buyers; and gives
            buyers direct access your various products and direct connection to
            you.
          </p>
          <p className="mb-7">
            <span className="font-bold my-7">Control -</span> There are no price
            regulators on products, and you can pick your return policy price as
            well as delivery methods and other things of importance.
          </p>
          <p className="mb-7">
            <span className="font-bold my-7">Seamless communication - </span> An
            easy-to-use means of communication is available, so you can easily
            talk directly with interested Buyers. 24/7 support- We have an
            active support team that is always available to support you at any
            time.
          </p>
          <p className="mb-7">
            <span className="font-bold my-7">Cyber safety and security -</span>{" "}
            Your safety and security are of utmost importance to us, and we go
            extended lengths to protect the integrity of both buyer and seller.
          </p>

          <h2 className="text-2xl font-bold my-10">
            How to sign up as a vendor
          </h2>

          <div className="flex space-x-4">
            <div className="rounded-lg border p-6 text-center">
              <h1>Step 1</h1>
              <p>
                Fill in and upload required personal and company information and
                await approval.
              </p>
            </div>
            <div className="rounded-lg border p-6 text-center">
              <h1>Step 2</h1>
              <p>Upload your products and services while awaiting approval.</p>
            </div>
            <div className="rounded-lg border p-6 text-center">
              <h1>Step 3</h1>
              <p>
                After approval, complete the vendor training to learn about how
                to operate your shop and manage orders.
              </p>
            </div>
          </div>

          <div className="flex items-center mt-11 gap-3">
            <Link href={"/vendor/register"}>
              <Button>Register as a Vendor</Button>
            </Link>
            <Link href="/customer/register">
              <Button>Register as a Customer</Button>{" "}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
