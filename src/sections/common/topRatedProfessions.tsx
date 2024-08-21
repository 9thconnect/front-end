import TalentCard, { ITalent } from "@/components/cards/talentCard";
import ScrollableContainer from "@/components/common/scrollableContainer";
import { generateRandomAlphanumeric } from "@/utils/generateAlphanumeric";
import React from "react";

const talents: ITalent[] = [
  {
    id: generateRandomAlphanumeric(),
    name: "John Doe",
    profession: "Snr. Product Manager",
    location: "Abuja, NG",
    rating: 4.5,
    verified: false,
    imageUrl:
      "https://s3-alpha-sig.figma.com/img/736e/be9f/054e73cc3e442dbbdb11fcfc11d2983e?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=c413kUGeB6LcBoawz~zZ~RUsvOFWh7tOsuY2oEiO6Prtmi9e9rHx7W2NY1pZgrrxMcSWpfw-uvn3dIDe7~AEGIyPchFBVgOdMoCzkSWBAZvGzPa~hXyeFeuwXgNKi8TjMRB~r5tCTu0ky8GAspAHUhxD3JulIt11aVOdp2TbSI39epqJMBpWO55wW9wPDTPEnpGBGvl3tBIG5sBpreX6q4ibhHgMd2lM1mmlm8z1iWCs0v3PVWdeVDUVvM~tw807v8yC1KM44YnfD2MJdy~WON-EJYBsbaO9lnNfEYT6c7gc2XULToJpfgPGV9dYBAFBlTU5zx0OAqV3WLR4QqTkIw__",
    category: "engineering",
  },
  {
    id: generateRandomAlphanumeric(),
    name: "John Doe",
    profession: "Snr. Product Manager",
    location: "Abuja, NG",
    rating: 4.5,
    verified: false,
    imageUrl:
      "https://s3-alpha-sig.figma.com/img/736e/be9f/054e73cc3e442dbbdb11fcfc11d2983e?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=c413kUGeB6LcBoawz~zZ~RUsvOFWh7tOsuY2oEiO6Prtmi9e9rHx7W2NY1pZgrrxMcSWpfw-uvn3dIDe7~AEGIyPchFBVgOdMoCzkSWBAZvGzPa~hXyeFeuwXgNKi8TjMRB~r5tCTu0ky8GAspAHUhxD3JulIt11aVOdp2TbSI39epqJMBpWO55wW9wPDTPEnpGBGvl3tBIG5sBpreX6q4ibhHgMd2lM1mmlm8z1iWCs0v3PVWdeVDUVvM~tw807v8yC1KM44YnfD2MJdy~WON-EJYBsbaO9lnNfEYT6c7gc2XULToJpfgPGV9dYBAFBlTU5zx0OAqV3WLR4QqTkIw__",

    category: "engineering",
  },
  {
    id: generateRandomAlphanumeric(),
    name: "John Doe",
    profession: "Snr. Product Manager",
    location: "Abuja, NG",
    rating: 4.5,
    verified: true,
    imageUrl:
      "https://s3-alpha-sig.figma.com/img/736e/be9f/054e73cc3e442dbbdb11fcfc11d2983e?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=c413kUGeB6LcBoawz~zZ~RUsvOFWh7tOsuY2oEiO6Prtmi9e9rHx7W2NY1pZgrrxMcSWpfw-uvn3dIDe7~AEGIyPchFBVgOdMoCzkSWBAZvGzPa~hXyeFeuwXgNKi8TjMRB~r5tCTu0ky8GAspAHUhxD3JulIt11aVOdp2TbSI39epqJMBpWO55wW9wPDTPEnpGBGvl3tBIG5sBpreX6q4ibhHgMd2lM1mmlm8z1iWCs0v3PVWdeVDUVvM~tw807v8yC1KM44YnfD2MJdy~WON-EJYBsbaO9lnNfEYT6c7gc2XULToJpfgPGV9dYBAFBlTU5zx0OAqV3WLR4QqTkIw__",
    category: "engineering",
  },
  {
    id: generateRandomAlphanumeric(),
    name: "John Doe",
    profession: "Snr. Product Manager",
    location: "Abuja, NG",
    rating: 4.5,
    verified: false,
    imageUrl:
      "https://s3-alpha-sig.figma.com/img/736e/be9f/054e73cc3e442dbbdb11fcfc11d2983e?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=c413kUGeB6LcBoawz~zZ~RUsvOFWh7tOsuY2oEiO6Prtmi9e9rHx7W2NY1pZgrrxMcSWpfw-uvn3dIDe7~AEGIyPchFBVgOdMoCzkSWBAZvGzPa~hXyeFeuwXgNKi8TjMRB~r5tCTu0ky8GAspAHUhxD3JulIt11aVOdp2TbSI39epqJMBpWO55wW9wPDTPEnpGBGvl3tBIG5sBpreX6q4ibhHgMd2lM1mmlm8z1iWCs0v3PVWdeVDUVvM~tw807v8yC1KM44YnfD2MJdy~WON-EJYBsbaO9lnNfEYT6c7gc2XULToJpfgPGV9dYBAFBlTU5zx0OAqV3WLR4QqTkIw__",
    category: "engineering",
  },
  {
    id: generateRandomAlphanumeric(),
    name: "John Doe",
    profession: "Snr. Product Manager",
    location: "Abuja, NG",
    rating: 4.5,
    verified: false,
    imageUrl:
      "https://s3-alpha-sig.figma.com/img/736e/be9f/054e73cc3e442dbbdb11fcfc11d2983e?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=c413kUGeB6LcBoawz~zZ~RUsvOFWh7tOsuY2oEiO6Prtmi9e9rHx7W2NY1pZgrrxMcSWpfw-uvn3dIDe7~AEGIyPchFBVgOdMoCzkSWBAZvGzPa~hXyeFeuwXgNKi8TjMRB~r5tCTu0ky8GAspAHUhxD3JulIt11aVOdp2TbSI39epqJMBpWO55wW9wPDTPEnpGBGvl3tBIG5sBpreX6q4ibhHgMd2lM1mmlm8z1iWCs0v3PVWdeVDUVvM~tw807v8yC1KM44YnfD2MJdy~WON-EJYBsbaO9lnNfEYT6c7gc2XULToJpfgPGV9dYBAFBlTU5zx0OAqV3WLR4QqTkIw__",
    category: "engineering",
  },
  {
    id: generateRandomAlphanumeric(),
    name: "John Doe",
    profession: "Snr. Product Manager",
    location: "Abuja, NG",
    rating: 4.5,
    verified: true,
    imageUrl:
      "https://s3-alpha-sig.figma.com/img/736e/be9f/054e73cc3e442dbbdb11fcfc11d2983e?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=c413kUGeB6LcBoawz~zZ~RUsvOFWh7tOsuY2oEiO6Prtmi9e9rHx7W2NY1pZgrrxMcSWpfw-uvn3dIDe7~AEGIyPchFBVgOdMoCzkSWBAZvGzPa~hXyeFeuwXgNKi8TjMRB~r5tCTu0ky8GAspAHUhxD3JulIt11aVOdp2TbSI39epqJMBpWO55wW9wPDTPEnpGBGvl3tBIG5sBpreX6q4ibhHgMd2lM1mmlm8z1iWCs0v3PVWdeVDUVvM~tw807v8yC1KM44YnfD2MJdy~WON-EJYBsbaO9lnNfEYT6c7gc2XULToJpfgPGV9dYBAFBlTU5zx0OAqV3WLR4QqTkIw__",
    category: "engineering",
  },
];
const TopRatedProfessions = () => {
  return (
    <ScrollableContainer>
      <div className="flex space-x-4 cursor-pointer">
        {talents.map((talent, index) => (
          <div className="w-80 flex-none self-stretch" key={index}>
            <TalentCard talent={talent} />
          </div>
        ))}
      </div>
    </ScrollableContainer>
  );
};

export default TopRatedProfessions;
