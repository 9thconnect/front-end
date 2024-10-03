"use client";

import OfferCard from "@/components/cards/offerCard";
import EyeIcon from "@/icons/eyeIcon";
import PeopleIconComponent from "@/icons/peopleIcon";
import React from "react";

const offers = [
  {
    title: "Payments Guaranteed",
    detail: "Enjoy secure & safe Payments",
    url: "/",
    icon: EyeIcon,
    backgroundImage:
      "https://res.cloudinary.com/dougwnqok/image/upload/v1727942972/ed791fe13172c66f2194766b82ac98aa_i454ow.jpg",
  },
  {
    title: "Quality Products",
    detail: "Vetted & SON certified. ",
    url: "/",
    icon: EyeIcon,
    backgroundImage:
      "https://res.cloudinary.com/dougwnqok/image/upload/v1727943050/9d04fa09a0ec215ca9d0c325499f75a0_fhtvaa.jpg",
  },
  {
    title: "Timely Delivery",
    detail: "Nation-wide service",
    url: "/",
    icon: EyeIcon,
    backgroundImage:
      "https://res.cloudinary.com/dougwnqok/image/upload/v1727942994/f25458f901ff249239c96c7703324163_eglzsg.jpg",
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
