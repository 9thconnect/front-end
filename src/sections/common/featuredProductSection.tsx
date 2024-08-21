"use client";
import ProductCard, { IProduct } from "@/components/cards/productCard";
import ScrollableContainer from "@/components/common/scrollableContainer";
import { productDummyList } from "@/data/dummy/productDummyData";
import { useGetNewArrival } from "@/lib/requests/user/product";

const FeaturedProductSection: React.FC = () => {
  const { data: productList, isLoading, isError, error } = useGetNewArrival();
  return (
    <ScrollableContainer>
      <div className="flex space-x-4 cursor-pointer">
        {productList?.data?.data.products.map((product, index) => (
          <div className="w-80 flex-none self-stretch" key={index}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </ScrollableContainer>
  );
};

export default FeaturedProductSection;
