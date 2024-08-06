"use client";

import SectionContainer from "@/components/cards/common/sectionContainer";
import ProductCard from "@/components/cards/productCard";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import FilterSection from "@/components/common/filterSection";
import FilterSelect from "@/components/common/filterSelect";
import ItemList from "@/components/common/itemList";
import { productDummyList } from "@/data/dummy/productDummyData";

const states = [
  { name: "Abuja", value: "201" },
  { name: "Lagos", value: "202" },
  { name: "Kano", value: "203" },
  { name: "Rivers", value: "204" },
  { name: "Kaduna", value: "205" },
  { name: "Enugu", value: "206" },
  { name: "Ogun", value: "207" },
  { name: "Oyo", value: "208" },
  { name: "Cross River", value: "209" },
  { name: "Plateau", value: "210" },
];

const rates = [
  { name: "Under N5,000", value: "5000" },
  { name: "N6,000 - N15,0000", value: "202" },
  { name: "N15,000 - N35,000", value: "203" },
  { name: "N35,000 - N100,000", value: "204" },
  { name: "Above N100,000", value: "205" },
];

const starts = [
  { name: "5", value: 5 },
  { name: "4", value: 4 },
  { name: "3", value: 3 },
  { name: "2", value: 2 },
  { name: "1", value: 1 },
];

const brands = [
  { name: "Nagari", value: "Nagari" },
  { name: "7central", value: "7central" },
  { name: "Jasiri", value: "Jasiri" },
  { name: "Maikano", value: "Maikano" },
];

const MarketplaceHomePage = () => {
  const [isLocationOpen, setIsLocationOpen] = useState(true);
  const [isRateOpen, setIsRateOpen] = useState(true);
  const [isRatingOpen, setIsRatingOpen] = useState(true);
  const [isBrandOpen, setIsBrandOpen] = useState(true);
  const params = useSearchParams();

  const catName = params.get("category");

  console.log(catName);

  return (
    <div className="mt-5">
      <div className="grid grid-cols-8 gap-4">
        <aside className="self-start sticky col-span-2 top-56">
          <SectionContainer className="sticky self-start">
            <FilterSection
              title="Brand"
              items={brands}
              isOpen={isBrandOpen}
              onToggle={() => setIsBrandOpen(!isBrandOpen)}
            />
            <FilterSection
              title="Location"
              items={states}
              isOpen={isLocationOpen}
              onToggle={() => setIsLocationOpen(!isLocationOpen)}
            />
            <FilterSection
              title="Rate"
              items={rates}
              isOpen={isRateOpen}
              onToggle={() => setIsRateOpen(!isRateOpen)}
            />
            <FilterSection
              title="Rating"
              items={starts}
              isOpen={isRatingOpen}
              onToggle={() => setIsRatingOpen(!isRatingOpen)}
            />
          </SectionContainer>
        </aside>

        <SectionContainer className="col-span-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              {catName && (
                <h2 className="text-black text-2xl capitalize">{catName}</h2>
              )}
              1-40 of 300
            </div>
            <div className="flex space-x-2">
              <FilterSelect
                label="Relevance"
                options={[
                  { name: "Most Relevant", value: "most-relevant" },
                  { name: "Less Relevant", value: "less-relevant" },
                ]}
                placeholder="Select Relevance"
              />
              <FilterSelect
                label="Price"
                options={rates}
                placeholder="Select Price"
              />
              <FilterSelect
                label="Rating"
                options={starts.map((start) => ({
                  name: `${start.value} star`,
                  value: start.value.toString(),
                }))}
                placeholder="Select Rating"
              />
            </div>
          </div>
          <ItemList
            items={productDummyList}
            renderItem={(item) => <ProductCard product={item} />}
          />
        </SectionContainer>
      </div>
    </div>
  );
};

export default MarketplaceHomePage;
