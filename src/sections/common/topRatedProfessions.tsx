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
