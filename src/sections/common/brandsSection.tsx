import Image from "next/image";
import React from "react";

// You can replace these URLs with actual brand images if you have them.
const brandImages = {
  mcDonalds: "/images/mcDonaldsLogo.png",
  burgerKing: "/images/mcDonaldsLogo.png",
  wendys: "/images/mcDonaldsLogo.png",
  kfc: "/images/mcDonaldsLogo.png",
  tacoBell: "/images/mcDonaldsLogo.png",
  subway: "/images/mcDonaldsLogo.png",
  pizzaHut: "/images/mcDonaldsLogo.png",
  dominos: "/images/mcDonaldsLogo.png",
  chipotle: "/images/mcDonaldsLogo.png",
  arbys: "/images/mcDonaldsLogo.png",
};

const brands = [
  { name: "McDonald's", image: brandImages.mcDonalds },
  { name: "Burger King", image: brandImages.burgerKing },
  { name: "Wendy's", image: brandImages.wendys },
  { name: "KFC", image: brandImages.kfc },
  { name: "Taco Bell", image: brandImages.tacoBell },
  { name: "Subway", image: brandImages.subway },
  { name: "Pizza Hut", image: brandImages.pizzaHut },
  { name: "Domino's", image: brandImages.dominos },
  { name: "Chipotle", image: brandImages.chipotle },
  { name: "Arby's", image: brandImages.arbys },
];

const BrandsSection = () => {
  return (
    <div className="bg-gray-100 rounded-lg px-3 py-5">
      <h3 className="text-3xl mb-7 font-bold text-black">Brands</h3>
      <div className=" flex flex-wrap ">
        {brands.map((brand, index) => (
          <div key={index} className="flex items-center mb-5">
            <Image
              alt={`${brand.name} logo`}
              src={brand.image}
              width={200} // Adjust width as needed
              height={50} // Adjust height as needed
              className="rounded-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandsSection;
