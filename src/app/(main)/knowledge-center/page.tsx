import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { siteConfig } from "@/config/site.config";
import Image from "next/image";
const sections = [
  { id: "section1", title: "Return Policy" },
  { id: "section2", title: "Return Policy (Vendors)" },
  { id: "section3", title: "Building Materials" },
  {
    id: "section4",
    title: "Frequently Asked Questions",
  },
];

const page = () => {
  return (
    <div className="leading-10">
      <Breadcrumb className="my-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink className="text-primary" href="/legal">
              Legal Center
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="bg-white rounded-xl p-3 ">
        <div className="min-h-60 bg-[url('https://res.cloudinary.com/dougwnqok/image/upload/v1727799631/4d56ce8c38262e55c19c507e6ac71960_kt6zfd.png')] bg-cover bg-no-repeat bg-center"></div>
        <div className="flex items-center">
          <Image src={siteConfig.logo} alt="logo" />
          <p className="ml-3 text-2xl">Legal Centre</p>
        </div>
      </div>
      <div className="grid grid-cols-8 gap-4 bg-white md:px-20 px-5  py-10 text-offBlack rounded-xl mt-3">
        {/* Side Navigation */}
        <aside className="hidden md:block self-start sticky col-span-2 top-56">
          <ul className="space-y-4">
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="block  p-2 rounded text-[20px]"
                >
                  {section.title}
                </a>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Content */}
        <div className="col-span-8 md:col-span-6">
          <section id="section1" className="h-auto">
            <h2 className="text-3xl mt-10 font-bold mb-4">Return Policy</h2>
            <p>
              Thank you for using 9th Marketplace! We offer refunds within the
              first 7 days of your purchase, if 7 days have passed since your
              purchase, you will not be offered a refund and/or exchange of any
              kind. Your item must be unused and in the same condition that
              you received it. Kindly see below our return requirements.
            </p>
            <p className="font-bold mt-5">What can be returned or exchanged?</p>
            <ul className="list-disc ml-6">
              <li>
                Damaged goods accompanied with proof that it was damaged upon
                arrival.
              </li>
              <li>
                Sub-par quality goods with proper contrast between expectations
                and reality.
              </li>
              <li>Wrong goods delivered.</li>
            </ul>
            <p className="font-bold mt-5">Steps for return</p>
            <ul className="list-disc ml-6">
              <li>
                Step 1 - Officially file a complaint with our customer care
                representatives via email or phone call providing sufficient
                evidence.
              </li>
              <li>
                Step 2- Once your complaint has been verified, we will contact
                you on the means of retrieving the goods.
              </li>
              <li>
                Step 3- Once the seller has received the goods as sent, we will
                issue a full refund of your money to the account it was paid
                from.
              </li>
            </ul>
            <p className="font-bold mt-5">Steps for exchange</p>
            <ul className="list-disc ml-6">
              <li>
                Step 1- Officially file a complaint with our customer care
                representatives via email or phone call providing sufficient
                evidence.
              </li>
              <li>
                Step 2- Once your complaint has been verified, we will contact
                you on the means of retrieving the goods.
              </li>
              <li>
                Step 3- When the seller receives the goods as sent, the correct
                products will be dispatched, and the tracking details
                communicated to you.
              </li>
            </ul>
          </section>
          <section id="section2" className="h-auto">
            <h2 className="text-3xl mt-10 font-bold mb-4 mt-10">
              Return Policy (Vendors)
            </h2>
            <p>
              If you fulfill an order and a complaint meeting our requirements
              is lodged, there will be an investigation to determine the
              genuineness of the claim. If it is found that the damage/mistake
              is from you&quot;ll be required to cover the return fee.
            </p>
          </section>
          <section id="section3" className="h-auto">
            <h2 className="text-3xl mt-10 font-bold mb-4 mt-10">
              {" "}
              Building Materials
            </h2>
            <p>
              If there is a problem with your order and your complaint has been
              processed and the products officially returned, you will be issued
              a refund to the account/card which payment was made from within
              the next 3 business days. Professionals and Artisans- If at any
              point there is an issue with the quality of service provided to
              you from a professional or artisan, you can lodge a complaint with
              our support team, and it will be investigated to then determine if
              there can be any rebate for the poor experience.
            </p>
          </section>
          <section id="section4" className="h-auto">
            <h2 className="text-3xl mt-10 font-bold mb-4 mt-10">
              Frequently Asked Questions
            </h2>
            <p className="font-bold">
              How do I return and get a refund for a product or service I am
              unsatisfied with?
            </p>
            <p className="mb-6">
              Answer- You can find all details on our return and refund policies
              here.
            </p>
            <p className="font-bold">Can I buy in bulk?</p>
            <p className="mb-6">
              Answer- Yes, you can. If your desired quantity exceeds what is
              shown as available, please contact us on 080********* or
              bulk@9thmarketplace.com
            </p>
            <p className="font-bold">
              How long will it take for my order to be processed?
            </p>
            <p className="mb-6">
              Typically 2-7 days, however since 9th Marketplace is a diverse
              multi-vendor platform, there is no stipulated time for orders
              placed as varied factors controlled by each individual seller
              coupled with the order type will ultimately determine the
              duration.
            </p>
            <p className="font-bold">How is my order delivered?</p>
            <p className="mb-6">
              Our platform provides diverse options for delivery where you can
              select your preferred vehicle type as well as priority level
              (express shipping)
            </p>
            <p className="font-bold">
              What are the requirements to be a registered vendor/professional
              or artisan?
            </p>
            <p className="mb-6">
              You can find the requirements for registration here
            </p>
            <p className="font-bold">
              How can I change my order quantity or delivery address after
              placing the order?
            </p>
            <p className="mb-6">
              You can contact our 24/7 help station to make alterations to your
              order after placing it.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default page;
