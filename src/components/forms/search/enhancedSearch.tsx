import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import searchIcon from "@public/icons/search.svg";
import useDebounce from "@/hooks/useDebounce";
import { useGetProductList } from "@/lib/requests/user/product";
import { Product } from "@/type/common";
import { useRouter } from "next/navigation";

const EnhancedSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const {
    data: productList,
    isLoading,
    isError,
    error,
  } = useGetProductList(
    debouncedSearchTerm, // Use the debounced search term
    1, // Page number
    undefined,
    undefined,
    undefined,
    undefined
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (
      debouncedSearchTerm &&
      productList?.data?.data?.products &&
      productList.data?.data?.products?.length > 0
    ) {
      setIsDropdownVisible(true);
    } else {
      setIsDropdownVisible(false);
    }
  }, [debouncedSearchTerm, productList?.data?.data]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSuggestionClick = (product: Product) => {
    setSearchTerm(product.name);
    setIsDropdownVisible(false);

    router.push(`/marketplace/${product._id}`);
    // Implement search action here, e.g., navigate to product page
  };
  return (
    <div className="relative w-full md:w-2/5 ml-2 grow sm:ml-10">
      <label
        htmlFor="search"
        className="relative text-gray-400 focus-within:text-gray-600 block"
      >
        <Image
          className="absolute top-1/2 transform -translate-y-1/2 left-3"
          alt="search icon"
          src={searchIcon}
        />
        <Input
          id="search"
          className="ring-0 outline-none focus:outline-none pl-10"
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleInputChange}
        />
      </label>
      {isDropdownVisible &&
        productList?.data?.data &&
        productList?.data?.data.products.length > 0 && (
          <div
            ref={dropdownRef}
            className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg"
          >
            {productList?.data?.data.products.map((suggestion, index) => (
              <div
                key={index}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion.name}
              </div>
            ))}
          </div>
        )}
    </div>
  );
};

export default EnhancedSearch;
