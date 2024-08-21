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

const SingleProductPage = ({ id }: { id: string }) => {
  const [product, setProduct] = useState<Product>();
  const [loading, setLoading] = useState(false);
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

  const images = [
    {
      original:
        "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1470&amp;q=80",
      thumbnail:
        "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1470&amp;q=80",
      alt: "Photo of seashore",
    },
    {
      original:
        "https://images.unsplash.com/photo-1432462770865-65b70566d673?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1950&amp;q=80",
      thumbnail:
        "https://images.unsplash.com/photo-1432462770865-65b70566d673?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1950&amp;q=80",
      alt: "Gallery image 2",
    },
    {
      original:
        "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=2940&amp;q=80",
      thumbnail:
        "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=2940&amp;q=80",
      alt: "Gallery image 3",
    },
    {
      original:
        "https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=2762&amp;q=80",
      thumbnail:
        "https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=2762&amp;q=80",
      alt: "Gallery image 4",
    },
    {
      original:
        "https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=2832&amp;q=80",
      thumbnail:
        "https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=2832&amp;q=80",
      alt: "Gallery image 5",
    },
  ];

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
              {product?.name ?? "All"}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <SectionContainer className="mt-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CustomGallery images={images} />
          <div className="px-8 flex flex-col">
            <p>{product?.productCategory.title}</p>
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
                <span className="ml-2">4.5</span>
              </div>
              <div className="flex">
                <Separator orientation="vertical" />
                <span className="ml-2">23 reviews</span>
              </div>
            </div>

            <h3 className="text-gray-950 text-4xl mt-7">{product?.price}</h3>

            <div className="flex mt-5 self-start text-xl  space-x-5 border rounded-md">
              <button className="px-3 py-1">-</button>
              <input size={1} className="w-5" type="text" value={2} />
              <button className="px-3 py-1">+</button>
            </div>
            <div className="flex items-center mt-2">
              <ShoppingBasket size={20} color="red" />
              <p className="ml-3">{product?.stockQuantity}</p>
              <p>Units left</p>
            </div>

            <div className="flex mt-7">
              <span>Size</span>
              <p>25KG</p>
            </div>
            {/* <div className="flex gap-2 my-2">
              {product?.sizes?.map((size, index) => (
                <button
                  key={index}
                  className={`px-4 text-xl py-2 rounded-lg ${
                    size === "25KG" ? "bg-red-500 text-white" : "border"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div> */}
            <div className="w-full flex mt-5  items-end md:mt-auto space-x-4">
              <Button
                className="bg-black hover:bg-black/70 text-white flex-grow"
                variant={"secondary"}
              >
                Buy Now
              </Button>
              <Button variant={"outline"}>Add to Cert</Button>
              <Button className="rounded-full p-3" variant={"ghost"}>
                <Heart />
              </Button>
            </div>
          </div>
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
        {/* <div className="mt-5">
          <FeaturedProductSection />
        </div> */}
      </SectionContainer>
    </div>
  );
};

export default SingleProductPage;
