import SectionCardHeader from "@/components/cards/common/sectionCardHeader";
import SectionContainer from "@/components/cards/common/sectionContainer";
import ProductCard, { IProduct } from "@/components/cards/productCard";
import { productDummyList } from "@/data/dummy/productDummyData";
import React from "react";

interface ICategory {
  title: string;
  pageUrl: string;
  api: string;
}

const CategoryProductListSection = ({ title, pageUrl, api }: ICategory) => {
  return (
    <SectionContainer>
      <SectionCardHeader title={title} linkUrl={pageUrl} linkText="See more" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 mt-5 gap-4">
        {productDummyList
          .filter(
            (product) => product.category.toLowerCase() == title.toLowerCase()
          )
          .map((product, index) => (
            <div className="flex-none" key={index}>
              <ProductCard product={product} />
            </div>
          ))}
      </div>
    </SectionContainer>
  );
};

export default CategoryProductListSection;
