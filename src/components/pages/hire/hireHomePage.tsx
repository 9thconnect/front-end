"use client";

import SectionContainer from "@/components/cards/common/sectionContainer";
import ProductCard from "@/components/cards/productCard";
import TalentCard, { ITalent } from "@/components/cards/talentCard";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  AlignJustify,
  ArrowDown01Icon,
  ArrowDownIcon,
  ChevronDown,
  ChevronUp,
  Ellipsis,
  Star,
} from "lucide-react";
import { useState } from "react";
import Rating from "react-rating";
import { useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FilterSection from "@/components/common/filterSection";
import FilterSelect from "@/components/common/filterSelect";
import ItemList from "@/components/common/itemList";
import { generateRandomAlphanumeric } from "@/utils/generateAlphanumeric";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
    category: "engineering",
  },
];

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

const rates = [
  { name: "Under N5,000", value: "5000" },
  { name: "N6,000 - N15,0000", value: "202" },
  { name: "N15,000 - N35,000", value: "203" },
  { name: "N35,000 - N100,000", value: "204" },
  { name: "Above N100,000", value: "205" },
];

const starts = [
  { name: "5", value: 5 },
  { name: "4", value: 4 },
  { name: "3", value: 3 },
  { name: "2", value: 2 },
  { name: "1", value: 1 },
];

const HireHomePage = () => {
  const [isLocationOpen, setIsLocationOpen] = useState(true);
  const [isRateOpen, setIsRateOpen] = useState(true);
  const [isRatingOpen, setIsRatingOpen] = useState(true);
  const params = useSearchParams();

  const catName = params.get("category");

  return (
    <div className="mt-5">
      <div className="grid grid-cols-8 gap-4">
        <aside className="hidden md:block self-start sticky col-span-2 top-56">
          <SectionContainer className="sticky self-start">
            <FilterSection
              title="Location"
              items={states}
              isOpen={isLocationOpen}
              onToggle={() => setIsLocationOpen(!isLocationOpen)}
            />
            <FilterSection
              title="Rate"
              items={rates}
              isOpen={isRateOpen}
              onToggle={() => setIsRateOpen(!isRateOpen)}
            />
            <FilterSection
              title="Rating"
              items={starts}
              isOpen={isRatingOpen}
              onToggle={() => setIsRatingOpen(!isRatingOpen)}
            />
          </SectionContainer>
        </aside>

        <SectionContainer className="col-span-8 md:col-span-6">
          <div className="flex justify-between items-center mb-6">
            <div className="mr-4">
              {catName && (
                <h2 className="text-black text-2xl capitalize text-nowrap">
                  {catName}
                </h2>
              )}
              1-40 of 300
            </div>
            {/* <Ellipsis  /> */}
            <DropdownMenu>
              <DropdownMenuTrigger>
                {" "}
                <AlignJustify size={30} className="md:hidden" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Filter</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <FilterSelect
                    label="Relevance"
                    options={[
                      { name: "Most Relevant", value: "most-relevant" },
                      { name: "Less Relevant", value: "less-relevant" },
                    ]}
                    placeholder="Select Relevance"
                  />
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <FilterSelect
                    label="Price"
                    options={rates}
                    placeholder="Select Price"
                  />
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <FilterSelect
                    label="Rating"
                    options={starts.map((start) => ({
                      name: `${start.value} star`,
                      value: start.value.toString(),
                    }))}
                    placeholder="Select Rating"
                  />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* <AlignJustify size={30} className="md:hidden" /> */}
            <div className="hidden md:flex space-x-2 flex-wrap">
              <FilterSelect
                label="Relevance"
                options={[
                  { name: "Most Relevant", value: "most-relevant" },
                  { name: "Less Relevant", value: "less-relevant" },
                ]}
                placeholder="Select Relevance"
              />
              <FilterSelect
                label="Price"
                options={rates}
                placeholder="Select Price"
              />
              <FilterSelect
                label="Rating"
                options={starts.map((start) => ({
                  name: `${start.value} star`,
                  value: start.value.toString(),
                }))}
                placeholder="Select Rating"
              />
            </div>
          </div>
          <ItemList
            items={talents}
            renderItem={(item) => <TalentCard talent={item} />}
          />
        </SectionContainer>
      </div>
    </div>
  );
};

export default HireHomePage;
