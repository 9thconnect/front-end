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

const talents: ITalent[] = [
  {
    id: generateRandomAlphanumeric(),
    name: "John Doe",
    profession: "Snr. Product Manager",
    location: "Abuja, NG",
    verified: false,
    imageUrl:
      "https://s3-alpha-sig.figma.com/img/d2ba/bb85/01f6a973b94fc8cb81c553333f57c62d?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Ev-npqsA3hTpSLMXODdvcRcj4cGJ9wBONdqvzD53zHYT1oiuMTxyiQI0xYHabJHICt7VQy6HIZao-Um7rJE3kGJXfKKq8lVz4oYCk4jARZc10FkOT6CCCjfwII1WEfpQ9Lg7iHWzZ-C5hE9FiSHJOXBDuU1sGmAHDgJGV9-3VWAGAjKsEu5UFjqRHjNmhQY1BgGryaPm0BDDH5B7lyeAGMYiCfOLGWulf~TjDcTK~JGNCa3~XYm9y3rX11XEUrNMeorHoKfgjjwohqmI2xFk69vmIZCm6UjVfWWzE5IBhQ7L4ZCBaLfAr6A7S0Qkp4AEPa2D51Wn8rGZdk982SeBkQ__",
    category: "engineering",
  },
  {
    id: generateRandomAlphanumeric(),
    name: "John Doe",
    profession: "Snr. Product Manager",
    location: "Abuja, NG",
    verified: false,
    imageUrl:
      "https://s3-alpha-sig.figma.com/img/d2ba/bb85/01f6a973b94fc8cb81c553333f57c62d?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Ev-npqsA3hTpSLMXODdvcRcj4cGJ9wBONdqvzD53zHYT1oiuMTxyiQI0xYHabJHICt7VQy6HIZao-Um7rJE3kGJXfKKq8lVz4oYCk4jARZc10FkOT6CCCjfwII1WEfpQ9Lg7iHWzZ-C5hE9FiSHJOXBDuU1sGmAHDgJGV9-3VWAGAjKsEu5UFjqRHjNmhQY1BgGryaPm0BDDH5B7lyeAGMYiCfOLGWulf~TjDcTK~JGNCa3~XYm9y3rX11XEUrNMeorHoKfgjjwohqmI2xFk69vmIZCm6UjVfWWzE5IBhQ7L4ZCBaLfAr6A7S0Qkp4AEPa2D51Wn8rGZdk982SeBkQ__",
    category: "management",
  },
  {
    id: generateRandomAlphanumeric(),
    name: "John Doe",
    profession: "Snr. Product Manager",
    location: "Abuja, NG",
    rating: 4.5,
    verified: true,
    imageUrl:
      "https://s3-alpha-sig.figma.com/img/d2ba/bb85/01f6a973b94fc8cb81c553333f57c62d?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Ev-npqsA3hTpSLMXODdvcRcj4cGJ9wBONdqvzD53zHYT1oiuMTxyiQI0xYHabJHICt7VQy6HIZao-Um7rJE3kGJXfKKq8lVz4oYCk4jARZc10FkOT6CCCjfwII1WEfpQ9Lg7iHWzZ-C5hE9FiSHJOXBDuU1sGmAHDgJGV9-3VWAGAjKsEu5UFjqRHjNmhQY1BgGryaPm0BDDH5B7lyeAGMYiCfOLGWulf~TjDcTK~JGNCa3~XYm9y3rX11XEUrNMeorHoKfgjjwohqmI2xFk69vmIZCm6UjVfWWzE5IBhQ7L4ZCBaLfAr6A7S0Qkp4AEPa2D51Wn8rGZdk982SeBkQ__",
    category: "architecture",
  },
  {
    id: generateRandomAlphanumeric(),
    name: "John Doe",
    profession: "Snr. Product Manager",
    location: "Abuja, NG",
    rating: 4.5,
    verified: true,
    imageUrl:
      "https://s3-alpha-sig.figma.com/img/d2ba/bb85/01f6a973b94fc8cb81c553333f57c62d?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Ev-npqsA3hTpSLMXODdvcRcj4cGJ9wBONdqvzD53zHYT1oiuMTxyiQI0xYHabJHICt7VQy6HIZao-Um7rJE3kGJXfKKq8lVz4oYCk4jARZc10FkOT6CCCjfwII1WEfpQ9Lg7iHWzZ-C5hE9FiSHJOXBDuU1sGmAHDgJGV9-3VWAGAjKsEu5UFjqRHjNmhQY1BgGryaPm0BDDH5B7lyeAGMYiCfOLGWulf~TjDcTK~JGNCa3~XYm9y3rX11XEUrNMeorHoKfgjjwohqmI2xFk69vmIZCm6UjVfWWzE5IBhQ7L4ZCBaLfAr6A7S0Qkp4AEPa2D51Wn8rGZdk982SeBkQ__",
    category: "engineering",
  },
  {
    id: generateRandomAlphanumeric(),
    name: "John Doe",
    profession: "Snr. Product Manager",
    location: "Abuja, NG",

    verified: false,
    imageUrl:
      "https://s3-alpha-sig.figma.com/img/d2ba/bb85/01f6a973b94fc8cb81c553333f57c62d?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Ev-npqsA3hTpSLMXODdvcRcj4cGJ9wBONdqvzD53zHYT1oiuMTxyiQI0xYHabJHICt7VQy6HIZao-Um7rJE3kGJXfKKq8lVz4oYCk4jARZc10FkOT6CCCjfwII1WEfpQ9Lg7iHWzZ-C5hE9FiSHJOXBDuU1sGmAHDgJGV9-3VWAGAjKsEu5UFjqRHjNmhQY1BgGryaPm0BDDH5B7lyeAGMYiCfOLGWulf~TjDcTK~JGNCa3~XYm9y3rX11XEUrNMeorHoKfgjjwohqmI2xFk69vmIZCm6UjVfWWzE5IBhQ7L4ZCBaLfAr6A7S0Qkp4AEPa2D51Wn8rGZdk982SeBkQ__",
    category: "management",
  },
  {
    id: generateRandomAlphanumeric(),
    name: "John Doe",
    profession: "Snr. Product Manager",
    location: "Abuja, NG",
    rating: 4.5,
    verified: true,
    imageUrl:
      "https://s3-alpha-sig.figma.com/img/d2ba/bb85/01f6a973b94fc8cb81c553333f57c62d?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Ev-npqsA3hTpSLMXODdvcRcj4cGJ9wBONdqvzD53zHYT1oiuMTxyiQI0xYHabJHICt7VQy6HIZao-Um7rJE3kGJXfKKq8lVz4oYCk4jARZc10FkOT6CCCjfwII1WEfpQ9Lg7iHWzZ-C5hE9FiSHJOXBDuU1sGmAHDgJGV9-3VWAGAjKsEu5UFjqRHjNmhQY1BgGryaPm0BDDH5B7lyeAGMYiCfOLGWulf~TjDcTK~JGNCa3~XYm9y3rX11XEUrNMeorHoKfgjjwohqmI2xFk69vmIZCm6UjVfWWzE5IBhQ7L4ZCBaLfAr6A7S0Qkp4AEPa2D51Wn8rGZdk982SeBkQ__",
    category: "architecture",
  },
  {
    id: generateRandomAlphanumeric(),
    name: "John Doe",
    profession: "Snr. Product Manager",
    location: "Abuja, NG",
    rating: 4.5,
    verified: false,
    imageUrl:
      "https://s3-alpha-sig.figma.com/img/d2ba/bb85/01f6a973b94fc8cb81c553333f57c62d?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Ev-npqsA3hTpSLMXODdvcRcj4cGJ9wBONdqvzD53zHYT1oiuMTxyiQI0xYHabJHICt7VQy6HIZao-Um7rJE3kGJXfKKq8lVz4oYCk4jARZc10FkOT6CCCjfwII1WEfpQ9Lg7iHWzZ-C5hE9FiSHJOXBDuU1sGmAHDgJGV9-3VWAGAjKsEu5UFjqRHjNmhQY1BgGryaPm0BDDH5B7lyeAGMYiCfOLGWulf~TjDcTK~JGNCa3~XYm9y3rX11XEUrNMeorHoKfgjjwohqmI2xFk69vmIZCm6UjVfWWzE5IBhQ7L4ZCBaLfAr6A7S0Qkp4AEPa2D51Wn8rGZdk982SeBkQ__",
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
      "https://s3-alpha-sig.figma.com/img/d2ba/bb85/01f6a973b94fc8cb81c553333f57c62d?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Ev-npqsA3hTpSLMXODdvcRcj4cGJ9wBONdqvzD53zHYT1oiuMTxyiQI0xYHabJHICt7VQy6HIZao-Um7rJE3kGJXfKKq8lVz4oYCk4jARZc10FkOT6CCCjfwII1WEfpQ9Lg7iHWzZ-C5hE9FiSHJOXBDuU1sGmAHDgJGV9-3VWAGAjKsEu5UFjqRHjNmhQY1BgGryaPm0BDDH5B7lyeAGMYiCfOLGWulf~TjDcTK~JGNCa3~XYm9y3rX11XEUrNMeorHoKfgjjwohqmI2xFk69vmIZCm6UjVfWWzE5IBhQ7L4ZCBaLfAr6A7S0Qkp4AEPa2D51Wn8rGZdk982SeBkQ__",
    category: "management",
  },
  {
    id: generateRandomAlphanumeric(),
    name: "John Doe",
    profession: "Snr. Product Manager",
    location: "Abuja, NG",
    rating: 4.5,
    verified: true,
    imageUrl:
      "https://s3-alpha-sig.figma.com/img/d2ba/bb85/01f6a973b94fc8cb81c553333f57c62d?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Ev-npqsA3hTpSLMXODdvcRcj4cGJ9wBONdqvzD53zHYT1oiuMTxyiQI0xYHabJHICt7VQy6HIZao-Um7rJE3kGJXfKKq8lVz4oYCk4jARZc10FkOT6CCCjfwII1WEfpQ9Lg7iHWzZ-C5hE9FiSHJOXBDuU1sGmAHDgJGV9-3VWAGAjKsEu5UFjqRHjNmhQY1BgGryaPm0BDDH5B7lyeAGMYiCfOLGWulf~TjDcTK~JGNCa3~XYm9y3rX11XEUrNMeorHoKfgjjwohqmI2xFk69vmIZCm6UjVfWWzE5IBhQ7L4ZCBaLfAr6A7S0Qkp4AEPa2D51Wn8rGZdk982SeBkQ__",
    category: "architecture",
  },
  {
    id: generateRandomAlphanumeric(),
    name: "John Doe",
    profession: "Snr. Product Manager",
    location: "Abuja, NG",
    rating: 4.5,
    verified: true,
    imageUrl:
      "https://s3-alpha-sig.figma.com/img/d2ba/bb85/01f6a973b94fc8cb81c553333f57c62d?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Ev-npqsA3hTpSLMXODdvcRcj4cGJ9wBONdqvzD53zHYT1oiuMTxyiQI0xYHabJHICt7VQy6HIZao-Um7rJE3kGJXfKKq8lVz4oYCk4jARZc10FkOT6CCCjfwII1WEfpQ9Lg7iHWzZ-C5hE9FiSHJOXBDuU1sGmAHDgJGV9-3VWAGAjKsEu5UFjqRHjNmhQY1BgGryaPm0BDDH5B7lyeAGMYiCfOLGWulf~TjDcTK~JGNCa3~XYm9y3rX11XEUrNMeorHoKfgjjwohqmI2xFk69vmIZCm6UjVfWWzE5IBhQ7L4ZCBaLfAr6A7S0Qkp4AEPa2D51Wn8rGZdk982SeBkQ__",
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
      "https://s3-alpha-sig.figma.com/img/d2ba/bb85/01f6a973b94fc8cb81c553333f57c62d?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Ev-npqsA3hTpSLMXODdvcRcj4cGJ9wBONdqvzD53zHYT1oiuMTxyiQI0xYHabJHICt7VQy6HIZao-Um7rJE3kGJXfKKq8lVz4oYCk4jARZc10FkOT6CCCjfwII1WEfpQ9Lg7iHWzZ-C5hE9FiSHJOXBDuU1sGmAHDgJGV9-3VWAGAjKsEu5UFjqRHjNmhQY1BgGryaPm0BDDH5B7lyeAGMYiCfOLGWulf~TjDcTK~JGNCa3~XYm9y3rX11XEUrNMeorHoKfgjjwohqmI2xFk69vmIZCm6UjVfWWzE5IBhQ7L4ZCBaLfAr6A7S0Qkp4AEPa2D51Wn8rGZdk982SeBkQ__",
    category: "management",
  },
  {
    id: generateRandomAlphanumeric(),
    name: "John Doe",
    profession: "Snr. Product Manager",
    location: "Abuja, NG",
    rating: 4.5,
    verified: true,
    imageUrl:
      "https://s3-alpha-sig.figma.com/img/d2ba/bb85/01f6a973b94fc8cb81c553333f57c62d?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Ev-npqsA3hTpSLMXODdvcRcj4cGJ9wBONdqvzD53zHYT1oiuMTxyiQI0xYHabJHICt7VQy6HIZao-Um7rJE3kGJXfKKq8lVz4oYCk4jARZc10FkOT6CCCjfwII1WEfpQ9Lg7iHWzZ-C5hE9FiSHJOXBDuU1sGmAHDgJGV9-3VWAGAjKsEu5UFjqRHjNmhQY1BgGryaPm0BDDH5B7lyeAGMYiCfOLGWulf~TjDcTK~JGNCa3~XYm9y3rX11XEUrNMeorHoKfgjjwohqmI2xFk69vmIZCm6UjVfWWzE5IBhQ7L4ZCBaLfAr6A7S0Qkp4AEPa2D51Wn8rGZdk982SeBkQ__",
    category: "architecture",
  },
  {
    id: generateRandomAlphanumeric(),
    name: "John Doe",
    profession: "Snr. Product Manager",
    location: "Abuja, NG",
    rating: 4.5,
    verified: false,
    imageUrl:
      "https://s3-alpha-sig.figma.com/img/d2ba/bb85/01f6a973b94fc8cb81c553333f57c62d?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Ev-npqsA3hTpSLMXODdvcRcj4cGJ9wBONdqvzD53zHYT1oiuMTxyiQI0xYHabJHICt7VQy6HIZao-Um7rJE3kGJXfKKq8lVz4oYCk4jARZc10FkOT6CCCjfwII1WEfpQ9Lg7iHWzZ-C5hE9FiSHJOXBDuU1sGmAHDgJGV9-3VWAGAjKsEu5UFjqRHjNmhQY1BgGryaPm0BDDH5B7lyeAGMYiCfOLGWulf~TjDcTK~JGNCa3~XYm9y3rX11XEUrNMeorHoKfgjjwohqmI2xFk69vmIZCm6UjVfWWzE5IBhQ7L4ZCBaLfAr6A7S0Qkp4AEPa2D51Wn8rGZdk982SeBkQ__",
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
      "https://s3-alpha-sig.figma.com/img/d2ba/bb85/01f6a973b94fc8cb81c553333f57c62d?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Ev-npqsA3hTpSLMXODdvcRcj4cGJ9wBONdqvzD53zHYT1oiuMTxyiQI0xYHabJHICt7VQy6HIZao-Um7rJE3kGJXfKKq8lVz4oYCk4jARZc10FkOT6CCCjfwII1WEfpQ9Lg7iHWzZ-C5hE9FiSHJOXBDuU1sGmAHDgJGV9-3VWAGAjKsEu5UFjqRHjNmhQY1BgGryaPm0BDDH5B7lyeAGMYiCfOLGWulf~TjDcTK~JGNCa3~XYm9y3rX11XEUrNMeorHoKfgjjwohqmI2xFk69vmIZCm6UjVfWWzE5IBhQ7L4ZCBaLfAr6A7S0Qkp4AEPa2D51Wn8rGZdk982SeBkQ__",
    category: "management",
  },
  {
    id: generateRandomAlphanumeric(),
    name: "John Doe",
    profession: "Snr. Product Manager",
    location: "Abuja, NG",
    rating: 4.5,
    verified: true,
    imageUrl:
      "https://s3-alpha-sig.figma.com/img/d2ba/bb85/01f6a973b94fc8cb81c553333f57c62d?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Ev-npqsA3hTpSLMXODdvcRcj4cGJ9wBONdqvzD53zHYT1oiuMTxyiQI0xYHabJHICt7VQy6HIZao-Um7rJE3kGJXfKKq8lVz4oYCk4jARZc10FkOT6CCCjfwII1WEfpQ9Lg7iHWzZ-C5hE9FiSHJOXBDuU1sGmAHDgJGV9-3VWAGAjKsEu5UFjqRHjNmhQY1BgGryaPm0BDDH5B7lyeAGMYiCfOLGWulf~TjDcTK~JGNCa3~XYm9y3rX11XEUrNMeorHoKfgjjwohqmI2xFk69vmIZCm6UjVfWWzE5IBhQ7L4ZCBaLfAr6A7S0Qkp4AEPa2D51Wn8rGZdk982SeBkQ__",
    category: "architecture",
  },
  {
    id: generateRandomAlphanumeric(),
    name: "John Doe",
    profession: "Snr. Product Manager",
    location: "Abuja, NG",
    rating: 4.5,
    verified: false,
    imageUrl:
      "https://s3-alpha-sig.figma.com/img/d2ba/bb85/01f6a973b94fc8cb81c553333f57c62d?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Ev-npqsA3hTpSLMXODdvcRcj4cGJ9wBONdqvzD53zHYT1oiuMTxyiQI0xYHabJHICt7VQy6HIZao-Um7rJE3kGJXfKKq8lVz4oYCk4jARZc10FkOT6CCCjfwII1WEfpQ9Lg7iHWzZ-C5hE9FiSHJOXBDuU1sGmAHDgJGV9-3VWAGAjKsEu5UFjqRHjNmhQY1BgGryaPm0BDDH5B7lyeAGMYiCfOLGWulf~TjDcTK~JGNCa3~XYm9y3rX11XEUrNMeorHoKfgjjwohqmI2xFk69vmIZCm6UjVfWWzE5IBhQ7L4ZCBaLfAr6A7S0Qkp4AEPa2D51Wn8rGZdk982SeBkQ__",
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
      "https://s3-alpha-sig.figma.com/img/d2ba/bb85/01f6a973b94fc8cb81c553333f57c62d?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Ev-npqsA3hTpSLMXODdvcRcj4cGJ9wBONdqvzD53zHYT1oiuMTxyiQI0xYHabJHICt7VQy6HIZao-Um7rJE3kGJXfKKq8lVz4oYCk4jARZc10FkOT6CCCjfwII1WEfpQ9Lg7iHWzZ-C5hE9FiSHJOXBDuU1sGmAHDgJGV9-3VWAGAjKsEu5UFjqRHjNmhQY1BgGryaPm0BDDH5B7lyeAGMYiCfOLGWulf~TjDcTK~JGNCa3~XYm9y3rX11XEUrNMeorHoKfgjjwohqmI2xFk69vmIZCm6UjVfWWzE5IBhQ7L4ZCBaLfAr6A7S0Qkp4AEPa2D51Wn8rGZdk982SeBkQ__",
    category: "management",
  },
  {
    id: generateRandomAlphanumeric(),
    name: "John Doe",
    profession: "Snr. Product Manager",
    location: "Abuja, NG",
    rating: 4.5,
    verified: true,
    imageUrl:
      "https://s3-alpha-sig.figma.com/img/d2ba/bb85/01f6a973b94fc8cb81c553333f57c62d?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Ev-npqsA3hTpSLMXODdvcRcj4cGJ9wBONdqvzD53zHYT1oiuMTxyiQI0xYHabJHICt7VQy6HIZao-Um7rJE3kGJXfKKq8lVz4oYCk4jARZc10FkOT6CCCjfwII1WEfpQ9Lg7iHWzZ-C5hE9FiSHJOXBDuU1sGmAHDgJGV9-3VWAGAjKsEu5UFjqRHjNmhQY1BgGryaPm0BDDH5B7lyeAGMYiCfOLGWulf~TjDcTK~JGNCa3~XYm9y3rX11XEUrNMeorHoKfgjjwohqmI2xFk69vmIZCm6UjVfWWzE5IBhQ7L4ZCBaLfAr6A7S0Qkp4AEPa2D51Wn8rGZdk982SeBkQ__",
    category: "architecture",
  },
];

const CategoryTalentListSection = ({ title, pageUrl, api }: ICategory) => {
  return (
    <SectionContainer>
      <SectionCardHeader title={title} linkUrl={pageUrl} linkText="See more" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 mt-5 gap-4">
        {talents
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
