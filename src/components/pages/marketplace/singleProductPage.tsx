"use client";
import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import SectionContainer from "@/components/cards/common/sectionContainer";
import Image from "next/image";
import CustomGallery from "@/components/gallery/customGallery";
import {
  BriefcaseBusiness,
  Heart,
  MapPin,
  ShoppingBasket,
  Star,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SectionCardHeader from "@/components/cards/common/sectionCardHeader";
import FeaturedProductSection from "@/sections/common/featuredProductSection";
import { Product } from "@/type/common";
import requests from "@/utils/requests";
import { toast } from "sonner";
import ScrollableContainer from "@/components/common/scrollableContainer";
import { useGetSimilarProducts } from "@/lib/requests/user/product";
import ProductCard from "@/components/cards/productCard";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { addItem, addItemToServer } from "@/lib/redux/features/cart/cartSlice";
import Counter from "@/components/common/countComponent";

const SingleProductPage = ({ id }: { id: string }) => {
  const [product, setProduct] = useState<Product>();
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);

  const dispatch = useAppDispatch();
  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);

      try {
        const { data } = await requests.get<{ data: Product }>(
          `product/customer/single-product/${id}`
        );

        setProduct(data?.data);
      } catch (error) {
        toast.error("Error getting product");
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, [id]);

  const {
    data: productList,
    isLoading,
    isError,
    error,
  } = useGetSimilarProducts(id);

  const isLoggedIn = useAppSelector((state) => state.auth.data);

  const handleAddToCart = (
    e: React.MouseEvent<HTMLElement>,
    product: Product
  ) => {
    e.preventDefault();

    console.log("wdw");

    if (isLoggedIn) {
      dispatch(addItemToServer({ product, quantity: 1, type: "productPage" }));
    } else {
      dispatch(addItem({ product, quantity: 1, type: "productPage" }));
    }
  };

  if (loading) {
    return <p>Loading</p>;
  }

  const images = product?.images.map((url) => ({
    original: url,
    thumbnail: url,
    alt: "Image description", // Adjust or customize the description as needed
  }));

  return (
    <div>
      <Breadcrumb className="my-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/marketplace">Marketplace</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-primary capitalize">
              {product?.name ?? ""}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <SectionContainer className="mt-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {images && <CustomGallery images={images} />}

          {product && (
            <div className="px-8 flex flex-col">
              {/* <p>{product?.productCategory.title}</p> */}
              <h2 className="font-bold text-gray-950 text-2xl my-3">
                {product?.name}
              </h2>

              <div className="flex space-x-4 flex-wrap text-gray-950">
                <div className="flex items-center">
                  <BriefcaseBusiness size={20} color="red" />
                  <span className="ml-2">{product?.seller.fullName}</span>
                </div>
                <div className="flex">
                  <MapPin size={20} color="red" />
                  <span className="ml-2">Dummy Location</span>
                </div>
                <div className="flex">
                  <Star size={20} color="red" />
                  <span className="ml-2">{product?.rating}</span>
                </div>
                <div className="flex">
                  <Separator orientation="vertical" />
                  <span className="ml-2">{product?.numReviews} reviews</span>
                </div>
              </div>

              <h3 className="text-gray-950 text-4xl mt-7">{product?.price}</h3>

              <div className="my-2 w-fit">
                <Counter
                  disable={count >= product?.stockQuantity}
                  count={count}
                  setCount={setCount}
                />
              </div>

              <div className="flex items-center mt-2">
                <ShoppingBasket size={20} color="red" />
                <p className="mx-3">{product?.stockQuantity}</p>

                <p>Units left</p>
              </div>

              <div className="flex mt-7">
                <span>Size</span>
                <p className="ml-3"> 25KG</p>
              </div>
              <div className="flex gap-2 my-2">
                {product?.variations?.map((size, index) => (
                  <button
                    key={index}
                    className={`px-4 text-xl py-2 rounded-lg ${
                      size === "25KG" ? "bg-red-500 text-white" : "border"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <div className="w-full flex mt-5  items-end md:mt-auto space-x-4">
                {/* <Button
                  className="bg-black hover:bg-black/70 text-white flex-grow"
                  variant={"secondary"}
                >
                  Buy Now
                </Button> */}
                {product && (
                  <Button
                    onClick={(e) => handleAddToCart(e, product)}
                    className="w-full"
                  >
                    Add to Cart
                  </Button>
                )}

                <Button className="rounded-full p-3" variant={"ghost"}>
                  <Heart />
                </Button>
              </div>
            </div>
          )}
        </div>
      </SectionContainer>

      <SectionContainer className="mt-5">
        <div>
          <Tabs defaultValue="spec" className="w-full">
            <TabsList className="w-full sm:w-auto pb-3 bg-white">
              <TabsTrigger value="spec">Specification</TabsTrigger>
              <TabsTrigger value="review">Review And Rating</TabsTrigger>
              <TabsTrigger value="info">Vendor Info</TabsTrigger>
            </TabsList>
            <TabsContent className="w-full border-t" value="spec">
              <div className="mt-3 bg-gray-100 p-7 rounded-lg">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam,
                animi incidunt ipsum amet totam placeat quis sequi quibusdam
                laudantium nemo maiores voluptatibus quisquam eaque enim
                asperiores sint ipsam qui aspernatur!
              </div>
            </TabsContent>
            <TabsContent className="w-full border-t" value="review">
              <div className="mt-3 bg-gray-100 p-7 rounded-lg">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam,
                animi incidunt ipsum amet totam placeat quis sequi quibusdam
                laudantium nemo maiores voluptatibus quisquam eaque enim
                asperiores sint ipsam qui aspernatur!
              </div>
            </TabsContent>
            <TabsContent className="w-full border-t" value="info">
              <div className="mt-3 bg-gray-100 p-7 rounded-lg">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam,
                animi incidunt ipsum amet totam placeat quis sequi quibusdam
                laudantium nemo maiores voluptatibus quisquam eaque enim
                asperiores sint ipsam qui aspernatur!
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </SectionContainer>
      <SectionContainer>
        <SectionCardHeader
          title="Similar Products"
          linkUrl={"/marketplace/home"}
          linkText="See more"
        />
        <ScrollableContainer>
          <div className="flex space-x-4 cursor-pointer mt-5">
            {productList?.data?.data.map((product, index) => (
              <div className="w-80 flex-none self-stretch" key={index}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </ScrollableContainer>
      </SectionContainer>
    </div>
  );
};

export default SingleProductPage;
