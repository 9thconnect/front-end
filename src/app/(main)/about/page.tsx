import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Image from "next/image";
import { metaObject, siteConfig } from "@/config/site.config";

export const metadata = {
  ...metaObject("About Us"),
};

const ServiceCard = ({
  title,
  description,
  items,
}: {
  title: string;
  description: string;
  items: String[];
}) => (
  <div className="flex flex-col md:flex-row p-6 bg-gray-50 rounded-lg shadow-md">
    <div className="w-2/5 h-full bg-pink-100 mb-4"></div>{" "}
    {/* Placeholder for the image */}
    <div className="text-left px-4">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="mb-4">{description}</p>
      <ul className="list-disc list-inside space-y-1">
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  </div>
);

const page = () => {
  const services = [
    {
      title: "Hire Professionals",
      description: "Access a diverse range of skilled professionals:",
      items: [
        "Architects, Engineers (Civil, Electrical, Mechanical, Geotechnical)",
        "Interior Designers and Landscape Designers",
        "Construction Managers and Quantity Surveyors",
        "Safety Inspectors and Fire Protectors",
        "Project Managers and Legal Advisors etc.",
      ],
    },
    {
      title: "Hire Artisans",
      description: "Expert artisans for hands-on work:",
      items: [
        "Bricklayers, Masons, Painters, Plumbers",
        "Electricians, Welders, and Gardeners etc.",
      ],
    },
    {
      title: "Hire Machines and Equipment",
      description:
        "A vast selection of construction machinery available for hire:",
      items: [
        "Excavators, Cranes, and Backhoes",
        "Concrete Mixers, Compactors, and Pavers",
        "Forklifts, Graders, and Rollers",
        "Aerial Lifts, Trenchers, and Truck etc.",
      ],
    },
    {
      title: "Shipping and Logistics",
      description:
        "With our extensive global network, we ensure timely and reliable delivery of goods to any location worldwide. Your products will reach their destination efficiently and securely.",
      items: [],
    },
    {
      title: "Wholesale",
      description:
        "We provide retailers with easy, secure access to various manufacturers across the globe.",
      items: [],
    },
  ];

  return (
    <div className=" bg-gray-100 text-offBlack leading-6">
      <Breadcrumb className="my-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/hire">About Us</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <section className=" bg-white rounded-xl sm:py-8 sm:px-12 p-4">
        <h1 className="text-red-600 text-xl font-bold mb-4">WHO WE ARE</h1>

        <div className="flex flex-col md:flex-row gap-8 mb-12">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-4">About 9th Marketplace</h2>
            <p className="text-gray-700 mb-4">
              9th Marketplace is set to become your go-to global online
              marketplace for construction materials and fixtures tailored to
              your unique lifestyle. We collaborate with various stakeholders to
              streamline your building experience, making it easy and
              stress-free.
            </p>
            <p className="text-gray-700 mb-4">
              We are your one stop location for everything needed to take your
              dream house from the ground up or to simply buy one. We are
              committed to promoting sustainable homes, properties and building
              solutions for you.
            </p>
            <p className="text-gray-700">
              Our extensive range of services covers everything from site
              preparation and excavation to occupancy and ongoing maintenance
              and with a vast global presence, local expertise and a robust
              referral network, we ensure shipping to any location worldwide.
            </p>
          </div>

          <div className="md:w-1/2">
            <div className="">
              <img
                src="https://res.cloudinary.com/dougwnqok/image/upload/v1738831174/313f25f1-dc00-4b5f-8fef-f5cdc05d6445_voj8fk.png"
                alt="Construction worker"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg border">
            <h3 className="text-xl font-bold mb-4">Our Mission</h3>
            <p className="text-gray-700">
              To transform the African building and real estate industry by
              making property and materials trading secure and convenient.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border">
            <h3 className="text-xl font-bold mb-4">Our Vision</h3>
            <p className="text-gray-700">
              To be a facilitator of seamless real estate investments in Africa.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border">
            <h3 className="text-xl font-bold mb-4">Core Values</h3>
            <ul className="text-gray-700 list-disc list-inside">
              <li>Integrity</li>
              <li>Trust</li>
              <li>Accountability</li>
              <li>Sustainability</li>
              <li>Inclusion</li>
            </ul>
          </div>
        </div>
      </section>
      <section className="bg-gray-100 py-8 flex justify-center items-center flex-col text-center">
        <Image src={siteConfig.icon} alt="logo" />
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-4">Why 9th Market</h2>
          <p className="text-sm">
            At 9th Tech, we provide an exceptional marketplace where you can
            buy, sell, or hire a wide range of durable and sustainable building
            materials, machinery, safety equipment, furniture, fittings, and
            fixtures designed to meet your construction and design needs. We
            also offer professional and consultancy services as well as a range
            to ease the workload of your construction.
          </p>
        </div>
      </section>
      <section className="bg-white rounded-xl px-4 py-8">
        <div className=" flex flex-col md:flex-row items-start">
          <div className="md:w-1/2 md:pl-20">
            <div className="mb-4 flex">
              <Image src={siteConfig.icon} alt="logo" />
              <h2 className="text-2xl font-bold ml-2">Buy</h2>
            </div>

            <p className="text-sm mb-4">
              Explore our selection of luxury real estate properties designed to
              meet your living standards. With a vast network of reputable
              companies and professionals across diverse fields, we ensure that
              our offerings cater to your lifestyle. Our extensive inventory
              includes:
            </p>
            <ul className="text-sm list-disc pl-5 mb-4">
              <li>
                Real Estate: Properties in Nigeria, Africa, Asia, America,
                Europe, and beyond
              </li>
              <li>
                Building Materials: A comprehensive range of materials sourced
                directly from trusted suppliers
              </li>
              <li>
                Consultancy Services: Professional advice on real estate in
                diverse locations
              </li>
              <li>
                Shipping Services: Seamless delivery to your preferred location
                anywhere in the world
              </li>
            </ul>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0 flex justify-end">
            <img
              src="https://res.cloudinary.com/dougwnqok/image/upload/v1728021656/Frame_1400003012_zxwrdx.png"
              alt="Luxury Property"
              className="rounded-lg"
            />
          </div>
        </div>
        <div className="py-8 mt-16">
          <div className=" h-[800px] md:h-[420px] mx-auto flex flex-col md:flex-row">
            <div className="md:w-1/2 mb-8 md:mb-0 md:bg-[#FFCFCF66] md:rounded-s-2xl">
              <img
                src="https://res.cloudinary.com/dougwnqok/image/upload/v1728026061/Frame_1400003012_asffyv.png"
                alt=""
                className="h-full w-full"
              />
            </div>
            <div className="md:w-1/2 h-full overflow-auto md:pl-8 bg-[#FFCFCF66] p-2 rounded-2xl md:rounded-none md:rounded-e-2xl">
              <div>
                <div>
                  <h3 className="text-lg font-bold my-6">Building Materials</h3>
                  <ul className="text-sm list-disc pl-5">
                    <li>
                      Concrete & Masonry: High-strength concrete, bricks, and
                      blocks for robust construction.
                    </li>
                    <li>
                      Wood & Lumber: Sustainably sourced timber for framing,
                      flooring, and finishing.
                    </li>
                    <li>
                      Roofing Solutions: Durable roofing materials, including
                      tiles, shingles, and metal options.
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold my-6">
                    Construction Products
                  </h3>
                  <ul className="text-sm list-disc pl-5">
                    <li>
                      Insulation Materials: Energy-efficient insulation for
                      optimal thermal performance.
                    </li>
                    <li>
                      Flooring Solutions: A variety of flooring options, from
                      hardwood to tiles, tailored to your style.
                    </li>
                    <li>
                      Paints & Finishes: Eco-friendly paints and coatings for a
                      perfect finish.
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold my-6">
                    Furniture & Fixtures
                  </h3>
                  <ul className="text-sm list-disc pl-5">
                    <li>
                      Indoor Furniture: Stylish and functional pieces for homes
                      and offices.
                    </li>
                    <li>
                      Outdoor Solutions: Durable outdoor furniture and fixtures
                      for any environment.
                    </li>
                    <li>
                      Custom Fixtures: Tailored solutions to meet your specific
                      design requirements.
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold my-6">Building Materials</h3>
                  <ul className="text-sm list-disc pl-5">
                    <li>
                      Bricks & Blocks: Concrete bricks, cinder blocks, clay
                      bricks, lintel blocks, and paving blocks.
                    </li>
                    <li>
                      Cement: Brands like Beto, Dangote, Ashaka, Eagle, Lafarge
                      Wapco, and Elephant cement.
                    </li>
                    <li>
                      Roofing & Tiles: Chinese glazed roof tiles and various
                      ceramic tiles.
                    </li>
                    <li>
                      Insulation & Fire Protection: Foam board insulation,
                      mineral wool, and fire bricks.
                    </li>
                    <li>
                      Glass & Stone: Clear, shatterproof, laminated, toughened
                      glass, granite, limestone, and marble.
                    </li>
                    <li>
                      Metals & Structural Materials: Iron reinforcement rods,
                      aluminum for roofing and cladding, stainless steel, and
                      general steel.
                    </li>
                    <li>
                      Other Materials: Timber, plywood, plaster of Paris (PoP),
                      PVC and asbestos cement pipes, and zinc.
                    </li>
                    <li>
                      Paints: A range of paints including oil, enamel, emulsion,
                      and products from top brands.
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold my-6">
                    Interior and Exterior Finishing and Landscaping Services
                  </h3>
                  <ul className="text-sm list-disc pl-5">
                    <li>
                      Cabinetry: Custom installations for kitchens and storage.
                    </li>
                    <li>
                      Flooring: Professional installation of various flooring
                      types.
                    </li>
                    <li>Painting: Interior and exterior painting services.</li>
                    <li>
                      Wallboard Installation: Drywall and plaster solutions.
                    </li>
                    <li>
                      Fixtures: Installation of essential fixtures for
                      functionality and aesthetics.
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold my-6">Exterior Services</h3>
                  <ul className="text-sm list-disc pl-5">
                    <li>Gutters: Installation and maintenance.</li>
                    <li>
                      Siding: Professional installation for aesthetics and
                      protection.
                    </li>
                    <li>Roofing: Comprehensive roofing services.</li>
                    <li>
                      Landscaping: Design and installation of trees, shrubs, and
                      flowers.
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold my-6">Home & Furnishings</h3>
                  <ul className="text-sm list-disc pl-5">
                    <li>
                      Bed and Bathroom Furnishings: Essential and decorative
                      items for comfort.
                    </li>
                    <li>
                      Chairs, Tables, Rugs & Carpets: Stylish and functional
                      furniture options.
                    </li>
                    <li>
                      Curtains & Blinds: Window treatments for privacy and
                      decor.
                    </li>
                    <li>Décor Items: Accessories to enhance your space.</li>
                    <li>Light & Fixtures: A variety of lighting solutions.</li>
                    <li>
                      Housekeeping & Pet Supplies: Practical items for everyday
                      living.
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold my-6">Services</h3>
                  <ul className="text-sm list-disc pl-5">
                    <li>
                      <strong>Hire Professionals</strong>: Access a diverse
                      range of skilled professionals:
                      <ul className="pl-5">
                        <li>
                          Architects, Engineers (Civil, Electrical, Mechanical,
                          Geotechnical).
                        </li>
                        <li>Interior Designers and Landscape Designers.</li>
                        <li>Construction Managers and Quantity Surveyors.</li>
                        <li>Safety Inspectors and Fire Protectors.</li>
                        <li>Project Managers and Legal Advisors.</li>
                      </ul>
                    </li>
                    <li>
                      <strong>Hire Artisans</strong>: Expert artisans for
                      hands-on work:
                      <ul className="pl-5">
                        <li>Bricklayers, Masons, Painters, Plumbers.</li>
                        <li>Electricians, Welders, and Gardeners.</li>
                      </ul>
                    </li>
                    <li>
                      <strong>Hire Machines and Equipment</strong>: A vast
                      selection of construction machinery available for hire:
                      <ul className="pl-5">
                        <li>Excavators, Cranes, and Backhoes.</li>
                        <li>Concrete Mixers, Compactors, and Pavers.</li>
                        <li>Forklifts, Graders, and Rollers.</li>
                        <li>Aerial Lifts, Trenchers, and Trucks.</li>
                      </ul>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold my-6">
                    Shipping and Logistics
                  </h3>
                  <p className="text-sm">
                    With our extensive global network, we ensure timely and
                    reliable delivery of goods to any location worldwide. Your
                    products will reach their destination efficiently and
                    securely.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold my-6">Wholesale</h3>
                  <p className="text-sm">
                    We provide retailers with easy, secure access to various
                    manufacturers across the globe.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white rounded-xl md:px-4  mt-6">
        <div className=" py-8 flex justify-center items-center flex-col text-center">
          <Image src={siteConfig.icon} alt="logo" />
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-4">Our Services</h2>
            <p className="text-sm max-w-lg mx-auto">
              At 9th Tech, we provide an exceptional marketplace where you can
              buy, sell, or hire a wide range of durable and sustainable
              building materials,
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 p-6">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                title={service.title}
                description={service.description}
                items={service.items}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;
