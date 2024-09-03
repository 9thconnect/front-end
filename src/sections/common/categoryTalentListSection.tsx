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
      "https://s3-alpha-sig.figma.com/img/d2ba/bb85/01f6a973b94fc8cb81c553333f57c62d?Expires=1726444800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ZlOotb8Vj6QrSiHV6j1gi0yX8~XJDVuo6W78v-ynT0ZtCwxM1XsGjD5pDKwG~1BQuqyT3s2NbBQddFHKtdbWYz328ypYZ6Q~D041fI5U9UOin6pGZl-HiskQ0MeQ8qvWp5cWzHIMf13mSPA1Y2kNIISWd3IgwUOYwrbOhtQuOdx6Wsq0Nb~93YltPnLyjbXGcs6Fc3kyGAd2s2sDWLufVjCRVNbbHoCgrjko4yC~T24JISHJKxLQivq0dowbLwN2lrHaZWwVvuaebLV9MwHfl5wUHfldLE9-KWLq6jy9z7Mf9cj7gYWbaW2CGlL3S2rLuUIjQAl2YMGbeuAY0trvgA__",
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
      "https://s3-alpha-sig.figma.com/img/d2ba/bb85/01f6a973b94fc8cb81c553333f57c62d?Expires=1726444800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ZlOotb8Vj6QrSiHV6j1gi0yX8~XJDVuo6W78v-ynT0ZtCwxM1XsGjD5pDKwG~1BQuqyT3s2NbBQddFHKtdbWYz328ypYZ6Q~D041fI5U9UOin6pGZl-HiskQ0MeQ8qvWp5cWzHIMf13mSPA1Y2kNIISWd3IgwUOYwrbOhtQuOdx6Wsq0Nb~93YltPnLyjbXGcs6Fc3kyGAd2s2sDWLufVjCRVNbbHoCgrjko4yC~T24JISHJKxLQivq0dowbLwN2lrHaZWwVvuaebLV9MwHfl5wUHfldLE9-KWLq6jy9z7Mf9cj7gYWbaW2CGlL3S2rLuUIjQAl2YMGbeuAY0trvgA__",
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
      "https://s3-alpha-sig.figma.com/img/d2ba/bb85/01f6a973b94fc8cb81c553333f57c62d?Expires=1726444800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ZlOotb8Vj6QrSiHV6j1gi0yX8~XJDVuo6W78v-ynT0ZtCwxM1XsGjD5pDKwG~1BQuqyT3s2NbBQddFHKtdbWYz328ypYZ6Q~D041fI5U9UOin6pGZl-HiskQ0MeQ8qvWp5cWzHIMf13mSPA1Y2kNIISWd3IgwUOYwrbOhtQuOdx6Wsq0Nb~93YltPnLyjbXGcs6Fc3kyGAd2s2sDWLufVjCRVNbbHoCgrjko4yC~T24JISHJKxLQivq0dowbLwN2lrHaZWwVvuaebLV9MwHfl5wUHfldLE9-KWLq6jy9z7Mf9cj7gYWbaW2CGlL3S2rLuUIjQAl2YMGbeuAY0trvgA__",
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
      "https://s3-alpha-sig.figma.com/img/d2ba/bb85/01f6a973b94fc8cb81c553333f57c62d?Expires=1726444800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ZlOotb8Vj6QrSiHV6j1gi0yX8~XJDVuo6W78v-ynT0ZtCwxM1XsGjD5pDKwG~1BQuqyT3s2NbBQddFHKtdbWYz328ypYZ6Q~D041fI5U9UOin6pGZl-HiskQ0MeQ8qvWp5cWzHIMf13mSPA1Y2kNIISWd3IgwUOYwrbOhtQuOdx6Wsq0Nb~93YltPnLyjbXGcs6Fc3kyGAd2s2sDWLufVjCRVNbbHoCgrjko4yC~T24JISHJKxLQivq0dowbLwN2lrHaZWwVvuaebLV9MwHfl5wUHfldLE9-KWLq6jy9z7Mf9cj7gYWbaW2CGlL3S2rLuUIjQAl2YMGbeuAY0trvgA__",
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
      "https://s3-alpha-sig.figma.com/img/d2ba/bb85/01f6a973b94fc8cb81c553333f57c62d?Expires=1726444800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ZlOotb8Vj6QrSiHV6j1gi0yX8~XJDVuo6W78v-ynT0ZtCwxM1XsGjD5pDKwG~1BQuqyT3s2NbBQddFHKtdbWYz328ypYZ6Q~D041fI5U9UOin6pGZl-HiskQ0MeQ8qvWp5cWzHIMf13mSPA1Y2kNIISWd3IgwUOYwrbOhtQuOdx6Wsq0Nb~93YltPnLyjbXGcs6Fc3kyGAd2s2sDWLufVjCRVNbbHoCgrjko4yC~T24JISHJKxLQivq0dowbLwN2lrHaZWwVvuaebLV9MwHfl5wUHfldLE9-KWLq6jy9z7Mf9cj7gYWbaW2CGlL3S2rLuUIjQAl2YMGbeuAY0trvgA__",
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
      "https://s3-alpha-sig.figma.com/img/d2ba/bb85/01f6a973b94fc8cb81c553333f57c62d?Expires=1726444800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ZlOotb8Vj6QrSiHV6j1gi0yX8~XJDVuo6W78v-ynT0ZtCwxM1XsGjD5pDKwG~1BQuqyT3s2NbBQddFHKtdbWYz328ypYZ6Q~D041fI5U9UOin6pGZl-HiskQ0MeQ8qvWp5cWzHIMf13mSPA1Y2kNIISWd3IgwUOYwrbOhtQuOdx6Wsq0Nb~93YltPnLyjbXGcs6Fc3kyGAd2s2sDWLufVjCRVNbbHoCgrjko4yC~T24JISHJKxLQivq0dowbLwN2lrHaZWwVvuaebLV9MwHfl5wUHfldLE9-KWLq6jy9z7Mf9cj7gYWbaW2CGlL3S2rLuUIjQAl2YMGbeuAY0trvgA__",
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
      "https://s3-alpha-sig.figma.com/img/d2ba/bb85/01f6a973b94fc8cb81c553333f57c62d?Expires=1726444800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ZlOotb8Vj6QrSiHV6j1gi0yX8~XJDVuo6W78v-ynT0ZtCwxM1XsGjD5pDKwG~1BQuqyT3s2NbBQddFHKtdbWYz328ypYZ6Q~D041fI5U9UOin6pGZl-HiskQ0MeQ8qvWp5cWzHIMf13mSPA1Y2kNIISWd3IgwUOYwrbOhtQuOdx6Wsq0Nb~93YltPnLyjbXGcs6Fc3kyGAd2s2sDWLufVjCRVNbbHoCgrjko4yC~T24JISHJKxLQivq0dowbLwN2lrHaZWwVvuaebLV9MwHfl5wUHfldLE9-KWLq6jy9z7Mf9cj7gYWbaW2CGlL3S2rLuUIjQAl2YMGbeuAY0trvgA__",
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
      "https://s3-alpha-sig.figma.com/img/d2ba/bb85/01f6a973b94fc8cb81c553333f57c62d?Expires=1726444800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ZlOotb8Vj6QrSiHV6j1gi0yX8~XJDVuo6W78v-ynT0ZtCwxM1XsGjD5pDKwG~1BQuqyT3s2NbBQddFHKtdbWYz328ypYZ6Q~D041fI5U9UOin6pGZl-HiskQ0MeQ8qvWp5cWzHIMf13mSPA1Y2kNIISWd3IgwUOYwrbOhtQuOdx6Wsq0Nb~93YltPnLyjbXGcs6Fc3kyGAd2s2sDWLufVjCRVNbbHoCgrjko4yC~T24JISHJKxLQivq0dowbLwN2lrHaZWwVvuaebLV9MwHfl5wUHfldLE9-KWLq6jy9z7Mf9cj7gYWbaW2CGlL3S2rLuUIjQAl2YMGbeuAY0trvgA__",
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
      "https://s3-alpha-sig.figma.com/img/d2ba/bb85/01f6a973b94fc8cb81c553333f57c62d?Expires=1726444800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ZlOotb8Vj6QrSiHV6j1gi0yX8~XJDVuo6W78v-ynT0ZtCwxM1XsGjD5pDKwG~1BQuqyT3s2NbBQddFHKtdbWYz328ypYZ6Q~D041fI5U9UOin6pGZl-HiskQ0MeQ8qvWp5cWzHIMf13mSPA1Y2kNIISWd3IgwUOYwrbOhtQuOdx6Wsq0Nb~93YltPnLyjbXGcs6Fc3kyGAd2s2sDWLufVjCRVNbbHoCgrjko4yC~T24JISHJKxLQivq0dowbLwN2lrHaZWwVvuaebLV9MwHfl5wUHfldLE9-KWLq6jy9z7Mf9cj7gYWbaW2CGlL3S2rLuUIjQAl2YMGbeuAY0trvgA__",
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
      "https://s3-alpha-sig.figma.com/img/d2ba/bb85/01f6a973b94fc8cb81c553333f57c62d?Expires=1726444800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ZlOotb8Vj6QrSiHV6j1gi0yX8~XJDVuo6W78v-ynT0ZtCwxM1XsGjD5pDKwG~1BQuqyT3s2NbBQddFHKtdbWYz328ypYZ6Q~D041fI5U9UOin6pGZl-HiskQ0MeQ8qvWp5cWzHIMf13mSPA1Y2kNIISWd3IgwUOYwrbOhtQuOdx6Wsq0Nb~93YltPnLyjbXGcs6Fc3kyGAd2s2sDWLufVjCRVNbbHoCgrjko4yC~T24JISHJKxLQivq0dowbLwN2lrHaZWwVvuaebLV9MwHfl5wUHfldLE9-KWLq6jy9z7Mf9cj7gYWbaW2CGlL3S2rLuUIjQAl2YMGbeuAY0trvgA__",
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
      "https://s3-alpha-sig.figma.com/img/d2ba/bb85/01f6a973b94fc8cb81c553333f57c62d?Expires=1726444800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ZlOotb8Vj6QrSiHV6j1gi0yX8~XJDVuo6W78v-ynT0ZtCwxM1XsGjD5pDKwG~1BQuqyT3s2NbBQddFHKtdbWYz328ypYZ6Q~D041fI5U9UOin6pGZl-HiskQ0MeQ8qvWp5cWzHIMf13mSPA1Y2kNIISWd3IgwUOYwrbOhtQuOdx6Wsq0Nb~93YltPnLyjbXGcs6Fc3kyGAd2s2sDWLufVjCRVNbbHoCgrjko4yC~T24JISHJKxLQivq0dowbLwN2lrHaZWwVvuaebLV9MwHfl5wUHfldLE9-KWLq6jy9z7Mf9cj7gYWbaW2CGlL3S2rLuUIjQAl2YMGbeuAY0trvgA__",
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
      "https://s3-alpha-sig.figma.com/img/d2ba/bb85/01f6a973b94fc8cb81c553333f57c62d?Expires=1726444800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ZlOotb8Vj6QrSiHV6j1gi0yX8~XJDVuo6W78v-ynT0ZtCwxM1XsGjD5pDKwG~1BQuqyT3s2NbBQddFHKtdbWYz328ypYZ6Q~D041fI5U9UOin6pGZl-HiskQ0MeQ8qvWp5cWzHIMf13mSPA1Y2kNIISWd3IgwUOYwrbOhtQuOdx6Wsq0Nb~93YltPnLyjbXGcs6Fc3kyGAd2s2sDWLufVjCRVNbbHoCgrjko4yC~T24JISHJKxLQivq0dowbLwN2lrHaZWwVvuaebLV9MwHfl5wUHfldLE9-KWLq6jy9z7Mf9cj7gYWbaW2CGlL3S2rLuUIjQAl2YMGbeuAY0trvgA__",
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
      "https://s3-alpha-sig.figma.com/img/d2ba/bb85/01f6a973b94fc8cb81c553333f57c62d?Expires=1726444800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ZlOotb8Vj6QrSiHV6j1gi0yX8~XJDVuo6W78v-ynT0ZtCwxM1XsGjD5pDKwG~1BQuqyT3s2NbBQddFHKtdbWYz328ypYZ6Q~D041fI5U9UOin6pGZl-HiskQ0MeQ8qvWp5cWzHIMf13mSPA1Y2kNIISWd3IgwUOYwrbOhtQuOdx6Wsq0Nb~93YltPnLyjbXGcs6Fc3kyGAd2s2sDWLufVjCRVNbbHoCgrjko4yC~T24JISHJKxLQivq0dowbLwN2lrHaZWwVvuaebLV9MwHfl5wUHfldLE9-KWLq6jy9z7Mf9cj7gYWbaW2CGlL3S2rLuUIjQAl2YMGbeuAY0trvgA__",
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
      "https://s3-alpha-sig.figma.com/img/d2ba/bb85/01f6a973b94fc8cb81c553333f57c62d?Expires=1726444800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ZlOotb8Vj6QrSiHV6j1gi0yX8~XJDVuo6W78v-ynT0ZtCwxM1XsGjD5pDKwG~1BQuqyT3s2NbBQddFHKtdbWYz328ypYZ6Q~D041fI5U9UOin6pGZl-HiskQ0MeQ8qvWp5cWzHIMf13mSPA1Y2kNIISWd3IgwUOYwrbOhtQuOdx6Wsq0Nb~93YltPnLyjbXGcs6Fc3kyGAd2s2sDWLufVjCRVNbbHoCgrjko4yC~T24JISHJKxLQivq0dowbLwN2lrHaZWwVvuaebLV9MwHfl5wUHfldLE9-KWLq6jy9z7Mf9cj7gYWbaW2CGlL3S2rLuUIjQAl2YMGbeuAY0trvgA__",
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
      "https://s3-alpha-sig.figma.com/img/d2ba/bb85/01f6a973b94fc8cb81c553333f57c62d?Expires=1726444800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ZlOotb8Vj6QrSiHV6j1gi0yX8~XJDVuo6W78v-ynT0ZtCwxM1XsGjD5pDKwG~1BQuqyT3s2NbBQddFHKtdbWYz328ypYZ6Q~D041fI5U9UOin6pGZl-HiskQ0MeQ8qvWp5cWzHIMf13mSPA1Y2kNIISWd3IgwUOYwrbOhtQuOdx6Wsq0Nb~93YltPnLyjbXGcs6Fc3kyGAd2s2sDWLufVjCRVNbbHoCgrjko4yC~T24JISHJKxLQivq0dowbLwN2lrHaZWwVvuaebLV9MwHfl5wUHfldLE9-KWLq6jy9z7Mf9cj7gYWbaW2CGlL3S2rLuUIjQAl2YMGbeuAY0trvgA__",
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
      "https://s3-alpha-sig.figma.com/img/d2ba/bb85/01f6a973b94fc8cb81c553333f57c62d?Expires=1726444800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ZlOotb8Vj6QrSiHV6j1gi0yX8~XJDVuo6W78v-ynT0ZtCwxM1XsGjD5pDKwG~1BQuqyT3s2NbBQddFHKtdbWYz328ypYZ6Q~D041fI5U9UOin6pGZl-HiskQ0MeQ8qvWp5cWzHIMf13mSPA1Y2kNIISWd3IgwUOYwrbOhtQuOdx6Wsq0Nb~93YltPnLyjbXGcs6Fc3kyGAd2s2sDWLufVjCRVNbbHoCgrjko4yC~T24JISHJKxLQivq0dowbLwN2lrHaZWwVvuaebLV9MwHfl5wUHfldLE9-KWLq6jy9z7Mf9cj7gYWbaW2CGlL3S2rLuUIjQAl2YMGbeuAY0trvgA__",
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
      "https://s3-alpha-sig.figma.com/img/d2ba/bb85/01f6a973b94fc8cb81c553333f57c62d?Expires=1726444800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ZlOotb8Vj6QrSiHV6j1gi0yX8~XJDVuo6W78v-ynT0ZtCwxM1XsGjD5pDKwG~1BQuqyT3s2NbBQddFHKtdbWYz328ypYZ6Q~D041fI5U9UOin6pGZl-HiskQ0MeQ8qvWp5cWzHIMf13mSPA1Y2kNIISWd3IgwUOYwrbOhtQuOdx6Wsq0Nb~93YltPnLyjbXGcs6Fc3kyGAd2s2sDWLufVjCRVNbbHoCgrjko4yC~T24JISHJKxLQivq0dowbLwN2lrHaZWwVvuaebLV9MwHfl5wUHfldLE9-KWLq6jy9z7Mf9cj7gYWbaW2CGlL3S2rLuUIjQAl2YMGbeuAY0trvgA__",
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
      "https://s3-alpha-sig.figma.com/img/d2ba/bb85/01f6a973b94fc8cb81c553333f57c62d?Expires=1726444800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ZlOotb8Vj6QrSiHV6j1gi0yX8~XJDVuo6W78v-ynT0ZtCwxM1XsGjD5pDKwG~1BQuqyT3s2NbBQddFHKtdbWYz328ypYZ6Q~D041fI5U9UOin6pGZl-HiskQ0MeQ8qvWp5cWzHIMf13mSPA1Y2kNIISWd3IgwUOYwrbOhtQuOdx6Wsq0Nb~93YltPnLyjbXGcs6Fc3kyGAd2s2sDWLufVjCRVNbbHoCgrjko4yC~T24JISHJKxLQivq0dowbLwN2lrHaZWwVvuaebLV9MwHfl5wUHfldLE9-KWLq6jy9z7Mf9cj7gYWbaW2CGlL3S2rLuUIjQAl2YMGbeuAY0trvgA__",
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
