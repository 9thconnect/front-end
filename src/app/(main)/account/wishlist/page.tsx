import ProductCard from "@/components/cards/productCard";
import WishlistPage from "@/components/pages/marketplace/wishlistPage";
import { productDummyList } from "@/data/dummy/productDummyData";
import React from "react";

const page = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-black">My wishlist</h2>
      <p className="my-3 text-lg">Products you have liked</p>
      <WishlistPage />
    </div>
  );
};

export default page;
