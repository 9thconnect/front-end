import SectionCardHeader from "@/components/cards/common/sectionCardHeader";
import SectionContainer from "@/components/cards/common/sectionContainer";
import ProductCard, { IProduct } from "@/components/cards/productCard";
import { productDummyList } from "@/data/dummy/productDummyData";
import { useGetProductList } from "@/lib/requests/user/product";
import { Product } from "@/type/common";
import React from "react";

interface ICategory {
  title: string;
  pageUrl: string;
  api: string;
  category: string;
  channel?: "retail" | "wholeSale";
}

const CategoryProductListSection = ({
  title,
  pageUrl,
  api,
  category,
  channel,
}: ICategory) => {
  console.log(
    "CategoryProductListSection",
    title,
    pageUrl,
    api,
    category,
    channel
  );

  const {
    data: productList,
    isLoading,
    isError,
    error,
  } = useGetProductList(
    "",
    1,
    category,
    undefined,
    undefined,
    undefined,
    undefined,
    channel,
    category ? true : false
  );
  return (
    <>
      {category &&
        productList &&
        productList?.data?.data &&
        productList?.data?.data.products.length > 0 && (
          <SectionContainer>
            <SectionCardHeader
              title={title}
              linkUrl={pageUrl}
              linkText="See more"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 mt-5 gap-4">
              {productList?.data?.data.products.map((product, index) => (
                <div className="flex-none" key={index}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </SectionContainer>
        )}
    </>
  );
};

export default CategoryProductListSection;
