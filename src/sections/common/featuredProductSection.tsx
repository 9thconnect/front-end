"use client";
import ProductCard, { IProduct } from "@/components/cards/productCard";
import ScrollableContainer from "@/components/common/scrollableContainer";
import { productDummyList } from "@/data/dummy/productDummyData";

const FeaturedProductSection: React.FC = () => {
  return (
    <ScrollableContainer>
      <div className="flex space-x-4 cursor-pointer">
        {productDummyList.map((product, index) => (
          <div className="w-80 flex-none self-stretch" key={index}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </ScrollableContainer>
  );
};

export default FeaturedProductSection;
