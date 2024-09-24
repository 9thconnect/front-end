"use client";
import WishItemCard from "@/components/cards/wishCard";
import { getWishlist } from "@/lib/requests/user/product";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const WishlistPage = () => {
  const { isLoading, isError, data, error, refetch, isFetching } = useQuery({
    queryKey: ["get-wishlist"],
    queryFn: getWishlist,
  });

  // Handle loading state
  if (isLoading || isFetching) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  // Handle error state
  if (isError) {
    return (
      <div className="text-center mt-10 text-red-500">
        Error: {error?.message}
      </div>
    );
  }

  // Assuming `data` contains the wishlist products
  const wishlist = data?.data?.wishlist || []; // Adjust based on the actual structure of the response

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 mt-5 gap-4">
      {wishlist.length > 0 ? (
        wishlist.map((product, index) => (
          <div className="flex-none" key={index}>
            <WishItemCard wish={product} />
          </div>
        ))
      ) : (
        <div className="text-center mt-10">Your wishlist is empty.</div>
      )}
    </div>
  );
};

export default WishlistPage;
