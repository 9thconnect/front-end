import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import searchIcon from "@public/icons/search.svg";
import useDebounce from "@/hooks/useDebounce";
import { useGetProductList } from "@/lib/requests/user/product";
import { Product } from "@/type/common";
import { useRouter } from "next/navigation";

const EnhancedSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
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
    debouncedSearchTerm,
    1,
    undefined,
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
    if (debouncedSearchTerm) {
      setIsDropdownVisible(true);
    } else {
      setIsDropdownVisible(false);
    }
  }, [debouncedSearchTerm]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSuggestionClick = (product: Product) => {
    setSearchTerm(product.name);
    setIsDropdownVisible(false);
    router.push(`/marketplace/${product._id}`);
  };

  const showDropdown = isDropdownVisible && debouncedSearchTerm.length > 0;

  return (
    <div className=" w-full md:w-2/5 ml-2 grow sm:ml-10">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
          ) : (
            <Image className="w-5 h-5" alt="search icon" src={searchIcon} />
          )}
        </div>
        <Input
          id="search"
          className="ring-0 outline-none focus:outline-none pl-10"
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleInputChange}
        />
      </div>
      {showDropdown && (
        <div
          ref={dropdownRef}
          className="absolute z-10 w-44 h-56 overflow-scroll mt-1 bg-white border border-gray-300 rounded-md shadow-lg"
        >
          {isError ? (
            <div className="px-4 py-2 text-red-500">
              Error loading results. Please try again.
            </div>
          ) : productList?.data?.data?.products?.length === 0 ? (
            <div className="px-4 py-2 text-gray-500">No products found</div>
          ) : (
            productList?.data?.data?.products?.map((suggestion, index) => (
              <div
                key={index}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion.name}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default EnhancedSearch;
