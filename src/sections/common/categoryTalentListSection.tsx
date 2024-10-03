import SectionCardHeader from "@/components/cards/common/sectionCardHeader";
import SectionContainer from "@/components/cards/common/sectionContainer";
import ProductCard from "@/components/cards/productCard";
import TalentCard, { ITalent } from "@/components/cards/talentCard";
import { generateRandomAlphanumeric } from "@/utils/generateAlphanumeric";
import React from "react";

interface ICategory {
  title: string;
  pageUrl: string;
  api: string;
}

export const talentsData: ITalent[] = [
  {
    id: generateRandomAlphanumeric(),
    name: "John Doe",
    profession: "Snr. Product Manager",
    location: "Abuja, NG",
    verified: false,
    imageUrl:
      "https://res.cloudinary.com/dougwnqok/image/upload/v1727944532/01f6a973b94fc8cb81c553333f57c62d_kteety.png",
    category: "engineering",
    type: ["artisan", "professional"][Math.floor(Math.random() * 4)] as
      | "artisan"
      | "professional",
  },
  {
    id: generateRandomAlphanumeric(),
    name: "John Doe",
    profession: "Snr. Product Manager",
    location: "Abuja, NG",
    verified: false,
    imageUrl:
      "https://res.cloudinary.com/dougwnqok/image/upload/v1727944532/01f6a973b94fc8cb81c553333f57c62d_kteety.png",
    category: "management",
    type: ["artisan", "professional"][Math.floor(Math.random() * 4)] as
      | "artisan"
      | "professional",
  },
  {
    id: generateRandomAlphanumeric(),
    name: "John Doe",
    profession: "Snr. Product Manager",
    location: "Abuja, NG",
    rating: 4.5,
    verified: true,
    imageUrl:
      "https://res.cloudinary.com/dougwnqok/image/upload/v1727944532/01f6a973b94fc8cb81c553333f57c62d_kteety.png",
    category: "architecture",
    type: ["artisan", "professional"][Math.floor(Math.random() * 4)] as
      | "artisan"
      | "professional",
  },
  {
    id: generateRandomAlphanumeric(),
    name: "John Doe",
    profession: "Snr. Product Manager",
    location: "Abuja, NG",
    rating: 4.5,
    verified: true,
    imageUrl:
      "https://res.cloudinary.com/dougwnqok/image/upload/v1727944532/01f6a973b94fc8cb81c553333f57c62d_kteety.png",
    category: "engineering",
    type: ["artisan", "professional"][Math.floor(Math.random() * 4)] as
      | "artisan"
      | "professional",
  },
  {
    id: generateRandomAlphanumeric(),
    name: "John Doe",
    profession: "Snr. Product Manager",
    location: "Abuja, NG",

    verified: false,
    imageUrl:
      "https://res.cloudinary.com/dougwnqok/image/upload/v1727944532/01f6a973b94fc8cb81c553333f57c62d_kteety.png",
    category: "management",
    type: ["artisan", "professional"][Math.floor(Math.random() * 4)] as
      | "artisan"
      | "professional",
  },
  {
    id: generateRandomAlphanumeric(),
    name: "John Doe",
    profession: "Snr. Product Manager",
    location: "Abuja, NG",
    rating: 4.5,
    verified: true,
    imageUrl:
      "https://res.cloudinary.com/dougwnqok/image/upload/v1727944532/01f6a973b94fc8cb81c553333f57c62d_kteety.png",
    category: "architecture",
    type: ["artisan", "professional"][Math.floor(Math.random() * 4)] as
      | "artisan"
      | "professional",
  },
  {
    id: generateRandomAlphanumeric(),
    name: "John Doe",
    profession: "Snr. Product Manager",
    location: "Abuja, NG",
    rating: 4.5,
    verified: false,
    imageUrl:
      "https://res.cloudinary.com/dougwnqok/image/upload/v1727944532/01f6a973b94fc8cb81c553333f57c62d_kteety.png",
    category: "engineering",
    type: ["artisan", "professional"][Math.floor(Math.random() * 4)] as
      | "artisan"
      | "professional",
  },
  {
    id: generateRandomAlphanumeric(),
    name: "John Doe",
    profession: "Snr. Product Manager",
    location: "Abuja, NG",
    rating: 4.5,
    verified: false,
    imageUrl:
      "https://res.cloudinary.com/dougwnqok/image/upload/v1727944532/01f6a973b94fc8cb81c553333f57c62d_kteety.png",
    category: "management",
    type: ["artisan", "professional"][Math.floor(Math.random() * 4)] as
      | "artisan"
      | "professional",
  },
  {
    id: generateRandomAlphanumeric(),
    name: "John Doe",
    profession: "Snr. Product Manager",
    location: "Abuja, NG",
    rating: 4.5,
    verified: true,
    imageUrl:
      "https://res.cloudinary.com/dougwnqok/image/upload/v1727944532/01f6a973b94fc8cb81c553333f57c62d_kteety.png",
    category: "architecture",
    type: ["artisan", "professional"][Math.floor(Math.random() * 4)] as
      | "artisan"
      | "professional",
  },
  {
    id: generateRandomAlphanumeric(),
    name: "John Doe",
    profession: "Snr. Product Manager",
    location: "Abuja, NG",
    rating: 4.5,
    verified: true,
    imageUrl:
      "https://res.cloudinary.com/dougwnqok/image/upload/v1727944532/01f6a973b94fc8cb81c553333f57c62d_kteety.png",
    category: "engineering",
    type: ["artisan", "professional"][Math.floor(Math.random() * 4)] as
      | "artisan"
      | "professional",
  },
  {
    id: generateRandomAlphanumeric(),
    name: "John Doe",
    profession: "Snr. Product Manager",
    location: "Abuja, NG",
    rating: 4.5,
    verified: true,
    imageUrl:
      "https://res.cloudinary.com/dougwnqok/image/upload/v1727944532/01f6a973b94fc8cb81c553333f57c62d_kteety.png",
    category: "management",
    type: ["artisan", "professional"][Math.floor(Math.random() * 4)] as
      | "artisan"
      | "professional",
  },
  {
    id: generateRandomAlphanumeric(),
    name: "John Doe",
    profession: "Snr. Product Manager",
    location: "Abuja, NG",
    rating: 4.5,
    verified: true,
    imageUrl:
      "https://res.cloudinary.com/dougwnqok/image/upload/v1727944532/01f6a973b94fc8cb81c553333f57c62d_kteety.png",
    category: "architecture",
    type: ["artisan", "professional"][Math.floor(Math.random() * 4)] as
      | "artisan"
      | "professional",
  },
  {
    id: generateRandomAlphanumeric(),
    name: "John Doe",
    profession: "Snr. Product Manager",
    location: "Abuja, NG",
    rating: 4.5,
    verified: false,
    imageUrl:
      "https://res.cloudinary.com/dougwnqok/image/upload/v1727944532/01f6a973b94fc8cb81c553333f57c62d_kteety.png",
    category: "engineering",
    type: ["artisan", "professional"][Math.floor(Math.random() * 4)] as
      | "artisan"
      | "professional",
  },
  {
    id: generateRandomAlphanumeric(),
    name: "John Doe",
    profession: "Snr. Product Manager",
    location: "Abuja, NG",
    rating: 4.5,
    verified: false,
    imageUrl:
      "https://res.cloudinary.com/dougwnqok/image/upload/v1727944532/01f6a973b94fc8cb81c553333f57c62d_kteety.png",
    category: "management",
    type: ["artisan", "professional"][Math.floor(Math.random() * 4)] as
      | "artisan"
      | "professional",
  },
  {
    id: generateRandomAlphanumeric(),
    name: "John Doe",
    profession: "Snr. Product Manager",
    location: "Abuja, NG",
    rating: 4.5,
    verified: true,
    imageUrl:
      "https://res.cloudinary.com/dougwnqok/image/upload/v1727944532/01f6a973b94fc8cb81c553333f57c62d_kteety.png",
    category: "architecture",
    type: ["artisan", "professional"][Math.floor(Math.random() * 4)] as
      | "artisan"
      | "professional",
  },
  {
    id: generateRandomAlphanumeric(),
    name: "John Doe",
    profession: "Snr. Product Manager",
    location: "Abuja, NG",
    rating: 4.5,
    verified: false,
    imageUrl:
      "https://res.cloudinary.com/dougwnqok/image/upload/v1727944532/01f6a973b94fc8cb81c553333f57c62d_kteety.png",
    category: "engineering",
    type: ["artisan", "professional"][Math.floor(Math.random() * 4)] as
      | "artisan"
      | "professional",
  },
  {
    id: generateRandomAlphanumeric(),
    name: "John Doe",
    profession: "Snr. Product Manager",
    location: "Abuja, NG",
    rating: 4.5,
    verified: false,
    imageUrl:
      "https://res.cloudinary.com/dougwnqok/image/upload/v1727944532/01f6a973b94fc8cb81c553333f57c62d_kteety.png",
    category: "management",
    type: ["artisan", "professional"][Math.floor(Math.random() * 4)] as
      | "artisan"
      | "professional",
  },
  {
    id: generateRandomAlphanumeric(),
    name: "John Doe",
    profession: "Snr. Product Manager",
    location: "Abuja, NG",
    rating: 4.5,
    verified: true,
    imageUrl:
      "https://res.cloudinary.com/dougwnqok/image/upload/v1727944532/01f6a973b94fc8cb81c553333f57c62d_kteety.png",
    category: "architecture",
    type: ["artisan", "professional"][Math.floor(Math.random() * 4)] as
      | "artisan"
      | "professional",
  },
];

const CategoryTalentListSection = ({ title, pageUrl, api }: ICategory) => {
  return (
    <SectionContainer>
      <SectionCardHeader title={title} linkUrl={pageUrl} linkText="See more" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 mt-5 gap-4">
        {talentsData
          .filter(
            (talent) => talent.category.toLowerCase() == title.toLowerCase()
          )
          .map((talent, index) => (
            <div className="flex-none" key={index}>
              <TalentCard talent={talent} />
            </div>
          ))}
      </div>
    </SectionContainer>
  );
};

export default CategoryTalentListSection;
