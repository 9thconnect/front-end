"use client";

import OfferCard from "@/components/cards/offerCard";
import EyeIcon from "@/icons/eyeIcon";
import PeopleIconComponent from "@/icons/peopleIcon";
import React from "react";

const offers = [
  {
    title: "Timely Delivery",
    detail: "Nation wide service",
    url: "/",
    icon: EyeIcon,
    backgroundImage:
      "https://s3-alpha-sig.figma.com/img/6037/cabe/f25458f901ff249239c96c7703324163?Expires=1722816000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=hXHXC5wIK2PSBqrgvZaMwdJJHbI4APRS0ivIcspZN3Gsv6E9AjHUcDXFYneFymr0lx-ZXvrPR365oR7DgRf6fDTmxul-NAPuEgaMAxrpGY4-UW0YN4UQLV5814T6raPkimrfRsIaqS1WCxcDyojt8Gk-sg9yCuGfP5fLzOu4ZguIUlj0bs2UNoCLPVUNHF1KxLdcoTrXNifjLnXfRmP97FtlHZhN5lN9NBaAcZ-B57tmE41YhTrMkcq92I-ZZ31k2nPRV4QAeKRuf48p6e2B2WG2hXJ9mkCxo3hMLLT3MiEvT1BWOPgThAZWa1jh6zfLGwwh-mlhR92SuGipG7ypJw__",
  },
  {
    title: "Quality Service",
    detail: "Reliable and efficient",
    url: "/",
    icon: EyeIcon,
    backgroundImage:
      "https://s3-alpha-sig.figma.com/img/798d/7c13/9d04fa09a0ec215ca9d0c325499f75a0?Expires=1722816000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=bdkmLPoNBOub4Ykol8qReqdEVeaIkrrF2S232YBfNV4Py7uYdToR8ypwVu-E4YOjDfwybVGeByzbtPNVt26alxhuLxXX6DVmQmj9-BPzKVyCBgmyEn-GgI5cWTJ91VJLEl8DU~lpQrw2Wd7uFCmrHBsKIGBD1AGXAtpBotw3KuUMjHCxda3UcLx8sKi4C85Oa8Y8Hltm9Zi2XLz~3ekwTOj-3bsNt47OSWxs6tih~BOlxjcTfx5qkjGoAus6I5nyiOrNvN1owQG9BJIRa8qE8Doiyh4z1AdgKuNzU~l1GoBU7xj251tYMNvrRcoIembU8lApLQTCznJadpVeeeBpbw__",
  },
  {
    title: "Quality Service",
    detail: "Reliable and efficient",
    url: "/",
    icon: EyeIcon,
    backgroundImage:
      "https://s3-alpha-sig.figma.com/img/b651/43d0/ed791fe13172c66f2194766b82ac98aa?Expires=1722816000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=M7KIJ54o0xrx0QPgmvvnMJTl01BXperQ0Q9i7iRtCD9uq5GpExHetkB9yaGso9bjgU2kPRoFU7dfBKXyga4yoqrKRFfM7KUCnIO5Asw00sBWolulv1E4JMwGey~7el9q6h8f1VoACHZOUkdS3WopgBcTe-b4mh9jU~ziDvXg5oDgfCHXCuY4EDixRLwJ62lmaGGNhdpr6OcCElNQqmzXnoUao0b16c21Dd6KSfKYhS8b-VtUw-IzZpNoe8vWItskWDcf-1vZTjTxbo5f0LkU3ouFrkU7wVTl1Bu6~KJAN-EtYkswRM4N0OrpHjn~mPlD5INADQR3tQnYBsrt9c2ZQA__",
  },
];

const OfferSection = () => {
  return (
    <div>
      <div className="grid sm:grid-cols-3 gap-2">
        {offers.map((offer) => (
          <OfferCard key={`offer-${offer.title}`} offer={offer} />
        ))}
      </div>
    </div>
  );
};

export default OfferSection;
