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
  LoaderCircleIcon,
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
import {
  addToWishList,
  useGetSimilarProducts,
} from "@/lib/requests/user/product";
import ProductCard from "@/components/cards/productCard";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import {
  addItem,
  addItemToServer,
  decreaseItemFromServer,
  updateQuantity,
} from "@/lib/redux/features/cart/cartSlice";
import Counter from "@/components/common/countComponent";
import { siteConfig } from "@/config/site.config";
import { formatDate } from "@/utils/format-date";
import Empty from "@/components/common/empty";
import { formatCurrency } from "@/utils/format-currency";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import SingleProductSkeleton from "@/components/cards/skeletons/productPageSkeleton";
import { UserType } from "@/lib/redux/features/auth/authSlice";
import { toggleNotCustomerModal } from "@/lib/redux/features/layout/layoutSlice";

interface RatingBarProps {
  rating: number;
  count: number;
}

const RatingBar: React.FC<RatingBarProps> = ({ rating, count }) => (
  <div className="flex items-center mb-1">
    <span className="w-6 text-sm flex">
      <div className="flex">
        <span className="text-black">{rating}</span>

        <Star className="w-4 h-4 mx-2 text-yellow-400 fill-yellow-400" />
      </div>

      <span className="text-sm text-gray-500">({count})</span>
    </span>
    <div className="w-40 bg-gray-200 rounded-full h-1.5 ml-20">
      <div
        className="bg-yellow-400 h-1.5 rounded-full"
        style={{ width: `${(count / 2975) * 100}%` }}
      ></div>
    </div>
  </div>
);

interface CustomerCommentProps {
  name: string;
  avatar: string;
  rating: number;
  comment: string;
  customer: {
    _id: string;
    fullName: string;
    avatar: string;
  };
  reviewedOn: Date; // This can be a `Date` type as well if you want to parse it
  _id: string;
}

const CustomerComment: React.FC<CustomerCommentProps> = ({
  rating,
  comment,
  customer,
  reviewedOn,
}) => (
  <div className="border-b border-gray-200 py-4">
    <div className="flex items-center mb-2">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
    </div>
    <p className="text-sm text-gray-600 mb-2">{comment}</p>
    <div className="flex justify-between text-sm text-gray-500">
      <span>{customer.fullName}</span>
      <span>{formatDate(reviewedOn)}</span>
    </div>
  </div>
);

interface Rating {
  stars: number;
  count: number;
}

interface Comment extends CustomerCommentProps {}

