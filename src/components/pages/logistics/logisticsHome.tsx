"use client";

import SectionContainer from "@/components/cards/common/sectionContainer";
import FilterSection from "@/components/common/filterSection";
import { Check, ChevronDown } from "lucide-react";
import { useState } from "react";

const LogisticPage = ({ slug }: { slug: string }) => {
  const [isLocationOpen, setIsLocationOpen] = useState(true);
  const [isTypesOpen, setIsTypesOpen] = useState(true);

  const [selectedLocation, setSelectedLocation] = useState<
    string | undefined
  >();

  const [selectedVehicleType, setSelectedVehicleType] = useState<
    string | undefined
  >();
  const states = [
    { name: "Abuja", value: "201" },
    { name: "Lagos", value: "202" },
    { name: "Kano", value: "203" },
    { name: "Rivers", value: "204" },
    { name: "Kaduna", value: "205" },
    { name: "Enugu", value: "206" },
    { name: "Ogun", value: "207" },
    { name: "Oyo", value: "208" },
    { name: "Cross River", value: "209" },
    { name: "Plateau", value: "210" },
  ];

  const vehicleTypes = [
    { name: "Heavy Vehicles", value: "Heavy Vehicles" },
    { name: "Light Vehicles", value: "Light Vehicles" },
    { name: "Three Wheelers", value: "Three Wheelers" },
    { name: "Dispatch Bikes", value: "Dispatch Bikes" },
    { name: "VIP", value: "VIP" },
    { name: "Air Freight", value: "Air Freight" },
    { name: "Ships", value: "Ships" },
  ];

  const companies = [
    {
      name: "McDonald Trans",
      location: "Abuja, NG",
      phone: "+234 803 742 9208",
      image:
        "https://s3-alpha-sig.figma.com/img/84fa/22f7/34adbc36ff5d9021e9e47c2811332b6a?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=jLAHB~RTntNHgspNnwUheRHQN2-Y-uOi6R2LFSFOL-EAR1kyXED-IyWaoHTBmm0x3z6PIoc1Ae-47NYfo~9Q5ffUfMCXCp7uDiQtOezgvq9XWapTAyONUsZXaOYEKorvyLqjfbzKhBH2vaR6xKZ7YMTgJoEr0E5JRWo2dMcpYifKHUBBQ157Y5rdhr2VQUdkRFkrWn~65cYKQk5gM3eUIbu1yK9HTrrOsZdfZKsCUQwXvnqTjRyfwG6WTmSpADIyPjNdsVn~t~ZicYNKykZuadI4gJYMSfgAPMeJ8ZoP4VHm-wybu1tuzbpfVcMFAAmNSrfxT93kZNpk710e5gglUw__",
    },
    {
      name: "7central Logistics",
      location: "Abuja, NG",
      phone: "+234 803 742 9208",
      image:
        "https://s3-alpha-sig.figma.com/img/84fa/22f7/34adbc36ff5d9021e9e47c2811332b6a?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=jLAHB~RTntNHgspNnwUheRHQN2-Y-uOi6R2LFSFOL-EAR1kyXED-IyWaoHTBmm0x3z6PIoc1Ae-47NYfo~9Q5ffUfMCXCp7uDiQtOezgvq9XWapTAyONUsZXaOYEKorvyLqjfbzKhBH2vaR6xKZ7YMTgJoEr0E5JRWo2dMcpYifKHUBBQ157Y5rdhr2VQUdkRFkrWn~65cYKQk5gM3eUIbu1yK9HTrrOsZdfZKsCUQwXvnqTjRyfwG6WTmSpADIyPjNdsVn~t~ZicYNKykZuadI4gJYMSfgAPMeJ8ZoP4VHm-wybu1tuzbpfVcMFAAmNSrfxT93kZNpk710e5gglUw__",
    },
    {
      name: "Tayo Dispatch",
      location: "Abuja, NG",
      phone: "+234 803 742 9208",
      image:
        "https://s3-alpha-sig.figma.com/img/84fa/22f7/34adbc36ff5d9021e9e47c2811332b6a?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=jLAHB~RTntNHgspNnwUheRHQN2-Y-uOi6R2LFSFOL-EAR1kyXED-IyWaoHTBmm0x3z6PIoc1Ae-47NYfo~9Q5ffUfMCXCp7uDiQtOezgvq9XWapTAyONUsZXaOYEKorvyLqjfbzKhBH2vaR6xKZ7YMTgJoEr0E5JRWo2dMcpYifKHUBBQ157Y5rdhr2VQUdkRFkrWn~65cYKQk5gM3eUIbu1yK9HTrrOsZdfZKsCUQwXvnqTjRyfwG6WTmSpADIyPjNdsVn~t~ZicYNKykZuadI4gJYMSfgAPMeJ8ZoP4VHm-wybu1tuzbpfVcMFAAmNSrfxT93kZNpk710e5gglUw__",
    },
    {
      name: "7central Logistics",
      location: "Abuja, NG",
      phone: "+234 803 742 9208",
      image:
        "https://s3-alpha-sig.figma.com/img/84fa/22f7/34adbc36ff5d9021e9e47c2811332b6a?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=jLAHB~RTntNHgspNnwUheRHQN2-Y-uOi6R2LFSFOL-EAR1kyXED-IyWaoHTBmm0x3z6PIoc1Ae-47NYfo~9Q5ffUfMCXCp7uDiQtOezgvq9XWapTAyONUsZXaOYEKorvyLqjfbzKhBH2vaR6xKZ7YMTgJoEr0E5JRWo2dMcpYifKHUBBQ157Y5rdhr2VQUdkRFkrWn~65cYKQk5gM3eUIbu1yK9HTrrOsZdfZKsCUQwXvnqTjRyfwG6WTmSpADIyPjNdsVn~t~ZicYNKykZuadI4gJYMSfgAPMeJ8ZoP4VHm-wybu1tuzbpfVcMFAAmNSrfxT93kZNpk710e5gglUw__",
    },
  ];

  return (
    <div className="mt-5">
      <div className="bg-[url('https://res.cloudinary.com/dougwnqok/image/upload/v1728574405/b6a0c12097ef7583e80635c26631cf4e_xjfdoa.jpg')] bg-cover py-14 bg-no-repeat bg-center rounded-2xl mt-5 ">
        <img
          className="ml-4 h-56 w-56 rounded-3xl "
          src={
            slug == "9th"
              ? "https://res.cloudinary.com/dougwnqok/image/upload/v1728574102/Frame_1400002996_vmh94l.png"
              : "https://res.cloudinary.com/dougwnqok/image/upload/v1728574553/WhatsApp_Image_2024-10-10_at_8.02.46_AM_ottgqn.jpg"
          }
          alt=""
        />
      </div>
      <div className="grid grid-cols-8 gap-4">
        <aside className="hidden md:block self-start sticky col-span-2 top-56">
          <SectionContainer className="sticky self-start">
            <FilterSection
              title="Location"
              items={states}
              isOpen={isLocationOpen}
              onToggle={() => setIsLocationOpen(!isLocationOpen)}
              selectedValue={selectedLocation}
              onSelect={(value) => setSelectedLocation(value as string)}
            />

            <FilterSection
              title="Type"
              items={vehicleTypes}
              isOpen={isTypesOpen}
              onToggle={() => setIsTypesOpen(!isTypesOpen)}
              selectedValue={selectedVehicleType?.toString()}
              onSelect={(value) => setSelectedVehicleType(value as string)}
            />
          </SectionContainer>
        </aside>

        <SectionContainer className="col-span-8 md:col-span-6">
          <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold">Sponsored</h1>
              <div className="flex space-x-2">
                <div className="flex items-center">
                  <span className="mr-2">Sort by</span>
                  <button className="px-3 py-1 border rounded-md flex items-center">
                    Relevance <ChevronDown className="ml-2" size={16} />
                  </button>
                </div>
                <button className="px-3 py-1 border rounded-md flex items-center">
                  Price <ChevronDown className="ml-2" size={16} />
                </button>
                <button className="px-4 py-1 bg-red-500 text-white rounded-md">
                  Register as a Partner
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {companies.map((company, index) => (
                <div key={index} className="border rounded-lg overflow-hidden">
                  <div className="relative">
                    <img
                      src={company.image}
                      alt={company.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded-full flex items-center">
                      <Check size={16} className="mr-1" /> Verified
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-gray-500">{company.location}</p>
                    <h3 className="font-semibold">{company.name}</h3>
                    <p className="text-gray-600">{company.phone}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-[url('https://s3-alpha-sig.figma.com/img/d575/ad34/b2122640fc585f6ae4a664d8a171888a?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=GoHqpwl12ApUwa~sJxIgV7562bsY6dzXkKiPgiFPxLh7P1cP9CEhEJDkinV4u0HjNbY5BuVwxSsFn1-rsYFn2PkhX-WQz~AktjVEpn9GixbVrcOIbtGvDzg3SKDHrdwJa9FbecrfJPt~yYTcwhnncBm27UZ5kFSCOs9-q1VTGHKSIhhBo4l8KJdAblzejITejc1aNnHoFUt~T4rLPzOhJCkxjrghXab9zBNHl5BA1KNG5ff4vIq~lqxtWfbEKJqpaQMW-ppJoMIQpFIYwm850Xz0c-IMR8ug8sFrjdoMYQQ4C3wCkNjfgcEPhG5it5mZLnBnirV9VuguMMinRrIZCg__')] bg-cover h-60 bg-no-repeat bg-center rounded-2xl mt-5 "></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {companies.map((company, index) => (
                <div
                  key={index}
                  className="border rounded-lg overflow-hidden mt-6"
                >
                  <div className="relative">
                    <img
                      src={company.image}
                      alt={company.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded-full flex items-center">
                      <Check size={16} className="mr-1" /> Verified
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-gray-500">{company.location}</p>
                    <h3 className="font-semibold">{company.name}</h3>
                    <p className="text-gray-600">{company.phone}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SectionContainer>
      </div>
    </div>
  );
};

export default LogisticPage;
