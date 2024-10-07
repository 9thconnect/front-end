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

const pagee = () => {
  return (
    <div>
      <Breadcrumb className="my-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink className="text-primary" href="/career">
              Career
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
          <h1 className="text-2xl font-bold my-7">Career</h1>
          <h2 className="my-5 font-bold">Join our team!</h2>
          <p>
            Here you can experience a distinctive work environment which fosters
            growth and innovation. At 9th Tech you will find the opportunity to
            create and push change in the African Commerce and Tech space at
            distinct levels. Inclusivity is paramount to our aims and goals as
            creativity thrives in diversity and whether you are taking your
            first career step or looking to scale up in your field, there are
            progressive spaces here for you.
          </p>

          <p className="font-bold mt-5">Benefits</p>
          <ul className="list-disc ml-5">
            <li>Training opportunities</li>
            <li>Access to industry networking events</li>
            <li> Good starting salary</li>
            <li>Paid yearly leave.</li>
          </ul>

          <h6 className="font-bold mt-5">Role Vacancies</h6>
          <p>
            In this section we will upload vacancies and application
            requirements along with details on how to apply.
          </p>

          <h6 className="font-bold mt-5">Apply ahead</h6>
          <p>
            Kindly send us your CV and qualifications to be considered for
            future job openings. We will include an information input section
            for interested applicants.
          </p>
        </div>
      </div>
    </div>
  );
};

export default pagee;
