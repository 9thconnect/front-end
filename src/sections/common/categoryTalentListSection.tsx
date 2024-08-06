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
      "https://s3-alpha-sig.figma.com/img/d311/7506/e0f6324a817ba285c547a01b11fcad6f?Expires=1723420800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Pl68FtY23824JiwQBjxL8MEE-BbLDerNbXWqGrV7YXJKDHVIaZVqLEx8E60Oj~-G4lYr7aqdL-oKn5EVhWm0yJnwWuBg3xfUx0eXah85VDeQDmZXNX5hVmeJSi4pdBRJua~Rhk124yordod611mRpnvsHWNCmwWmUcbC5-UpaCg053AIlP35PxOSrOVpGLnziy8JZtUGMeYMddPjcmf9qFZXnCMRkDRlxtDD0G~HjwH8kwPOy0sELk64L4-OOTb9v6qoffLFUHokIA9N94XeQBjyaHKzRuoQtawnXvUdaE-qDWSJypr6SXdwaEjp6VTpVjKk6aXz2uftwAz~A~EWZA__",
    category: "engineering",
  },
  {
    id: generateRandomAlphanumeric(),
    name: "John Doe",
    profession: "Snr. Product Manager",
    location: "Abuja, NG",
    verified: false,
    imageUrl:
      "https://s3-alpha-sig.figma.com/img/d311/7506/e0f6324a817ba285c547a01b11fcad6f?Expires=1723420800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Pl68FtY23824JiwQBjxL8MEE-BbLDerNbXWqGrV7YXJKDHVIaZVqLEx8E60Oj~-G4lYr7aqdL-oKn5EVhWm0yJnwWuBg3xfUx0eXah85VDeQDmZXNX5hVmeJSi4pdBRJua~Rhk124yordod611mRpnvsHWNCmwWmUcbC5-UpaCg053AIlP35PxOSrOVpGLnziy8JZtUGMeYMddPjcmf9qFZXnCMRkDRlxtDD0G~HjwH8kwPOy0sELk64L4-OOTb9v6qoffLFUHokIA9N94XeQBjyaHKzRuoQtawnXvUdaE-qDWSJypr6SXdwaEjp6VTpVjKk6aXz2uftwAz~A~EWZA__",
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
      "https://s3-alpha-sig.figma.com/img/d311/7506/e0f6324a817ba285c547a01b11fcad6f?Expires=1723420800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Pl68FtY23824JiwQBjxL8MEE-BbLDerNbXWqGrV7YXJKDHVIaZVqLEx8E60Oj~-G4lYr7aqdL-oKn5EVhWm0yJnwWuBg3xfUx0eXah85VDeQDmZXNX5hVmeJSi4pdBRJua~Rhk124yordod611mRpnvsHWNCmwWmUcbC5-UpaCg053AIlP35PxOSrOVpGLnziy8JZtUGMeYMddPjcmf9qFZXnCMRkDRlxtDD0G~HjwH8kwPOy0sELk64L4-OOTb9v6qoffLFUHokIA9N94XeQBjyaHKzRuoQtawnXvUdaE-qDWSJypr6SXdwaEjp6VTpVjKk6aXz2uftwAz~A~EWZA__",
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
      "https://s3-alpha-sig.figma.com/img/d311/7506/e0f6324a817ba285c547a01b11fcad6f?Expires=1723420800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Pl68FtY23824JiwQBjxL8MEE-BbLDerNbXWqGrV7YXJKDHVIaZVqLEx8E60Oj~-G4lYr7aqdL-oKn5EVhWm0yJnwWuBg3xfUx0eXah85VDeQDmZXNX5hVmeJSi4pdBRJua~Rhk124yordod611mRpnvsHWNCmwWmUcbC5-UpaCg053AIlP35PxOSrOVpGLnziy8JZtUGMeYMddPjcmf9qFZXnCMRkDRlxtDD0G~HjwH8kwPOy0sELk64L4-OOTb9v6qoffLFUHokIA9N94XeQBjyaHKzRuoQtawnXvUdaE-qDWSJypr6SXdwaEjp6VTpVjKk6aXz2uftwAz~A~EWZA__",
    category: "engineering",
  },
  {
    id: generateRandomAlphanumeric(),
    name: "John Doe",
    profession: "Snr. Product Manager",
    location: "Abuja, NG",

    verified: false,
    imageUrl:
      "https://s3-alpha-sig.figma.com/img/d311/7506/e0f6324a817ba285c547a01b11fcad6f?Expires=1723420800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Pl68FtY23824JiwQBjxL8MEE-BbLDerNbXWqGrV7YXJKDHVIaZVqLEx8E60Oj~-G4lYr7aqdL-oKn5EVhWm0yJnwWuBg3xfUx0eXah85VDeQDmZXNX5hVmeJSi4pdBRJua~Rhk124yordod611mRpnvsHWNCmwWmUcbC5-UpaCg053AIlP35PxOSrOVpGLnziy8JZtUGMeYMddPjcmf9qFZXnCMRkDRlxtDD0G~HjwH8kwPOy0sELk64L4-OOTb9v6qoffLFUHokIA9N94XeQBjyaHKzRuoQtawnXvUdaE-qDWSJypr6SXdwaEjp6VTpVjKk6aXz2uftwAz~A~EWZA__",
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
      "https://s3-alpha-sig.figma.com/img/d311/7506/e0f6324a817ba285c547a01b11fcad6f?Expires=1723420800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Pl68FtY23824JiwQBjxL8MEE-BbLDerNbXWqGrV7YXJKDHVIaZVqLEx8E60Oj~-G4lYr7aqdL-oKn5EVhWm0yJnwWuBg3xfUx0eXah85VDeQDmZXNX5hVmeJSi4pdBRJua~Rhk124yordod611mRpnvsHWNCmwWmUcbC5-UpaCg053AIlP35PxOSrOVpGLnziy8JZtUGMeYMddPjcmf9qFZXnCMRkDRlxtDD0G~HjwH8kwPOy0sELk64L4-OOTb9v6qoffLFUHokIA9N94XeQBjyaHKzRuoQtawnXvUdaE-qDWSJypr6SXdwaEjp6VTpVjKk6aXz2uftwAz~A~EWZA__",
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
      "https://s3-alpha-sig.figma.com/img/d311/7506/e0f6324a817ba285c547a01b11fcad6f?Expires=1723420800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Pl68FtY23824JiwQBjxL8MEE-BbLDerNbXWqGrV7YXJKDHVIaZVqLEx8E60Oj~-G4lYr7aqdL-oKn5EVhWm0yJnwWuBg3xfUx0eXah85VDeQDmZXNX5hVmeJSi4pdBRJua~Rhk124yordod611mRpnvsHWNCmwWmUcbC5-UpaCg053AIlP35PxOSrOVpGLnziy8JZtUGMeYMddPjcmf9qFZXnCMRkDRlxtDD0G~HjwH8kwPOy0sELk64L4-OOTb9v6qoffLFUHokIA9N94XeQBjyaHKzRuoQtawnXvUdaE-qDWSJypr6SXdwaEjp6VTpVjKk6aXz2uftwAz~A~EWZA__",
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
      "https://s3-alpha-sig.figma.com/img/d311/7506/e0f6324a817ba285c547a01b11fcad6f?Expires=1723420800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Pl68FtY23824JiwQBjxL8MEE-BbLDerNbXWqGrV7YXJKDHVIaZVqLEx8E60Oj~-G4lYr7aqdL-oKn5EVhWm0yJnwWuBg3xfUx0eXah85VDeQDmZXNX5hVmeJSi4pdBRJua~Rhk124yordod611mRpnvsHWNCmwWmUcbC5-UpaCg053AIlP35PxOSrOVpGLnziy8JZtUGMeYMddPjcmf9qFZXnCMRkDRlxtDD0G~HjwH8kwPOy0sELk64L4-OOTb9v6qoffLFUHokIA9N94XeQBjyaHKzRuoQtawnXvUdaE-qDWSJypr6SXdwaEjp6VTpVjKk6aXz2uftwAz~A~EWZA__",
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
      "https://s3-alpha-sig.figma.com/img/d311/7506/e0f6324a817ba285c547a01b11fcad6f?Expires=1723420800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Pl68FtY23824JiwQBjxL8MEE-BbLDerNbXWqGrV7YXJKDHVIaZVqLEx8E60Oj~-G4lYr7aqdL-oKn5EVhWm0yJnwWuBg3xfUx0eXah85VDeQDmZXNX5hVmeJSi4pdBRJua~Rhk124yordod611mRpnvsHWNCmwWmUcbC5-UpaCg053AIlP35PxOSrOVpGLnziy8JZtUGMeYMddPjcmf9qFZXnCMRkDRlxtDD0G~HjwH8kwPOy0sELk64L4-OOTb9v6qoffLFUHokIA9N94XeQBjyaHKzRuoQtawnXvUdaE-qDWSJypr6SXdwaEjp6VTpVjKk6aXz2uftwAz~A~EWZA__",
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
      "https://s3-alpha-sig.figma.com/img/d311/7506/e0f6324a817ba285c547a01b11fcad6f?Expires=1723420800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Pl68FtY23824JiwQBjxL8MEE-BbLDerNbXWqGrV7YXJKDHVIaZVqLEx8E60Oj~-G4lYr7aqdL-oKn5EVhWm0yJnwWuBg3xfUx0eXah85VDeQDmZXNX5hVmeJSi4pdBRJua~Rhk124yordod611mRpnvsHWNCmwWmUcbC5-UpaCg053AIlP35PxOSrOVpGLnziy8JZtUGMeYMddPjcmf9qFZXnCMRkDRlxtDD0G~HjwH8kwPOy0sELk64L4-OOTb9v6qoffLFUHokIA9N94XeQBjyaHKzRuoQtawnXvUdaE-qDWSJypr6SXdwaEjp6VTpVjKk6aXz2uftwAz~A~EWZA__",
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
      "https://s3-alpha-sig.figma.com/img/d311/7506/e0f6324a817ba285c547a01b11fcad6f?Expires=1723420800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Pl68FtY23824JiwQBjxL8MEE-BbLDerNbXWqGrV7YXJKDHVIaZVqLEx8E60Oj~-G4lYr7aqdL-oKn5EVhWm0yJnwWuBg3xfUx0eXah85VDeQDmZXNX5hVmeJSi4pdBRJua~Rhk124yordod611mRpnvsHWNCmwWmUcbC5-UpaCg053AIlP35PxOSrOVpGLnziy8JZtUGMeYMddPjcmf9qFZXnCMRkDRlxtDD0G~HjwH8kwPOy0sELk64L4-OOTb9v6qoffLFUHokIA9N94XeQBjyaHKzRuoQtawnXvUdaE-qDWSJypr6SXdwaEjp6VTpVjKk6aXz2uftwAz~A~EWZA__",
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
      "https://s3-alpha-sig.figma.com/img/d311/7506/e0f6324a817ba285c547a01b11fcad6f?Expires=1723420800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Pl68FtY23824JiwQBjxL8MEE-BbLDerNbXWqGrV7YXJKDHVIaZVqLEx8E60Oj~-G4lYr7aqdL-oKn5EVhWm0yJnwWuBg3xfUx0eXah85VDeQDmZXNX5hVmeJSi4pdBRJua~Rhk124yordod611mRpnvsHWNCmwWmUcbC5-UpaCg053AIlP35PxOSrOVpGLnziy8JZtUGMeYMddPjcmf9qFZXnCMRkDRlxtDD0G~HjwH8kwPOy0sELk64L4-OOTb9v6qoffLFUHokIA9N94XeQBjyaHKzRuoQtawnXvUdaE-qDWSJypr6SXdwaEjp6VTpVjKk6aXz2uftwAz~A~EWZA__",
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
      "https://s3-alpha-sig.figma.com/img/d311/7506/e0f6324a817ba285c547a01b11fcad6f?Expires=1723420800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Pl68FtY23824JiwQBjxL8MEE-BbLDerNbXWqGrV7YXJKDHVIaZVqLEx8E60Oj~-G4lYr7aqdL-oKn5EVhWm0yJnwWuBg3xfUx0eXah85VDeQDmZXNX5hVmeJSi4pdBRJua~Rhk124yordod611mRpnvsHWNCmwWmUcbC5-UpaCg053AIlP35PxOSrOVpGLnziy8JZtUGMeYMddPjcmf9qFZXnCMRkDRlxtDD0G~HjwH8kwPOy0sELk64L4-OOTb9v6qoffLFUHokIA9N94XeQBjyaHKzRuoQtawnXvUdaE-qDWSJypr6SXdwaEjp6VTpVjKk6aXz2uftwAz~A~EWZA__",
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
      "https://s3-alpha-sig.figma.com/img/d311/7506/e0f6324a817ba285c547a01b11fcad6f?Expires=1723420800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Pl68FtY23824JiwQBjxL8MEE-BbLDerNbXWqGrV7YXJKDHVIaZVqLEx8E60Oj~-G4lYr7aqdL-oKn5EVhWm0yJnwWuBg3xfUx0eXah85VDeQDmZXNX5hVmeJSi4pdBRJua~Rhk124yordod611mRpnvsHWNCmwWmUcbC5-UpaCg053AIlP35PxOSrOVpGLnziy8JZtUGMeYMddPjcmf9qFZXnCMRkDRlxtDD0G~HjwH8kwPOy0sELk64L4-OOTb9v6qoffLFUHokIA9N94XeQBjyaHKzRuoQtawnXvUdaE-qDWSJypr6SXdwaEjp6VTpVjKk6aXz2uftwAz~A~EWZA__",
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
      "https://s3-alpha-sig.figma.com/img/d311/7506/e0f6324a817ba285c547a01b11fcad6f?Expires=1723420800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Pl68FtY23824JiwQBjxL8MEE-BbLDerNbXWqGrV7YXJKDHVIaZVqLEx8E60Oj~-G4lYr7aqdL-oKn5EVhWm0yJnwWuBg3xfUx0eXah85VDeQDmZXNX5hVmeJSi4pdBRJua~Rhk124yordod611mRpnvsHWNCmwWmUcbC5-UpaCg053AIlP35PxOSrOVpGLnziy8JZtUGMeYMddPjcmf9qFZXnCMRkDRlxtDD0G~HjwH8kwPOy0sELk64L4-OOTb9v6qoffLFUHokIA9N94XeQBjyaHKzRuoQtawnXvUdaE-qDWSJypr6SXdwaEjp6VTpVjKk6aXz2uftwAz~A~EWZA__",
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
      "https://s3-alpha-sig.figma.com/img/d311/7506/e0f6324a817ba285c547a01b11fcad6f?Expires=1723420800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Pl68FtY23824JiwQBjxL8MEE-BbLDerNbXWqGrV7YXJKDHVIaZVqLEx8E60Oj~-G4lYr7aqdL-oKn5EVhWm0yJnwWuBg3xfUx0eXah85VDeQDmZXNX5hVmeJSi4pdBRJua~Rhk124yordod611mRpnvsHWNCmwWmUcbC5-UpaCg053AIlP35PxOSrOVpGLnziy8JZtUGMeYMddPjcmf9qFZXnCMRkDRlxtDD0G~HjwH8kwPOy0sELk64L4-OOTb9v6qoffLFUHokIA9N94XeQBjyaHKzRuoQtawnXvUdaE-qDWSJypr6SXdwaEjp6VTpVjKk6aXz2uftwAz~A~EWZA__",
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
      "https://s3-alpha-sig.figma.com/img/d311/7506/e0f6324a817ba285c547a01b11fcad6f?Expires=1723420800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Pl68FtY23824JiwQBjxL8MEE-BbLDerNbXWqGrV7YXJKDHVIaZVqLEx8E60Oj~-G4lYr7aqdL-oKn5EVhWm0yJnwWuBg3xfUx0eXah85VDeQDmZXNX5hVmeJSi4pdBRJua~Rhk124yordod611mRpnvsHWNCmwWmUcbC5-UpaCg053AIlP35PxOSrOVpGLnziy8JZtUGMeYMddPjcmf9qFZXnCMRkDRlxtDD0G~HjwH8kwPOy0sELk64L4-OOTb9v6qoffLFUHokIA9N94XeQBjyaHKzRuoQtawnXvUdaE-qDWSJypr6SXdwaEjp6VTpVjKk6aXz2uftwAz~A~EWZA__",
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
      "https://s3-alpha-sig.figma.com/img/d311/7506/e0f6324a817ba285c547a01b11fcad6f?Expires=1723420800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Pl68FtY23824JiwQBjxL8MEE-BbLDerNbXWqGrV7YXJKDHVIaZVqLEx8E60Oj~-G4lYr7aqdL-oKn5EVhWm0yJnwWuBg3xfUx0eXah85VDeQDmZXNX5hVmeJSi4pdBRJua~Rhk124yordod611mRpnvsHWNCmwWmUcbC5-UpaCg053AIlP35PxOSrOVpGLnziy8JZtUGMeYMddPjcmf9qFZXnCMRkDRlxtDD0G~HjwH8kwPOy0sELk64L4-OOTb9v6qoffLFUHokIA9N94XeQBjyaHKzRuoQtawnXvUdaE-qDWSJypr6SXdwaEjp6VTpVjKk6aXz2uftwAz~A~EWZA__",
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
