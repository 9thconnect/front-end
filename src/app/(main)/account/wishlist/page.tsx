import ProductCard from "@/components/cards/productCard";
import { productDummyList } from "@/data/dummy/productDummyData";
import React from "react";

const page = () => {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 mt-5 gap-4">
        {[].slice(0, 8).map((product, index) => (
          <div className="flex-none" key={index}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