const SingleProductPage = ({
  id,
  channel,
}: {
  id: string;
  channel?: "retail" | "wholeSale";
}) => {
  const [product, setProduct] = useState<Product>();
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);

  const { mutate, isPending } = useMutation({
    mutationKey: ["addRemoveWishlist"],
    mutationFn: (data: Product) => {
      return addToWishList(product?._id as string);
    },
    onSuccess: (data) => {
      toast(data.message, {
        description: `${product?.name ?? "product name"}`,
        action: {
          label: "Whish List",
          onClick: () => console.log("Undo"),
          actionButtonStyle: {
            backgroundColor: "#ab0505b9",
            color: "#880b0bf",
          },
        },
      });
    },

    onError: (error: AxiosError<{ message: string }>) => {
      console.log(error.response?.data.message);

      toast.error(error.response?.data.message);
    },
  });

  const ratings: Rating[] = [
    { stars: 5, count: 0 },
    { stars: 4, count: 0 },
    { stars: 3, count: 0 },
    { stars: 2, count: 0 },
    { stars: 1, count: 0 },
  ];

  product?.reviews.forEach((review) => {
    const foundRating = ratings.find((r) => r.stars === review.rating);
    if (foundRating) {
      foundRating.count += 1;
    }
  });

  const cart = useAppSelector((state) => state.cart);
  const isLoggedIn = useAppSelector((state) => state.auth.data);
  const loadingAddToCart = useAppSelector((state) => state.cart.addingToCart);
  const type = useAppSelector((state) => state.auth.type);

  const loadingCart =
    cart.addingToCart?.state &&
    product &&
    cart.addingToCart?.product?._id == product._id;

  const dispatch = useAppDispatch();

  const itemInCart = cart.items.find(
    (item) => item.product._id == product?._id
  );

  console.log("itemInCart", itemInCart);
  useEffect(() => {
    console.log("itemInCart", itemInCart);

    if (itemInCart) setCount(itemInCart.quantity);

    console.log(itemInCart);
  }, [itemInCart]);

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

  const handleAddToCart = (
    product: Product,
    e?: React.MouseEvent<HTMLElement>
  ) => {
    if (e) e.preventDefault();

    console.log("wdw");

    if (isLoggedIn) {
      dispatch(addItemToServer({ product, quantity: 1, type: "productPage" }));
    } else {
      dispatch(addItem({ product, quantity: 1, type: "productPage" }));
    }
  };

  const handleUpdateCart = (quantity: number) => {
    if (itemInCart && product) {
      if (isLoggedIn) {
        if (itemInCart.quantity < quantity) {
          console.log("increase");

          dispatch(addItemToServer({ product, quantity: quantity }));
        } else {
          console.log("decrease");

          dispatch(
            decreaseItemFromServer({
              product: product,
              quantity: itemInCart.quantity,
            })
          );
        }
      } else {
        if (
          itemInCart.quantity > quantity &&
          product.productSaleType == "b2b" &&
          product.minimumOrder &&
          product.minimumOrder >= itemInCart.quantity
        ) {
          toast.error(`You cannot go below minimum order`, {
            description: `The product minimum order is ${product.minimumOrder}`,
            action: {
              label: "Cart",
              onClick: () => console.log("Undo"),
              actionButtonStyle: {
                backgroundColor: "#ab0505b9",
                color: "#880b0bf",
              },
            },
          });

          return;
        }
        dispatch(updateQuantity({ product: product, quantity: quantity }));
      }
    }
  };

  if (loading) {
    return <SingleProductSkeleton />;
  }

  const images = product?.images.map((url) => ({
    original: url,
    thumbnail: url,
    alt: "Image description", // Adjust or customize the description as needed
  }));

  const handleNoCustomer = () => {
    console.log("No customer");

    dispatch(toggleNotCustomerModal({ open: true }));
  };

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
                  <span className="ml-2">
                    {product?.seller?.businesses[0]?.businessLegalName}
                  </span>
                </div>
                <div className="flex">
                  <MapPin size={20} color="red" />
                  {product.productSaleType == "b2b" ? (
                    <span className="ml-2">
                      {product?.seller?.businesses[0]?.shopCountry ||
                        "No Country"}
                    </span>
                  ) : (
                    <span className="ml-2">
                      {product?.seller?.businesses[0]?.shopAddress ||
                        "No Location"}
                    </span>
                  )}
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

              <h3 className="text-gray-950 text-4xl mt-7">
                {formatCurrency(product?.price)}
              </h3>

              <div className="flex items-center mt-2">
                {product.productSaleType == "b2b" && (
                  <div className="flex items-center mr-3">
                    <ShoppingBasket size={20} color="red" />

                    <p className="ml-1">
                      Minimum order quantity: {product.minimumOrder}
                    </p>
                  </div>
                )}
                <div className="flex items-center ">
                  <ShoppingBasket size={20} color="red" />
                  <p className="ml-1 mr-3">{product?.stockQuantity}</p>

                  <p>Units left</p>
                </div>
              </div>

              <div className="flex mt-7">
                <span>Size</span>
                <p className="ml-3"> {product?.weight || "0"} KG</p>
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
                {product && itemInCart ? (
                  <Counter
                    className="shadow-lg border-black"
                    disable={count >= product?.stockQuantity}
                    count={count}
                    setCount={(count) => handleUpdateCart(count)}
                    disableInput
                    loading={loadingCart}
                  />
                ) : (
                  <Button
                    onClick={(e) =>
                      type == UserType.CUSTOMER
                        ? handleAddToCart(product, e)
                        : handleNoCustomer()
                    }
                    className="w-full"
                    disabled={
                      loadingAddToCart?.state &&
                      loadingAddToCart?.product?._id === product._id
                    }
                  >
                    {loadingAddToCart?.state &&
                    loadingAddToCart?.product?._id === product._id ? (
                      <LoaderCircleIcon className="w-6 h-6 animate-spin " />
                    ) : (
                      "Add to Cart"
                    )}
                  </Button>
                )}

                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    type == UserType.CUSTOMER
                      ? mutate(product)
                      : handleNoCustomer();
                  }}
                  className="rounded-full p-3"
                  variant={"ghost"}
                >
                  {isPending ? (
                    <LoaderCircleIcon className="w-6 h-6 animate-spin " />
                  ) : (
                    <Heart />
                  )}
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
                {product?.description}
              </div>
            </TabsContent>
            <TabsContent className="w-full border-t" value="review">
              <div className="w-full mx-auto p-6 flex space-x-8">
                <div className="mb-8 w-2/5">
                  <h1 className="text-2xl font-bold mb-6 text-black">
                    Ratings
                  </h1>
                  <div className="bg-gray-100 p-6 rounded-lg flex flex-col items-center">
                    <div className="text-5xl  mb-2 text-black">
                      {product?.rating}
                    </div>
                    <div className="flex mb-2">
                      {[...Array(product?.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-6 h-6 text-yellow-400 fill-yellow-400"
                        />
                      ))}
                    </div>
                    <div className="text-sm text-gray-500">
                      {product?.numReviews} verified ratings
                    </div>
                  </div>
                  <hr className="my-5" />
                  <div>
                    {ratings.map(({ stars, count }) => (
                      <RatingBar key={stars} rating={stars} count={count} />
                    ))}
                  </div>
                </div>
                <div className="w-full border rounded-xl p-3">
                  <h2 className="text-lg font-bold mb-4 text-black">
                    Customer Comments
                  </h2>
                  <hr />
                  {product?.reviews && product?.reviews.length > 0 ? (
                    product?.reviews.map((comment, index) => (
                      <CustomerComment key={index} {...comment} />
                    ))
                  ) : (
                    <Empty size={150} text="No comments yet" />
                  )}
                  {}
                </div>
              </div>
            </TabsContent>
            <TabsContent className="w-full border-t" value="info">
              <div className="mt-3  p-7 flex w-full ">
                <div className="w-2/5">
                  <Image src={siteConfig.logo} alt="" />
                </div>

                <div className="mt-5">
                  {product?.seller.businesses[0] && (
                    <div className="border rounded-lg px-4 py-4">
                      <h2 className="text-offBlack">Business</h2>
                      <Separator className="my-2" />
                      <div className="flex items-center mb-4">
                        <p className="mr-7">Business:</p>
                        <p className="text-offBlack">
                          {product?.seller?.businesses[0]?.businessLegalName}
                        </p>
                      </div>
                      <div className="flex items-center mb-4">
                        <p className="mr-7">CAC:</p>
                        <p className="text-offBlack">
                          {product?.seller?.businesses[0]?.businessRegNo}
                        </p>
                      </div>

                      <h2 className="text-offBlack">Shop details</h2>
                      <Separator className="my-2" />
                      <div className="flex items-center mb-4">
                        <p className="mr-7">Name:</p>
                        <p className="text-offBlack">
                          {product?.seller?.businesses[0]?.shopName}
                        </p>
                      </div>

                      <div className="flex items-center mb-4">
                        <p className="mr-7">Address:</p>
                        <p className="text-offBlack">
                          {product?.seller?.businesses[0]?.shopAddress}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
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
